import { pluginParameter, Constructable } from 'shared/assets/interfaces/interfaces'

declare global {
	interface Window {
		google: {
			ima: {
				ViewMode: {
					NORMAL: string
				}
				AdEvent: {
					Type: {
						LOADED: string
						CONTENT_PAUSE_REQUESTED: string
						CONTENT_RESUME_REQUESTED: string
					}
				}
				AdErrorEvent: {
					Type: {
						AD_ERROR: string
					}
				}
				AdsRequest: Constructable<any>
				AdsManagerLoadedEvent: {
					Type: {
						ADS_MANAGER_LOADED: string
					}
				}
				AdDisplayContainer: Constructable<any>
				AdsLoader: Constructable<any>
			}
		}
	}
}

interface ImaEvent {
	getAd: any
	getError: () => void
	getAdsManager: (adsManagerLoadedEvent: any) => void
}

/**
 * Vlitejs Ima plugin
 * @module Vlitejs/plugins/ima
 */
export default class ImaPlugin {
	player: any
	options: any
	playerIsReady: boolean
	imaSdkIsReady: boolean
	adContainer!: HTMLElement
	adsLoaded: boolean
	adsManager: any
	adsLoader: any
	adDisplayContainer: any

	providers = ['html5']
	types = ['video']

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.player Player instance
	 * @param {Object} options.options Plugins options
	 */
	constructor({ player, options = {} }: pluginParameter) {
		this.player = player
		this.options = options

		this.playerIsReady = false
		this.imaSdkIsReady = false
		this.adsLoaded = false

		this.onResize = this.onResize.bind(this)
		this.onAdsManagerLoaded = this.onAdsManagerLoaded.bind(this)
		this.onAdError = this.onAdError.bind(this)
		this.onContentPauseRequested = this.onContentPauseRequested.bind(this)
		this.onContentResumeRequested = this.onContentResumeRequested.bind(this)
		this.onAdLoaded = this.onAdLoaded.bind(this)
		this.loadAds = this.loadAds.bind(this)
	}

	/**
	 * Initialize the plugin
	 */
	init() {
		this.loadImaSdk()
	}

	loadImaSdk() {
		const script = document.createElement('script')
		script.defer = true
		script.type = 'text/javascript'
		script.src = '//imasdk.googleapis.com/js/sdkloader/ima3.js'
		script.onload = () => {
			this.imaSdkIsReady = true
			this.onPlayerAndImaSdkReady()
		}
		document.getElementsByTagName('body')[0].appendChild(script)
	}

	onReady() {
		this.playerIsReady = true
		this.onPlayerAndImaSdkReady()
	}

	onResize() {
		this.adsManager &&
			this.adsManager.resize(
				this.player.media.clientWidth,
				this.player.media.clientHeight,
				window.google.ima.ViewMode.NORMAL
			)
	}

	onPlayerAndImaSdkReady() {
		if (this.playerIsReady && this.imaSdkIsReady) {
			this.render()
			this.adContainer = this.player.elements.container.querySelector('.v-ad')
			this.addEvents()
			this.initializeIMA()
		}
	}

	render() {
		this.player.elements.container.insertAdjacentHTML('beforeend', '<div class="v-ad"></div>')
	}

	addEvents() {
		window.addEventListener('resize', this.onResize)
		this.player.media.addEventListener('ended', () => {
			this.adsLoader.contentComplete()
		})
		this.player.on('play', this.loadAds)
	}

	initializeIMA() {
		this.player.isIma = true
		this.adsLoaded = false

		this.adDisplayContainer = new window.google.ima.AdDisplayContainer(
			this.adContainer,
			this.player.media
		)
		this.adsLoader = new window.google.ima.AdsLoader(this.adDisplayContainer)
		this.adsLoader.addEventListener(
			window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
			this.onAdsManagerLoaded,
			false
		)
		this.adsLoader.addEventListener(
			window.google.ima.AdErrorEvent.Type.AD_ERROR,
			this.onAdError,
			false
		)

		const adsRequest = new window.google.ima.AdsRequest()
		adsRequest.adTagUrl = this.options.adTagUrl
		adsRequest.linearAdSlotWidth = this.player.media.clientWidth
		adsRequest.linearAdSlotHeight = this.player.media.clientHeight
		adsRequest.nonLinearAdSlotWidth = this.player.media.clientWidth
		adsRequest.nonLinearAdSlotHeight = this.player.media.clientHeight / 3

		this.adsLoader.requestAds(adsRequest)
	}

	onAdsManagerLoaded(adsManagerLoadedEvent: ImaEvent) {
		this.adsManager = adsManagerLoadedEvent.getAdsManager(this.player.media)

		this.adsManager.addEventListener(
			window.google.ima.AdErrorEvent.Type.AD_ERROR,
			this.onAdError
		)
		this.adsManager.addEventListener(
			window.google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
			this.onContentPauseRequested
		)
		this.adsManager.addEventListener(
			window.google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
			this.onContentResumeRequested
		)
		this.adsManager.addEventListener(window.google.ima.AdEvent.Type.LOADED, this.onAdLoaded)
	}

	onContentPauseRequested() {
		this.player.isPaused === false && this.player.pause()
	}

	onContentResumeRequested() {
		this.player.play()
	}

	onAdError(adErrorEvent: ImaEvent) {
		console.warn(adErrorEvent.getError())
		if (this.adsManager) {
			this.adsManager.destroy()
		}
	}

	loadAds() {
		if (this.adsLoaded || !this.adDisplayContainer || !this.adsManager) {
			return
		}
		this.adsLoaded = true
		this.adDisplayContainer.initialize()

		try {
			this.adsManager.init(
				this.player.media.clientWidth,
				this.player.media.clientHeight,
				window.google.ima.ViewMode.NORMAL
			)
			this.adsManager.start()
		} catch {
			this.player.play()
		}
	}

	onAdLoaded(e: ImaEvent) {
		!e.getAd().isLinear() && this.player.play()
	}
}

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
						CONTENT_PAUSE_REQUESTED: string
						CONTENT_RESUME_REQUESTED: string
						STARTED: string
						PAUSED: string
						RESUMED: string
						COMPLETE: string
						LOADED: string
						ALL_ADS_COMPLETED: string
						SKIPPED: string
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
				settings: object
				AdsRenderingSettings: Constructable<any>
			}
		}
	}
}

interface ImaEvent {
	getAd: any
	getError: () => void
	getAdsManager: (adsManagerLoadedEvent: any, adsRenderingSettings: object) => void
}

/**
 * Vlitejs Ima plugin
 * @module Vlitejs/plugins/ima
 */
export default class ImaPlugin {
	player: any
	options: any
	playerIsReady: boolean
	sdkIsReady: boolean
	adContainer!: HTMLElement
	adCountDown!: HTMLElement
	countdownTimer: number
	resumeAd: boolean
	adDisplayContainer: any
	adsLoader: any
	adsManager: any
	adsLoaded: boolean
	currentAd: null | any

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

		const defaultOptions = {
			adTagUrl: '',
			adsRenderingSettings: {
				restoreCustomPlaybackStateOnAdBreakComplete: true
			},
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			updateImaSettings: () => {},
			countdownText: 'Ad'
		}
		this.options = { ...defaultOptions, ...options }

		this.playerIsReady = false
		this.sdkIsReady = false
		this.adsLoaded = false
		this.countdownTimer = 0
		this.resumeAd = false
		this.currentAd = null

		this.onBigPlayButtonClick = this.onBigPlayButtonClick.bind(this)
		this.loadAds = this.loadAds.bind(this)
		this.onResize = this.onResize.bind(this)
		this.onAdsManagerLoaded = this.onAdsManagerLoaded.bind(this)
		this.onAdError = this.onAdError.bind(this)
		this.onContentPauseRequested = this.onContentPauseRequested.bind(this)
		this.onContentResumeRequested = this.onContentResumeRequested.bind(this)
		this.onAdStarted = this.onAdStarted.bind(this)
		this.onAdPaused = this.onAdPaused.bind(this)
		this.onAdResumed = this.onAdResumed.bind(this)
		this.onAdComplete = this.onAdComplete.bind(this)
		this.onAdLoaded = this.onAdLoaded.bind(this)
		this.onAllAdsCompleted = this.onAllAdsCompleted.bind(this)
		this.onAdSkipped = this.onAdSkipped.bind(this)
		this.updateCountdown = this.updateCountdown.bind(this)
	}

	/**
	 * Initialize the plugin
	 */
	init() {
		this.loadImaSdk()
	}

	/**
	 * Load the IMA SDK
	 */
	loadImaSdk() {
		const script = document.createElement('script')
		script.defer = true
		script.type = 'text/javascript'
		script.src = '//imasdk.googleapis.com/js/sdkloader/ima3.js'
		script.onload = () => {
			this.sdkIsReady = true
			this.onPlayerAndSdkReady()
		}
		document.getElementsByTagName('body')[0].appendChild(script)
	}

	/**
	 * On player ready
	 */
	onReady() {
		this.playerIsReady = true
		this.onPlayerAndSdkReady()
	}

	/**
	 * On player and SDK ready
	 */
	onPlayerAndSdkReady() {
		if (this.playerIsReady && this.sdkIsReady) {
			this.render()
			this.adContainer = this.player.elements.container.querySelector('.v-ad')
			this.adCountDown = this.player.elements.container.querySelector('.v-adCountDown')

			this.addEvents()
			this.initAdObjects()
			this.requestAds()
		} else {
			this.player.loading(true)
		}
	}

	/**
	 * Render the plugin HTML
	 */
	render() {
		const template = `<div class="v-ad"><div class="v-adCountDown"></div>`
		this.player.elements.container.insertAdjacentHTML('beforeend', template)
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.player.media.addEventListener('ended', () => this.adsLoader.contentComplete())
		this.player.elements.bigPlay.addEventListener('click', this.onBigPlayButtonClick)
		this.player.on('play', this.loadAds)
		window.addEventListener('resize', this.onResize)
	}

	/**
	 * On click on big play button
	 */
	onBigPlayButtonClick() {
		if (this.resumeAd) {
			this.resumeAd = false
			this.adsManager.resume()
		}
	}

	/**
	 * Init ad objects
	 */
	initAdObjects() {
		this.adsLoaded = false
		if (this.options.updateImaSettings instanceof Function) {
			this.options.updateImaSettings(window.google.ima.settings)
		}

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

		this.player.dispatchEvent('adsloader', {
			adsLoader: this.adsLoader
		})
	}

	/**
	 * Request ads
	 */
	requestAds() {
		const adsRequest = new window.google.ima.AdsRequest()
		adsRequest.adTagUrl = this.options.adTagUrl
		adsRequest.linearAdSlotWidth = this.player.media.clientWidth
		adsRequest.linearAdSlotHeight = this.player.media.clientHeight
		adsRequest.nonLinearAdSlotWidth = this.player.media.clientWidth
		adsRequest.nonLinearAdSlotHeight = this.player.media.clientHeight / 3
		this.adsLoader.requestAds(adsRequest)

		this.player.dispatchEvent('adsrequest', {
			adsRequest
		})
	}

	/**
	 * On ads manager loaded
	 * @param {ImaEvent} adsManagerLoadedEvent Ads manager event
	 */
	onAdsManagerLoaded(adsManagerLoadedEvent: ImaEvent) {
		const adsRenderingSettings = {
			...new window.google.ima.AdsRenderingSettings(),
			...this.options.adsRenderingSettings
		}
		this.adsManager = adsManagerLoadedEvent.getAdsManager(
			this.player.media,
			adsRenderingSettings
		)

		this.adsManager.addEventListener(
			window.google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
			this.onContentPauseRequested
		)
		this.adsManager.addEventListener(
			window.google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
			this.onContentResumeRequested
		)
		this.adsManager.addEventListener(window.google.ima.AdEvent.Type.STARTED, this.onAdStarted)
		this.adsManager.addEventListener(window.google.ima.AdEvent.Type.PAUSED, this.onAdPaused)
		this.adsManager.addEventListener(window.google.ima.AdEvent.Type.RESUMED, this.onAdResumed)
		this.adsManager.addEventListener(window.google.ima.AdEvent.Type.COMPLETE, this.onAdComplete)
		this.adsManager.addEventListener(window.google.ima.AdEvent.Type.LOADED, this.onAdLoaded)
		this.adsManager.addEventListener(
			window.google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
			this.onAllAdsCompleted
		)
		this.adsManager.addEventListener(window.google.ima.AdEvent.Type.SKIPPED, this.onAdSkipped)

		this.player.dispatchEvent('adsmanager', {
			adsManager: this.adsManager
		})
	}

	/**
	 * On content pause requested
	 */
	onContentPauseRequested() {
		this.player.isPaused === false && this.player.pause()
	}

	/**
	 * On content resume requested
	 */
	onContentResumeRequested() {
		this.player.play()
	}

	/**
	 * On ad started
	 * @param {ImaEvent} e Ad event
	 */
	onAdStarted(e: ImaEvent) {
		this.player.isAd = true
		this.currentAd = e.getAd()

		this.player.elements.container.classList.add('v-adPlaying')
		this.player.elements.container.classList.remove('v-adPaused')

		this.countdownTimer = window.setInterval(this.updateCountdown, 250)
	}

	/**
	 * Update the ad count down
	 */
	updateCountdown() {
		const remainingTime = this.adsManager.getRemainingTime()
		const remainingMinutes = Math.floor(remainingTime / 60)
		const remainingSeconds = Math.floor(remainingTime % 60)
			.toString()
			.padStart(2, '0')
		this.adCountDown.innerHTML = `${this.options.countdownText} ${remainingMinutes}:${remainingSeconds}`
	}

	/**
	 * On ad paused
	 */
	onAdPaused() {
		this.resumeAd = true
		this.player.elements.container.classList.add('v-adPaused')
		this.player.elements.container.classList.remove('v-adPlaying')
	}

	/**
	 * On ad resumed
	 */
	onAdResumed() {
		this.player.elements.container.classList.add('v-adPlaying')
		this.player.elements.container.classList.remove('v-adPaused')
	}

	/**
	 * On ad complete
	 */
	onAdComplete() {
		window.clearInterval(this.countdownTimer)
	}

	/**
	 * On ad loaded
	 * @param {ImaEvent} e Ad event
	 */
	onAdLoaded(e: ImaEvent) {
		!e.getAd().isLinear() && this.player.play()
	}

	/**
	 * On all ads completed
	 */
	onAllAdsCompleted() {
		this.clean()
		this.player.play()
	}

	/**
	 * On ad skipped
	 */
	onAdSkipped() {
		this.clean()
		this.player.play()
	}

	/**
	 * On ad error
	 */
	onAdError() {
		this.clean()
		this.player.play()
	}

	/**
	 * Load ads
	 */
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
			this.onAdError()
		}
	}

	/**
	 * On window resize event
	 */
	onResize() {
		this.adsManager &&
			this.adsManager.resize(
				this.player.media.clientWidth,
				this.player.media.clientHeight,
				window.google.ima.ViewMode.NORMAL
			)
	}

	/**
	 * Clean up ad management
	 */
	clean() {
		this.player.isAd = false
		this.adContainer.setAttribute('hidden', '')
		this.player.elements.bigPlay.removeEventListener('click', this.onBigPlayButtonClick)
		window.clearInterval(this.countdownTimer)
		this.adCountDown.remove()
		this.player.elements.container.classList.remove('v-adPlaying', 'v-adPaused')
	}

	/**
	 * Destroy the plugin
	 */
	destroy() {
		this.clean()
		this.adsManager && this.adsManager.destroy()
		this.adDisplayContainer && this.adDisplayContainer.destroy()
		this.adsLoader && this.adsLoader.destroy()
	}
}

import { pluginParameter, Constructable } from 'shared/assets/interfaces/interfaces'

declare global {
	interface Window {
		google: {
			ima: {
				ViewMode: {
					NORMAL: string
					FULLSCREEN: string
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
	getError: () => {
		j: {
			type: string
			errorCode: number
			errorMessage: string
		}
	}
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
	timerAdTimeout: number
	resumeAd: boolean
	adDisplayContainer: any
	adsLoader: any
	adsManager: any
	adsLoaded: boolean
	adError: boolean
	adTimeoutReached: boolean
	playIsWaiting: boolean

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
			countdownText: 'Ad',
			adTimeout: 5000
		}
		this.options = { ...defaultOptions, ...options }

		this.playerIsReady = false
		this.sdkIsReady = false
		this.adsLoaded = false
		this.countdownTimer = 0
		this.timerAdTimeout = 0
		this.resumeAd = false
		this.adError = false
		this.adTimeoutReached = false
		this.playIsWaiting = false

		this.onBigPlayButtonClick = this.onBigPlayButtonClick.bind(this)
		this.onPlayerPlay = this.onPlayerPlay.bind(this)
		this.onVolumeChange = this.onVolumeChange.bind(this)
		this.onPlayerEnterFullscreen = this.onPlayerEnterFullscreen.bind(this)
		this.onPlayerExitFullscreen = this.onPlayerExitFullscreen.bind(this)
		this.onPlayerEnded = this.onPlayerEnded.bind(this)
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
		this.player.elements.bigPlay.addEventListener('click', this.onBigPlayButtonClick)
		this.player.on('play', this.onPlayerPlay)
		this.player.on('volumechange', this.onVolumeChange)
		this.player.on('enterfullscreen', this.onPlayerEnterFullscreen)
		this.player.on('exitfullscreen', this.onPlayerExitFullscreen)
		this.player.on('ended', this.onPlayerEnded)
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

		if (this.playIsWaiting && !this.adTimeoutReached) {
			clearTimeout(this.timerAdTimeout)
			this.onPlayerPlay()
		}
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
	 */
	onAdStarted() {
		this.player.isAd = true

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
	 * @param {ImaEvent} e Ad event
	 */
	onAdError(e: ImaEvent) {
		this.adError = true
		clearTimeout(this.timerAdTimeout)

		try {
			const { type, errorCode, errorMessage } = e.getError()?.j
			console.warn(`${type} ${errorCode}: ${errorMessage}`)
		} catch {
			console.warn(`onAdError`, e)
		}
		this.destroy()

		if (this.player.options.autoplay || this.playIsWaiting) {
			this.player.play()
		}
	}

	/**
	 * On player play
	 */
	onPlayerPlay() {
		if (this.adError || this.adTimeoutReached) return

		if (this.isAdReady()) {
			this.waitingAd()
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

			this.player.getVolume().then((volume: number) => {
				this.adsManager.setVolume(volume)
				this.adsManager.start()
			})
		} catch (e: any) {
			this.onAdError(e)
		}
	}

	/**
	 * Check if ad is ready to display
	 * @returns {boolean} Ad is ready
	 */
	isAdReady() {
		return this.adsLoaded || !this.adDisplayContainer || !this.adsManager
	}

	/**
	 * The ad is not ready to display, but the playback has been triggered
	 * The plugin will wait until the timeout is reached
	 */
	waitingAd() {
		console.log('waiting ads')
		this.playIsWaiting = true
		this.player.pause()

		// Use setTimeout to force the loading state after other calls made by the player
		window.setTimeout(() => this.player.loading(true), 0)

		this.timerAdTimeout = window.setTimeout(() => {
			this.onAdTimeoutReached()
		}, this.options.adTimeout)
	}

	/**
	 * On ad timeout reached
	 */
	onAdTimeoutReached() {
		this.adTimeoutReached = true
		this.player.loading(false)

		this.onAdError({
			// @ts-ignore
			errorMessage: 'Timeout is reached'
		})
		this.playIsWaiting = false
	}

	/**
	 * On volume change, update the ad volume
	 */
	onVolumeChange() {
		this.player.getVolume().then((volume: number) => this.adsManager.setVolume(volume))
	}

	/**
	 * On player enter fullscreen, resize the ad
	 */
	onPlayerEnterFullscreen() {
		if (this.adsManager) {
			this.adsManager.resize(
				window.screen.width,
				window.screen.height,
				window.google.ima.ViewMode.FULLSCREEN
			)
		}
	}

	/**
	 * On player ended
	 */
	onPlayerEnded() {
		this.adsLoader.contentComplete()
	}

	/**
	 * On player exit fullscreen, resize the ad
	 */
	onPlayerExitFullscreen() {
		if (this.adsManager) {
			this.adsManager.resize(
				this.player.media.clientWidth,
				this.player.media.clientHeight,
				window.google.ima.ViewMode.NORMAL
			)
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
		if (this.adsManager) {
			this.adsManager.destroy()
			this.adsManager = null
		}
		if (this.adDisplayContainer) {
			this.adDisplayContainer.destroy()
			this.adDisplayContainer = null
		}
		if (this.adsLoader) {
			this.adsLoader.destroy()
			this.adsLoader = null
		}
	}
}

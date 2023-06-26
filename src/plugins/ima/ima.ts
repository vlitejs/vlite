import './ima.css'
import { pluginParameter, Constructable } from 'shared/assets/types/types'

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
				settings: {
					setDisableCustomPlaybackForIOS10Plus: (status: boolean) => void
				}
				AdsRenderingSettings: Constructable<any>
				UiElements: {
					AD_ATTRIBUTION: string
					COUNTDOWN: string
				}
			}
		}
	}
}

type ImaEvent = {
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
	currentAd!: any
	cuePoints!: number[]
	adContainer!: HTMLElement
	timerAdTimeout: number
	resumeAd: boolean
	adDisplayContainer: any
	adsLoader: any
	adsManager: any
	adsLoaded: boolean
	adError: boolean
	adTimeoutReached: boolean
	playIsWaiting: boolean
	isLinearAd: boolean
	playerIsEnded: boolean

	providers = ['html5']
	types = ['video']

	/**
	 * @constructor
	 * @param options
	 * @param options.player Player instance
	 * @param options.options Plugins options
	 */
	constructor({ player, options = {} }: pluginParameter) {
		this.player = player

		const defaultOptions = {
			adTagUrl: '',
			adsRenderingSettings: {
				restoreCustomPlaybackStateOnAdBreakComplete: true,
				enablePreloading: true
			},
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			updateImaSettings: () => {},
			adTimeout: 5000,
			debug: false
		}
		this.options = { ...defaultOptions, ...options }

		this.playerIsReady = false
		this.sdkIsReady = false
		this.adsLoaded = false
		this.timerAdTimeout = 0
		this.resumeAd = false
		this.adError = false
		this.adTimeoutReached = false
		this.playIsWaiting = false
		this.isLinearAd = false
		this.playerIsEnded = false

		this.onBigPlayButtonClick = this.onBigPlayButtonClick.bind(this)
		this.onClickOnAdContainer = this.onClickOnAdContainer.bind(this)
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
		this.onAllAdsCompleted = this.onAllAdsCompleted.bind(this)
		this.onAdSkipped = this.onAdSkipped.bind(this)
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
		script.src = `//imasdk.googleapis.com/js/sdkloader/ima3${
			this.options.debug ? '_debug' : ''
		}.js`
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
			this.player.loading(false)
			this.render()
			this.adContainer = this.player.elements.container.querySelector('.v-ad')

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
		const template = document.createElement('div')
		template.classList.add('v-ad')
		this.player.elements.container.appendChild(template)
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.player.elements.bigPlay.addEventListener('click', this.onBigPlayButtonClick)
		this.adContainer.addEventListener('click', this.onClickOnAdContainer)
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
	 * On click on ad container
	 * Only for non-linear ads, as the video continues to play during the ad
	 */
	onClickOnAdContainer() {
		if (!this.isLinearAd) {
			this.player.elements.playPause.dispatchEvent(new Event('click', { bubbles: true }))
		}
	}

	/**
	 * Init ad objects
	 */
	initAdObjects() {
		this.adsLoaded = false
		window.google.ima.settings.setDisableCustomPlaybackForIOS10Plus(
			this.player.options.playsinline
		)
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
		adsRequest.nonLinearAdSlotHeight = this.player.media.clientHeight / 3 // Default to 1/3 of the player
		this.adsLoader.requestAds(adsRequest)

		this.player.dispatchEvent('adsrequest', {
			adsRequest
		})
	}

	/**
	 * On ads manager loaded
	 * @param adsManagerLoadedEvent Ads manager event
	 */
	onAdsManagerLoaded(adsManagerLoadedEvent: ImaEvent) {
		const adsRenderingSettings = {
			...new window.google.ima.AdsRenderingSettings(),
			uiElements: [
				window.google.ima.UiElements.AD_ATTRIBUTION,
				window.google.ima.UiElements.COUNTDOWN
			],
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
		this.adsManager.addEventListener(
			window.google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
			this.onAllAdsCompleted
		)
		this.adsManager.addEventListener(window.google.ima.AdEvent.Type.SKIPPED, this.onAdSkipped)

		this.cuePoints = this.adsManager.getCuePoints()
		if (
			Array.isArray(this.cuePoints) &&
			this.cuePoints.length &&
			this.player.elements.progressBar
		) {
			this.addCuePoints()
		}

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
		this.adContainer.classList.add('v-active')
		this.player.isPaused === false && this.player.pause()
	}

	/**
	 * On content resume requested
	 */
	onContentResumeRequested() {
		this.clean()
		this.adContainer.classList.remove('v-active')
		!this.playerIsEnded && this.player.play()
	}

	/**
	 * On ad started
	 * @param e Ad event
	 */
	onAdStarted(e: ImaEvent) {
		// Prevent the loader from being above the ad
		this.player.loading(false)

		this.currentAd = e.getAd()
		this.isLinearAd = this.currentAd.isLinear()

		// Video play is prevent only when linear ad is playing
		if (this.isLinearAd) {
			this.player.isLinearAd = true
		} else {
			// Non-linear ad does not trigger the CONTENT_PAUSE_REQUESTED event
			this.adContainer.classList.add('v-active')
		}

		this.player.elements.outerContainer.classList[this.isLinearAd ? 'remove' : 'add'](
			'v-adNonLinear'
		)
		this.player.elements.outerContainer.classList.add('v-adPlaying')
		this.player.elements.outerContainer.classList.remove('v-adPaused')
	}

	/**
	 * On ad paused
	 */
	onAdPaused() {
		this.resumeAd = true
		this.player.elements.outerContainer.classList.add('v-adPaused')
		this.player.elements.outerContainer.classList.remove('v-adPlaying')
	}

	/**
	 * On ad resumed
	 */
	onAdResumed() {
		this.player.elements.outerContainer.classList.add('v-adPlaying')
		this.player.elements.outerContainer.classList.remove('v-adPaused')
	}

	/**
	 * On ad complete
	 */
	onAdComplete() {
		/** Can be used */
	}

	/**
	 * On all ads completed
	 */
	onAllAdsCompleted() {
		this.clean()
		!this.playerIsEnded && this.player.play()
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
	 * @param e Ad event
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
	 * Add cue point to the progress bar
	 */
	addCuePoints() {
		const cues = document.createElement('div')
		cues.classList.add('v-cuePoints')

		this.player.getDuration().then((duration: number) => {
			this.cuePoints
				.filter(
					(cuePoint: number) => cuePoint !== 0 && cuePoint !== -1 && cuePoint < duration
				)
				.forEach((cuePoint: number) => {
					const cuePercentage = (cuePoint * 100) / duration
					const cue = document.createElement('span')
					cue.classList.add('v-cuePoint')
					cue.style.left = `${cuePercentage}%`
					cues.appendChild(cue)
				})

			this.player.elements.controlBar.appendChild(cues)
		})
	}

	/**
	 * On player play
	 */
	onPlayerPlay() {
		this.playerIsEnded = false

		if (this.adsLoaded || this.adError || this.adTimeoutReached) return

		if (!this.adDisplayContainer || !this.adsManager) {
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
	 * The ad is not ready to display, but the playback has been triggered
	 * The plugin will wait until the timeout is reached
	 */
	waitingAd() {
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
		this.playerIsEnded = true
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
	 * Remove event listeners
	 */
	removeEventListener() {
		this.player.elements.bigPlay.removeEventListener('click', this.onBigPlayButtonClick)
		this.adContainer.removeEventListener('click', this.onClickOnAdContainer)
		this.player.off('play', this.onPlayerPlay)
		this.player.off('volumechange', this.onVolumeChange)
		this.player.off('enterfullscreen', this.onPlayerEnterFullscreen)
		this.player.off('exitfullscreen', this.onPlayerExitFullscreen)
		this.player.off('ended', this.onPlayerEnded)
		window.removeEventListener('resize', this.onResize)
	}

	/**
	 * Clean up ad management
	 */
	clean() {
		this.player.isLinearAd = false
		this.adContainer.classList.remove('v-active', 'v-adNonLinear')
		this.player.elements.outerContainer.classList.remove('v-adPlaying', 'v-adPaused')
	}

	/**
	 * Destroy the plugin
	 */
	destroy() {
		this.clean()
		this.removeEventListener()

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

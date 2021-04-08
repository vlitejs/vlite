// Import SVG icons
import { formatVideoTime } from 'shared/utils/utils'
import { Options, playerParameters, configEvent } from 'shared/assets/interfaces/interfaces'

interface customEvents {
	[key: string]: Array<Function>
}
/**
 * Vlitejs Player
 * @module Vlitejs/Player
 */
export default class Player {
	element: HTMLAudioElement | HTMLVideoElement
	container: HTMLElement
	options: Options
	Vlitejs: any
	progressBarIsMoving: Boolean
	isFullScreen: Boolean
	isMuted: Boolean
	isPaused: null | Boolean
	delayAutoHide: number
	controlBar!: any
	customEvents: customEvents
	controlBarElement: HTMLElement | null
	poster: HTMLElement | null
	bigPlayButton: HTMLElement | null
	playPauseButton: HTMLElement | null
	currentTimeElement: HTMLElement | null
	progressBar: HTMLInputElement | null
	volumeButton: HTMLElement | null
	fullscreenButton: HTMLElement | null

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {HTMLElement} options.element Player HTML element
	 * @param {HTMLElement} options.container Player HTML container
	 * @param {Object} options.options Player options
	 * @param {Class} options.Vlitejs Vlitejs instance
	 */
	constructor({ element, container, options, Vlitejs }: playerParameters) {
		this.element = element
		this.container = container as HTMLElement
		this.options = options
		this.Vlitejs = Vlitejs

		this.progressBarIsMoving = false
		this.isFullScreen = false
		this.isMuted = this.options.muted
		this.isPaused = null
		this.delayAutoHide = 3000

		this.customEvents = {}
		this.controlBarElement = null
		this.poster = null
		this.bigPlayButton = null
		this.playPauseButton = null
		this.currentTimeElement = null
		this.progressBar = null
		this.volumeButton = null
		this.fullscreenButton = null
	}

	init() {
		throw new Error('You have to implement the function "init".')
	}

	waitUntilVideoIsReady() {
		throw new Error('You have to implement the function "waitUntilVideoIsReady".')
	}

	getInstance() {
		throw new Error('You have to implement the function "getInstance".')
	}

	getCurrentTime(): Promise<number> {
		throw new Error('You have to implement the function "getCurrentTime".')
	}

	methodSeekTo(newTime: number) {
		throw new Error('You have to implement the function "methodSeekTo".')
	}

	getDuration(): Promise<number> {
		throw new Error('You have to implement the function "getDuration".')
	}

	methodPlay() {
		throw new Error('You have to implement the function "methodPlay".')
	}

	methodPause() {
		throw new Error('You have to implement the function "methodPause".')
	}

	methodSetVolume(newVolume: number) {
		throw new Error('You have to implement the function "methodSetVolume".')
	}

	methodGetVolume(): Promise<number> {
		throw new Error('You have to implement the function "methodGetVolume".')
	}

	methodMute() {
		throw new Error('You have to implement the function "methodMute".')
	}

	methodUnMute() {
		throw new Error('You have to implement the function "methodUnMute".')
	}

	/**
	 * On the player is ready
	 */
	onPlayerReady() {
		if (this.options.poster) {
			this.poster = this.container.querySelector('.v-poster')
		}

		this.controlBarElement = this.container.querySelector('.v-controlBar')
		if (this.controlBarElement) {
			if (this.options.bigPlay) {
				this.bigPlayButton = this.controlBarElement.querySelector('.v-bigPlay')
			}
			if (this.options.playPause) {
				this.playPauseButton = this.controlBarElement.querySelector('.v-playPauseButton')
			}
			if (this.options.time) {
				this.currentTimeElement = this.controlBarElement.querySelector('.v-currentTime')
			}
			if (this.options.progressBar) {
				this.progressBar = this.controlBarElement.querySelector('.v-progressBar')
			}
			if (this.options.volume) {
				this.volumeButton = this.controlBarElement.querySelector('.v-volumeButton')
			}
			if (this.options.fullscreen) {
				this.fullscreenButton = this.controlBarElement.querySelector('.v-fullscreenButton')
			}
		}

		// If player has autoplay option, play now
		if (this.options.autoplay) {
			// Autoplay on video is authorize only when the media element is muted
			!this.element.muted && this.mute()

			this.play()
		}

		this.loading(false)
		this.Vlitejs.controlBar.onPlayerReady()
		this.Vlitejs.onReady instanceof Function && this.Vlitejs.onReady.call(this, this)
	}

	/**
	 * Add media action listeners to the storage
	 * @param {String} type Event type
	 * @param {EventListener} listener Event listener
	 */
	on(type: string, listener: EventListener) {
		if (listener instanceof Function) {
			if (!Object.keys(this.customEvents).includes(type)) {
				this.customEvents[type] = []
			}
			this.customEvents[type].push(listener)
		}
	}

	/**
	 * Call custom event listeners from the event storage
	 * @param {String} type Event type
	 */
	dispatchEvent(type: string) {
		if (Object.keys(this.customEvents).includes(type)) {
			this.customEvents[type].forEach((listener) => listener())
		}
	}

	/**
	 * Loading bridge between the player and vlite
	 * @param {Boolean} status Loading status
	 */
	loading(status: Boolean) {
		this.Vlitejs.loading(status)
	}

	/**
	 * On time update
	 * Update current time displaying in the control bar
	 * Udpdate the progress bar
	 */
	onTimeUpdate() {
		if (this.options.time) {
			Promise.all([this.getCurrentTime(), this.getDuration()]).then(
				([seconds, duration]: [number, number]) => {
					const currentTime = Math.round(seconds)

					if (this.progressBar) {
						const width = (currentTime * 100) / duration
						if (!this.progressBarIsMoving) {
							this.progressBar.value = `${width}`
						}
						this.progressBar.style.setProperty('--value', `${width}%`)
						this.progressBar.setAttribute('aria-valuenow', `${Math.round(seconds)}`)
					}

					if (this.currentTimeElement) {
						this.currentTimeElement.innerHTML = formatVideoTime(currentTime)
					}

					this.dispatchEvent('timeupdate')
				}
			)
		}
	}

	/**
	 * On video ended
	 */
	onVideoEnded() {
		if (this.options.loop) {
			this.play()
		} else {
			this.container.classList.replace('v-playing', 'v-paused')
			this.container.classList.add('v-firstStart')
		}

		if (this.options.poster && this.poster) {
			this.poster.classList.add('v-active')
		}

		if (this.progressBar) {
			this.progressBar.value = '0'
			this.progressBar.style.setProperty('--value', '0%')
			this.progressBar.removeAttribute('aria-valuenow')
		}

		if (this.currentTimeElement) {
			this.currentTimeElement.innerHTML = '00:00'
		}

		this.dispatchEvent('ended')
	}

	/**
	 * Play the media element
	 */
	play() {
		if (this.container.classList.contains('v-firstStart')) {
			this.container.classList.remove('v-firstStart')

			if (this.Vlitejs.type === 'video' && this.poster) {
				this.poster.classList.remove('v-active')
			}
		}

		this.methodPlay()
		this.isPaused = false
		this.container.classList.replace('v-paused', 'v-playing')
		this.Vlitejs.type === 'video' && this.container.focus()

		if (this.playPauseButton) {
			this.playPauseButton.setAttribute('aria-label', 'Pause')
		}

		if (this.Vlitejs.type === 'video' && this.bigPlayButton) {
			this.bigPlayButton.setAttribute('aria-label', 'Pause')
		}
		this.afterPlayPause()

		this.dispatchEvent('play')
	}

	/**
	 * Pause the media element
	 */
	pause() {
		this.methodPause()
		this.isPaused = true
		this.container.classList.replace('v-playing', 'v-paused')

		if (this.playPauseButton) {
			this.playPauseButton.setAttribute('aria-label', 'Play')
		}

		if (this.Vlitejs.type === 'video' && this.bigPlayButton) {
			this.bigPlayButton.setAttribute('aria-label', 'Play')
		}
		this.afterPlayPause()

		this.dispatchEvent('pause')
	}

	/**
	 * Callback function after the play|pause
	 */
	afterPlayPause() {
		if (this.Vlitejs.autoHideGranted) {
			this.Vlitejs.stopAutoHideTimer()
			!this.isPaused && this.Vlitejs.startAutoHideTimer()
		}
	}

	/**
	 * Set player volume
	 * @param {Number} volume New volume
	 */
	setVolume(volume: number) {
		if (volume > 1) {
			volume = 1
		} else if (volume <= 0) {
			volume = 0
			this.isMuted = true
			if (this.volumeButton) {
				this.volumeButton.classList.add('v-pressed')
			}
		} else {
			this.isMuted = false
			if (this.volumeButton) {
				this.volumeButton.classList.remove('v-pressed')
			}
		}

		this.methodSetVolume(volume)
		this.dispatchEvent('volumechange')
	}

	/**
	 * Get player volume
	 * @returns {Promise<Number>} Player volume
	 */
	getVolume(): Promise<number> {
		return new window.Promise((resolve) => {
			this.methodGetVolume().then((volume: number) => {
				resolve(volume)
			})
		})
	}

	/**
	 * Mute the volume on the media element
	 */
	mute() {
		this.methodMute()
		this.isMuted = true

		if (this.volumeButton) {
			this.volumeButton.classList.add('v-pressed')
		}

		this.dispatchEvent('volumechange')
	}

	/**
	 * Unmute the volume on the media element
	 */
	unMute() {
		this.methodUnMute()
		this.isMuted = false

		if (this.volumeButton) {
			this.volumeButton.classList.remove('v-pressed')
		}

		this.dispatchEvent('volumechange')
	}

	/**
	 * Update the current time of the media element
	 * @param {Number} newTime New current time of the media element
	 */
	seekTo(newTime: number) {
		this.methodSeekTo(newTime)
	}

	/**
	 * Request the fullscreen
	 */
	requestFullscreen() {
		const { requestFn } = this.Vlitejs.supportFullScreen

		// @ts-ignore: Object is possibly 'null'.
		if (this.element[requestFn]) {
			// Request fullscreen on parentNode player, to display custom controls
			// @ts-ignore: Object is possibly 'null'.
			this.container[requestFn]()
			this.isFullScreen = true
			this.container.classList.add('v-fullscreenButton-display')

			if (this.fullscreenButton) {
				this.fullscreenButton.classList.add('v-pressed')
			}

			this.dispatchEvent('enterfullscreen')
		}
	}

	/**
	 * Exit the fullscreen
	 * @param {Object} options
	 * @param {Boolean} options.escKey The exit is trigger by the esk key
	 */
	exitFullscreen({ escKey = false }: { escKey?: Boolean } = {}) {
		const { cancelFn } = this.Vlitejs.supportFullScreen

		if (document[cancelFn]) {
			// @ts-ignore: Object is possibly 'null'.
			!escKey && document[cancelFn]()
			this.isFullScreen = false

			this.container.classList.remove('v-fullscreenButton-display')

			if (this.fullscreenButton) {
				this.fullscreenButton.classList.remove('v-pressed')
			}

			this.dispatchEvent('exitfullscreen')
		}
	}

	/**
	 * Destroy the player
	 * Remove event listeners, player instance and DOM
	 */
	destroy() {
		this.pause()
		this.options.controls && this.controlBar && this.controlBar.removeEvents()
		Object.keys(this.customEvents).forEach((type) => delete this.customEvents[type])
		this.container.remove()
	}
}

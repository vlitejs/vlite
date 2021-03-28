// Import SVG icons
import { formatVideoTime } from 'shared/utils/utils'
import { Options } from 'shared/assets/interfaces/interfaces'

/**
 * vlitejs Player
 * @module vlitejs/Player
 */
export default abstract class Player {
	abstract getDuration: Function
	abstract getCurrentTime: Function
	abstract setCurrentTime: Function
	abstract removeEvents: Function
	abstract removeInstance: Function
	abstract removeSpecificEvents: Function
	abstract methodPlay: Function
	abstract methodPause: Function
	abstract methodMute: Function
	abstract methodUnMute: Function

	element: HTMLAudioElement | HTMLVideoElement
	container: HTMLElement
	options: Options
	onCallbackReady: Function
	instanceParent: any
	progressBarIsMoving: Boolean
	isFullScreen: Boolean
	isPaused: null | Boolean
	delayAutoHide: number
	controlBar!: any

	/**
	 * Instanciate the constructor
	 * @constructor
	 * @param {Object} options
	 * @param {HTMLElement} options.element Player HTML element
	 * @param {HTMLElement} options.container Player HTML container
	 * @param {Function} options.onCallbackReady Player on ready function
	 * @param {Class} options.instanceParent vlitejs instance
	 * @param {Object} options Player options
	 */
	constructor({
		element,
		container,
		options,
		onCallbackReady,
		instanceParent
	}: {
		element: HTMLAudioElement | HTMLVideoElement
		container: HTMLElement
		options: Options
		onCallbackReady: Function
		instanceParent: any
	}) {
		this.element = element
		this.container = container as HTMLElement
		this.options = options
		this.onCallbackReady = onCallbackReady
		this.instanceParent = instanceParent

		this.progressBarIsMoving = false
		this.isFullScreen = false
		this.isPaused = null
		this.delayAutoHide = 3000
	}

	/**
	 * On the player is ready
	 */
	onPlayerReady() {
		this.onCallbackReady(this)

		// If player has autoplay option, play now
		if (this.options.autoplay) {
			// Autoplay on video is authorize only when the media element is muted
			!this.element.muted && this.mute()

			this.play()
		}
	}

	/**
	 * On duration change
	 */
	onDurationChange() {
		if (this.options.time) {
			this.getDuration().then((duration: number) => {
				// @ts-ignore: Object is possibly 'null'.
				this.container.querySelector('.v-duration').innerHTML = formatVideoTime(duration)
			})
		}
	}

	/**
	 * On video ended
	 */
	onVideoEnded() {
		this.container.classList.replace('v-playing', 'v-paused')
		this.container.classList.add('v-firstStart')

		if (this.options.poster) {
			// @ts-ignore: Object is possibly 'null'.
			this.container.querySelector('.v-poster').classList.add('v-active')
		}

		if (this.options.controls) {
			// @ts-ignore: Object is possibly 'null'.
			this.container.querySelector('.v-progressSeek').style.width = '0%'
			// @ts-ignore: Object is possibly 'null'.
			this.container.querySelector('.v-progressInput').setAttribute('value', 0)
			// @ts-ignore: Object is possibly 'null'.
			this.container.querySelector('.v-currentTime').innerHTML = '00:00'
		}
	}

	/**
	 * Play the media element
	 */
	play() {
		if (this.container.classList.contains('v-firstStart')) {
			this.container.classList.remove('v-firstStart')

			if (this.instanceParent.mode === 'video' && this.options.poster) {
				// @ts-ignore: Object is possibly 'null'.
				this.container.querySelector('.v-poster').classList.remove('v-active')
			}

			this.instanceParent.mode === 'video' && this.container.focus()
		}

		this.methodPlay()
		this.isPaused = false
		this.container.classList.replace('v-paused', 'v-playing')
		// @ts-ignore: Object is possibly 'null'.
		this.container.querySelector('.v-playPauseButton').setAttribute('aria-label', 'Pause')

		if (this.instanceParent.mode === 'video' && this.options.bigPlay) {
			// @ts-ignore: Object is possibly 'null'.
			this.container.querySelector('.v-bigPlay').setAttribute('aria-label', 'Pause')
		}
		this.afterPlayPause()
	}

	/**
	 * Pause the media element
	 */
	pause() {
		this.methodPause()
		this.isPaused = true
		this.container.classList.replace('v-playing', 'v-paused')
		// @ts-ignore: Object is possibly 'null'.
		this.container.querySelector('.v-playPauseButton').setAttribute('aria-label', 'Play')

		if (this.instanceParent.mode === 'video' && this.options.bigPlay) {
			// @ts-ignore: Object is possibly 'null'.
			this.container.querySelector('.v-bigPlay').setAttribute('aria-label', 'Play')
		}
		this.afterPlayPause()
	}

	/**
	 * Callback function after the play|pause
	 */
	afterPlayPause() {
		if (this.instanceParent.autoHideGranted) {
			this.instanceParent.stopAutoHideTimer()
			if (!this.isPaused) {
				this.instanceParent.startAutoHideTimer()
			}
		}
	}

	/**
	 * Mute the volume on the media element
	 */
	mute() {
		this.methodMute()
		// @ts-ignore: Object is possibly 'null'.
		this.container.querySelector('.v-volumeButton').classList.add('v-pressed')
	}

	/**
	 * Unmute the volume on the media element
	 */
	unMute() {
		this.methodUnMute()
		// @ts-ignore: Object is possibly 'null'.
		this.container.querySelector('.v-volumeButton').classList.remove('v-pressed')
	}

	/**
	 * Update the current time of the media element
	 * @param {Number} newTime New current time of the media element
	 */
	seekTo(newTime: number) {
		this.setCurrentTime(newTime)
	}

	/**
	 * Request the fullscreen
	 */
	requestFullscreen() {
		const { requestFn } = this.instanceParent.supportFullScreen

		// @ts-ignore: Object is possibly 'null'.
		if (this.element[requestFn]) {
			// Request fullscreen on parentNode player, to display custom controls
			// @ts-ignore: Object is possibly 'null'.
			this.container[requestFn]()
			this.isFullScreen = true
			this.container.classList.add('v-fullscreenButton-display')
			// @ts-ignore: Object is possibly 'null'.
			this.container.querySelector('.v-fullscreenButton').classList.add('v-pressed')
		}
	}

	/**
	 * Exit the fullscreen
	 * @param {Object} options
	 * @param {Boolean} options.escKey The exit is trigger by the esk key
	 */
	exitFullscreen({ escKey = false }: { escKey: Boolean }) {
		const { cancelFn } = this.instanceParent.supportFullScreen

		if (document[cancelFn]) {
			// @ts-ignore: Object is possibly 'null'.
			!escKey && document[cancelFn]()
			this.isFullScreen = false

			this.container.classList.remove('v-fullscreenButton-display')
			// @ts-ignore: Object is possibly 'null'.
			this.container.querySelector('.v-fullscreenButton').classList.remove('v-pressed')
		}
	}

	/**
	 * On time update
	 * Update current time displaying in the control bar
	 * Udpdate the progress bar
	 */
	onTimeUpdate() {
		if (this.options.time) {
			Promise.all([this.getCurrentTime(), this.getDuration()]).then(([seconds, duration]) => {
				const currentTime = Math.round(seconds)
				const width = (currentTime * 100) / duration
				const progressBar = this.container.querySelector('.v-progressBar') as HTMLInputElement

				if (!this.progressBarIsMoving && progressBar) {
					progressBar.value = `${width}`
				}
				progressBar.style.setProperty('--value', `${width}%`)

				// @ts-ignore: Object is possibly 'null'.
				this.container.querySelector('.v-currentTime').innerHTML = formatVideoTime(currentTime)
			})
		}
	}

	/**
	 * Destroy the player
	 * Remove event listeners, player instance and DOM
	 */
	destroy() {
		this.pause()
		this.removeEvents()
		this.options.controls && this.controlBar && this.controlBar.removeEvents()

		typeof this.removeSpecificEvents === 'function' && this.removeSpecificEvents()
		typeof this.removeInstance === 'function' && this.removeInstance()

		this.container.remove()
	}
}

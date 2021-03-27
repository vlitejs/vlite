// Import SVG icons
import { formatVideoTime } from 'shared/utils/utils'

/**
 * vlitejs Player
 * @module vlitejs/Player
 */
export default class Player {
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
	constructor({ element, container, options, onCallbackReady, instanceParent }) {
		this.element = element
		this.container = container
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

			this.instanceParent.togglePlayPause()
		}
	}

	/**
	 * On duration change
	 */
	onDurationChange() {
		if (this.options.time) {
			this.getDuration().then((duration) => {
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
			this.container.querySelector('.v-poster').classList.add('v-active')
		}

		if (this.options.controls) {
			this.container.querySelector('.v-progressSeek').style.width = '0%'
			this.container.querySelector('.v-progressInput').setAttribute('value', 0)
			this.container.querySelector('.v-currentTime').innerHTML = '00:00'
		}
	}

	/**
	 * Play the media element
	 */
	play() {
		if (this.container.classList.contains('v-firstStart')) {
			this.container.classList.remove('v-firstStart')

			if (this.mode === 'video' && this.options.poster) {
				this.container.querySelector('.v-poster').classList.remove('v-active')
			}
		}

		this.methodPlay()
		this.isPaused = false
		this.container.classList.replace('v-paused', 'v-playing')
		this.container.querySelector('.v-playPauseButton').setAttribute('aria-label', 'Pause')

		if (this.mode === 'video' && this.options.bigPlay) {
			this.container.querySelector('.v-bigPlay').setAttribute('aria-label', 'Pause')
		}
		this.afterPlayPause()
		this.container.focus()
	}

	/**
	 * Pause the media element
	 */
	pause() {
		this.methodPause()
		this.isPaused = true
		this.container.classList.replace('v-playing', 'v-paused')
		this.container.querySelector('.v-playPauseButton').setAttribute('aria-label', 'Play')

		if (this.mode === 'video' && this.options.bigPlay) {
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
		this.container.querySelector('.v-volumeButton').classList.add('v-pressed')
	}

	/**
	 * Unmute the volume on the media element
	 */
	unMute() {
		this.methodUnMute()
		this.container.querySelector('.v-volumeButton').classList.remove('v-pressed')
	}

	/**
	 * Update the current time of the media element
	 * @param {(Float|Integer)} newTime New current time of the media element
	 */
	seekTo(newTime) {
		this.setCurrentTime(newTime)
	}

	/**
	 * Request the fullscreen
	 */
	requestFullscreen() {
		const { requestFn } = this.instanceParent.supportFullScreen

		if (this.element[requestFn]) {
			// Request fullscreen on parentNode player, to display custom controls
			this.element.parentNode[requestFn]()
			this.isFullScreen = true
			this.container.classList.add('v-fullscreenButton-display')
			this.container.querySelector('.v-fullscreenButton').classList.add('v-pressed')
		}
	}

	/**
	 * Exit the fullscreen
	 */
	exitFullscreen() {
		const { cancelFn } = this.instanceParent.supportFullScreen

		if (document[cancelFn]) {
			document[cancelFn]()

			this.container.classList.remove('v-fullscreenButton-display')
			this.container.querySelector('.v-fullscreenButton').classList.remove('v-pressed')

			this.isFullScreen = false
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
				const progressBar = this.container.querySelector('.v-progressBar')

				if (!this.progressBarIsMoving) {
					progressBar.value = width
				}
				progressBar.style.setProperty('--value', `${width}%`)

				this.container.querySelector('.v-currentTime').innerHTML = formatVideoTime(currentTime)
			})
		}
	}

	/**
	 * Remove event listeners
	 */
	removeEvents() {
		this.container.removeEventListener('dblclick', this.onDoubleClickOnPlayer)
		this.container.removeEventListener('keyup', this.onKeyup)
		this.mode === 'video' && this.container.removeEventListener('mousemove', this.onMousemove)

		window.removeEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen)
	}

	/**
	 * Destroy the player
	 * Remove event listeners, player instance and DOM
	 */
	destroy() {
		this.pause()
		this.removeEvents()
		this.options.controls && this.controlBar.removeEvents()

		typeof this.removeSpecificEvents === 'function' && this.removeSpecificEvents()
		typeof this.removeInstance === 'function' && this.removeInstance()

		this.container.remove()
	}
}

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
	 * @param {HTMLElement} element Player HTML element
	 * @param {Object} options Player options
	 */
	constructor({ element, container, options, plugins = [], onReady, instanceParent }) {
		this.element = element
		this.container = container
		this.options = options
		this.plugins = plugins
		this.onReady = onReady
		this.instanceParent = instanceParent

		this.progressBarIsMoving = false
		this.isFullScreen = false
		this.isPaused = null
		this.delayAutoHide = 3000
	}

	/**
	 * Function executed when the player is ready
	 */
	onPlayerReady() {
		this.onReady(this)

		// If player has autoplay option, play now
		if (this.options.autoplay) {
			// Autoplay on video is authorize only when the video is muted
			!this.element.muted && this.mute()

			this.instanceParent.togglePlayPause()
		}
	}

	/**
	 * Update player duration
	 */
	onDurationChange() {
		if (this.options.time) {
			this.getDuration().then((duration) => {
				this.container.querySelector('.v-duration').innerHTML = formatVideoTime(duration)
			})
		}
	}

	/**
	 * Function executed when is video is ended
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
	 * Play the video
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
	 * Pause the video
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
	 * Function executed after the play or pause method
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
	 * Mute the volume on the video
	 */
	mute() {
		this.methodMute()
		this.container.querySelector('.v-volumeButton').classList.add('v-muted')
	}

	/**
	 * Toggle the volume on the video
	 */
	unMute() {
		this.methodUnMute()
		this.container.querySelector('.v-volumeButton').classList.remove('v-muted')
	}

	/**
	 * Update the current time of the video
	 * @param {Float|Integer} newTime New current time of the video
	 */
	seekTo(newTime) {
		this.setCurrentTime(newTime)
	}

	/**
	 * Request fullscreen after user action
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
	 * Exit fullscreen after user action
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
	 * Update current time displaying in the control bar and the width of the progress bar
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
	 * Unbind event listeners
	 */
	removeEvents() {
		this.container.removeEventListener('dblclick', this.onDoubleClickOnPlayer)
		this.container.removeEventListener('keyup', this.onKeyup)
		this.mode === 'video' && this.container.removeEventListener('mousemove', this.onMousemove)

		window.removeEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen)
	}

	/**
	 * Destroy the player
	 * Remove event listeners, player instance and player HTML
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

import Player from '../vlite/js/player'

/**
 * vlitejs Player HTML5
 * @module vlitejs/Player/PlayerHtml5
 */
export default class PlayerHtml5 extends Player {
	/**
	 * Instanciate the constructor
	 * @constructor
	 * @param {HTMLElement} element Player HTML element
	 * @param {Object} options Player options
	 * @param {Function} onReady Callback function executed when the player is ready
	 */
	constructor({ element, options, onReady }) {
		// Init Player class
		super({
			element,
			options,
			onReady
		})

		this.onPlayerReady = this.onPlayerReady.bind(this)
		this.updateDuration = this.updateDuration.bind(this)
		this.updateCurrentTime = this.updateCurrentTime.bind(this)
		this.onVideoEnded = this.onVideoEnded.bind(this)
		this.onPlaying = this.onPlaying.bind(this)
		this.onWaiting = this.onWaiting.bind(this)
		this.onSeeking = this.onSeeking.bind(this)
		this.onSeeked = this.onSeeked.bind(this)
	}

	init() {
		super.init()

		this.waitUntilVideoIsReady().then(this.onPlayerReady)

		!this.skinDisabled && this.addSpecificEvents()
	}

	/**
	 * Function executed when the player is ready
	 */
	onPlayerReady() {
		super.playerIsReady()
		this.updateDuration()
	}

	/**
	 * Wait until the video is ready
	 * @returns {Promise} Loading of the video with a Promise
	 */
	waitUntilVideoIsReady() {
		return new window.Promise((resolve, reject) => {
			// Check if the video is ready
			if (typeof this.element.duration === 'number' && isNaN(this.element.duration) === false) {
				resolve()
			} else {
				this.onDurationChange = () => {
					this.element.removeEventListener('durationchange', this.onDurationChange)
					this.element.removeEventListener('error', this.onError)

					resolve()
				}

				this.onError = (error) => {
					this.element.removeEventListener('error', this.onError)
					this.element.removeEventListener('durationchange', this.onDurationChange)

					reject(error)
				}

				// Listen error or durationchange events to detect when the video is ready
				this.element.addEventListener('durationchange', this.onDurationChange)
				this.element.addEventListener('error', this.onError)
			}
		})
	}

	/**
	 * Create event listeners
	 * All listeners are created on class properties to facilitate the deletion of events
	 */
	addSpecificEvents() {
		if (this.options.controls) {
			if (this.options.time) {
				// On durationchange event, update duration if value is different
				this.element.addEventListener('durationchange', this.updateDuration)
			}

			// On timeupdate event, update currentTime displaying in the control bar and the width of the progress bar
			this.element.addEventListener('timeupdate', this.updateCurrentTime)
		}

		// On ended event, show poster and reset progressBar and time
		this.element.addEventListener('ended', this.onVideoEnded)
		this.element.addEventListener('playing', this.onPlaying)
		this.element.addEventListener('waiting', this.onWaiting)
		this.element.addEventListener('seeking', this.onSeeking)
		this.element.addEventListener('seeked', this.onSeeked)
	}

	/**
	 * Get the player instance
	 * @returns {Object} Video element
	 */
	getInstance() {
		return this.element
	}

	/**
	 * Get the player current time
	 * @returns {Float|Integer} Current time of the video
	 */
	getCurrentTime() {
		return new window.Promise((resolve) => resolve(this.element.currentTime))
	}

	/**
	 * Set the new current time for the player
	 * @param {Float|Integer} Current time video
	 */
	setCurrentTime(newTime) {
		this.element.currentTime = newTime
	}

	/**
	 * Get the player duration
	 * @returns {Float|Integer} Duration of the video
	 */
	getDuration() {
		return new window.Promise((resolve) => resolve(this.element.duration))
	}

	/**
	 * Function executed on the video progress changed
	 * @param {Object} e Event listener datas
	 */
	onProgressChanged(e) {
		this.getDuration().then((duration) => {
			this.setCurrentTime((e.target.value * duration) / 100)
		})
	}

	/**
	 * Play method of the player
	 */
	methodPlay() {
		this.element.play()
	}

	/**
	 * Pause method of the player
	 */
	methodPause() {
		this.element.pause()
	}

	/**
	 * Mute method of the player
	 */
	methodMute() {
		this.element.muted = true
		this.element.setAttribute('muted', '')
	}

	/**
	 * Unmute method of the player
	 */
	methodUnMute() {
		this.element.muted = false
		this.element.removeAttribute('muted')
	}

	/**
	 * Function executed when the video is waiting
	 */
	onWaiting() {
		this.loading(true)
	}

	/**
	 * Function executed when the video is playing
	 */
	onPlaying() {
		this.loading(false)
	}

	/**
	 * Function executed when the video is seeking
	 */
	onSeeking() {
		this.loading(true)
	}

	/**
	 * Function executed when the video seek is done
	 */
	onSeeked() {
		this.loading(false)
	}

	/**
	 * Unbind event listeners
	 */
	removeSpecificEvents() {
		this.options.time && this.element.removeEventListener('durationchange', this.updateDuration)

		this.element.removeEventListener('timeupdate', this.updateCurrentTime)
		this.element.removeEventListener('playing', this.onPlaying)
		this.element.removeEventListener('waiting', this.onWaiting)
		this.element.removeEventListener('seeking', this.onSeeking)
		this.element.removeEventListener('seeked', this.onSeeked)
		this.element.removeEventListener('ended', this.onVideoEnded)
	}
}

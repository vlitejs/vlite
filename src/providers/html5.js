import Player from '../vlite/js/player'

/**
 * vlitejs Player HTML5
 * @module vlitejs/Player/PlayerHtml5
 */
export default class PlayerHtml5 extends Player {
	init() {
		this.waitUntilVideoIsReady().then(() => {
			this.onDurationChange()
			this.onPlayerReady()
		})
		this.addSpecificEvents()
	}

	/**
	 * Wait until the video is ready
	 * @returns {Promise} Loading of the video with a Promise
	 */
	waitUntilVideoIsReady() {
		return new window.Promise((resolve, reject) => {
			this.element.addEventListener('loadedmetadata', resolve, { once: true })
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
				this.element.addEventListener('durationchange', this.onDurationChange.bind(this))
			}

			// On timeupdate event, update currentTime displaying in the control bar and the width of the progress bar
			this.element.addEventListener('timeupdate', this.onTimeUpdate.bind(this))
		}

		// On ended event, show poster and reset progressBar and time
		this.element.addEventListener('ended', this.onVideoEnded.bind(this))
		this.element.addEventListener('playing', this.onPlaying.bind(this))
		this.element.addEventListener('waiting', this.onWaiting.bind(this))
		this.element.addEventListener('seeking', this.onSeeking.bind(this))
		this.element.addEventListener('seeked', this.onSeeked.bind(this))
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
		this.instanceParent.loading(true)
	}

	/**
	 * Function executed when the video is playing
	 */
	onPlaying() {
		this.instanceParent.loading(false)
	}

	/**
	 * Function executed when the video is seeking
	 */
	onSeeking() {
		this.instanceParent.loading(true)
	}

	/**
	 * Function executed when the video seek is done
	 */
	onSeeked() {
		this.instanceParent.loading(false)
	}

	/**
	 * Unbind event listeners
	 */
	removeSpecificEvents() {
		this.options.time && this.element.removeEventListener('durationchange', this.onDurationChange)

		this.element.removeEventListener('timeupdate', this.onTimeUpdate)
		this.element.removeEventListener('playing', this.onPlaying)
		this.element.removeEventListener('waiting', this.onWaiting)
		this.element.removeEventListener('seeking', this.onSeeking)
		this.element.removeEventListener('seeked', this.onSeeked)
		this.element.removeEventListener('ended', this.onVideoEnded)
	}
}

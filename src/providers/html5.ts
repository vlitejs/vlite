import Player from '../vlite/js/player'

/**
 * vlitejs Player HTML5
 * @module vlitejs/Player/PlayerHtml5
 */
export default class PlayerHtml5 extends Player {
	init() {
		this.waitUntilVideoIsReady().then(() => {
			super.onDurationChange()
			super.onPlayerReady()
			this.addSpecificEvents()
		})
	}

	/**
	 * Wait until the video is ready
	 * @returns {Promise<Event>} The video is ready
	 */
	waitUntilVideoIsReady(): Promise<Event> {
		return new window.Promise((resolve, reject) => {
			// TODO: use `loadedmetadata` on iOS
			this.element.addEventListener('canplay', resolve, { once: true })
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
				this.element.addEventListener('durationchange', super.onDurationChange.bind(this))
			}

			// On timeupdate event, update currentTime displaying in the control bar and the width of the progress bar
			this.element.addEventListener('timeupdate', super.onTimeUpdate.bind(this))
		}

		// On ended event, show poster and reset progressBar and time
		this.element.addEventListener('ended', super.onVideoEnded.bind(this))
		this.element.addEventListener('playing', this.onPlaying.bind(this))
		this.element.addEventListener('waiting', this.onWaiting.bind(this))
		this.element.addEventListener('seeking', this.onSeeking.bind(this))
		this.element.addEventListener('seeked', this.onSeeked.bind(this))
	}

	/**
	 * Get the player instance
	 * @returns {Object} Video element
	 */
	getInstance(): HTMLElement {
		return this.element
	}

	/**
	 * Get the player current time
	 * @returns {Promise<Number>} Current time of the video
	 */
	getCurrentTime(): Promise<number> {
		return new window.Promise((resolve) => resolve(this.element.currentTime))
	}

	/**
	 * Set the new current time for the player
	 * @param {Number} Current time video
	 */
	setCurrentTime(newTime: number) {
		this.element.currentTime = newTime
	}

	/**
	 * Get the player duration
	 * @returns {Promise<number>} Duration of the video
	 */
	getDuration(): Promise<number> {
		return new window.Promise((resolve) => resolve(this.element.duration))
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
		this.vliteInstance.loading(true)
	}

	/**
	 * Function executed when the video is playing
	 */
	onPlaying() {
		this.vliteInstance.loading(false)
	}

	/**
	 * Function executed when the video is seeking
	 */
	onSeeking() {
		this.vliteInstance.loading(true)
	}

	/**
	 * Function executed when the video seek is done
	 */
	onSeeked() {
		this.vliteInstance.loading(false)
	}

	/**
	 * Remove event listeners
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

	/**
	 * Remove the Vimeo player (instance, events)
	 */
	destroy() {
		this.removeSpecificEvents()
		super.destroy()
	}
}

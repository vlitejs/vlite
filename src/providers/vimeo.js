if (typeof vlitejs === 'undefined') {
	throw new TypeError('vlitejs :: The library is not available.')
}

let vimeoQueue = []

/**
 * vlitejs Player Vimeo
 * @module vlitejs/Player/PlayerVimeo
 */
class PlayerVimeo extends vlitejs.Player {
	init() {
		this.waitUntilVideoIsReady()
			.then(() => {
				this.addSpecificEvents()
				this.onPlayerReady()
			})
			.catch(() => vimeoQueue.push(this))
	}

	waitUntilVideoIsReady() {
		return new window.Promise((resolve, reject) => {
			if (typeof window.Vimeo !== 'undefined') {
				this.initVimeoPlayer().then(resolve)
			} else {
				reject()
			}
		})
	}

	/**
	 * Initialize the Vimeo player
	 */
	initVimeoPlayer() {
		return new window.Promise((resolve, reject) => {
			this.instancePlayer = new window.Vimeo.Player(this.element.getAttribute('id'), {
				id: this.element.getAttribute('data-vimeo-id'),
				controls: true
			})
			this.element = this.instancePlayer.element
			this.instancePlayer.ready().then(resolve)
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
				this.instancePlayer.on('durationchange', this.onDurationChange.bind(this))
			}

			// On timeupdate event, update currentTime displaying in the control bar and the width of the progress bar
			this.instancePlayer.on('timeupdate', this.onTimeUpdate.bind(this))
		}

		// On ended event, show poster and reset progressBar and time
		this.instancePlayer.on('ended', this.onVideoEnded.bind(this))
		this.instancePlayer.on('playing', this.onPlaying.bind(this))
		this.instancePlayer.on('waiting', this.onWaiting.bind(this))
		this.instancePlayer.on('seeking', this.onSeeking.bind(this))
		this.instancePlayer.on('seeked', this.onSeeked.bind(this))
	}

	/**
	 * Get the player instance
	 * @returns {Object} Vimeo API instance
	 */
	getInstance() {
		return this.instancePlayer
	}

	/**
	 * Get the player current time
	 * @returns {Float|Integer} Current time of the video
	 */
	getCurrentTime() {
		return new window.Promise((resolve) => {
			this.instancePlayer.getCurrentTime().then((seconds) => resolve(seconds))
		})
	}

	/**
	 * Set the new current time for the player
	 * @param {Float|Integer} Current time video
	 */
	setCurrentTime(newTime) {
		this.instancePlayer.setCurrentTime(newTime)
	}

	/**
	 * Get the player duration
	 * @returns {Float|Integer} Duration of the video
	 */
	getDuration() {
		return new window.Promise((resolve) => {
			this.instancePlayer.getDuration().then((duration) => resolve(duration))
		})
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
		this.instancePlayer.play()
	}

	/**
	 * Pause method of the player
	 */
	methodPause() {
		this.instancePlayer.pause()
	}

	/**
	 * Mute method of the player
	 */
	methodMute() {
		this.instancePlayer.setVolume(0)
	}

	/**
	 * Unmute method of the player
	 */
	methodUnMute() {
		this.instancePlayer.setVolume(1)
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
		this.options.time && this.instancePlayer.off('durationchange', this.onDurationChange)

		this.instancePlayer.off('timeupdate', this.onTimeUpdate)
		this.instancePlayer.off('playing', this.onPlaying)
		this.instancePlayer.off('waiting', this.onWaiting)
		this.instancePlayer.off('seeking', this.onSeeking)
		this.instancePlayer.off('seeked', this.onSeeked)
		this.instancePlayer.off('ended', this.onVideoEnded)
	}

	/**
	 * Remove the Vimeo instance
	 */
	removeInstance() {
		this.instancePlayer.destroy()
	}
}

if (typeof window.YT === 'undefined') {
	const script = document.createElement('script')
	script.async = true
	script.type = 'text/javascript'
	script.src = 'https://player.vimeo.com/api/player.js'
	script.onload = () => {
		vimeoQueue.forEach((itemClass) => {
			itemClass.initVimeoPlayer().then(() => {
				itemClass.addSpecificEvents()
				itemClass.onPlayerReady()
			})
		})
		vimeoQueue = []
	}

	document.getElementsByTagName('body')[0].appendChild(script)
}

export default PlayerVimeo

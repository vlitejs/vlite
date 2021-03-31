declare global {
	interface Window {
		vlitejs: {
			Player: any
		}
		Vimeo: {
			Player: any
		}
	}
}

if (typeof window.vlitejs === 'undefined') {
	throw new Error('vlitejs :: The library "vlitejs" is not available.')
}

const providerObjectName = 'Vimeo'
let vimeoQueue: Array<any> = []

/**
 * vlitejs Player Vimeo
 * @module vlitejs/Player/PlayerVimeo
 */
class PlayerVimeo extends window.vlitejs.Player {
	instancePlayer: any

	/**
	 * Initialize the player when the API is ready
	 * @returns {Promise<any>}
	 */
	init(): Promise<any> {
		return this.waitUntilVideoIsReady()
			.then(() => {
				this.addSpecificEvents()
				super.onPlayerReady()

				// Return the player instance to vlitejs
				// The context is exposed into the onReady callback function
				return this
			})
			.catch(() => vimeoQueue.push(this))
	}

	/**
	 * Wait until the API is ready
	 * @returns {Promise} The player is ready
	 */
	waitUntilVideoIsReady(): Promise<void> {
		return new window.Promise((resolve, reject) => {
			// Initialize the player if the API is already available or reject
			if (typeof window[providerObjectName] !== 'undefined') {
				this.initVimeoPlayer().then(resolve)
			} else {
				reject()
			}
		})
	}

	/**
	 * Initialize the player
	 */
	initVimeoPlayer(): Promise<void> {
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
	getInstance(): any {
		return this.instancePlayer
	}

	/**
	 * Get the player current time
	 * @returns {Promise<Number>} Current time of the video
	 */
	getCurrentTime(): Promise<number> {
		return new window.Promise((resolve) => {
			this.instancePlayer.getCurrentTime().then((seconds: number) => resolve(seconds))
		})
	}

	/**
	 * Set the new current time for the player
	 * @param {Number} Current time video
	 */
	setCurrentTime(newTime: number) {
		this.instancePlayer.setCurrentTime(newTime)
	}

	/**
	 * Get the player duration
	 * @returns {Promise<Number>} Duration of the video
	 */
	getDuration(): Promise<number> {
		return new window.Promise((resolve) => {
			this.instancePlayer.getDuration().then((duration: number) => resolve(duration))
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
		this.options.time && this.instancePlayer.off('durationchange', this.onDurationChange)
		this.instancePlayer.off('timeupdate', this.onTimeUpdate)
		this.instancePlayer.off('playing', this.onPlaying)
		this.instancePlayer.off('waiting', this.onWaiting)
		this.instancePlayer.off('seeking', this.onSeeking)
		this.instancePlayer.off('seeked', this.onSeeked)
		this.instancePlayer.off('ended', this.onVideoEnded)
	}

	/**
	 * Remove the Vimeo player (instance, events)
	 */
	destroy() {
		this.removeSpecificEvents()
		this.instancePlayer.destroy()
		super.destroy()
	}
}

// Load the player API if it is not available
if (typeof window[providerObjectName] === 'undefined') {
	const script = document.createElement('script')
	script.async = true
	script.type = 'text/javascript'
	script.src = 'https://player.vimeo.com/api/player.js'
	script.onload = () => {
		// Run the queue when the provider API is ready
		vimeoQueue.forEach((itemClass: any) => {
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

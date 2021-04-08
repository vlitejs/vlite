if (typeof window.Vlitejs === 'undefined') {
	throw new Error('vlitejs :: The library is not available.')
}

let providerQueue = []
const providerObjectName = 'Sample'

/**
 * vlitejs Sample provider
 * @module vlitejs/Player/SampleProvider
 */
class SampleProvider extends window.Vlitejs.Player {
	/**
	 * Initialize the player when the API is ready
	 */
	init() {
		this.waitUntilVideoIsReady().then(super.onPlayerReady.bind(this))
	}

	/**
	 * Wait until the API is ready
	 * @returns {Promise} The player is ready
	 */
	waitUntilVideoIsReady() {
		return new window.Promise((resolve, reject) => {
			// Initialize the player if the API is already available or reject
			if (typeof window[providerObjectName] !== 'undefined') {
				this.initPlayer().then(resolve)
			} else {
				// Push the instance to the queue to initialize it later
				providerQueue.push(this)
			}
		})
	}

	/**
	 * Initialize the player with the provider API/SDK
	 * The promise is resolved when the player is instanciated and ready
	 * @returns {Promise} The player is instanciated
	 */
	initPlayer() {
		return new window.Promise((resolve, reject) => {
			// Initialize the Player with the API
			// Resolve the promise when the player is ready
			// this.instance =
			// resolve()
		})
	}

	/**
	 * Get the player instance
	 * @returns {Object} Player API instance
	 */
	getInstance() {
		return this.instance
	}

	/**
	 * Get the player current time
	 * @returns {Promise<number>} Current time of the video
	 */
	getCurrentTime() {
		return new window.Promise((resolve) => resolve(this.instance.getCurrentTime()))
	}

	/**
	 * Get the player duration
	 * @returns {Promise<number>} Duration of the video
	 */
	getDuration() {
		return new window.Promise((resolve) => resolve(this.instance.getDuration()))
	}

	/**
	 * Play method of the player
	 */
	methodPlay() {
		this.instance.playVideo()
	}

	/**
	 * Pause method of the player
	 */
	methodPause() {
		this.instance.pauseVideo()
	}

	/**
	 * Mute method of the player
	 */
	methodMute() {
		this.instance.mute()
	}

	/**
	 * Unmute method of the player
	 */
	methodUnMute() {
		this.instance.unMute()
	}

	/**
	 * Set the new current time for the player
	 * @param {Number} Current time video
	 */
	methodSeekTo(newTime: number) {
		this.instance.seekTo(newTime)
	}

	/**
	 * Remove the player instance
	 */
	removeInstance() {
		this.instance.destroy()
	}
}

// Load the player API/SDK if it is not available
if (typeof window[providerObjectName] === 'undefined') {
	const script = document.createElement('script')
	script.async = true
	script.type = 'text/javascript'
	script.src = 'PROVIDER_API_URL'
	script.onload = () => {
		// Run the queue when the provider API is ready
		providerQueue.forEach((itemClass) => {
			itemClass.initPlayer().then(() => itemClass.onPlayerReady())
		})
		providerQueue = []
	}
	document.getElementsByTagName('body')[0].appendChild(script)
}

export default SampleProvider
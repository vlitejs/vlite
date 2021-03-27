if (typeof vlitejs === 'undefined') {
	throw new Error('vlitejs :: The library is not available.')
}

let sampleQueue = []
const providerObjectName = 'sample'

/**
 * vlitejs Sample provider
 * @module vlitejs/Player/SampleProvider
 */
class SampleProvider extends vlitejs.Player {
	/**
	 * Initialize the player when the API is ready
	 */
	init() {
		this.waitUntilVideoIsReady()
			.then(() => this.onPlayerReady())
			.catch(() => sampleQueue.push(this))
	}

	/**
	 * Wait until the API is ready
	 * @returns {Promise} The player is ready
	 */
	waitUntilVideoIsReady() {
		return new window.Promise((resolve, reject) => {
			// Initialize the player if the API is already available or reject
			if (typeof window[providerObjectName] !== 'undefined') {
				this.initSamplePlayer().then(resolve)
			} else {
				reject()
			}
		})
	}

	/**
	 * Initialize the player
	 */
	initSamplePlayer() {
		return new window.Promise((resolve, reject) => {
			// Initialize the Player with the API
			// Resolve the promise when the player is ready
			// this.instancePlayer =
		})
	}

	/**
	 * Get the player instance
	 * @returns {Object} Youtube API instance
	 */
	getInstance() {
		return this.instancePlayer
	}

	/**
	 * Set the new current time for the player
	 * @param {(Float|Integer)} Current time video
	 */
	setCurrentTime(newTime) {
		this.instancePlayer.seekTo(newTime)
	}

	/**
	 * Get the player current time
	 * @returns {(Float|Integer)} Current time of the video
	 */
	getCurrentTime() {
		return new window.Promise((resolve) => resolve(this.instancePlayer.getCurrentTime()))
	}

	/**
	 * Get the player duration
	 * @returns {(Float|Integer)} Duration of the video
	 */
	getDuration() {
		return new window.Promise((resolve) => resolve(this.instancePlayer.getDuration()))
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
		this.instancePlayer.playVideo()
	}

	/**
	 * Pause method of the player
	 */
	methodPause() {
		this.instancePlayer.pauseVideo()
	}

	/**
	 * Mute method of the player
	 */
	methodMute() {
		this.instancePlayer.mute()
	}

	/**
	 * Unmute method of the player
	 */
	methodUnMute() {
		this.instancePlayer.unMute()
	}

	/**
	 * Remove the Youtube instance
	 */
	removeInstance() {
		this.instancePlayer.destroy()
	}
}

// Load the player API if it is not available
if (typeof window[providerObjectName] === 'undefined') {
	const script = document.createElement('script')
	script.async = true
	script.type = 'text/javascript'
	script.src = 'PROVIDER_API_URL'
	script.onload = () => {
		// Run the queue when the provider API is ready
		sampleQueue.forEach((itemClass) => {
			itemClass.initSamplePlayer().then(() => itemClass.onPlayerReady())
		})
		sampleQueue = []
	}
	document.getElementsByTagName('body')[0].appendChild(script)
}

export default SampleProvider

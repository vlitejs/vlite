declare global {
	interface Window {
		vlitejs: {
			Player: any
		}
		Sample: {
			Player: any
		}
	}
}

if (typeof window.vlitejs === 'undefined') {
	throw new Error('vlitejs :: The library is not available.')
}

let sampleQueue: Array<any> = []
const providerObjectName = 'Sample'

/**
 * vlitejs Sample provider
 * @module vlitejs/Player/SampleProvider
 */
class SampleProvider extends window.vlitejs.Player {
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
	waitUntilVideoIsReady(): Promise<void> {
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
	initSamplePlayer(): Promise<void> {
		return new window.Promise((resolve, reject) => {
			// Initialize the Player with the API
			// Resolve the promise when the player is ready
			// this.instancePlayer =
			// resolve()
		})
	}

	/**
	 * Get the player instance
	 * @returns {Object} Youtube API instance
	 */
	getInstance(): any {
		return this.instancePlayer
	}

	/**
	 * Set the new current time for the player
	 * @param {Number} Current time video
	 */
	setCurrentTime(newTime: number) {
		this.instancePlayer.seekTo(newTime)
	}

	/**
	 * Get the player current time
	 * @returns {Promise<number>} Current time of the video
	 */
	getCurrentTime(): Promise<number> {
		return new window.Promise((resolve) => resolve(this.instancePlayer.getCurrentTime()))
	}

	/**
	 * Get the player duration
	 * @returns {Promise<number>} Duration of the video
	 */
	getDuration(): Promise<number> {
		return new window.Promise((resolve) => resolve(this.instancePlayer.getDuration()))
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
		sampleQueue.forEach((itemClass: any) => {
			itemClass.initSamplePlayer().then(() => itemClass.onPlayerReady())
		})
		sampleQueue = []
	}
	document.getElementsByTagName('body')[0].appendChild(script)
}

export default SampleProvider

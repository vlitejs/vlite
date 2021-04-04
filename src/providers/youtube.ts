declare global {
	interface Window {
		vlitejs: {
			Player: any
		}
		YT: {
			Player: any
			PlayerState: {
				BUFFERING: Number
				ENDED: Number
				PLAYING: Number
				PAUSED: Number
				UNSTARTED: Number
			}
		}
		onYouTubeIframeAPIReady: Function
	}
}

if (typeof window.vlitejs === 'undefined') {
	throw new Error('vlitejs :: The library is not available.')
}

const providerObjectName = 'YT'
let youtubeQueue: Array<any> = []

/**
 * vlitejs Player Youtube
 * @module vlitejs/Player/PlayerYoutube
 */
class PlayerYoutube extends window.vlitejs.Player {
	/**
	 * Initialize the player when the API is ready
	 */
	init() {
		this.waitUntilVideoIsReady().then(() => {
			super.onPlayerReady()
		})
	}

	/**
	 * Wait until the API is ready
	 * @returns {Promise} The player is ready
	 */
	waitUntilVideoIsReady(): Promise<void> {
		return new window.Promise((resolve, reject) => {
			// Initialize the player if the API is already available
			if (typeof window[providerObjectName] !== 'undefined') {
				this.initYoutubePlayer().then(resolve)
			} else {
				youtubeQueue.push(this)
			}
		})
	}

	/**
	 * Initialize the player
	 */
	initYoutubePlayer(): Promise<void> {
		return new window.Promise((resolve, reject) => {
			this.instancePlayer = new window.YT.Player(this.element.getAttribute('id'), {
				videoId: this.element.getAttribute('data-youtube-id'),
				height: '100%',
				width: '100%',
				playerVars: {
					showinfo: 0,
					modestbranding: 0,
					autohide: 1,
					rel: 0,
					fs: this.options.fullscreen ? 1 : 0,
					wmode: 'transparent',
					playsinline: this.options.playsinline ? 1 : 0,
					controls: 0
				},
				events: {
					onReady: (data: any) => {
						this.element = data.target.getIframe()
						resolve()
					},
					onStateChange: (e: Event) => this.onPlayerStateChange(e)
				}
			})
		})
	}

	/**
	 * Function executed when the player state changed
	 * @param {Object} e Event listener datas
	 */
	onPlayerStateChange(e: any) {
		switch (e.data) {
			case window.YT.PlayerState.ENDED:
				super.onVideoEnded()
				break

			case window.YT.PlayerState.PLAYING:
				super.loading(false)

				if (this.options.controls) {
					setInterval(() => {
						super.onTimeUpdate()
					}, 100)
				}
				break

			case window.YT.PlayerState.BUFFERING:
				super.loading(true)
				break
		}
	}

	/**
	 * Get the player instance
	 * @returns {Object} Youtube API instance
	 */
	getInstance(): any {
		return this.instancePlayer
	}

	/**
	 * Get the player current time
	 * @returns {Promise<number>} Current time of the video
	 */
	getCurrentTime(): Promise<number> {
		return new window.Promise((resolve) => resolve(this.instancePlayer.getCurrentTime()))
	}

	/**
	 * Set the new current time for the player
	 * @param {Number} Current time video
	 */
	setCurrentTime(newTime: number) {
		this.instancePlayer.seekTo(newTime)
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
	 * Set volume method of the player
	 * @param {Number} volume New volume
	 */
	methodSetVolume(volume: number) {
		this.instancePlayer.setVolume(volume * 100)
	}

	/**
	 * Get volume method of the player
	 * @returns {Promise<Number>} Player volume
	 */
	methodGetVolume(): Promise<number> {
		return new window.Promise((resolve) => resolve(this.instancePlayer.getVolume() / 100))
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
	 * Remove the Youtube player (instance)
	 */
	destroy() {
		this.instancePlayer.destroy()
		super.destroy()
	}
}

// Load the player API if it is not available
if (typeof window[providerObjectName] === 'undefined') {
	const script = document.createElement('script')
	script.async = true
	script.type = 'text/javascript'
	script.src = 'https://youtube.com/iframe_api'

	// Run the queue when the provider API is ready
	window.onYouTubeIframeAPIReady = () => {
		youtubeQueue.forEach((itemClass: any) => {
			itemClass.initYoutubePlayer().then(() => {
				itemClass.onPlayerReady()
			})
		})
		youtubeQueue = []
	}
	document.getElementsByTagName('body')[0].appendChild(script)
}

export default PlayerYoutube
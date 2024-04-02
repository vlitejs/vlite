import { playerParameters } from 'shared/assets/types/types.js'

declare global {
	interface Window {
		Vlitejs: {
			Player: any
		}
		VlitejsYoutubeQueue: any[]
		YT: {
			Player: any
			PlayerState: {
				BUFFERING: number
				ENDED: number
				PLAYING: number
				PAUSED: number
				UNSTARTED: number
			}
		}
		onYouTubeIframeAPIReady: () => void
	}
}

/**
 * The provider function returns the provider Class which is extended from vLitejs Player
 * @param Player
 * @returns Provider class extended from vLitejs Player
 */
export default function YoutubeProvider(Player: any) {
	const providerObjectName = 'YT'
	window.VlitejsYoutubeQueue = window.VlitejsYoutubeQueue || []

	// Load the player API if it is not available
	if (typeof window[providerObjectName] === 'undefined') {
		const script = document.createElement('script')
		script.async = true
		script.type = 'text/javascript'
		script.src = 'https://youtube.com/iframe_api'

		// Run the queue when the provider API is ready
		window.onYouTubeIframeAPIReady = () => {
			window.VlitejsYoutubeQueue.forEach((itemClass: any) => {
				itemClass.initYoutubePlayer().then(() => {
					itemClass.onReady()
				})
			})
			window.VlitejsYoutubeQueue = []
		}
		document.getElementsByTagName('body')[0].appendChild(script)
	}

	/**
	 * vlitejs Player Youtube
	 * @module vlitejs/Player/PlayerYoutube
	 */
	return class PlayerYoutube extends Player {
		params: object
		instance: any

		constructor(props: playerParameters) {
			super(props)
			const DEFAULT_PARAMS = {
				autohide: 1,
				controls: 0,
				fs: this.options.fullscreen ? 1 : 0,
				modestbranding: 0,
				playsinline: this.options.playsinline ? 1 : 0,
				rel: 0,
				showinfo: 0,
				wmode: 'transparent'
			}
			this.params = { ...DEFAULT_PARAMS, ...this.options.providerParams }
		}

		/**
		 * Initialize the player when the API is ready
		 */
		init() {
			this.waitUntilVideoIsReady().then(() => {
				super.onReady()
			})
		}

		/**
		 * Wait until the API is ready
		 * @returns The player is ready
		 */
		waitUntilVideoIsReady(): Promise<void> {
			return new window.Promise((resolve) => {
				// Initialize the player if the API is already available
				if (typeof window[providerObjectName] !== 'undefined') {
					this.initYoutubePlayer().then(resolve)
				} else {
					window.VlitejsYoutubeQueue.push(this)
				}
			})
		}

		/**
		 * Initialize the player
		 */
		initYoutubePlayer(): Promise<void> {
			return new window.Promise((resolve) => {
				this.instance = new window.YT.Player(this.media.getAttribute('id'), {
					videoId: this.media.getAttribute('data-youtube-id'),
					height: '100%',
					width: '100%',
					playerVars: this.params,
					origin: window.location.origin,
					events: {
						onReady: (data: any) => {
							this.media = data.target.getIframe()
							resolve()
						},
						onStateChange: (e: Event) => this.onPlayerStateChange(e)
					}
				})
			})
		}

		/**
		 * Function executed when the player state changed
		 * @param e Event listener datas
		 */
		onPlayerStateChange(e: any) {
			this.rafPlaying && window.cancelAnimationFrame(this.rafPlaying)

			switch (e.data) {
				case window.YT.PlayerState.ENDED:
					super.onMediaEnded()
					break

				case window.YT.PlayerState.PLAYING:
					super.loading(false)
					this.options.controls &&
						window.requestAnimationFrame(this.onRafPlaying.bind(this))
					break

				case window.YT.PlayerState.BUFFERING:
					super.loading(true)
					break
			}
		}

		/**
		 * On request animation frame while the video is playing
		 */
		onRafPlaying() {
			super.onTimeUpdate()

			// Re-trigger the RAF only if the video is playing
			if (!this.isPaused) {
				this.rafTimeout = setTimeout(() => {
					this.rafPlaying = window.requestAnimationFrame(this.onRafPlaying.bind(this))
				}, 100)
			}
		}

		/**
		 * Get the player instance
		 * @returns Youtube API instance
		 */
		getInstance(): unknown {
			return this.instance
		}

		/**
		 * Get the player current time
		 * @returns Current time of the video
		 */
		getCurrentTime(): Promise<number> {
			return new window.Promise((resolve) => resolve(this.instance.getCurrentTime()))
		}

		/**
		 * Get the player duration
		 * @returns Duration of the video
		 */
		getDuration(): Promise<number> {
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
		 * Set volume method of the player
		 * @param volume New volume
		 */
		methodSetVolume(volume: number) {
			this.instance.setVolume(volume * 100)
		}

		/**
		 * Get volume method of the player
		 * @returns Player volume
		 */
		methodGetVolume(): Promise<number> {
			return new window.Promise((resolve) => resolve(this.instance.getVolume() / 100))
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
		 * @param Current time video
		 */
		methodSeekTo(newTime: number) {
			// Youtube triggers the play when the video is not yet started
			// Video should be muted according to autoplay policy
			if (this.isPaused === null && !this.options.muted) {
				this.mute()
				this.play()
			}

			this.instance.seekTo(newTime)

			// The function can be trigger by the tabulation and Youtube does not have the "timeupdate" event
			// Trigger the "timeupdate" to update the progress bar
			super.onTimeUpdate()
		}

		/**
		 * Remove the Youtube player (instance, timer)
		 */
		destroy() {
			clearTimeout(this.rafTimeout)
			this.instance.destroy()
			super.destroy()
		}
	}
}

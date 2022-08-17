import { playerParameters, configEvent } from 'shared/assets/interfaces/interfaces'

declare global {
	interface Window {
		Vlitejs: {
			Player: any
		}
		VlitejsYoukuQueue: Array<any>
		YKU: {
			Player: any
		}
	}
}
interface interfaceProvidersOptions {
	clientId: string
}

/**
 * The provider function returns the provider Class which is extended from vLitejs Player
 * @param {Class} Player
 * @returns {Class} Provider class extended from vLitejs Player
 */
export default function YoukuProvider(Player: any, options: interfaceProvidersOptions) {
	const providerObjectName = 'YKU'
	window.VlitejsYoukuQueue = window.VlitejsYoukuQueue || []

	// Load the player API if it is not available
	if (typeof window[providerObjectName] === 'undefined') {
		const script = document.createElement('script')
		script.async = true
		script.type = 'text/javascript'
		script.src = '//player.youku.com/jsapi'

		script.onload = () => {
			// Run the queue when the provider API is ready
			window.VlitejsYoukuQueue.forEach((itemClass: any) => {
				itemClass.initYoukuPlayer().then(() => {
					// itemClass.addSpecificEvents()
					itemClass.onReady()
				})
			})
			window.VlitejsYoukuQueue = []
		}
		document.getElementsByTagName('body')[0].appendChild(script)
	}

	/**
	 * vlitejs Player Youku
	 * @module vlitejs/Player/PlayerYouku
	 */
	return class PlayerYouku extends Player {
		params: object
		instance: any

		constructor(props: playerParameters) {
			super(props)
			const DEFAULT_PARAMS = {
				controls: false
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
		 * @returns {Promise} The player is ready
		 */
		waitUntilVideoIsReady(): Promise<void> {
			return new window.Promise((resolve) => {
				// Initialize the player if the API is already available
				if (typeof window[providerObjectName] !== 'undefined') {
					this.initYoukuPlayer().then(resolve)
				} else {
					window.VlitejsYoukuQueue.push(this)
				}
			})
		}

		/**
		 * Initialize the player
		 */
		initYoukuPlayer(): Promise<void> {
			return new window.Promise((resolve) => {
				this.instance = new window.YKU.Player(this.media.getAttribute('id'), {
					client_id: options.clientId,
					vid: this.media.getAttribute('data-youku-id'),
					id: this.media.getAttribute('id'),
					width: '100%',
					height: '100%',
					autoplay: this.options.autoplay,
					show_related: false,
					styleid: '0',
					loop: this.options.loop,
					newPlayer: true,
					events: {
						onPlayerReady: () => {
							this.media = this.media.firstElementChild
							resolve()
						},
						onPlayStart: () => {
							this.rafPlaying && window.cancelAnimationFrame(this.rafPlaying)

							window.requestAnimationFrame(this.onRafPlaying.bind(this))
						},
						onPlayEnd: () => {
							super.onMediaEnded()
						}
					}
				})

				console.log(this.instance)
			})
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
		 * @returns {Object} Youku API instance
		 */
		getInstance(): any {
			return this.instance
		}

		/**
		 * Get the player current time
		 * @returns {Promise<number>} Current time of the video
		 */
		getCurrentTime(): Promise<number> {
			return new window.Promise((resolve) => resolve(this.instance.getCurrentTime()))
		}

		/**
		 * Get the player duration
		 * @returns {Promise<number>} Duration of the video
		 */
		getDuration(): Promise<number> {
			return new window.Promise((resolve) => resolve(this.instance.totalTime()))
			// return new window.Promise((resolve) => resolve(2000))
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
		 * @param {Number} volume New volume
		 */
		methodSetVolume(volume: number) {
			this.instance.setVolume(volume * 100)
		}

		/**
		 * Get volume method of the player
		 * @returns {Promise<Number>} Player volume
		 */
		methodGetVolume(): Promise<number> {
			return this.instance
		}

		/**
		 * Mute method of the player
		 */
		methodMute() {}

		/**
		 * Unmute method of the player
		 */
		methodUnMute() {}

		/**
		 * Set the new current time for the player
		 * @param {Number} Current time video
		 */
		methodSeekTo(newTime: number) {
			this.instance.seekTo(newTime)
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
		 * Remove the Youku player (instance, events)
		 */
		destroy() {
			this.removeSpecificEvents()
			this.instance.destroy()
			super.destroy()
		}
	}
}

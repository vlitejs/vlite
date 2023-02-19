import { playerParameters, configEvent } from 'shared/assets/interfaces/interfaces'

declare global {
	interface Window {
		Vlitejs: {
			Player: any
		}
		VlitejsDailymotionQueue: Array<any>
		dailymotion: {
			createPlayer: (selectorId: string, options: { video: string }) => Promise<void>
		}
	}
}
interface interfaceProvidersOptions {
	playerId: string
}
interface interfacePlayerState {
	playerVolume: number
	videoTime: number
	videoDuration: number
}

/**
 * The provider function returns the provider Class which is extended from vLitejs Player
 * @param {Class} Player
 * @returns {Class} Provider class extended from vLitejs Player
 */
export default function DailymotionProvider(Player: any, options: interfaceProvidersOptions) {
	const providerObjectName = 'dailymotion'
	window.VlitejsDailymotionQueue = window.VlitejsDailymotionQueue || []

	// Load the player API if it is not available
	if (typeof window[providerObjectName] === 'undefined') {
		const script = document.createElement('script')
		script.async = true
		script.type = 'text/javascript'
		script.src = `https://geo.dailymotion.com/libs/player/${options.playerId}.js`

		script.onload = () => {
			// Run the queue when the provider API is ready
			window.VlitejsDailymotionQueue.forEach((itemClass: any) => {
				itemClass.initDailymotionPlayer().then(() => {
					itemClass.addSpecificEvents()
					itemClass.onReady()
				})
			})
			window.VlitejsDailymotionQueue = []
		}
		document.getElementsByTagName('body')[0].appendChild(script)
	}

	/**
	 * vlitejs Player Dailymotion
	 * @module vlitejs/Player/PlayerDailymotion
	 */
	return class PlayerDailymotion extends Player {
		params: object
		events: Array<configEvent>
		instance: any

		constructor(props: playerParameters) {
			super(props)
			const DEFAULT_PARAMS = {
				controls: false
			}
			this.params = { ...DEFAULT_PARAMS, ...this.options.providerParams }
			this.events = [
				{ type: 'timeupdate', listener: super.onTimeUpdate },
				{ type: 'end', listener: super.onMediaEnded },
				{ type: 'playing', listener: this.onPlaying },
				{ type: 'waiting', listener: this.onWaiting }
			]
		}

		/**
		 * Initialize the player when the API is ready
		 */
		init() {
			this.waitUntilVideoIsReady().then(() => {
				this.addSpecificEvents()
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
					this.initDailymotionPlayer().then(resolve)
				} else {
					window.VlitejsDailymotionQueue.push(this)
				}
			})
		}

		/**
		 * Initialize the player
		 */
		initDailymotionPlayer(): Promise<void> {
			return new window.Promise((resolve) => {
				window.dailymotion
					.createPlayer(this.media.getAttribute('id'), {
						video: this.media.getAttribute('data-dailymotion-id')
					})
					.then((player: any) => {
						this.instance = player
						this.media = player.getRootNode()

						// Player autoplay sync from Dailymotion player settings
						const { autostart } = this.instance.getSettings()
						if (['on', 'firstTimeViewable'].includes(autostart)) {
							this.options.autoplay = true
						}

						// Dailymotion does not maintain the main CSS class and has inline styles that conflict with ours
						this.media.classList.add('vlite-js')
						this.media.removeAttribute('style')

						resolve()
					})
			})
		}

		/**
		 * Create event listeners
		 * All listeners are created on class properties to facilitate the deletion of events
		 */
		addSpecificEvents() {
			this.events.forEach((event) => {
				this.instance.on(event.type, event.listener.bind(this))
			})
		}

		/**
		 * Get the player instance
		 * @returns {Object} Dailymotion API instance
		 */
		getInstance(): any {
			return this.instance
		}

		/**
		 * Get the player current time
		 * @returns {Promise<number>} Current time of the video
		 */
		getCurrentTime(): Promise<number> {
			return this.instance.getState().then((state: interfacePlayerState) => {
				return state.videoTime
			})
		}

		/**
		 * Get the player duration
		 * @returns {Promise<number>} Duration of the video
		 */
		getDuration(): Promise<number> {
			return this.instance.getState().then((state: interfacePlayerState) => {
				return state.videoDuration
			})
		}

		/**
		 * Play method of the player
		 */
		methodPlay() {
			this.instance.play()
		}

		/**
		 * Pause method of the player
		 */
		methodPause() {
			this.instance.pause()
		}

		/**
		 * Set volume method of the player
		 * @param {Number} volume New volume
		 */
		methodSetVolume(volume: number) {
			this.instance.setVolume(volume)
		}

		/**
		 * Get volume method of the player
		 * @returns {Promise<Number>} Player volume
		 */
		methodGetVolume(): Promise<number> {
			return this.instance.getState().then((state: interfacePlayerState) => {
				return state.playerVolume
			})
		}

		/**
		 * Mute method of the player
		 */
		methodMute() {
			this.instance.setMute(true)
		}

		/**
		 * Unmute method of the player
		 */
		methodUnMute() {
			this.instance.setMute(false)
		}

		/**
		 * Set the new current time for the player
		 * @param {Number} Current time video
		 */
		methodSeekTo(newTime: number) {
			this.instance.seek(newTime)
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
		 * Remove event listeners
		 */
		removeSpecificEvents() {
			this.events.forEach((event) => {
				this.instance.off(event.type, event.listener)
			})
		}

		/**
		 * Remove the Dailymotion player (instance, events)
		 */
		destroy() {
			this.removeSpecificEvents()
			this.instance.destroy()
			super.destroy()
		}
	}
}

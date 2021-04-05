import { playerParameters } from 'shared/assets/interfaces/interfaces'

declare global {
	interface Window {
		Vlitejs: {
			Player: any
		}
		Vimeo: {
			Player: any
		}
	}
}

interface configEvent {
	type: string
	listener: EventListener
}

if (typeof window.Vlitejs === 'undefined') {
	throw new Error('vlitejs :: The library "vlitejs" is not available.')
}

const providerObjectName = 'Vimeo'
let vimeoQueue: Array<any> = []

/**
 * vlitejs Player Vimeo
 * @module vlitejs/Player/PlayerVimeo
 */
class PlayerVimeo extends window.Vlitejs.Player {
	instancePlayer: any
	events: Array<configEvent>

	constructor({ ...args }: playerParameters) {
		super({ ...args })
		this.events = [
			{ type: 'timeupdate', listener: super.onTimeUpdate },
			{ type: 'ended', listener: super.onVideoEnded },
			{ type: 'playing', listener: this.onPlaying },
			{ type: 'waiting', listener: this.onWaiting },
			{ type: 'seeking', listener: this.onSeeking },
			{ type: 'seeked', listener: this.onSeeked }
		]
	}

	/**
	 * Initialize the player when the API is ready
	 */
	init() {
		this.waitUntilVideoIsReady().then(() => {
			this.addSpecificEvents()
			super.onPlayerReady()
		})
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
				vimeoQueue.push(this)
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
		this.events.forEach((event) => {
			this.instancePlayer.on(event.type, event.listener.bind(this))
		})
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
	 * Set volume method of the player
	 * @param {Number} volume New volume
	 */
	methodSetVolume(volume: number) {
		this.instancePlayer.setVolume(volume)
	}

	/**
	 * Get volume method of the player
	 * @returns {Promise<Number>} Player volume
	 */
	methodGetVolume(): Promise<number> {
		return new window.Promise((resolve) => {
			this.instancePlayer.getVolume().then((volume: number) => {
				resolve(volume)
			})
		})
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
	 * Set the new current time for the player
	 * @param {Number} Current time video
	 */
	methodSeekTo(newTime: number) {
		this.instancePlayer.setCurrentTime(newTime)
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
	 * Function executed when the video is seeking
	 */
	onSeeking() {
		this.loading(true)
	}

	/**
	 * Function executed when the video seek is done
	 */
	onSeeked() {
		this.loading(false)
	}

	/**
	 * Remove event listeners
	 */
	removeSpecificEvents() {
		this.events.forEach((event) => {
			this.instancePlayer.on(event.type, event.listener)
		})
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

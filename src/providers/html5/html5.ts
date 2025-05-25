import type { configEvent, playerParameters } from 'shared/assets/types/types.js'

/**
 * The provider function returns the provider Class which is extended from vLitejs Player
 * @param Player
 * @returns Provider class extended from vLitejs Player
 */
export default function Html5Provider(Player: any) {
	/**
	 * vlitejs Player HTML5
	 * @module vlitejs/Player/PlayerHtml5
	 */
	return class PlayerHtml5 extends Player {
		events: configEvent[]

		constructor(props: playerParameters) {
			super(props)

			this.events = [
				{ type: 'timeupdate', listener: super.onTimeUpdate },
				{ type: 'ended', listener: super.onMediaEnded },
				{ type: 'playing', listener: this.onPlaying },
				{ type: 'waiting', listener: this.onWaiting },
				{ type: 'seeking', listener: this.onSeeking },
				{ type: 'seeked', listener: this.onSeeked }
			]
		}

		/**
		 * Initialize the player
		 */
		init() {
			this.waitUntilVideoIsReady().then(() => {
				this.addSpecificEvents()
				super.onReady()
			})
		}

		/**
		 * Wait until the video is ready
		 * @returns The video is ready
		 */
		waitUntilVideoIsReady(): Promise<any> {
			return new window.Promise<void>((resolve) => {
				if (
					(this.media.readyState >= 2 && this.media.duration) ||
					(this.media.readyState === 0 && this.media.preload === 'none')
				) {
					resolve()
				} else {
					// Listen both events
					// "loadedmetadata" is not fired on Firefox
					// "canplay" is not fired in iOS
					this.media.addEventListener('loadedmetadata', resolve, { once: true })
					this.media.addEventListener('canplay', resolve, { once: true })
				}
			})
		}

		/**
		 * Set the media source
		 * @param source New media source URL
		 */
		setSource(source: string) {
			this.media.src = source
			this.media.load()
		}

		/**
		 * Create event listeners
		 * All listeners are created on class properties to facilitate the deletion of events
		 */
		addSpecificEvents() {
			this.events.forEach((event) => {
				this.media.addEventListener(event.type, event.listener.bind(this))
			})
		}

		/**
		 * Get the player instance
		 * @returns Media element
		 */
		getInstance(): HTMLElement {
			return this.media
		}

		/**
		 * Get the player current time
		 * @returns Current time of the video
		 */
		getCurrentTime(): Promise<number> {
			return new window.Promise((resolve) => resolve(this.media.currentTime))
		}

		/**
		 * Get the player duration
		 * @returns Duration of the video
		 */
		getDuration(): Promise<number> {
			return new window.Promise((resolve) => resolve(this.media.duration))
		}

		/**
		 * Play method of the player
		 */
		methodPlay() {
			this.media.play()
		}

		/**
		 * Pause method of the player
		 */
		methodPause() {
			this.media.pause()
		}

		/**
		 * Set volume method of the player
		 * @param volume New volume
		 */
		methodSetVolume(volume: number) {
			this.media.volume = volume
		}

		/**
		 * Get volume method of the player
		 * @returns Player volume
		 */
		methodGetVolume(): Promise<number> {
			return new window.Promise((resolve) => resolve(this.media.volume))
		}

		/**
		 * Mute method of the player
		 */
		methodMute() {
			this.media.muted = true
			this.media.setAttribute('muted', '')
		}

		/**
		 * Unmute method of the player
		 */
		methodUnMute() {
			this.media.muted = false
			this.media.removeAttribute('muted')
		}

		/**
		 * Set the new current time for the player
		 * @param Current time video
		 */
		methodSeekTo(newTime: number) {
			this.media.currentTime = newTime
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
				this.media.removeEventListener(event.type, event.listener)
			})
		}

		/**
		 * Remove the Vimeo player (instance, events)
		 */
		destroy() {
			this.removeSpecificEvents()
			super.destroy()
		}
	}
}

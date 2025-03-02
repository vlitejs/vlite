import type { pluginParameter } from 'shared/assets/types/types.js'

/**
 * Vlitejs Volume bar plugin
 * @module Vlitejs/plugins/Hotkeys
 */
export default class Hotkeys {
	player: any

	providers = ['html5', 'youtube', 'dailymotion', 'vimeo']
	types = ['video', 'audio']

	/**
	 * @constructor
	 * @param options
	 * @param options.player Player instance
	 */
	constructor({ player }: pluginParameter) {
		this.player = player

		this.player.onKeydown = this.onKeydown.bind(this)
	}

	/**
	 * Initialize
	 */
	init() {
		this.addEvents()		
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.player.container.addEventListener('keydown', this.onKeydown)
	}

	/**
	 * On keydown event on the media element
	 * @param e Event listener datas
	 */
	onKeydown(e: KeyboardEvent) {
		const activeElement = document.activeElement
		const { keyCode } = e

		// Stop and start the auto hide timer on selected key code
		if (
			[9, 32, 37, 39].includes(keyCode) &&
			this.player.autoHideGranted &&
			(activeElement === this.player.container || activeElement?.closest('.v-vlite'))
		) {
			this.player.stopAutoHideTimer()
			this.player.startAutoHideTimer()
		}

		// Backward or forward video with arrow keys
		if (
			[37, 39].includes(keyCode) &&
			(activeElement === this.player.container || activeElement === this.player.elements.progressBar)
		) {
			// Prevent default behavior on input range
			e.preventDefault()

			if (keyCode === 37) {
				this.fastForward('backward')
			} else if (keyCode === 39) {
				this.player.fastForward('forward')
			}
		}

		// Increase or decrease volume with arrow keys
		if (
			[38, 40].includes(keyCode) &&
			(activeElement === this.player.container || activeElement === this.player.elements.volume)
		) {
			if (keyCode === 38) {
				this.increaseVolume()
			} else if (keyCode === 40) {
				this.decreaseVolume()
			}
		}

		// Toggle the media playback with spacebar key
		if (keyCode === 32 && activeElement === this.player.container) {
			this.player.controlBar.togglePlayPause(e)
		}
	}

	/**
	 * Trigger the video fast forward (front and rear)
	 * @param direction Direction (backward|forward)
	 */
	fastForward(direction: string) {
		this.player.getCurrentTime().then((seconds: number) => {
			this.player.seekTo(
				direction === 'backward' ? seconds - this.player.options.seekTime : seconds + this.player.options.seekTime
			)
		})
	}

	/**
	 * Increase the player volume
	 */
	increaseVolume() {
		this.player.isMuted && this.player.unMute()
		this.player.getVolume().then((volume: number) => {
			this.player.setVolume(Math.min(Math.round((volume + this.player.options.volumeStep) * 10) / 10, 1))
		})
	}

	/**
	 * Decrease the player volume
	 */
	decreaseVolume() {
		this.player.getVolume().then((volume: number) => {
			this.player.setVolume(Math.max(Math.round((volume - this.player.options.volumeStep) * 10) / 10, 0))
		})
	}

	/**
	 * Destroy the plugin
	 */
	destroy() {
		this.player.container.removeEventListener('keydown', this.onKeydown)
	}
}

import type Player from 'core/player.js'
import validateTarget from 'validate-target'

type pluginParameter = {
	player: Player
	options?: Record<string, unknown>
}

/**
 * Vlitejs Mobile plugin
 * @module Vlitejs/plugins/mobile
 */
export default class Mobile {
	player: Player

	providers = ['html5', 'youtube', 'dailymotion', 'vimeo']
	types = ['video']

	/**
	 * @constructor
	 * @param options
	 * @param options.player Player instance
	 */
	constructor({ player }: pluginParameter) {
		this.player = player

		this.onClickOnContainer = this.onClickOnContainer.bind(this)
	}

	/**
	 * Initialize
	 */
	init() {
		this.player.isTouch && this.addEvents()
		// TODO: add hotkeys in this plugin in the next major version
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.player.elements.container.addEventListener('click', this.onClickOnContainer)
	}

	/**
	 * Handle click/tap on the container (only on touch devices)
	 * @param e Event data
	 */
	onClickOnContainer(e: Event) {
		const target = e.target as HTMLElement

		const validateTargetOverlay = validateTarget({
			target,
			selectorString: '.v-overlay',
			nodeName: ['div']
		})

		if (validateTargetOverlay) {
			this.onClickOnOverlay(e)
		}
	}

	onClickOnOverlay(e: Event) {
		const hasControlBar = !!this.player.elements.controlBar
		const controlBarVisible = !this.player.elements.controlBar?.classList.contains('v-hidden')

		if (hasControlBar && !controlBarVisible) {
			this.player.Vlitejs.stopAutoHideTimer()
			this.player.Vlitejs.autoHideGranted && this.player.Vlitejs.startAutoHideTimer()
			return
		}

		// Control bar is visible, toggle the playback
		this.player.controlBar.togglePlayPause(e)
	}

	/**
	 * Destroy the plugin
	 */
	destroy() {
		this.player.elements.container.removeEventListener('click', this.onClickOnContainer)
	}
}

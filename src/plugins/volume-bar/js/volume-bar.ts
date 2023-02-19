import { pluginParameter } from 'shared/assets/interfaces/interfaces'

/**
 * Vlitejs Picture-in-Picture plugin
 * @module Vlitejs/plugins/VolumeBar
 */
export default class VolumeBar {
	player: any
	volumeBar!: HTMLInputElement

	providers = ['html5', 'youtube', 'dailymotion', 'vimeo']
	types = ['video', 'audio']

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.player Player instance
	 */
	constructor({ player }: pluginParameter) {
		this.player = player

		this.onInputVolumeBar = this.onInputVolumeBar.bind(this)
		this.onVolumeChange = this.onVolumeChange.bind(this)
	}

	/**
	 * Initialize
	 */
	init() {
		if (this.player.options.controls) {
			this.render()
			this.volumeBar = this.player.elements.container.querySelector('.v-volumeBar')
			this.addEvents()
		}
	}

	onReady() {
		this.player.getVolume().then((volume: number) => {
			this.updateVolumeBar(volume)
		})
	}

	updateVolumeBar(volume: number) {
		this.volumeBar.style.setProperty('--vlite-progressValue', `${volume * 100}%`)
	}

	/**
	 * Render the plugin HTML
	 */
	render() {
		const template = `<input type="range" class="v-volumeBar v-progressBarStyle" min="0" max="1" step="0.1" value="1" aria-label="Volume" aria-valuemin="0" />`
		const controlBar = this.player.elements.container.querySelector('.v-controlBar')
		const volumeButton = this.player.elements.container.querySelector(
			'.v-volumeButton'
		) as HTMLElement

		if (controlBar) {
			if (volumeButton) {
				volumeButton.insertAdjacentHTML('afterend', template)
			} else {
				controlBar.insertAdjacentHTML('beforeend', template)
			}
		}
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.volumeBar.addEventListener('input', this.onInputVolumeBar)
		this.player.on('volumechange', this.onVolumeChange)
	}

	onInputVolumeBar(e: Event) {
		const target = e.target as HTMLInputElement
		const value = parseInt(target.value)
		this.updateVolumeBar(value)
		target.setAttribute('aria-valuenow', `${Math.round(value)}`)
		this.player.setVolume(value)
	}

	/**
	 * On volume change, update the ad volume
	 */
	onVolumeChange(e: CustomEvent) {
		if (this.player.isMuted) {
			this.volumeBar.value = '0'
			this.updateVolumeBar(0)
		} else if (e.detail && e.detail.volume) {
			const volume = e.detail.volume
			this.volumeBar.value = `${volume}`
			this.updateVolumeBar(volume)
		}
	}

	/**
	 * Destroy the plugin
	 */
	destroy() {
		this.volumeBar.removeEventListener('click', this.onInputVolumeBar)
	}
}

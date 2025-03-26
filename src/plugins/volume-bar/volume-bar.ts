import './volume-bar.css'
import type { pluginParameter } from 'shared/assets/types/types.js'

/**
 * Vlitejs Volume bar plugin
 * @module Vlitejs/plugins/VolumeBar
 */
export default class VolumeBar {
	player: any
	volumeBar!: HTMLInputElement

	providers = ['html5', 'youtube', 'dailymotion', 'vimeo']
	types = ['video', 'audio']

	/**
	 * @constructor
	 * @param options
	 * @param options.player Player instance
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
		if (this.player.options.controls && this.player.options.volume) {
			this.render()
			this.volumeBar = this.player.elements.container.querySelector('.v-volumeBar')
			this.addEvents()
		}
	}

	/**
	 * On player ready
	 */
	onReady() {
		this.player.getVolume().then((volume: number) => {
			this.updateVolumeBar(this.player.isMuted ? 0 : volume)
		})
	}

	/**
	 * Update the volume bar
	 * @param volume Volume level
	 */
	updateVolumeBar(volume: number) {
		this.volumeBar.style.setProperty('--vlite-progressValue', `${volume * 100}%`)
	}

	/**
	 * Render the plugin HTML
	 */
	render() {
		const controlBar = this.player.elements.container.querySelector('.v-controlBar')

		if (controlBar) {
			const volumeButton = this.player.elements.container.querySelector('.v-volumeButton')
			const template = `<input type="range" class="v-volumeBar v-progressBarStyle" min="0" max="1" step="0.1" value="1" aria-label="Volume" aria-valuemin="0" tabindex="0" />`

			// Wrap volume button to group button and progress bar
			const volumeArea = document.createElement('div')
			volumeArea.classList.add('v-volumeArea')
			volumeButton.parentNode.insertBefore(volumeArea, volumeButton)
			volumeArea.appendChild(volumeButton)

			volumeArea.insertAdjacentHTML('beforeend', template)
		}
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.volumeBar.addEventListener('input', this.onInputVolumeBar)
		this.player.on('volumechange', this.onVolumeChange)
	}

	/**
	 * On input volume bar
	 * @param e Event data
	 */
	onInputVolumeBar(e: Event) {
		const target = e.target as HTMLInputElement
		const value = +target.value

		this.updateVolumeBar(value)
		target.setAttribute('aria-valuenow', `${Math.round(value)}`)
		this.player.setVolume(value)
	}

	/**
	 * On volume change, update the ad volume
	 */
	onVolumeChange(e: CustomEvent) {
		const { volume } = e?.detail || {}

		if (volume) {
			this.volumeBar.value = `${volume}`
			this.updateVolumeBar(volume)
		} else {
			if (this.player.isMuted) {
				this.volumeBar.value = '0'
				this.updateVolumeBar(0)
			} else {
				this.player.getVolume().then((volume: number) => {
					this.volumeBar.value = `${volume}`
					this.updateVolumeBar(volume)
				})
			}
		}
	}

	/**
	 * Destroy the plugin
	 */
	destroy() {
		this.volumeBar.removeEventListener('input', this.onInputVolumeBar)
	}
}

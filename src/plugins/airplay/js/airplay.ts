import svgAirPlay from 'shared/assets/svgs/airplay.svg'
import { pluginParameter } from 'shared/assets/interfaces/interfaces'

declare global {
	interface Window {
		WebKitPlaybackTargetAvailabilityEvent: () => void
	}
}
interface WebkitEvent {
	availability: string
}

/**
 * Vlitejs AirPlay plugin
 * @module Vlitejs/plugins/airPlay
 */
export default class AirPlayPlugin {
	player: any
	options: any
	airPlayAvailable: boolean
	airPlayButton!: HTMLElement

	providers = ['html5']
	types = ['video']

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.player Player instance
	 */
	constructor({ player }: pluginParameter) {
		this.player = player
		this.airPlayAvailable = window.WebKitPlaybackTargetAvailabilityEvent instanceof Function

		this.onWebKitPlaybackTargetAvailabilityChanged =
			this.onWebKitPlaybackTargetAvailabilityChanged.bind(this)
		this.onWebKitCurrentPlaybackTargetWirelessChanged =
			this.onWebKitCurrentPlaybackTargetWirelessChanged.bind(this)
		this.onClickOnAirPlayButton = this.onClickOnAirPlayButton.bind(this)
		this.onEnterFullscreen = this.onEnterFullscreen.bind(this)
		this.onExitFullscreen = this.onExitFullscreen.bind(this)
	}

	/**
	 * Initialize the plugin
	 */
	init() {
		this.airPlayAvailable && this.addEvents()
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.render()
		this.airPlayButton = this.player.elements.container.querySelector('.v-airPlayButton')

		!this.player.isFullScreen && this.addAirPlayEvents()
		this.player.media.addEventListener(
			'webkitcurrentplaybacktargetiswirelesschanged',
			this.onWebKitCurrentPlaybackTargetWirelessChanged
		)

		this.airPlayButton.addEventListener('click', this.onClickOnAirPlayButton)
		this.player.on('enterfullscreen', this.onEnterFullscreen)
		this.player.on('exitfullscreen', this.onExitFullscreen)
	}

	/**
	 * Render the plugin HTML
	 */
	render() {
		const controlBar = this.player.elements.container.querySelector('.v-controlBar')
		const fullscreenButton = this.player.elements.container.querySelector('.v-fullscreenButton')
		const template = `<button class="v-airPlayButton v-controlButton" hidden>${svgAirPlay}</button>`

		if (controlBar) {
			if (fullscreenButton) {
				fullscreenButton.insertAdjacentHTML('beforebegin', template)
			} else {
				controlBar
					.querySelector('.v-controlBarRight')
					.insertAdjacentHTML('beforeend', template)
			}
		}
	}

	/**
	 * Add AirPlay event listeners
	 */
	addAirPlayEvents() {
		this.player.media.addEventListener(
			'webkitplaybacktargetavailabilitychanged',
			this.onWebKitPlaybackTargetAvailabilityChanged
		)
	}

	/**
	 * Remove AirPlay event listeners
	 */
	removeAirPlayEvents() {
		this.player.media.removeEventListener(
			'webkitplaybacktargetavailabilitychanged',
			this.onWebKitPlaybackTargetAvailabilityChanged
		)
	}

	/**
	 * Detects when AirPlay availability changes
	 * @param {WebkitEvent} e Event data
	 */
	onWebKitPlaybackTargetAvailabilityChanged(e: WebkitEvent) {
		switch (e.availability) {
			case 'available':
				this.airPlayButton.removeAttribute('hidden')
				break
			case 'not-available':
				this.airPlayButton.setAttribute('hidden', '')
				break
		}
	}

	/**
	 * On click on airplay button, open the airplay selection UI
	 * @param {Event} e Event data
	 */
	onClickOnAirPlayButton(e: Event) {
		e.preventDefault()
		this.player.media.webkitShowPlaybackTargetPicker()
	}

	/**
	 * Remove AirPlay event on enter on fullscreen
	 * Recommended by Apple
	 */
	onEnterFullscreen() {
		this.removeAirPlayEvents()
	}

	/**
	 * Add AirPlay event on enter on fullscreen
	 * Recommended by Apple
	 */
	onExitFullscreen() {
		this.addAirPlayEvents()
	}

	/**
	 * On media playback wireless changed
	 */
	onWebKitCurrentPlaybackTargetWirelessChanged() {
		if (this.player.media.webkitCurrentPlaybackTargetIsWireless) {
			this.player.dispatchEvent('airplaysessionstarted')
			this.airPlayButton.classList.add('v-active')
		} else {
			this.player.dispatchEvent('airplaysessionended')
			this.airPlayButton.classList.remove('v-active')
			this.player.pause()
		}
	}

	/**
	 * Destroy the plugin
	 */
	destroy() {
		this.removeAirPlayEvents()
		this.player.media.removeEventListener(
			'webkitcurrentplaybacktargetiswirelesschanged',
			this.onWebKitCurrentPlaybackTargetWirelessChanged
		)
		this.airPlayButton.removeEventListener('click', this.onClickOnAirPlayButton)
		this.player.off('enterfullscreen', this.onEnterFullscreen)
		this.player.off('exitfullscreen', this.onExitFullscreen)
	}
}

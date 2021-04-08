import { formatVideoTime } from 'shared/utils/utils'
import validateTarget from 'validate-target'
import Template from './templates/control-bar'
import { Options } from 'shared/assets/interfaces/interfaces'

export default class ControlBar {
	container: HTMLElement
	options: Options
	type: string
	player: any
	controlBar: HTMLElement | null
	progressBar: HTMLElement | null
	volumeButton: HTMLElement | null
	fullscreenButton: HTMLElement | null
	durationElement: HTMLElement | null

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {HTMLElement} options.container CSS selector or HTML element
	 * @param {Object} options.options Player options
	 * @param {String} options.type Player type (video|audio)
	 * @param {Class} options.player Player instance
	 */
	constructor({
		container,
		options,
		type,
		player
	}: {
		container: HTMLElement
		options: Options
		type: string
		player: any
	}) {
		this.container = container
		this.options = options
		this.type = type
		this.player = player

		this.controlBar = null
		this.progressBar = null
		this.volumeButton = null
		this.fullscreenButton = null
		this.durationElement = null

		this.onInputProgressBar = this.onInputProgressBar.bind(this)
		this.onChangeProgressBar = this.onChangeProgressBar.bind(this)
		this.onClickOnControlBar = this.onClickOnControlBar.bind(this)
		this.togglePlayPause = this.togglePlayPause.bind(this)
		this.toggleVolume = this.toggleVolume.bind(this)
		this.toggleFullscreen = this.toggleFullscreen.bind(this)
	}

	/**
	 * Initialize the player when the API is ready
	 */
	init() {
		this.controlBar = this.container.querySelector('.v-controlBar')
		if (this.controlBar) {
			if (this.options.progressBar) {
				this.progressBar = this.controlBar.querySelector('.v-progressBar')
			}
			if (this.options.volume) {
				this.volumeButton = this.controlBar.querySelector('.v-volumeButton')
			}
			if (this.options.fullscreen) {
				this.fullscreenButton = this.controlBar.querySelector('.v-fullscreenButton')
			}
			if (this.options.time) {
				this.durationElement = this.controlBar.querySelector('.v-duration')
			}
			if (this.volumeButton) {
				this.volumeButton.setAttribute('aria-label', this.player.isMuted ? 'Unmute' : 'Mute')
			}
		}

		this.addEvents()
	}

	/**
	 * On player ready
	 */
	onPlayerReady() {
		this.player.getDuration().then((duration: number) => {
			if (this.progressBar) {
				this.progressBar.setAttribute('aria-valuemax', `${Math.round(duration)}`)
			}
			if (this.durationElement) {
				this.durationElement.innerHTML = formatVideoTime(duration)
			}
		})
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		if (this.progressBar) {
			this.progressBar.addEventListener('input', this.onInputProgressBar)
			this.progressBar.addEventListener('change', this.onChangeProgressBar)
		}

		this.controlBar && this.controlBar.addEventListener('click', this.onClickOnControlBar)
	}

	/**
	 * On input event on the progress bar
	 * @param {Object} e Event data
	 */
	onInputProgressBar(e: Event) {
		this.player.progressBarIsMoving = true
		const target = e.target as HTMLInputElement
		target.style.setProperty('--value', `${target.value}%`)

		this.player.getDuration().then((duration: number) => {
			this.player.seekTo((parseInt(target.value) * duration) / 100)
		})
	}

	/**
	 * On change event on the progress bar
	 */
	onChangeProgressBar() {
		this.player.progressBarIsMoving = false
	}

	/**
	 * On click on the control bar
	 * @param {Object} e Event data
	 */
	onClickOnControlBar(e: Event) {
		const target = e.target

		const validateTargetPlayPauseButton = validateTarget({
			target: target,
			selectorString: '.v-playPauseButton',
			nodeName: ['button']
		})
		const validateTargetVolume = validateTarget({
			target: target,
			selectorString: '.v-volumeButton',
			nodeName: ['button']
		})
		const validateTargetFullscreen = validateTarget({
			target: target,
			selectorString: '.v-fullscreenButton',
			nodeName: ['button']
		})

		if (validateTargetPlayPauseButton) {
			this.togglePlayPause(e)
		} else if (validateTargetVolume) {
			this.toggleVolume(e)
		} else if (validateTargetFullscreen) {
			this.toggleFullscreen(e)
		}
	}

	/**
	 * Toggle the video status (play|pause)
	 */
	togglePlayPause(e: Event) {
		e && e.preventDefault()

		this.container.classList.contains('v-paused') ? this.player.play() : this.player.pause()
	}

	/**
	 * Toggle the volume
	 */
	toggleVolume(e: Event) {
		e.preventDefault()

		if (this.volumeButton!.classList.contains('v-pressed')) {
			this.player.unMute()
			this.volumeButton!.setAttribute('aria-label', 'Mute')
		} else {
			this.player.mute()
			this.volumeButton!.setAttribute('aria-label', 'Unmute')
		}
	}

	/**
	 * Toggle the fullscreen
	 */
	toggleFullscreen(e: Event) {
		e.preventDefault()

		if (this.player.isFullScreen) {
			this.player.exitFullscreen()
			this.fullscreenButton!.setAttribute('aria-label', 'Enter fullscreen')
		} else {
			this.player.requestFullscreen()
			this.fullscreenButton!.setAttribute('aria-label', 'Exit fullscreen')
		}
	}

	/**
	 * Get the template
	 * @param {Object} data Template's data
	 * @returns {String} Generated HTML
	 */
	getTemplate(): string {
		return `${Template({
			options: this.options,
			isMuted: this.player.isMuted,
			type: this.type
		})}`
	}

	/**
	 * Remove event listeners
	 */
	removeEvents() {
		if (this.progressBar) {
			this.progressBar.removeEventListener('input', this.onInputProgressBar)
			this.progressBar.removeEventListener('change', this.onChangeProgressBar)
		}

		this.controlBar && this.controlBar.removeEventListener('click', this.onClickOnControlBar)
	}

	/**
	 * Destroy the control bar
	 */
	destroy() {
		this.removeEvents()
		this.controlBar && this.controlBar.remove()
	}
}

import { createElement } from 'jsx-dom'
import validateTarget from 'validate-target'
import Template from './templates/control-bar'

export default class ControlBar {
	/**
	 * @constructor
	 * @param {Object} options
	 * @param {HTMLElement} options.container CSS selector or HTML element
	 * @param {Object} options.options Player options
	 * @param {String} options.mode Player mode
	 * @param {Class} options.playerInstance Player instance
	 */
	constructor({ container, options, mode, playerInstance }) {
		this.container = container
		this.options = options
		this.mode = mode
		this.playerInstance = playerInstance

		this.player = this.container.querySelector('.vlite-js')

		this.onInputProgressBar = this.onInputProgressBar.bind(this)
		this.onChangeProgressBar = this.onChangeProgressBar.bind(this)
		this.onClickOnControlBar = this.onClickOnControlBar.bind(this)
		this.toggleVolume = this.toggleVolume.bind(this)
		this.toggleFullscreen = this.toggleFullscreen.bind(this)
	}

	/**
	 * Initialize the player when the API is ready
	 */
	init() {
		this.controlBar = this.container.querySelector('.v-controlBar')
		this.progressBar = this.controlBar.querySelector('.v-progressBar')
		this.volumeButton = this.controlBar.querySelector('.v-volumeButton')
		this.fullscreenButton = this.controlBar.querySelector('.v-fullscreenButton')

		if (this.options.volume) {
			this.volumeButton.setAttribute('aria-label', this.player.muted ? 'Unmute' : 'Mute')
		}

		this.addEvents()
	}

	/**
	 * On player ready
	 */
	onPlayerReady() {
		this.playerInstance.getDuration().then((duration) => {
			this.container.querySelector('.v-progressBar').setAttribute('aria-valuemax', duration)
		})
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		if (this.options.progressBar) {
			this.progressBar.addEventListener('input', this.onInputProgressBar)
			this.progressBar.addEventListener('change', this.onChangeProgressBar)
		}

		this.controlBar.addEventListener('click', this.onClickOnControlBar)
	}

	/**
	 * On input event on the progress bar
	 * @param {Object} e Event data
	 */
	onInputProgressBar(e) {
		this.playerInstance.progressBarIsMoving = true
		const target = e.target

		target.style.setProperty('--value', `${target.value}%`)
		this.playerInstance
			.getCurrentTime()
			.then((seconds) => target.setAttribute('aria-valuenow', seconds))

		this.playerInstance.onProgressChanged(e)
	}

	/**
	 * On change event on the progress bar
	 * @param {Object} e Event data
	 */
	onChangeProgressBar() {
		this.playerInstance.progressBarIsMoving = false
	}

	/**
	 * On click on the control bar
	 * @param {Object} e Event data
	 */
	onClickOnControlBar(e) {
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
	 * Toggle the volume
	 */
	toggleVolume(e) {
		e.preventDefault()

		if (this.volumeButton.classList.contains('v-pressed')) {
			this.playerInstance.unMute()
			this.volumeButton.setAttribute('aria-label', 'Mute')
		} else {
			this.playerInstance.mute()
			this.volumeButton.setAttribute('aria-label', 'Unmute')
		}
	}

	/**
	 * Toggle the fullscreen
	 */
	toggleFullscreen(e) {
		e.preventDefault()

		if (this.playerInstance.isFullScreen) {
			this.playerInstance.exitFullscreen()
			this.fullscreenButton.setAttribute('aria-label', 'Enter fullscreen')
		} else {
			this.playerInstance.requestFullscreen()
			this.fullscreenButton.setAttribute('aria-label', 'Exit fullscreen')
		}
	}

	/**
	 * Get the template
	 * @param {Object} data Template's data
	 * @returns {HTMLElement} Generated HTML
	 */
	getTemplate() {
		return <Template options={this.options} isMuted={this.player.muted} mode={this.mode} />
	}

	/**
	 * Remove event listeners
	 */
	removeEvents() {
		if (this.options.progressBar) {
			this.progressBar.removeEventListener('change', this.onInputProgressBar)
			this.progressBar.removeEventListener('change', this.onChangeProgressBar)
		}

		this.controlBar.removeEventListener('click', this.onClickOnControlBar)
	}

	/**
	 * Destroy the control bar
	 */
	destroy() {
		this.removeEvents()
		this.controlBar.remove()
	}
}

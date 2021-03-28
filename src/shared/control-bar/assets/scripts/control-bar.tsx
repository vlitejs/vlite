import { createElement } from 'jsx-dom'
import validateTarget from 'validate-target'
import Template from './templates/control-bar'
import { Options } from 'shared/assets/interfaces/interfaces'

export default class ControlBar {
	container: HTMLElement
	options: Options
	mode: string
	playerInstance: any
	player: HTMLAudioElement | HTMLVideoElement
	controlBar?: HTMLElement
	progressBar?: HTMLElement
	volumeButton?: HTMLElement
	fullscreenButton?: HTMLElement

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {HTMLElement} options.container CSS selector or HTML element
	 * @param {Object} options.options Player options
	 * @param {String} options.mode Player mode
	 * @param {Class} options.playerInstance Player instance
	 */
	constructor({
		container,
		options,
		mode,
		playerInstance
	}: {
		container: HTMLElement
		options: Options
		mode: string
		playerInstance: any
	}) {
		this.container = container
		this.options = options
		this.mode = mode
		this.playerInstance = playerInstance

		// @ts-ignore: Object is possibly 'null'.
		this.player = this.container.querySelector('.vlite-js')

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
		// @ts-ignore: Object is possibly 'null'.
		this.controlBar = this.container.querySelector('.v-controlBar')
		// @ts-ignore: Object is possibly 'null'.
		this.progressBar = this.controlBar.querySelector('.v-progressBar')
		// @ts-ignore: Object is possibly 'null'.
		this.volumeButton = this.controlBar.querySelector('.v-volumeButton')
		// @ts-ignore: Object is possibly 'null'.
		this.fullscreenButton = this.controlBar.querySelector('.v-fullscreenButton')

		if (this.options.volume && this.volumeButton) {
			this.volumeButton.setAttribute('aria-label', this.player.muted ? 'Unmute' : 'Mute')
		}

		this.addEvents()
	}

	/**
	 * On player ready
	 */
	onPlayerReady() {
		this.playerInstance.getDuration().then((duration: number) => {
			// @ts-ignore: Object is possibly 'null'.
			this.container.querySelector('.v-progressBar').setAttribute('aria-valuemax', `${duration}`)
		})
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		if (this.options.progressBar && this.progressBar) {
			this.progressBar.addEventListener('input', this.onInputProgressBar)
			this.progressBar.addEventListener('change', this.onChangeProgressBar)
		}

		this.controlBar && this.controlBar.addEventListener('click', this.onClickOnControlBar)
	}

	/**
	 * On input event on the progress bar
	 * @param {Object} e Event data
	 */
	onInputProgressBar(e: any) {
		this.playerInstance.progressBarIsMoving = true
		const target = e.target

		target.style.setProperty('--value', `${target.value}%`)
		this.playerInstance
			.getCurrentTime()
			.then((seconds: number) => target.setAttribute('aria-valuenow', `${seconds}`))

		this.playerInstance.onProgressChanged(e)
	}

	/**
	 * On change event on the progress bar
	 */
	onChangeProgressBar() {
		this.playerInstance.progressBarIsMoving = false
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

		this.container.classList.contains('v-paused')
			? this.playerInstance.play()
			: this.playerInstance.pause()
	}

	/**
	 * Toggle the volume
	 */
	toggleVolume(e: Event) {
		e.preventDefault()

		if (this.volumeButton) {
			if (this.volumeButton.classList.contains('v-pressed')) {
				this.playerInstance.unMute()
				this.volumeButton && this.volumeButton.setAttribute('aria-label', 'Mute')
			} else {
				this.playerInstance.mute()
				this.volumeButton && this.volumeButton.setAttribute('aria-label', 'Unmute')
			}
		}
	}

	/**
	 * Toggle the fullscreen
	 */
	toggleFullscreen(e: Event) {
		e.preventDefault()

		if (this.playerInstance.isFullScreen) {
			this.playerInstance.exitFullscreen()
			this.fullscreenButton && this.fullscreenButton.setAttribute('aria-label', 'Enter fullscreen')
		} else {
			this.playerInstance.requestFullscreen()
			this.fullscreenButton && this.fullscreenButton.setAttribute('aria-label', 'Exit fullscreen')
		}
	}

	/**
	 * Get the template
	 * @param {Object} data Template's data
	 * @returns {HTMLElement} Generated HTML
	 */
	getTemplate(): JSX.Element {
		return <Template options={this.options} isMuted={this.player.muted} mode={this.mode} />
	}

	/**
	 * Remove event listeners
	 */
	removeEvents() {
		if (this.options.progressBar) {
			this.progressBar && this.progressBar.removeEventListener('change', this.onInputProgressBar)
			this.progressBar && this.progressBar.removeEventListener('change', this.onChangeProgressBar)
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

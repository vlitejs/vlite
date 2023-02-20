import { formatVideoTime } from 'shared/utils/utils'
import validateTarget from 'validate-target'
import TemplateControlBar from './templates/control-bar'

export default class ControlBar {
	player: any
	type: string
	touchEvents: Array<string>

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.player Player instance
	 * @param {String} options.type Player type (video|audio)
	 */
	constructor({ player, type }: { player: any; type: string }) {
		this.player = player
		this.type = type
		this.touchEvents = ['touchstart', 'touchmove', 'touchend']

		this.onInputProgressBar = this.onInputProgressBar.bind(this)
		this.onTouchEventProgressBar = this.onTouchEventProgressBar.bind(this)
		this.onClickOnControlBar = this.onClickOnControlBar.bind(this)
		this.togglePlayPause = this.togglePlayPause.bind(this)
		this.toggleVolume = this.toggleVolume.bind(this)
		this.toggleFullscreen = this.toggleFullscreen.bind(this)
	}

	/**
	 * Initialize the control bar
	 */
	init() {
		this.render()
		this.cacheElements()
		this.addEvents()
	}

	/**
	 * Cache control bar HTML elements
	 */
	cacheElements() {
		const controlBar = this.player.elements.container.querySelector('.v-controlBar')
		this.player.elements.controlBar = controlBar
		if (this.player.elements.controlBar) {
			this.player.elements.playPause = controlBar.querySelector('.v-playPauseButton')
			this.player.elements.progressBar = controlBar.querySelector('.v-progressBar')
			this.player.elements.currentTime = controlBar.querySelector('.v-currentTime')
			this.player.elements.duration = controlBar.querySelector('.v-duration')
			this.player.elements.volume = controlBar.querySelector('.v-volumeButton')

			this.player.elements.fullscreen = controlBar.querySelector('.v-fullscreenButton')

			if (this.player.elements.volume) {
				this.player.elements.volume.setAttribute(
					'aria-label',
					this.player.isMuted ? 'Unmute' : 'Mute'
				)
			}
		}
	}

	/**
	 * Render the control bar
	 */
	render() {
		this.player.elements.container.insertAdjacentHTML('beforeend', this.getTemplate())
	}

	/**
	 * On player ready
	 */
	onReady() {
		this.player.getDuration().then((duration: number) => {
			if (this.player.elements.progressBar) {
				this.player.elements.progressBar.setAttribute(
					'aria-valuemax',
					`${Math.round(duration)}`
				)
			}
			if (this.player.elements.duration) {
				this.player.elements.duration.innerHTML = formatVideoTime(duration)
			}
		})
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		if (this.player.elements.progressBar) {
			this.player.elements.progressBar.addEventListener('input', this.onInputProgressBar)

			if (this.player.isTouch) {
				this.touchEvents.forEach((type) => {
					this.player.elements.progressBar.addEventListener(
						type,
						this.onTouchEventProgressBar
					)
				})
			}
		}
		this.player.elements.controlBar &&
			this.player.elements.controlBar.addEventListener('click', this.onClickOnControlBar)
	}

	/**
	 * On touch event progress bar
	 * Fix for touch devices
	 * @param {TouchEvent} e Touch event data
	 */
	onTouchEventProgressBar(e: TouchEvent) {
		e.preventDefault()

		const target = e.target as HTMLInputElement
		const max = parseFloat(target.getAttribute('max') || '100')
		const clientRect = target.getBoundingClientRect()
		const percentage =
			((e.changedTouches[0].clientX - clientRect.left) / clientRect.width) * 100
		target.value = `${(percentage * 100) / max}`
		target.dispatchEvent(new Event('input'))
	}

	/**
	 * On input event on the progress bar
	 * @param {Event} e Event data
	 */
	onInputProgressBar(e: Event) {
		const target = e.target as HTMLInputElement
		target.style.setProperty('--vlite-progressValue', `${target.value}%`)

		// Without the poster, the play is not triggered
		this.player.elements.container.classList.contains('v-firstStart') && this.player.play()

		this.player.getDuration().then((duration: number) => {
			this.player.seekTo((parseFloat(target.value) * duration) / 100)
		})
	}

	/**
	 * On click on the control bar
	 * @param {Event} e Event data
	 */
	onClickOnControlBar(e: Event) {
		const target = e.target

		const validateTargetPlayPauseButton = validateTarget({
			target,
			selectorString: '.v-playPauseButton',
			nodeName: ['button']
		})
		const validateTargetVolume = validateTarget({
			target,
			selectorString: '.v-volumeButton',
			nodeName: ['button']
		})
		const validateTargetFullscreen = validateTarget({
			target,
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
	 * @param {Event} e Event data
	 */
	togglePlayPause(e: Event) {
		e.preventDefault()

		this.player.elements.container.classList.contains('v-paused')
			? this.player.play()
			: this.player.pause()
	}

	/**
	 * Toggle the volume
	 * @param {Event} e Event data
	 */
	toggleVolume(e: Event) {
		e.preventDefault()

		this.player.elements.volume.classList.contains('v-controlPressed')
			? this.player.unMute()
			: this.player.mute()
	}

	/**
	 * Toggle the fullscreen
	 * @param {Event} e Event data
	 */
	toggleFullscreen(e: Event) {
		e.preventDefault()

		this.player.isFullScreen ? this.player.exitFullscreen() : this.player.requestFullscreen()
	}

	/**
	 * Get the template
	 * @param {Object} data Template's data
	 * @returns {String} Generated HTML
	 */
	getTemplate(): string {
		return `${TemplateControlBar({
			options: this.player.options,
			isMuted: this.player.isMuted,
			isVideo: this.type === 'video'
		})}`
	}

	/**
	 * Remove event listeners
	 */
	removeEvents() {
		if (this.player.elements.progressBar) {
			this.player.elements.progressBar.removeEventListener('input', this.onInputProgressBar)

			if (this.player.isTouch) {
				this.touchEvents.forEach((type) => {
					this.player.elements.progressBar.removeEventListener(
						type,
						this.onTouchEventProgressBar
					)
				})
			}
		}

		this.player.elements.controlBar &&
			this.player.elements.controlBar.removeEventListener('click', this.onClickOnControlBar)
	}

	/**
	 * Destroy the control bar
	 */
	destroy() {
		this.removeEvents()
		this.player.elements.controlBar && this.player.elements.controlBar.remove()
	}
}

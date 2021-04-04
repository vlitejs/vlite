import svgPip from 'shared/assets/svgs/pip.svg'
import { Options, playerParameters } from 'shared/assets/interfaces/interfaces'

interface Player {
	container: HTMLElement
	element: HTMLVideoElement
	options: Options
}

export default class PiP {
	element: HTMLAudioElement | HTMLVideoElement
	container: HTMLElement
	options: Options
	vliteInstance: any
	pipButton!: HTMLElement

	providers = ['html5']
	types = ['video']

	/**
	 * Instanciate the constructor
	 * @constructor
	 * @param {Object} options
	 * @param {HTMLElement} options.element Player HTML element
	 * @param {HTMLElement} options.container Player HTML container
	 * @param {Object} options.options Player options
	 * @param {Class} options.vliteInstance vlitejs instance
	 */
	constructor({ element, container, options, vliteInstance }: playerParameters) {
		this.element = element
		this.container = container
		this.options = options
		this.vliteInstance = vliteInstance

		this.onClickOnPipButton = this.onClickOnPipButton.bind(this)
		this.onEnterPip = this.onEnterPip.bind(this)
		this.onLeavePip = this.onLeavePip.bind(this)
	}

	/**
	 * Initialize
	 */
	init() {
		if (this.isPipApiAvailable() && this.options.controls) {
			this.render()

			this.pipButton = this.container.querySelector('.v-pipButton') as HTMLElement

			this.addEvents()
		}
	}

	/**
	 * Check if the PIP API is available and not disabled
	 * @returns {Boolean} PIP API status
	 */
	isPipApiAvailable(): Boolean {
		return (
			'pictureInPictureEnabled' in document && !this.element.hasAttribute('disablePictureInPicture')
		)
	}

	/**
	 * Render the plugin DOM
	 */
	render() {
		this.container.insertAdjacentHTML('beforeend', '<div class="v-captions"></div>')

		const template = `<button class="v-pipButton v-controlButton">${svgPip}</button>`
		const controlBar = this.container.querySelector('.v-controlBar')
		const fullscreenButton = this.container.querySelector('.v-fullscreenButton') as HTMLElement

		if (controlBar) {
			if (fullscreenButton) {
				fullscreenButton.insertAdjacentHTML('beforebegin', template)
			} else {
				controlBar.insertAdjacentHTML('beforeend', template)
			}
		}
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.pipButton.addEventListener('click', this.onClickOnPipButton)
		this.element.addEventListener('enterpictureinpicture', this.onEnterPip)
		this.element.addEventListener('leavepictureinpicture', this.onLeavePip)
	}

	/**
	 * On click on the PIP button
	 * @param {Object} e Event data
	 */
	async onClickOnPipButton(e: Event) {
		e.preventDefault()

		try {
			if (this.element !== document.pictureInPictureElement) {
				// @ts-ignore
				await this.element.requestPictureInPicture()
			} else {
				await document.exitPictureInPicture()
			}
		} catch (error) {
			console.warn(`vlitejs :: ${error}`)
		}
	}

	/**
	 * On enter the PIP
	 * @param {Object} e Event data
	 */
	onEnterPip(e: Event) {
		this.container.dispatchEvent(new CustomEvent('enterpip'))
	}

	/**
	 * On leave the PIP
	 * @param {Object} e Event data
	 */
	onLeavePip(e: Event) {
		this.container.dispatchEvent(new CustomEvent('leavepip'))
	}
}

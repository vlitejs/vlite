import svgPip from 'shared/assets/svgs/pip.svg'
import { Options, pluginParameter } from 'shared/assets/interfaces/interfaces'

export default class PiP {
	playerInstance: any
	pipButton!: HTMLElement

	providers = ['html5'] // TODO: describe these parameter
	types = ['video']

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.playerInstance Player instance
	 */
	constructor({ playerInstance }: pluginParameter) {
		this.playerInstance = playerInstance

		this.onClickOnPipButton = this.onClickOnPipButton.bind(this)
		this.onEnterPip = this.onEnterPip.bind(this)
		this.onLeavePip = this.onLeavePip.bind(this)
	}

	/**
	 * Initialize
	 */
	init() {
		if (this.isPipApiAvailable() && this.playerInstance.options.controls) {
			this.render()

			this.pipButton = this.playerInstance.container.querySelector('.v-pipButton') as HTMLElement

			this.addEvents()
		}
	}

	/**
	 * Check if the PIP API is available and not disabled
	 * @returns {Boolean} PIP API status
	 */
	isPipApiAvailable(): Boolean {
		return (
			'pictureInPictureEnabled' in document &&
			!this.playerInstance.element.hasAttribute('disablePictureInPicture')
		)
	}

	/**
	 * Render the plugin DOM
	 */
	render() {
		this.playerInstance.container.insertAdjacentHTML('beforeend', '<div class="v-captions"></div>')

		const template = `<button class="v-pipButton v-controlButton">${svgPip}</button>`
		const controlBar = this.playerInstance.container.querySelector('.v-controlBar')
		const fullscreenButton = this.playerInstance.container.querySelector(
			'.v-fullscreenButton'
		) as HTMLElement

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
		this.playerInstance.element.addEventListener('enterpictureinpicture', this.onEnterPip)
		this.playerInstance.element.addEventListener('leavepictureinpicture', this.onLeavePip)
	}

	/**
	 * On click on the PIP button
	 * @param {Object} e Event data
	 */
	async onClickOnPipButton(e: Event) {
		e.preventDefault()

		try {
			if (this.playerInstance.element !== document.pictureInPictureElement) {
				// @ts-ignore
				await this.playerInstance.element.requestPictureInPicture()
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
		this.playerInstance.container.dispatchEvent(new CustomEvent('enterpip'))
	}

	/**
	 * On leave the PIP
	 * @param {Object} e Event data
	 */
	onLeavePip(e: Event) {
		this.playerInstance.container.dispatchEvent(new CustomEvent('leavepip'))
	}
}

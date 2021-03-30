import svgPip from 'shared/assets/svgs/pip.svg'
import { Options } from 'shared/assets/interfaces/interfaces'

interface Player {
	container: HTMLElement
	element: HTMLVideoElement
	options: Options
}

export default class PIP {
	player: Player
	video: HTMLVideoElement
	pipButton!: HTMLElement

	providers = ['html5']
	types = ['video']

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.player Player class instance
	 */
	constructor({ player }: { player: Player }) {
		this.player = player
		this.video = this.player.element

		this.onClickOnPipButton = this.onClickOnPipButton.bind(this)
		this.onEnterPip = this.onEnterPip.bind(this)
		this.onLeavePip = this.onLeavePip.bind(this)
	}

	/**
	 * Initialize
	 */
	init() {
		if (this.isPipApiAvailable() && this.player.options.controls) {
			this.render()

			this.pipButton = this.player.container.querySelector('.v-pipButton') as HTMLElement

			this.addEvents()
		}
	}

	/**
	 * Check if the PIP API is available and not disabled
	 * @returns {Boolean} PIP API status
	 */
	isPipApiAvailable(): Boolean {
		return (
			'pictureInPictureEnabled' in document && !this.video.hasAttribute('disablePictureInPicture')
		)
	}

	/**
	 * Render the plugin DOM
	 */
	render() {
		this.player.container.insertAdjacentHTML('beforeend', '<div class="v-captions"></div>')

		const fullscreenButton = this.player.container.querySelector(
			'.v-fullscreenButton'
		) as HTMLElement
		const template = `<button class="v-pipButton v-controlButton">${svgPip}</button>`
		if (fullscreenButton) {
			fullscreenButton.insertAdjacentHTML('beforebegin', template)
		} else {
			const controlBar = this.player.container.querySelector('.v-controlBar')
			controlBar && controlBar.insertAdjacentHTML('beforeend', template)
		}
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.pipButton.addEventListener('click', this.onClickOnPipButton)
		this.video.addEventListener('enterpictureinpicture', this.onEnterPip)
		this.video.addEventListener('leavepictureinpicture', this.onLeavePip)
	}

	/**
	 * On click on the PIP button
	 * @param {Object} e Event data
	 */
	async onClickOnPipButton(e: Event) {
		e.preventDefault()

		try {
			if (this.video !== document.pictureInPictureElement) {
				// @ts-ignore
				await this.video.requestPictureInPicture()
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
		this.player.container.dispatchEvent(new CustomEvent('enterpip'))
	}

	/**
	 * On leave the PIP
	 * @param {Object} e Event data
	 */
	onLeavePip(e: Event) {
		this.player.container.dispatchEvent(new CustomEvent('leavepip'))
	}
}

import svgPictureInPicture from 'shared/assets/svgs/picture-in-picture.svg'

export default class PictureInPicture {
	providers = ['html5']
	types = ['video']

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.player Player class instance
	 */
	constructor({ player }) {
		this.player = player
		this.video = this.player.element

		this.onClickOnPipButton = this.onClickOnPipButton.bind(this)
		this.onEnterPictureInPicture = this.onEnterPictureInPicture.bind(this)
		this.onLeavePictureInPicture = this.onLeavePictureInPicture.bind(this)
	}

	/**
	 * Initialize
	 */
	init() {
		if (this.isPipApiAvailable()) {
			this.render()

			this.pipButton = this.player.container.querySelector('.v-pipButton')

			this.addEvents()
		}
	}

	/**
	 * Check if the PictureInPicture API is available and not disabled
	 * @returns {Boolean} PictureInPicture API status
	 */
	isPipApiAvailable() {
		return 'pictureInPictureEnabled' in document && !this.video.disablePictureInPicture
	}

	/**
	 * Render the plugin DOM
	 */
	render() {
		this.player.container.insertAdjacentHTML('beforeend', '<div class="v-captions"></div>')
		this.player.container.querySelector('.v-fullscreenButton').insertAdjacentHTML(
			'beforebegin',
			`
			    <button class="v-pipButton v-controlButton">${svgPictureInPicture}</button>
			`
		)
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.pipButton.addEventListener('click', this.onClickOnPipButton)
		this.video.addEventListener('enterpictureinpicture', this.onEnterPictureInPicture)
		this.video.addEventListener('leavepictureinpicture', this.onLeavePictureInPicture)
	}

	/**
	 * On click on the PIP button
	 * @param {Object} e Event data
	 */
	async onClickOnPipButton(e) {
		e.preventDefault()

		try {
			this.video !== document.pictureInPictureElement
				? await this.video.requestPictureInPicture()
				: await document.exitPictureInPicture()
		} catch (error) {
			console.warn(`vlitejs :: ${error}`)
		}
	}

	/**
	 * On enter the PIP
	 * @param {Object} e Event data
	 */
	onEnterPictureInPicture(e) {}

	/**
	 * On leave the PIP
	 * @param {Object} e Event data
	 */
	onLeavePictureInPicture(e) {}
}

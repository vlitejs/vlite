import svgSubtitleOn from 'shared/assets/svgs/subtitle-on.svg'
import svgSubtitleOff from 'shared/assets/svgs/subtitle-off.svg'
import svgCheck from 'shared/assets/svgs/check.svg'
import { Options, playerParameters } from 'shared/assets/interfaces/interfaces'

export interface InsertPosition {
	selector: string
	position: string
}

export default class Subtitle {
	element: HTMLAudioElement | HTMLVideoElement
	container: HTMLElement
	options: Options
	vliteInstance: any
	tracks: Array<TextTrack>
	activeTrack!: TextTrack | null
	captions!: HTMLElement
	subtitleButton!: HTMLElement
	subtitlesList!: HTMLElement

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
		this.tracks = Array.from(this.element.textTracks)

		this.onClickOnSubtitleButton = this.onClickOnSubtitleButton.bind(this)
		this.onClickOnSubtitlesList = this.onClickOnSubtitlesList.bind(this)
	}

	/**
	 * Initialize
	 */
	init() {
		if (this.tracks.length && this.options.controls) {
			this.hideTracks()

			this.render()

			this.captions = this.container.querySelector('.v-captions') as HTMLElement
			this.subtitleButton = this.container.querySelector('.v-subtitleButton') as HTMLElement
			this.subtitlesList = this.container.querySelector('.v-subtitlesList') as HTMLElement

			this.addEvents()
		}
	}

	/**
	 * Hide tracks on load to prevent the browser for displaying native tracks
	 */
	hideTracks() {
		this.tracks.forEach((track) => (track.mode = 'hidden'))
	}

	/**
	 * Render the plugin DOM
	 */
	render() {
		this.container.insertAdjacentHTML('beforeend', '<div class="v-captions"></div>')

		const controlBar = this.container.querySelector('.v-controlBar')
		const insertPosition = this.getInsertPosition()
		const targetElement = this.container.querySelector(insertPosition.selector)
		if (controlBar && targetElement) {
			// @ts-ignore
			targetElement.insertAdjacentHTML(insertPosition.position as string, this.getTemplate())
		}
	}

	/**
	 * Get template
	 * @returns {String} String template
	 */
	getTemplate(): string {
		return `
				<div class="v-subtitle">
					<button class="v-subtitleButton v-controlButton v-pressed">
						<span class="v-controlButtonIcon v-iconSubtitleOn">${svgSubtitleOn}</span>
						<span class="v-controlButtonIcon v-iconSubtitleOff">${svgSubtitleOff}</span>
					</button>
					<div class="v-subtitlesList">
						<ul>
							<li>
								<button class="v-trackButton v-active" data-language="off">${svgCheck}Off</button>
							</li>
							${this.tracks
								.map(
									(track) =>
										`<li>
											<button class="v-trackButton" data-language="${track.language}">${svgCheck}${track.label}</button>
										</li>`
								)
								.join(' ')}
						</ul>
					</div>
				</div>
			`
	}

	/**
	 * Get the insertion position according to the available controls
	 * @returns {Object} Selector and position for the subtitle button
	 */
	getInsertPosition(): InsertPosition {
		const pipButton = this.container.querySelector('.v-pipButton')
		if (this.options.progressBar) {
			return {
				selector: '.v-progressBar',
				position: 'afterend'
			}
		} else if (this.options.volume) {
			return {
				selector: '.v-volumeButton',
				position: 'beforebegin'
			}
		} else if (pipButton) {
			return {
				selector: '.v-pipButton',
				position: 'beforebegin'
			}
		} else if (this.options.fullscreen) {
			return {
				selector: '.v-fullscreenButton',
				position: 'beforebegin'
			}
		} else {
			return {
				selector: '.v-controlBar',
				position: 'beforeend'
			}
		}
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.subtitleButton.addEventListener('click', this.onClickOnSubtitleButton)
		this.subtitlesList.addEventListener('click', this.onClickOnSubtitlesList)
	}

	/**
	 * On click on the subtitle button
	 * @param {Object} e Event data
	 */
	onClickOnSubtitleButton(e: Event) {
		e.preventDefault()
		this.subtitlesList.classList.toggle('v-active')
	}

	/**
	 * On click on the subtitle list
	 * @param {Object} e Event data
	 */
	onClickOnSubtitlesList(e: Event) {
		e.preventDefault()

		const target = e.target as HTMLElement
		const isActive = target.classList.contains('v-active')
		const trackActive = this.subtitlesList.querySelector('.v-active')
		const language = target.getAttribute('data-language')

		if (!isActive && this.subtitleButton.classList.contains('v-pressed')) {
			this.subtitleButton.classList.remove('v-pressed')
		}

		if (!isActive && language && target.nodeName.toLowerCase() === 'button') {
			this.subtitlesList.classList.remove('v-active')
			trackActive && trackActive.classList.remove('v-active')
			target.classList.add('v-active')

			if (language !== 'off') {
				this.activeTrack = this.getTrackByLanguage(language)
				this.activeTrack && this.updateCues()
			} else {
				this.subtitleButton.classList.add('v-pressed')
				this.captions.classList.remove('v-active')
				this.captions.innerHTML = ''
				this.activeTrack && this.updateCues({ isDisabled: true })
			}
		}
	}

	/**
	 * Get the ttrack by language
	 * @param {String} language Language of the track
	 * @returns {TextTrack} TextTrack for the current language
	 */
	getTrackByLanguage(language: string): TextTrack | null {
		return this.tracks.find((track) => track.language === language) || null
	}

	/**
	 * Update the cues to add enter and exit callback functions
	 * @param {Object} options
	 * @param {Boolean} options.isDisabled Disable cues
	 */
	updateCues({ isDisabled = false }: { isDisabled?: Boolean } = {}) {
		if (this.activeTrack && this.activeTrack.cues && this.activeTrack.cues.length) {
			const cues = Array.from(this.activeTrack.cues)
			const activeCues = this.activeTrack.activeCues

			const _this = this

			const onEnter = function () {
				// @ts-ignore
				_this.addCue(this)
			}

			const onExit = function () {
				// @ts-ignore
				_this.hideCue(this)
			}

			cues.forEach((cue) => {
				cue.onenter = isDisabled ? null : onEnter
				cue.onexit = isDisabled ? null : onExit
			})

			!isDisabled && activeCues && activeCues.length && this.addCue(activeCues[0])

			this.container.dispatchEvent(new CustomEvent(isDisabled ? 'trackdisabled' : 'trackenabled'))
		}
	}

	/**
	 * Add the custom cue
	 * @param {TextTrackCue} cue Current cue to add
	 */
	addCue(cue: TextTrackCue) {
		// @ts-ignore
		this.captions.innerHTML = cue.text
		this.captions.classList.add('v-active')
	}

	/**
	 * Hide the custom cue
	 */
	hideCue() {
		this.captions.classList.remove('v-active')
	}
}
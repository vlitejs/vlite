import validateTarget from 'validate-target'
import svgSubtitleOn from 'shared/assets/svgs/subtitle-on.svg'
import svgSubtitleOff from 'shared/assets/svgs/subtitle-off.svg'
import svgCheck from 'shared/assets/svgs/check.svg'
import { pluginParameter } from 'shared/assets/interfaces/interfaces'

export interface InsertPosition {
	selector: string
	position: string
}

/**
 * Vlitejs Subtitle plugin
 * @module Vlitejs/plugins/subtitle
 */
export default class Subtitle {
	player: any
	tracks: Array<TextTrack>
	activeTrack!: TextTrack | null
	captions!: HTMLElement
	subtitleButton!: HTMLElement
	subtitlesList!: HTMLElement
	subtitlesListCssTransitionDuration: number

	providers = ['html5']
	types = ['video']

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.player Player instance
	 */
	constructor({ player }: pluginParameter) {
		this.player = player
		this.tracks = Array.from(this.player.media.textTracks)
		this.subtitlesListCssTransitionDuration = 0

		this.onClickOnSubtitleButton = this.onClickOnSubtitleButton.bind(this)
		this.onClickOnSubtitlesList = this.onClickOnSubtitlesList.bind(this)
	}

	/**
	 * Initialize
	 */
	init() {
		if (this.tracks.length && this.player.options.controls) {
			this.activeTrack = this.getActiveTrack()

			this.hideTracks()
			this.render()

			this.captions = this.player.elements.container.querySelector(
				'.v-captions'
			) as HTMLElement
			this.subtitleButton = this.player.elements.container.querySelector(
				'.v-subtitleButton'
			) as HTMLElement
			this.subtitlesList = this.player.elements.container.querySelector(
				'.v-subtitlesList'
			) as HTMLElement
			this.subtitlesListCssTransitionDuration =
				parseFloat(window.getComputedStyle(this.subtitlesList).transitionDuration) * 1000

			this.addEvents()
		}
	}

	/**
	 * On player ready
	 */
	onReady() {
		this.enableTrack()
	}

	/**
	 * Get the default track or the first one if no match
	 * @returns {TextTrack} Active track
	 */
	getActiveTrack(): TextTrack {
		return this.tracks.find((track) => track.mode === 'showing') || this.tracks[0]
	}

	/**
	 * Hide tracks on load to prevent the browser for displaying native tracks
	 */
	hideTracks() {
		this.tracks.forEach((track) => (track.mode = 'hidden'))
	}

	/**
	 * Render the plugin HTML
	 */
	render() {
		this.player.elements.container.insertAdjacentHTML(
			'beforeend',
			'<div class="v-captions"></div>'
		)

		const controlBar = this.player.elements.container.querySelector('.v-controlBar')
		controlBar
			.querySelector('.v-controlBarRight')
			.insertAdjacentHTML('afterbegin' as string, this.getTemplate())
	}

	/**
	 * Enable the active track
	 */
	enableTrack() {
		if (this.activeTrack) {
			const button = this.subtitlesList.querySelector(
				`[data-language="${this.activeTrack.language}"]`
			)
			if (button) {
				button.dispatchEvent(
					new window.CustomEvent('click', {
						bubbles: true,
						detail: {
							triggerPlayerFocus: false
						}
					})
				)
			}
		}
	}

	/**
	 * Get template
	 * @returns {String} String template
	 */
	getTemplate(): string {
		return `
				<div class="v-subtitle">
					<button class="v-subtitleButton v-controlButton v-controlPressed">
						${svgSubtitleOn}${svgSubtitleOff}
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
	 * Add event listeners
	 */
	addEvents() {
		this.subtitleButton.addEventListener('click', this.onClickOnSubtitleButton)
		this.subtitlesList.addEventListener('click', this.onClickOnSubtitlesList)
	}

	/**
	 * On click on the subtitle button
	 * @param {Event} e Event data
	 */
	onClickOnSubtitleButton(e: Event) {
		e.preventDefault()

		this.subtitlesList.classList.toggle('v-active')

		if (this.subtitlesList.classList.contains('v-active')) {
			const firstItem = this.subtitlesList.querySelector('.v-trackButton') as HTMLElement
			setTimeout(() => firstItem.focus(), this.subtitlesListCssTransitionDuration)
		}
	}

	/**
	 * On click on the subtitle list
	 * @param {Event} e Event data
	 */
	onClickOnSubtitlesList(e: Event | CustomEvent) {
		e.preventDefault()

		const target = e.target as HTMLElement
		const language = target.getAttribute('data-language')
		const validateTargetSubtitleListButton = validateTarget({
			target,
			selectorString: '.v-trackButton:not(.v-active)',
			nodeName: ['button']
		})
		const trackActive = this.subtitlesList.querySelector('.v-active')
		const triggerPlayerFocus = (<CustomEvent>e).detail.triggerPlayerFocus ?? true

		if (language && validateTargetSubtitleListButton) {
			trackActive && trackActive.classList.remove('v-active')
			target.classList.add('v-active')

			if (language === 'off') {
				this.subtitleButton.classList.add('v-controlPressed')
				this.captions.classList.remove('v-active')
				this.captions.innerHTML = ''
				this.activeTrack && this.updateCues({ isDisabled: true })
			} else {
				this.subtitleButton.classList.remove('v-controlPressed')
				this.activeTrack = this.getTrackByLanguage(language)
				this.activeTrack && this.updateCues()
			}

			triggerPlayerFocus && this.player.elements.container.focus()
		}

		this.subtitlesList.classList.remove('v-active')
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
	updateCues({ isDisabled = false }: { isDisabled?: boolean } = {}) {
		if (this.activeTrack && this.activeTrack.cues && this.activeTrack.cues.length) {
			const cues = Array.from(this.activeTrack.cues)
			const activeCues = this.activeTrack.activeCues

			// eslint-disable-next-line @typescript-eslint/no-this-alias
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

			this.player.dispatchEvent(isDisabled ? 'trackdisabled' : 'trackenabled')
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

	/**
	 * Destroy the plugin
	 */
	destroy() {
		this.subtitleButton.removeEventListener('click', this.onClickOnSubtitleButton)
		this.subtitlesList.removeEventListener('click', this.onClickOnSubtitlesList)
	}
}

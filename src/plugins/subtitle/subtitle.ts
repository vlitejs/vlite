import './subtitle.css'
import svgCheck from 'shared/assets/svgs/check.svg'
import svgSubtitleOff from 'shared/assets/svgs/subtitle-off.svg'
import svgSubtitleOn from 'shared/assets/svgs/subtitle-on.svg'
import type { pluginParameter } from 'shared/assets/types/types.js'
import validateTarget from 'shared/utils/validate-target.js'

/**
 * Normalized text track shape used across HTML5 and provider paths.
 */
type NormalizedTextTrack = {
	language: string
	label: string
	kind: string
	mode: string
	cues?: TextTrackCueList | null
	activeCues?: TextTrackCueList | null
}

/**
 * Vlitejs Subtitle plugin
 * @module Vlitejs/plugins/subtitle
 */
export default class Subtitle {
	player: any
	tracks: NormalizedTextTrack[]
	activeTrack: NormalizedTextTrack | null
	supportsProviderTextTracks: boolean
	providerTracksInitialized: boolean
	captions!: HTMLElement
	subtitleButton!: HTMLElement
	subtitlesList!: HTMLElement
	subtitlesListCssTransitionDuration: number

	providers = ['html5', 'vimeo', 'dailymotion', 'youtube']
	types = ['video']

	/**
	 * @constructor
	 * @param options
	 * @param options.player Player instance
	 */
	constructor({ player }: pluginParameter) {
		this.player = player
		this.supportsProviderTextTracks =
			typeof this.player.getTextTracks === 'function' &&
			typeof this.player.enableTextTrack === 'function'
		this.providerTracksInitialized = false

		if (this.supportsProviderTextTracks) {
			this.tracks = []
			this.activeTrack = null
		} else {
			this.tracks = Array.from(this.player.media.textTracks) as NormalizedTextTrack[]
			this.activeTrack = null
		}

		this.subtitlesListCssTransitionDuration = 0

		this.onClickOnSubtitleButton = this.onClickOnSubtitleButton.bind(this)
		this.onClickOnSubtitlesList = this.onClickOnSubtitlesList.bind(this)
		this.onMediaEnded = this.onMediaEnded.bind(this)
	}

	/**
	 * Cache DOM elements and compute the subtitles list transition duration
	 */
	cacheDomElements() {
		this.captions = this.player.elements.container.querySelector('.v-captions') as HTMLElement
		this.subtitleButton = this.player.elements.container.querySelector(
			'.v-subtitleButton'
		) as HTMLElement
		this.subtitlesList = this.player.elements.container.querySelector(
			'.v-subtitlesList'
		) as HTMLElement
		this.subtitlesListCssTransitionDuration =
			Number.parseFloat(window.getComputedStyle(this.subtitlesList).transitionDuration) * 1000
	}

	/**
	 * Initialize
	 */
	init() {
		if (!this.supportsProviderTextTracks && this.tracks.length && this.player.options.controls) {
			this.activeTrack = this.getActiveTrack() ?? null

			this.hideTracks()
			this.render()

			this.cacheDomElements()

			this.addEvents()
		}
	}

	/**
	 * On player ready
	 */
	onReady() {
		if (this.supportsProviderTextTracks) {
			this.initProviderTextTracks()
			this.player.on('texttracksready', () => {
				if (!this.providerTracksInitialized) {
					this.initProviderTextTracks()
				}
			})
		} else {
			this.enableTrack()
		}
	}

	/**
	 * Initialize provider-backed text tracks (Vimeo SDK)
	 * Fetches tracks asynchronously, then renders the UI if tracks are available
	 */
	initProviderTextTracks() {
		this.player.getTextTracks().then((tracks: NormalizedTextTrack[]) => {
			if (this.providerTracksInitialized) return

			this.tracks = tracks

			if (this.tracks.length && this.player.options.controls) {
				this.render()
				this.cacheDomElements()
				this.addEvents()
				this.enableTrack()
				this.providerTracksInitialized = true
			}
		})
	}

	/**
	 * Get the default track or the first one if no match
	 * @returns Active track
	 */
	getActiveTrack(): NormalizedTextTrack | undefined {
		return this.tracks.find((track) => track.mode === 'showing') || this.tracks[0]
	}

	/**
	 * Hide tracks on load to prevent the browser for displaying native tracks
	 */
	hideTracks() {
		this.tracks.forEach((track) => {
			track.mode = 'hidden'
		})
	}

	/**
	 * Render the plugin HTML
	 */
	render() {
		this.player.elements.container.insertAdjacentHTML('beforeend', '<div class="v-captions"></div>')

		const controlBar = this.player.elements.container.querySelector('.v-controlBar')
		const fullscreenButton = this.player.elements.container.querySelector(
			'.v-fullscreenButton'
		) as HTMLElement

		if (controlBar) {
			if (fullscreenButton) {
				fullscreenButton.insertAdjacentHTML('beforebegin', this.getTemplate())
			} else {
				controlBar.insertAdjacentHTML('beforeend', this.getTemplate())
			}
		}
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
	 * @returns String template
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
		if (!this.supportsProviderTextTracks) {
			this.player.media.addEventListener('ended', this.onMediaEnded)
		}
	}

	/**
	 * On click on the subtitle button
	 * @param e Event data
	 */
	onClickOnSubtitleButton(e: Event) {
		e.preventDefault()

		this.subtitlesList.classList.toggle('v-active')
	}

	/**
	 * On click on the subtitle list
	 * @param e Event data
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
			trackActive?.classList.remove('v-active')
			target.classList.add('v-active')

			if (language === 'off') {
				this.subtitleButton.classList.add('v-controlPressed')
				if (this.supportsProviderTextTracks) {
					this.player.disableTextTrack()
					this.player.dispatchEvent('trackdisabled')
				} else {
					this.captions.classList.remove('v-active')
					this.captions.innerHTML = ''
					this.activeTrack && this.updateCues({ isDisabled: true })
				}
			} else {
				this.subtitleButton.classList.remove('v-controlPressed')
				if (this.supportsProviderTextTracks) {
					this.activeTrack = this.getTrackByLanguage(language)
					if (this.activeTrack) {
						this.player.enableTextTrack(this.activeTrack.language, this.activeTrack.kind)
						this.player.dispatchEvent('trackenabled')
					}
				} else {
					this.activeTrack = this.getTrackByLanguage(language)
					this.activeTrack && this.updateCues()
				}
			}

			triggerPlayerFocus && this.player.elements.container.focus()
		}

		this.subtitlesList.classList.remove('v-active')
	}

	/**
	 * Get the ttrack by language
	 * @param language Language of the track
	 * @returns TextTrack for the current language
	 */
	getTrackByLanguage(language: string): NormalizedTextTrack | null {
		return this.tracks.find((track) => track.language === language) || null
	}

	/**
	 * Update the cues to add enter and exit callback functions
	 * @param options
	 * @param options.isDisabled Disable cues
	 */
	updateCues({ isDisabled = false }: { isDisabled?: boolean } = {}) {
		if (this.activeTrack?.cues?.length) {
			const cues = Array.from(this.activeTrack.cues) as TextTrackCue[]
			const activeCues = this.activeTrack.activeCues

			const _this = this

			const onEnter = function () {
				// @ts-expect-error
				_this.addCue(this)
			}

			const onExit = function () {
				// @ts-expect-error
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
	 * @param cue Current cue to add
	 */
	addCue(cue: TextTrackCue) {
		// @ts-expect-error
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
	 * On media ended, hide the caption
	 */
	onMediaEnded() {
		this.hideCue()
	}

	/**
	 * Destroy the plugin
	 */
	destroy() {
		this.subtitleButton.removeEventListener('click', this.onClickOnSubtitleButton)
		this.subtitlesList.removeEventListener('click', this.onClickOnSubtitlesList)
	}
}

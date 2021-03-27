import svgSubtitleOn from 'shared/assets/svgs/subtitle-on.svg'
import svgSubtitleOff from 'shared/assets/svgs/subtitle-off.svg'
import svgCheck from 'shared/assets/svgs/check.svg'

export default class Subtitle {
	providers = ['html5']
	types = ['video']

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.player Player class instance
	 */
	constructor({ player }) {
		this._this = this
		this.player = player
		this.video = this.player.element
		const textTracks = this.video.textTracks
		this.tracks = textTracks ? Array.from(textTracks) : null
		this.cues = null

		this.onClickOnSubtitleButton = this.onClickOnSubtitleButton.bind(this)
		this.onClickOnSubtitlesList = this.onClickOnSubtitlesList.bind(this)
	}

	/**
	 * Initialize
	 */
	init() {
		if (this.tracks.length) {
			this.defaultTrack = this.getActiveTrack()
			this.hideTracks()

			this.render()

			this.captions = this.player.container.querySelector('.v-captions')
			this.subtitleButton = this.player.container.querySelector('.v-subtitleButton')
			this.subtitlesList = this.player.container.querySelector('.v-subtitlesList')

			const currentLanguage = this.subtitlesList
				.querySelector('.v-active')
				.getAttribute('data-language')
			this.activeTrack = this.getTrackByLanguage(currentLanguage)

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
	 * Get the active tracks with the default attribute in the DOM or the first one
	 * @returns {TextTrack} The active TextTrack
	 */
	getActiveTrack() {
		return this.tracks.find((track) => track.mode === 'showing') || this.tracks[0]
	}

	/**
	 * Render the plugin DOM
	 */
	render() {
		this.player.container.insertAdjacentHTML('beforeend', '<div class="v-captions"></div>')
		this.player.container.querySelector('.v-volumeButton').insertAdjacentHTML(
			'beforebegin',
			`
				<div class="v-subtitle">
					<button class="v-subtitleButton v-controlButton v-pressed">
						<span class="v-controlButtonIcon v-iconSubtitleOn">${svgSubtitleOn}</span>
						<span class="v-controlButtonIcon v-iconSubtitleOff">${svgSubtitleOff}</span>
					</button>
					<div class="v-subtitlesList">
						<ul>
							<li>
								<button class="v-trackButton v-active" data-language="off">
									${svgCheck}Off
								</button>
							</li>
							${this.tracks
								.map(
									(track) =>
										`<li>
											<button class="v-trackButton" data-language="${track.language}">
												${svgCheck}
												${track.label}
											</button>
										</li>`
								)
								.join(' ')}
						</ul>
					</div>
				</div>
			`
		)
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
	onClickOnSubtitleButton(e) {
		e.preventDefault()
		this.subtitlesList.classList.toggle('v-active')
	}

	/**
	 * On click on the subtitle list
	 * @param {Object} e Event data
	 */
	onClickOnSubtitlesList(e) {
		e.preventDefault()

		const target = e.target
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
				this.updateCues()
			} else {
				this.subtitleButton.classList.add('v-pressed')
				this.captions.classList.remove('v-active')
				this.captions.innerHTML = ''
				this.updateCues({ disabled: true })
			}
		}
	}

	/**
	 * Get the ttrack by language
	 * @param {String} language Language of the track
	 * @returns {TextTrack} TextTrack for the current language
	 */
	getTrackByLanguage(language) {
		return this.tracks.find((track) => track.language === language)
	}

	/**
	 * Update the cues to add enter and exit callback functions
	 * @param {Object} options
	 * @param {Boolean} options.disabled Disable cues
	 */
	updateCues({ disabled = false } = {}) {
		const cues = [...this.activeTrack.cues]
		const activeCues = this.activeTrack.activeCues

		const _this = this

		const onEnter = function () {
			_this.addCue(this)
		}

		const onExit = function () {
			_this.hideCue(this)
		}

		cues.forEach((cue) => {
			cue.onenter = disabled ? null : onEnter
			cue.onexit = disabled ? null : onExit
		})

		!disabled && activeCues.length && this.addCue(activeCues[0])
	}

	/**
	 * Add the custom cue
	 * @param {VTTCue} cue Current cue to add
	 */
	addCue(cue) {
		this.captions.innerHTML = cue.text
		this.captions.classList.add('v-active')
	}

	/**
	 * Hide the custom cue
	 * @param {VTTCue} cue Current cue to hide
	 */
	hideCue(cue) {
		this.captions.classList.remove('v-active')
	}
}

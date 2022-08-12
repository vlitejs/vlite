import svgCast from 'shared/assets/svgs/cast.svg'
import { pluginParameter, Constructable } from 'shared/assets/interfaces/interfaces'

declare global {
	interface Window {
		chrome: {
			cast: {
				media: {
					TextTrackType: {
						SUBTITLES: string
					}
					TrackType: {
						TEXT: string
					}
					DEFAULT_MEDIA_RECEIVER_APP_ID: string
					MediaInfo: Constructable<any>
					TextTrackStyle: Constructable<any>
					GenericMediaMetadata: Constructable<any>
					LoadRequest: Constructable<any>
					Track: Constructable<any>
					EditTracksInfoRequest: Constructable<any>
				}
				AutoJoinPolicy: {
					ORIGIN_SCOPED: string
				}
				Image: Constructable<any>
			}
		}
		cast: {
			framework: {
				CastContext: {
					getInstance: () => void
				}
				RemotePlayer: Constructable<any>
				RemotePlayerController: Constructable<any>
				CastContextEventType: {
					SESSION_STATE_CHANGED: string
				}
				RemotePlayerEventType: {
					CURRENT_TIME_CHANGED: string
					IS_MEDIA_LOADED_CHANGED: string
				}
				SessionState: {
					SESSION_STARTED: string
					SESSION_RESUMED: string
					SESSION_ENDED: string
				}
			}
		}
		__onGCastApiAvailable: (isAvailable: boolean) => void
	}
}

interface Subtitle {
	index: number
	url: string
	label: string
	language: string
	isDefault: boolean
}

interface CastEvent {
	sessionState: string
	value: number
}

/**
 * Vlitejs Cast plugin
 * @module Vlitejs/plugins/cast
 */
export default class CastPlugin {
	player: any
	options: any
	castButton!: HTMLElement
	castContext: any
	remotePlayer: any
	remotePlayerController: any
	subtitles: Array<Subtitle>
	backupAutoHide: boolean | null

	providers = ['html5']
	types = ['video']

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.player Player instance
	 * @param {Object} options.options Plugins options
	 */
	constructor({ player, options = {} }: pluginParameter) {
		this.player = player
		this.options = options
		this.subtitles = []
		this.backupAutoHide = null

		this.onCastStateChange = this.onCastStateChange.bind(this)
		this.onCurrentTimeChanged = this.onCurrentTimeChanged.bind(this)
		this.isMediaLoadedChanged = this.isMediaLoadedChanged.bind(this)
		this.onClickOnCastButton = this.onClickOnCastButton.bind(this)
		this.updateSubtitle = this.updateSubtitle.bind(this)
	}

	/**
	 * Initialize the plugin
	 */
	init() {
		window.__onGCastApiAvailable = (isAvailable: boolean) => {
			isAvailable && this.initCastApi()
		}
		this.loadWebSenderApi()
	}

	/**
	 * Load web sender API
	 */
	loadWebSenderApi() {
		const script = document.createElement('script')
		script.defer = true
		script.type = 'text/javascript'
		script.src = '//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1'
		document.getElementsByTagName('body')[0].appendChild(script)
	}

	/**
	 * Cast Web Sender API is available
	 * Initialize the Cast API
	 */
	initCastApi() {
		this.castContext = window.cast.framework.CastContext.getInstance()
		this.castContext.setOptions({
			receiverApplicationId: window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
			autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
		})
		this.remotePlayer = new window.cast.framework.RemotePlayer()
		this.remotePlayerController = new window.cast.framework.RemotePlayerController(
			this.remotePlayer
		)

		this.render()
		this.castButton = this.player.elements.container.querySelector('.v-castButton')
		this.subtitles = this.getSubtitles()
		this.addEvents()
	}

	/**
	 * Render the plugin HTML
	 */
	render() {
		const controlBar = this.player.elements.container.querySelector('.v-controlBar')
		const fullscreenButton = this.player.elements.container.querySelector('.v-fullscreenButton')
		const template = `<button class="v-castButton v-controlButton">${svgCast}</button>`

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
		this.castContext.addEventListener(
			window.cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
			this.onCastStateChange
		)
		this.remotePlayerController.addEventListener(
			window.cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,
			this.onCurrentTimeChanged
		)
		this.remotePlayerController.addEventListener(
			window.cast.framework.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED,
			this.isMediaLoadedChanged
		)

		this.castButton.addEventListener('click', this.onClickOnCastButton)
		this.player.on('trackdisabled', this.updateSubtitle)
		this.player.on('trackenabled', this.updateSubtitle)
	}

	/**
	 * On cast state change
	 * Cast event
	 */
	onCastStateChange(e: CastEvent) {
		const sessionState = e.sessionState

		switch (sessionState) {
			case window.cast.framework.SessionState.SESSION_STARTED:
				this.onSessionStart()
				break
			case window.cast.framework.SessionState.SESSION_RESUMED:
				this.castContext.endCurrentSession(true)
				break
			case window.cast.framework.SessionState.SESSION_ENDED:
				this.onSessionStop()
				break
		}
	}

	/**
	 * On current time changed
	 * Cast event
	 */
	onCurrentTimeChanged() {
		this.player.updateProgressBar({
			seconds: this.remotePlayer.currentTime,
			duration: this.remotePlayer.duration,
			isRemote: true
		})
	}

	/**
	 * On click on cast button, open the cast selection UI
	 * @param {Event} e Event data
	 */
	onClickOnCastButton(e: Event) {
		e.preventDefault()
		this.castContext.requestSession()
	}

	/**
	 * Update the cast subtitle
	 */
	updateSubtitle() {
		if (!this.remotePlayer.isMediaLoaded) return

		const newLanguage = this.player.plugins.subtitle.subtitlesList
			.querySelector('.v-trackButton.v-active')
			.getAttribute('data-language')

		let activeTrackIds
		if (newLanguage === 'off') {
			activeTrackIds = []
		} else {
			const newTrackIndex = this.subtitles.find(({ language }) => language === newLanguage)
			if (newTrackIndex) {
				activeTrackIds = [newTrackIndex.index]
			}
		}

		const tracksInfoRequest = new window.chrome.cast.media.EditTracksInfoRequest(activeTrackIds)
		this.getSession().getMediaSession().editTracksInfo(tracksInfoRequest)
	}

	/**
	 * On cast session start
	 */
	onSessionStart() {
		this.player.elements.container.focus()

		this.player.methodPause()

		this.backupAutoHide = this.player.Vlitejs.autoHideGranted
		this.player.Vlitejs.autoHideGranted = false
		this.player.Vlitejs.stopAutoHideTimer()

		this.player.elements.container.classList.add('v-remote')
		this.castButton.classList.add('v-active')
		this.player.isCast = true

		const deviceName = this.getSession().getCastDevice().deviceName || 'Chromecast'
		this.player.media.insertAdjacentHTML(
			'afterend',
			`<span class="v-deviceName">Cast on ${deviceName}</span>`
		)

		this.loadMedia()
	}

	/**
	 * On cast session stop
	 */
	onSessionStop() {
		this.player.Vlitejs.autoHideGranted = this.backupAutoHide
		this.backupAutoHide && this.player.Vlitejs.startAutoHideTimer()

		this.player.elements.container.classList.remove('v-remote')
		this.castButton.classList.remove('v-active')
		this.player.isCast = false
		this.player.elements.container.querySelector('.v-deviceName').remove()

		if (!this.player.isPaused) {
			this.player.methodPlay()
			this.player.afterPlayPause()
		}
	}

	/**
	 * Get subtitles data from the media
	 * @returns {Array<Subtitle>} List of subtitles with somes fields
	 */
	getSubtitles(): Array<Subtitle> {
		return [...this.player.media.querySelectorAll('track')].map((track, index) => ({
			index,
			url: track.getAttribute('src'),
			label: track.getAttribute('label'),
			language: track.getAttribute('srclang'),
			isDefault: track.hasAttribute('default')
		}))
	}

	/**
	 * Get the cast session
	 * @returns {Object} Current cast session
	 */
	getSession(): any {
		return this.castContext.getCurrentSession()
	}

	/**
	 * Load the media into the receiver
	 */
	loadMedia() {
		const session = this.getSession()
		if (!session) return

		const mediaInfo = new window.chrome.cast.media.MediaInfo(this.player.media.src)
		mediaInfo.contentType = 'video/mp4'

		if (this.subtitles.length) {
			mediaInfo.tracks = this.getCastTracks()
		}

		const textTrackStyle = new window.chrome.cast.media.TextTrackStyle()
		textTrackStyle.backgroundColor = '#ffffff00'
		textTrackStyle.edgeColor = '#00000016'
		textTrackStyle.edgeType = 'DROP_SHADOW'
		textTrackStyle.fontFamily = 'CASUAL'
		textTrackStyle.fontScale = 1.0
		textTrackStyle.foregroundColor = '#ffffffff'
		mediaInfo.textTrackStyle = {
			...textTrackStyle,
			...(this.options.textTrackStyle || {})
		}

		const metadata = new window.chrome.cast.media.GenericMediaMetadata()
		if (this.player.options.poster) {
			metadata.images = [new window.chrome.cast.Image(this.player.options.poster)]
		}
		mediaInfo.metadata = {
			...metadata,
			...(this.options.metadata || {})
		}

		const loadRequest = new window.chrome.cast.media.LoadRequest(mediaInfo)
		loadRequest.autoplay = this.player.isPaused === false
		loadRequest.currentTime = this.player.media.currentTime

		if (this.subtitles.length) {
			loadRequest.activeTrackIds = [this.getActiveTrack().index]
		}
		session.loadMedia(loadRequest)
	}

	/**
	 *  Get the cast Track
	 * @returns {Array} List of cast Track
	 */
	getCastTracks() {
		return this.subtitles.map(({ url, label, language }, index) => {
			const castTrack = new window.chrome.cast.media.Track(
				index,
				window.chrome.cast.media.TrackType.TEXT
			)
			castTrack.trackContentId = url
			castTrack.trackContentType = 'text/vtt'
			castTrack.subtype = window.chrome.cast.media.TextTrackType.SUBTITLES
			castTrack.name = label
			castTrack.language = language
			return castTrack
		})
	}

	/**
	 * Get the default track or the first one if no match
	 * @returns {Object} Active track
	 */
	getActiveTrack(): Subtitle {
		return this.subtitles.find((item) => item.isDefault) || this.subtitles[0]
	}

	/**
	 * On cast media loaded changed
	 * Cast event
	 */
	isMediaLoadedChanged() {
		this.player.on('play', () => {
			if (!this.remotePlayer.isMediaLoaded) return
			this.remotePlayerController.playOrPause()
		})
		this.player.on('pause', () => {
			if (!this.remotePlayer.isMediaLoaded) return
			this.remotePlayerController.playOrPause()
		})
		this.player.on('volumechange', () => {
			if (!this.remotePlayer.isMediaLoaded) return
			this.player.getVolume().then((volume: number) => {
				this.remotePlayer.volumeLevel = this.player.isMuted ? 0 : volume
				this.remotePlayerController.setVolumeLevel()
			})
		})
		this.player.on('timeupdate', () => {
			if (!this.remotePlayer.isMediaLoaded) return
			this.player.getCurrentTime().then((currentTime: number) => {
				this.remotePlayer.currentTime = currentTime
				this.remotePlayerController.seek()
			})
		})
	}

	/**
	 * Destroy the plugin
	 */
	destroy() {
		console.log('cast destroy')
		this.castContext.removeEventListener(
			window.cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
			this.onCastStateChange
		)
		this.remotePlayerController.removeEventListener(
			window.cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,
			this.onCurrentTimeChanged
		)
		this.remotePlayerController.removeEventListener(
			window.cast.framework.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED,
			this.isMediaLoadedChanged
		)

		this.castButton.removeEventListener('click', this.onClickOnCastButton)
		this.player.off('trackdisabled', this.updateSubtitle)
		this.player.off('trackenabled', this.updateSubtitle)
	}
}

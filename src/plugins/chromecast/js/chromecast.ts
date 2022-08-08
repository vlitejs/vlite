import svgCast from 'shared/assets/svgs/cast.svg'
import { pluginParameter } from 'shared/assets/interfaces/interfaces'

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
					getInstance: Function
				}
				RemotePlayer: Constructable<any>
				RemotePlayerController: Constructable<any>
				CastContextEventType: {
					SESSION_STATE_CHANGED: string
				}
				SessionState: {
					SESSION_STARTED: string
					SESSION_RESUMED: string
					SESSION_ENDED: string
				}
			}
		}
		__onGCastApiAvailable: Function
	}
}

export interface Constructable<T> {
	new (...args: any): T
}

interface Subtitle {
	url: string
	label: string
	language: string
}

interface CastEvent {
	sessionState: string
}

/**
 * Vlitejs Chromecast plugin
 * @module Vlitejs/plugins/chromecast
 */
export default class ChromecastPlugin {
	player: any
	options: any
	castContext: any
	remotePlayer: any
	remotePlayerController: any
	subtitles: Array<Subtitle>
	castButton!: HTMLElement
	backupAutoHide: Boolean | null

	providers = ['html5']
	types = ['video']

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.player Player instance
	 */
	constructor({ player, options }: pluginParameter) {
		this.player = player
		this.options = options
		this.subtitles = []
		this.backupAutoHide = null

		this.onLoadMediaSuccess = this.onLoadMediaSuccess.bind(this)
		this.onCastStateChange = this.onCastStateChange.bind(this)
		this.onClickOnCastButton = this.onClickOnCastButton.bind(this)
	}

	/**
	 * Initialize the plugin
	 */
	init() {
		window.__onGCastApiAvailable = (isAvailable: Boolean) => isAvailable && this.initCastApi()
		this.loadWebSenderApi()
	}

	loadWebSenderApi() {
		const script = document.createElement('script')
		script.defer = true
		script.type = 'text/javascript'
		script.src = '//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1'
		document.getElementsByTagName('body')[0].appendChild(script)
	}

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

		this.subtitles = this.getSubtitles()
		this.render()
		this.castButton = this.player.elements.container.querySelector('.v-castButton')
		this.addEvents()
	}

	onReady() {}

	getSubtitles(): Array<Subtitle> {
		return [...this.player.media.querySelectorAll('track')].map((track) => ({
			url: track.getAttribute('src'),
			label: track.getAttribute('label'),
			language: track.getAttribute('srclang')
		}))
	}

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

	addEvents() {
		this.castContext.addEventListener(
			window.cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
			this.onCastStateChange
		)

		this.castButton.addEventListener('click', this.onClickOnCastButton)
		this.player.on('trackdisabled', (e: Event) => {
			console.log('trackdisabled')
		})
		this.player.on('trackenabled', (e: Event) => {
			console.log('trackenabled')
		})
	}

	onCastStateChange(e: CastEvent) {
		console.log('onCastStateChange', e)
		switch (e.sessionState) {
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

	onSessionStart() {
		this.backupAutoHide = this.player.Vlitejs.autoHideGranted
		this.player.Vlitejs.autoHideGranted = false
		this.player.Vlitejs.stopAutoHideTimer()
		this.player.elements.container.classList.add('v-remote')

		this.castButton.classList.add('active')
		this.player.isChromecast = true

		const friendlyName =
			this.castContext.getCurrentSession().getCastDevice().friendlyName || 'Chromecast'
		this.player.media.insertAdjacentHTML(
			'afterend',
			`<span class="v-chromecastName">Cast on ${friendlyName}</span>`
		)

		this.loadMedia()
	}

	onSessionStop() {
		this.player.Vlitejs.autoHideGranted = this.backupAutoHide
		this.backupAutoHide && this.player.Vlitejs.startAutoHideTimer()

		this.castButton.classList.remove('active')
		this.player.elements.container.classList.remove('v-remote')
		this.player.isChromecast = false

		if (!this.player.isPaused) {
			this.player.methodPlay()
			this.player.Vlitejs.startAutoHideTimer()
		}
	}

	onClickOnCastButton(e: Event) {
		e.preventDefault()
		this.castContext.requestSession()
	}

	getSession() {
		return this.castContext.getCurrentSession()
	}

	loadMedia() {
		const session = this.getSession()
		if (!session) return

		const mediaInfo = new window.chrome.cast.media.MediaInfo(this.player.media.src)
		mediaInfo.contentType = this.player.type === 'video' ? 'video/mp4' : ''

		const textTrackStyle = new window.chrome.cast.media.TextTrackStyle()
		mediaInfo.textTrackStyle = {
			backgroundColor: '#ffffff00',
			edgeColor: '#00000016',
			edgeType: 'DROP_SHADOW',
			fontFamily: 'CASUAL',
			fontScale: 1.0,
			foregroundColor: '#ffffffff',
			...this.options.textTrackStyle
		}

		var metadata = new window.chrome.cast.media.GenericMediaMetadata()
		mediaInfo.metadata = {
			images: [new window.chrome.cast.Image(this.player.options.poster)],
			...this.options.metadata
		}

		if (this.subtitles.length) {
			mediaInfo.tracks = this.getCastTracks()
		}

		const loadRequest = new window.chrome.cast.media.LoadRequest(mediaInfo)
		loadRequest.autoplay = this.player.isPaused === false
		loadRequest.currentTime = this.player.media.currentTime
		loadRequest.playbackRate = 3

		// console.log(this.player.plugins.subtitle.trackIsEnabled)
		// if (this.player.plugins.subtitle.trackIsEnabled) {
		loadRequest.activeTrackIds = [1]
		// }
		session.loadMedia(loadRequest).then(this.onLoadMediaSuccess)
	}

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

	onLoadMediaSuccess() {
		if (!this.player.isPaused) {
			this.player.methodPause()
		}

		this.player.on('play', () => {
			this.remotePlayerController.playOrPause()
		})
		this.player.on('pause', () => {
			this.remotePlayerController.playOrPause()
		})
		this.player.on('volumechange', () => {
			this.player.getVolume().then((volume: number) => {
				this.remotePlayer.volumeLevel = this.player.isMuted ? 0 : volume
				this.remotePlayerController.setVolumeLevel()
			})
		})

		this.player.on('timeupdate', () => {
			this.player.getCurrentTime().then((currentTime: number) => {
				// this.remotePlayer.currentTime = currentTime
				// this.remotePlayerController.seek()
			})
		})

		this.player.getRemoteCurrentTime = () => this.remotePlayer.currentTime
		setInterval(() => {
			!this.player.isPaused && this.player.onTimeUpdate(true)
			// this.player.methodSeekTo(this.player.getRemoteCurrentTime())
		}, 1000)
	}
}

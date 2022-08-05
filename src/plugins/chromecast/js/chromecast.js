import svgCast from 'shared/assets/svgs/cast.svg'

/**
 * Vlitejs Chromecast plugin
 * @module Vlitejs/plugins/chromecast
 */
export default class ChromecastPlugin {
	providers = ['html5']
	types = ['video']

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.player Player instance
	 */
	constructor({ player }) {
		this.player = player

		this.onLoadMediaSuccess = this.onLoadMediaSuccess.bind(this)
		this.onLoadMediaError = this.onLoadMediaError.bind(this)
		this.onCastStateChange = this.onCastStateChange.bind(this)
		this.onClickOnCastButton = this.onClickOnCastButton.bind(this)
	}

	/**
	 * Initialize the plugin
	 */
	init() {
		window.__onGCastApiAvailable = (isAvailable) => isAvailable && this.initCastApi()
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
		this.render()
		this.castButton = this.player.elements.container.querySelector('.v-castButton')

		this.getCastInstance().setOptions({
			receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
			autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
		})
		this.addEvents()
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

	getSession() {
		return this.getCastInstance().getCurrentSession()
	}

	addEvents() {
		this.castButton.addEventListener('click', this.onClickOnCastButton)
		this.getCastInstance().addEventListener(
			cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
			this.onCastStateChange
		)
	}

	onCastStateChange(e) {
		// console.log('onCastStateChange', e)

		switch (e.sessionState) {
			case cast.framework.SessionState.SESSION_STARTED:
				this.remotePlayerStart()
				break
			case cast.framework.SessionState.SESSION_RESUMED:
				this.remotePlayerResume()
				break
			case cast.framework.SessionState.SESSION_ENDED:
				this.remotePlayerStop()
				break
		}
	}

	remotePlayerStart() {
		this.backupAutoHide = this.player.Vlitejs.autoHideGranted
		this.player.Vlitejs.autoHideGranted = false
		this.player.Vlitejs.stopAutoHideTimer()
		this.player.elements.container.classList.add('v-remote')
		this.loadMedia()
	}

	remotePlayerResume() {
		this.player.play()
		this.remotePlayerStart()
	}

	remotePlayerStop() {
		this.player.Vlitejs.autoHideGranted = this.backupAutoHide
		if (this.backupAutoHide) {
			this.player.Vlitejs.startAutoHideTimer()
		}
		this.castButton.classList.remove('active')
		this.player.elements.container.classList.remove('v-remote')
		this.player.isChromecast = false

		if (!this.player.isPaused) {
			this.player.methodPlay()
			this.player.Vlitejs.startAutoHideTimer()
		}
	}

	onClickOnCastButton(e) {
		e.preventDefault()

		const session = this.getSession()
		if (session) {
			this.getCastInstance().endCurrentSession()
		} else {
			this.getCastInstance()
				.requestSession()
				.then(this.onRequestSessionInitializeSuccess, this.onRequestSessionError)
		}
	}

	getCastInstance() {
		return cast.framework.CastContext.getInstance()
	}

	loadMedia() {
		const session = this.session || this.getSession()
		if (!session) return

		const mediaSrc = this.player.media.src
		const contentType = this.player.type === 'video' ? 'video/mp4' : ''
		const mediaInfo = new chrome.cast.media.MediaInfo(mediaSrc, contentType)
		const request = new chrome.cast.media.LoadRequest(mediaInfo)
		request.autoplay = !this.player.isPaused
		request.currentTime = this.player.media.currentTime
		session.loadMedia(request).then(this.onLoadMediaSuccess, this.onLoadMediaError)

		// this.player.plugins.subtitle && this.addTracks()
	}

	addTracks() {
		this.player.plugins.subtitle.tracks.forEach((track) => {
			const castTrack = new chrome.cast.media.Track(1, chrome.cast.media.TrackType.TEXT)
			castTrack.trackContentId =
				'https://yoriiis.github.io/cdn/static/vlitejs/demo-video-html5-subtitle-en.vtt'
			castTrack.trackContentType = 'text/vtt'
			castTrack.subtype = chrome.cast.media.TextTrackType.SUBTITLES
			castTrack.name = track.label
			castTrack.language = track.language
			console.log(castTrack)
		})
	}

	onLoadMediaSuccess(e) {
		// console.log('onLoadMediaSuccess', e)

		if (!this.player.isPaused) {
			this.player.methodPause()
		}

		this.remotePlayer = new cast.framework.RemotePlayer()
		this.remotePlayerController = new cast.framework.RemotePlayerController(this.remotePlayer)

		this.player.on('play', () => {
			this.remotePlayerController.playOrPause()
		})
		this.player.on('pause', () => {
			this.remotePlayerController.playOrPause()
		})
		this.player.on('volumechange', () => {
			this.player.getVolume().then((volume) => {
				this.remotePlayer.volumeLevel = this.player.isMuted ? 0 : volume
				this.remotePlayerController.setVolumeLevel()
			})
		})

		this.player.on('timeupdate', () => {
			this.player.getCurrentTime().then((currentTime) => {
				// this.remotePlayer.currentTime = currentTime
				// this.remotePlayerController.seek()
			})
		})

		this.castButton.classList.add('active')
		this.player.isChromecast = true

		this.player.getRemoteCurrentTime = () => this.remotePlayer.currentTime
		setInterval(() => {
			!this.player.isPaused && this.player.onTimeUpdate(true)
			// this.player.methodSeekTo(this.player.getRemoteCurrentTime())
		}, 1000)
	}

	onLoadMediaError(e) {
		// console.log('onLoadMediaError', e)
	}
}

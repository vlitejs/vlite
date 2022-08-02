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

		this.sessionListener = this.sessionListener.bind(this)
		this.receiverListener = this.receiverListener.bind(this)
		this.onInitializeSuccess = this.onInitializeSuccess.bind(this)
		this.onInitializeError = this.onInitializeError.bind(this)
		this.onStopCastSuccess = this.onStopCastSuccess.bind(this)
		this.onStopCastError = this.onStopCastError.bind(this)
		this.onRequestSessionInitializeSuccess = this.onRequestSessionInitializeSuccess.bind(this)
		this.onRequestSessionError = this.onRequestSessionError.bind(this)
		this.onLoadMediaSuccess = this.onLoadMediaSuccess.bind(this)
		this.onLoadMediaError = this.onLoadMediaError.bind(this)
	}

	/**
	 * Initialize the plugin
	 */
	init() {
		document.createElement('google-cast-launcher')
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
		const applicationId = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
		// const sessionRequest = new chrome.cast.SessionRequest(applicationId)
		// const apiConfig = new chrome.cast.ApiConfig(
		// 	sessionRequest,
		// 	this.sessionListener,
		// 	this.receiverListener
		// )
		// chrome.cast.initialize(apiConfig, this.onInitializeSuccess, this.onInitializeError)

		this.render()

		const context = cast.framework.CastContext.getInstance()
		// console.log(context)
		context.addEventListener(cast.framework.CastContextEventType.SESSION_STATE_CHANGED, (e) => {
			console.log(e)

			switch (e.sessionState) {
				case cast.framework.SessionState.SESSION_STARTED:
				case cast.framework.SessionState.SESSION_RESUMED:
					this.loadMedia()
					break
			}
		})

		context.setOptions({
			receiverApplicationId: applicationId,
			autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
		})

		// console.log(context.getCurrentSession())

		// const mediaSrc = this.player.media.src
		// const contentType = this.player.type === 'video' ? 'video/mp4' : ''
		// const mediaInfo = new chrome.cast.media.MediaInfo(mediaSrc, contentType)
		// const request = new chrome.cast.media.LoadRequest(mediaInfo)
		// this.getSession()
		// 	.loadMedia(request)
		// 	.then(
		// 		function () {
		// 			console.log('Load succeed')
		// 		},
		// 		function (errorCode) {
		// 			console.log('Error code: ' + errorCode)
		// 		}
		// 	)
	}

	render() {
		const controlBar = this.player.elements.container.querySelector('.v-controlBar')
		const fullscreenButton = this.player.elements.container.querySelector('.v-fullscreenButton')
		const castButton = document.createElement('google-cast-launcher')
		castButton.classList.add('v-controlButton')
		if (controlBar) {
			if (fullscreenButton) {
				fullscreenButton.insertAdjacentElement('beforebegin', castButton)
			} else {
				controlBar.insertAdjacentElement('beforeend', castButton)
			}
		}
	}

	getSession() {
		return cast.framework.CastContext.getInstance().getCurrentSession()
	}

	// sessionListener(e) {
	// 	this.session = e
	// }

	// receiverListener(e) {}

	// onInitializeSuccess(e) {
	// 	console.log('onInitializeSuccess', e)
	// 	this.addEvents()
	// }

	// onInitializeError() {}

	// addEvents() {
	// 	document.querySelector('.cast-start').addEventListener('click', () => {
	// 		this.startCast()
	// 	})

	// 	document.querySelector('.cast-stop').addEventListener('click', () => {
	// 		this.stopCast()
	// 	})
	// }

	// startCast() {
	// 	chrome.cast.requestSession(
	// 		this.onRequestSessionInitializeSuccess,
	// 		this.onRequestSessionError
	// 	)
	// }

	// onRequestSessionInitializeSuccess(e) {
	// 	console.log('onRequestSessionInitializeSuccess', e)
	// 	this.session = e
	// 	this.session && this.loadMedia()
	// }

	// onRequestSessionError(e) {
	// 	console.log('onRequestSessionError', e)
	// }

	// stopCast() {
	// 	this.session.stop(this.onStopCastSuccess, this.onStopCastError)
	// }

	// onStopCastSuccess(e) {
	// 	console.log('onStopCastSuccess', e)
	// }

	// onStopCastError(e) {
	// 	console.log('onStopCastError', e)
	// }

	loadMedia() {
		const session = this.getSession()
		if (!session) {
			return
		}

		const mediaSrc = this.player.media.src
		const contentType = this.player.type === 'video' ? 'video/mp4' : ''
		const mediaInfo = new chrome.cast.media.MediaInfo(mediaSrc, contentType)
		mediaInfo.contentType = this.player.type === 'video' ? 'video/mp4' : ''
		const request = new chrome.cast.media.LoadRequest(mediaInfo)
		session.loadMedia(request).then(this.onLoadMediaSuccess, this.onLoadMediaError)

		this.player.plugins.subtitle && this.addTracks()
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
		console.log('onLoadMediaSuccess', e)
	}

	onLoadMediaError(e) {
		console.log('onLoadMediaError', e)
	}
}

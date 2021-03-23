if (typeof vlitejs === 'undefined') {
	throw new TypeError('vlitejs :: The library is not available.')
}

let youtubeQueue = []

/**
 * vlitejs Player Youtube
 * @module vlitejs/Player/PlayerYoutube
 */
class PlayerYoutube extends vlitejs.Player {
	isApiReady() {
		return new window.Promise((resolve) => {
			if (typeof window.YT !== 'undefined') {
				resolve()
			} else {
				youtubeQueue.push(this)
			}
		})
	}

	initReady() {
		super.initReady()

		// Init Youtube player with API
		this.initYoutubePlayer()
	}

	/**
	 * Initialize the Youtube player
	 */
	initYoutubePlayer() {
		this.instancePlayer = new window.YT.Player(this.element.getAttribute('id'), {
			videoId: this.element.getAttribute('data-youtube-id'),
			height: '100%',
			width: '100%',
			playerVars: {
				showinfo: 0,
				modestbranding: 0,
				autohide: 1,
				rel: 0,
				fs: this.options.fullscreen ? 1 : 0,
				wmode: 'transparent',
				playsinline: this.options.playsinline ? 1 : 0,
				controls: this.skinDisabled ? 1 : 0
			},
			events: {
				onReady: (data) => this.onPlayerReady(data),
				onStateChange: (state) => this.onPlayerStateChange(state)
			}
		})
	}

	/**
	 * Function executed when the player is ready
	 * @param {Object} data Youtube datas from the player API
	 */
	onPlayerReady(data) {
		this.element = data.target.getIframe()
		super.playerIsReady()
	}

	/**
	 * Get the player instance
	 * @returns {Object} Youtube API instance
	 */
	getInstance() {
		return this.instancePlayer
	}

	/**
	 * Function executed when the player state changed
	 * @param {Object} e Event listener datas
	 */
	onPlayerStateChange(e) {
		if (e.data === window.YT.PlayerState.UNSTARTED) {
			if (this.options.controls && this.options.time) {
				super.updateDuration()
			}
		} else if (e.data === window.YT.PlayerState.ENDED) {
			super.onVideoEnded()
		} else if (e.data === window.YT.PlayerState.PLAYING) {
			this.loading(false)

			if (this.options.controls) {
				setInterval(() => {
					super.onTimeUpdate()
				}, 100)
			}

			super.afterPlayPause('play')
		} else if (e.data === window.YT.PlayerState.PAUSED) {
			super.afterPlayPause('pause')
		} else if (e.data === window.YT.PlayerState.BUFFERING) {
			this.loading(true)
		}
	}

	/**
	 * Set the new current time for the player
	 * @param {Float|Integer} Current time video
	 */
	setCurrentTime(newTime) {
		this.instancePlayer.seekTo(newTime)
	}

	/**
	 * Get the player current time
	 * @returns {Float|Integer} Current time of the video
	 */
	getCurrentTime() {
		return new window.Promise((resolve) => resolve(this.instancePlayer.getCurrentTime()))
	}

	/**
	 * Get the player duration
	 * @returns {Float|Integer} Duration of the video
	 */
	getDuration() {
		return new window.Promise((resolve) => resolve(this.instancePlayer.getDuration()))
	}

	/**
	 * Function executed on the video progress changed
	 * @param {Object} e Event listener datas
	 */
	onProgressChanged(e) {
		this.getDuration().then((duration) => {
			this.setCurrentTime((e.target.value * duration) / 100)
		})
	}

	/**
	 * Play method of the player
	 */
	methodPlay() {
		this.instancePlayer.playVideo()
	}

	/**
	 * Pause method of the player
	 */
	methodPause() {
		this.instancePlayer.pauseVideo()
	}

	/**
	 * Mute method of the player
	 */
	methodMute() {
		this.instancePlayer.mute()
	}

	/**
	 * Unmute method of the player
	 */
	methodUnMute() {
		this.instancePlayer.unMute()
	}

	/**
	 * Remove the Youtube instance
	 */
	removeInstance() {
		this.instancePlayer.destroy()
	}
}

function onYoutubeApiReady() {
	youtubeQueue.forEach((item) => item.initReady())
	youtubeQueue = []
}

if (typeof window.YT === 'undefined') {
	const script = document.createElement('script')
	script.async = true
	script.type = 'text/javascript'
	script.src = 'https://youtube.com/iframe_api'

	window.onYouTubeIframeAPIReady = () => onYoutubeApiReady()
	document.getElementsByTagName('body')[0].appendChild(script)
}

export default PlayerYoutube

import Player from './player'

/**
 * vlitejs Player Youtube
 * @module vlitejs/Player/PlayerYoutube
 */
export default class PlayerYoutube extends Player {
	/**
	 * Get the type of the player
	 */
	get type () {
		return 'youtube'
	}

	/**
	 * Instanciate the constructor
	 * @constructor
	 * @param {String|Object} selector CSS selector or query selector
	 * @param {Object} options Player options
	 * @param {Function} onReady Callback function executed when the player is ready
	 */
	constructor ({selector, options, onReady}) {
		// Init Player class
		super({
			selector: selector,
			options: options,
			onReady: onReady
		})

		// Init Youtube player with API
		this.initYoutubePlayer()
	}

	/**
	 * Initialize the Youtube player
	 */
	initYoutubePlayer () {
		this.instancePlayer = new window.YT.Player(this.player.getAttribute('id'), {
			videoId: this.player.getAttribute('data-youtube-id'),
			height: '100%',
			width: '100%',
			playerVars: {
				'showinfo': 0,
				'modestbranding': 0,
				'autohide': 1,
				'rel': 0,
				'fs': this.options.fullscreen ? 1 : 0,
				'wmode': 'transparent',
				'playsinline': this.options.playsinline ? 1 : 0,
				'controls': this.skinDisabled ? 1 : 0
			},
			events: {
				'onReady': data => this.onPlayerReady(data),
				'onStateChange': state => this.onPlayerStateChange(state)
			}
		})
	}

	/**
	 * Function executed when the player is ready
	 * @param {Object} data Youtube datas from the player API
	 */
	onPlayerReady (data) {
		this.player = data.target.getIframe()
		super.playerIsReady()
	}

	/**
	 * Get the player instance
	 * @returns {Object} Youtube API instance
	 */
	getInstance () {
		return this.instancePlayer
	}

	/**
	 * Function executed when the player state changed
	 * @param {Object} e Event listener datas
	 */
	onPlayerStateChange (e) {
		switch (e.data) {
		case window.YT.PlayerState.UNSTARTED:
			if (this.options.controls && this.options.time) {
				super.updateDuration()
			}
			break

		case window.YT.PlayerState.ENDED:
			super.onVideoEnded()
			break

		case window.YT.PlayerState.PLAYING:

			this.loading(false)

			if (this.options.controls) {
				setInterval(() => {
					super.updateCurrentTime()
				}, 100)
			}

			super.afterPlayPause('play')
			break

		case window.YT.PlayerState.PAUSED:
			super.afterPlayPause('pause')
			break

		case window.YT.PlayerState.BUFFERING:
			this.loading(true)
			break
		}
	}

	/**
	 * Set the new current time for the player
	 * @param {Float|Integer} Current time video
	 */
	setCurrentTime (newTime) {
		this.instancePlayer.seekTo(newTime)
	}

	/**
	 * Get the player current time
	 * @returns {Float|Integer} Current time of the video
	 */
	getCurrentTime () {
		return this.instancePlayer.getCurrentTime()
	}

	/**
	 * Get the player duration
	 * @returns {Float|Integer} Duration of the video
	 */
	getDuration () {
		return this.instancePlayer.getDuration()
	}

	/**
	 * Function executed on the video progress changed
	 * @param {Object} e Event listener datas
	 */
	onProgressChanged (e) {
		this.setCurrentTime((e.target.value * this.getDuration()) / 100)
	}

	/**
	 * Play method of the player
	 */
	methodPlay () {
		this.instancePlayer.playVideo()
	}

	/**
	 * Pause method of the player
	 */
	methodPause () {
		this.instancePlayer.pauseVideo()
	}

	/**
	 * Mute method of the player
	 */
	methodMute () {
		this.instancePlayer.mute()
	}

	/**
	 * Unmute method of the player
	 */
	methodUnMute () {
		this.instancePlayer.unMute()
	}

	/**
	 * Remove the Youtube instance
	 */
	removeInstance () {
		this.instancePlayer.destroy()
	}
}

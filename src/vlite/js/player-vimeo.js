import Player from './player'

/**
 * vlitejs Player Vimeo
 * @module vlitejs/Player/PlayerVimeo
 */
export default class PlayerVimeo extends Player {
	type = 'vimeo'

	/**
	 * Instanciate the constructor
	 * @constructor
	 * @param {String|Object} selector CSS selector or query selector
	 * @param {Object} options Player options
	 * @param {Function} onReady Callback function executed when the player is ready
	 */
	constructor({ selector, options, onReady }) {
		// Init Player class
		super({
			selector,
			options,
			onReady
		})

		this.onPlayerReady = this.onPlayerReady.bind(this)
		this.updateDuration = this.updateDuration.bind(this)
		this.updateCurrentTime = this.updateCurrentTime.bind(this)
		this.onVideoEnded = this.onVideoEnded.bind(this)
		this.onPlaying = this.onPlaying.bind(this)
		this.onWaiting = this.onWaiting.bind(this)
		this.onSeeking = this.onSeeking.bind(this)
		this.onSeeked = this.onSeeked.bind(this)
	}

	init() {
		super.init()

		// Init Vimeo player with API
		this.initVimeoPlayer()
	}

	/**
	 * Initialize the Vimeo player
	 */
	initVimeoPlayer() {
		this.instancePlayer = new window.Vimeo.Player(this.player.getAttribute('id'), {
			id: this.player.getAttribute('data-vimeo-id'),
			controls: true
		})
		this.instancePlayer.ready().then(this.onPlayerReady())
	}

	/**
	 * Function executed when the player is ready
	 */
	onPlayerReady() {
		this.player = this.instancePlayer.element
		super.playerIsReady()
		this.addSpecificEvents()
	}

	/**
	 * Create event listeners
	 * All listeners are created on class properties to facilitate the deletion of events
	 */
	addSpecificEvents() {
		if (this.options.controls) {
			if (this.options.time) {
				// On durationchange event, update duration if value is different
				this.instancePlayer.on('durationchange', this.updateDuration)
			}

			// On timeupdate event, update currentTime displaying in the control bar and the width of the progress bar
			this.instancePlayer.on('timeupdate', this.updateCurrentTime)
		}

		// On ended event, show poster and reset progressBar and time
		this.instancePlayer.on('ended', this.onVideoEnded)
		this.instancePlayer.on('playing', this.onPlaying)
		this.instancePlayer.on('waiting', this.onWaiting)
		this.instancePlayer.on('seeking', this.onSeeking)
		this.instancePlayer.on('seeked', this.onSeeked)
	}

	/**
	 * Get the player instance
	 * @returns {Object} Vimeo API instance
	 */
	getInstance() {
		return this.instancePlayer
	}

	/**
	 * Get the player current time
	 * @returns {Float|Integer} Current time of the video
	 */
	getCurrentTime() {
		return new window.Promise((resolve) => {
			this.instancePlayer.getCurrentTime().then((seconds) => resolve(seconds))
		})
	}

	/**
	 * Set the new current time for the player
	 * @param {Float|Integer} Current time video
	 */
	setCurrentTime(newTime) {
		this.instancePlayer.setCurrentTime(newTime)
	}

	/**
	 * Get the player duration
	 * @returns {Float|Integer} Duration of the video
	 */
	getDuration() {
		return new window.Promise((resolve) => {
			this.instancePlayer.getDuration().then((duration) => resolve(duration))
		})
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
		this.instancePlayer.play()
	}

	/**
	 * Pause method of the player
	 */
	methodPause() {
		this.instancePlayer.pause()
	}

	/**
	 * Mute method of the player
	 */
	methodMute() {
		this.instancePlayer.setVolume(0)
	}

	/**
	 * Unmute method of the player
	 */
	methodUnMute() {
		this.instancePlayer.setVolume(1)
	}

	/**
	 * Function executed when the video is waiting
	 */
	onWaiting() {
		this.loading(true)
	}

	/**
	 * Function executed when the video is playing
	 */
	onPlaying() {
		this.loading(false)
	}

	/**
	 * Function executed when the video is seeking
	 */
	onSeeking() {
		this.loading(true)
	}

	/**
	 * Function executed when the video seek is done
	 */
	onSeeked() {
		this.loading(false)
	}

	/**
	 * Unbind event listeners
	 */
	removeSpecificEvents() {
		this.options.time && this.instancePlayer.off('durationchange', this.updateDuration)

		this.instancePlayer.off('timeupdate', this.updateCurrentTime)
		this.instancePlayer.off('playing', this.onPlaying)
		this.instancePlayer.off('waiting', this.onWaiting)
		this.instancePlayer.off('seeking', this.onSeeking)
		this.instancePlayer.off('seeked', this.onSeeked)
		this.instancePlayer.off('ended', this.onVideoEnded)
	}

	/**
	 * Remove the Vimeo instance
	 */
	removeInstance() {
		this.instancePlayer.destroy()
	}
}

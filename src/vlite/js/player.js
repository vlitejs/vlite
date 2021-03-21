// Import SVG icons
import { createElement, Fragment } from 'jsx-dom'
import validateTarget from 'validate-target'
import LoaderTemplate from 'shared/loader/assets/scripts/loader'
import ControlBarTemplate from 'shared/control-bar/assets/scripts/control-bar'
import BigPlayTemplate from 'shared/big-play/assets/scripts/big-play'
import OverlayTemplate from 'shared/overlay/assets/scripts/overlay'
import PosterTemplate from 'shared/poster/assets/scripts/poster'

/**
 * vlitejs Player
 * @module vlitejs/Player
 */
export default class Player {
	/**
	 * Instanciate the constructor
	 * @constructor
	 * @param {String|Object} selector CSS selector or query selector
	 * @param {Object} options Player options
	 * @param {Function} onReady Callback function executed when the player is ready
	 */
	constructor({ selector, options, onReady }) {
		this.onReady = onReady
		this.isFullScreen = false
		this.isPaused = null
		this.player = selector
		this.touchSupport = this.isTouch()
		this.skinDisabled = false
		this.delayAutoHide = 3000

		let customOptions = {}

		const DEFAULT_OPTIONS = {
			autoplay: false,
			controls: true,
			playPause: true,
			progressBar: true,
			time: true,
			volume: true,
			fullscreen: true,
			poster: null,
			bigPlay: true,
			autoHide: false,
			nativeControlsForTouch: false,
			playsinline: true
		}

		// Check if options have gone through DOM with data attribute
		if (this.player.hasAttribute('data-options')) {
			// Check if there is a conflict with the constructor options
			if (options !== undefined) {
				console.warn(
					`vLitejs :: Option passed in "${selector}" by data attribute is priority over object in constructor.`
				)
			}

			customOptions = JSON.parse(this.player.getAttribute('data-options'))
		} else {
			// No conflict, we can use options in the constructor
			customOptions = options
		}

		this.options = Object.assign({}, DEFAULT_OPTIONS, customOptions)

		// Keep player native control and disable custom skin
		if (this.options.nativeControlsForTouch) {
			this.skinDisabled = true
			this.player.setAttribute('controls', 'controls')
			this.options.controls = false
		}

		// Add play inline attribute
		if (this.options.playsinline) {
			this.player.setAttribute('playsinline', true)
			this.player.setAttribute('webkit-playsinline', true)
		}

		// Check fullscreen support API on different browsers and cached prefixs
		this.supportFullScreen = this.constructor.checkSupportFullScreen()

		this.onClickOnPlayer = this.onClickOnPlayer.bind(this)
		this.togglePlayPause = this.togglePlayPause.bind(this)
		this.toggleVolume = this.toggleVolume.bind(this)
		this.toggleFullscreen = this.toggleFullscreen.bind(this)
		this.onKeyup = this.onKeyup.bind(this)
		this.onMousemove = this.onMousemove.bind(this)
		this.onChangeFullScreen = this.onChangeFullScreen.bind(this)
		this.onDoubleClickOnPlayer = this.onDoubleClickOnPlayer.bind(this)

		this.onProgressChanged = this.onProgressChanged.bind(this)
	}

	init() {
		this.render()
		this.addEvents()
	}

	/**
	 * Build the DOM of the player
	 */
	render() {
		// Create a wrapper for each player
		const wrapper = document.createElement('div')
		wrapper.setAttribute('class', 'v-vlite v-firstStart v-paused v-loading')
		wrapper.setAttribute('tabindex', 0)
		this.player.parentNode.insertBefore(wrapper, this.player)
		wrapper.appendChild(this.player)
		this.wrapperPlayer = this.player.parentNode

		if (this.skinDisabled) {
			this.wrapperPlayer.classList.add('v-forceControls')
		}

		wrapper.appendChild(
			<>
				{!this.options.nativeControlsForTouch && (
					<>
						<OverlayTemplate fastForward={!this.touchSupport} />
						<LoaderTemplate />
						<PosterTemplate posterUrl={this.options.poster} />
						{this.options.bigPlay && <BigPlayTemplate />}
						{this.options.controls && (
							<ControlBarTemplate
								progressBar={this.options.progressBar}
								playPause={this.options.playPause}
								time={this.options.time}
								volume={this.options.volume}
								fullscreen={this.options.fullscreen}
							/>
						)}
					</>
				)}
			</>
		)
	}

	/**
	 * Create event listeners
	 * All listeners are created on class properties to facilitate the deletion of events
	 */
	addEvents() {
		if (this.options.controls && this.options.progressBar) {
			this.wrapperPlayer
				.querySelector('.v-progressBar')
				.addEventListener('change', this.onProgressChanged)
		}

		this.wrapperPlayer.addEventListener('click', this.onClickOnPlayer)
		this.wrapperPlayer.addEventListener('dblclick', this.onDoubleClickOnPlayer)
		this.wrapperPlayer.addEventListener('keyup', this.onKeyup)
		this.wrapperPlayer.addEventListener('mousemove', this.onMousemove)

		window.addEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen)
	}

	// Create fullscreen button event listener
	// Detect fullscreen change, particulary util for esc key because state is not updated
	// More information on MDN : https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
	onChangeFullScreen(e) {
		if (!document[this.supportFullScreen.isFullScreen] && this.isFullScreen) {
			this.exitFullscreen(e.target)
		}
	}

	onClickOnPlayer(e) {
		const target = e.target
		const validateTargetPlayPauseButton = validateTarget({
			target: target,
			selectorString: '.v-playPauseButton',
			nodeName: ['button']
		})
		const validateTargetPoster = validateTarget({
			target: target,
			selectorString: '.v-poster, .v-overlay',
			nodeName: ['div']
		})
		const validateTargetVolume = validateTarget({
			target: target,
			selectorString: '.v-volumeButton',
			nodeName: ['button']
		})
		const validateTargetFullscreen = validateTarget({
			target: target,
			selectorString: '.v-fullscreenButton',
			nodeName: ['button']
		})

		if (validateTargetPlayPauseButton || validateTargetPoster) {
			this.togglePlayPause(e)
		} else if (validateTargetVolume) {
			this.toggleVolume(e)
		} else if (validateTargetFullscreen) {
			this.toggleFullscreen(e)
		}
	}

	onDoubleClickOnPlayer(e) {
		const target = e.target
		const validateTargetOverlay = validateTarget({
			target: target,
			selectorString: '.v-overlay',
			nodeName: ['div']
		})
		if (validateTargetOverlay) {
			this.toggleFullscreen(e)
		}
	}

	/**
	 * Function executed when the player is ready
	 */
	playerIsReady() {
		this.loading(false)

		// Execute the onReady function
		if (typeof this.onReady === 'function') {
			this.onReady(this)
		}

		// If player has autoplay option, play now
		if (this.options.autoplay) {
			// Autoplay on video is authorize only when the video is muted
			if (!this.player.muted) {
				this.mute()
				console.warn('vLitejs :: Video muted to authorize autoplay option')
			}

			this.togglePlayPause()
		}
	}

	/**
	 * Update the loader status
	 * @param {Boolean} state Status of the loader
	 */
	loading(state) {
		if (state) {
			this.wrapperPlayer.classList.add('v-loading')
		} else {
			this.wrapperPlayer.classList.remove('v-loading')
		}
	}

	/**
	 * Update player duration
	 */
	updateDuration() {
		this.wrapperPlayer.querySelector('.v-duration').innerHTML = this.constructor.formatVideoTime(
			this.getDuration()
		)
	}

	/**
	 * Function executed when is video is ended
	 */
	onVideoEnded() {
		this.wrapperPlayer.classList.replace('v-playing', 'v-paused')
		this.wrapperPlayer.classList.add('v-firstStart')
		this.wrapperPlayer.querySelector('.v-poster').classList.add('v-active')

		if (this.options.controls) {
			this.wrapperPlayer.querySelector('.v-progressSeek').style.width = '0%'
			this.wrapperPlayer.querySelector('.v-progressInput').setAttribute('value', 0)
			this.wrapperPlayer.querySelector('.v-currentTime').innerHTML = '00:00'
		}
	}

	/**
	 * Function executed to toggle the video status (play, pause)
	 */
	togglePlayPause(e) {
		if (e) {
			e.preventDefault()
		}

		if (this.wrapperPlayer.classList.contains('v-paused')) {
			this.play()
		} else {
			this.pause()
		}
	}

	/**
	 * Trigger the video fast forward (front and rear)
	 * @param {Object} e Event listener datas
	 */
	fastForward({ direction }) {
		if (direction === 'backward') {
			this.seekTo(this.getCurrentTime() - 10)
		} else if (direction === 'forward') {
			this.seekTo(this.getCurrentTime() + 10)
		}
	}

	/**
	 * Play the video
	 */
	play() {
		if (this.wrapperPlayer.classList.contains('v-firstStart')) {
			this.wrapperPlayer.classList.remove('v-firstStart')
			this.wrapperPlayer.querySelector('.v-poster').classList.remove('v-active')
		}

		this.methodPlay()
		this.isPaused = false
		this.afterPlayPause()
	}

	/**
	 * Pause the video
	 */
	pause() {
		this.methodPause()
		this.isPaused = true
		this.afterPlayPause()
	}

	/**
	 * Function executed after the play or pause method
	 */
	afterPlayPause() {
		if (this.isPaused) {
			this.wrapperPlayer.classList.replace('v-playing', 'v-paused')
		} else {
			this.wrapperPlayer.classList.replace('v-paused', 'v-playing')
		}

		if (this.options.autoHide && this.options.controls) {
			if (this.isPaused) {
				this.wrapperPlayer.querySelector('.v-controlBar').classList.remove('hidden')
			} else {
				this.timerAutoHide = setTimeout(() => {
					this.wrapperPlayer.querySelector('.v-controlBar').classList.add('hidden')
				}, this.delayAutoHide)
			}
		}
	}

	/**
	 * Toggle the volume on the video
	 */
	toggleVolume(e) {
		e.preventDefault()
		const volumeButton = this.wrapperPlayer.querySelector('.v-volumeButton')

		if (volumeButton.classList.contains('v-muted')) {
			this.unMute()
		} else {
			this.mute()
		}
	}

	/**
	 * Mute the volume on the video
	 */
	mute() {
		this.methodMute()
		this.wrapperPlayer.querySelector('.v-volumeButton').classList.add('v-muted')
	}

	/**
	 * Toggle the volume on the video
	 */
	unMute() {
		this.methodUnMute()
		this.wrapperPlayer.querySelector('.v-volumeButton').classList.remove('v-muted')
	}

	/**
	 * Update the current time of the video
	 * @param {Float|Integer} newTime New current time of the video
	 */
	seekTo(newTime) {
		this.setCurrentTime(newTime)
	}

	/**
	 * Toggle the fullscreen of the video
	 */
	toggleFullscreen(e) {
		e.preventDefault()
		if (this.isFullScreen) {
			this.exitFullscreen()
		} else {
			this.requestFullscreen()
		}
	}

	/**
	 * Check fullscreen support API on different browsers and cached prefixs
	 */
	static checkSupportFullScreen() {
		const prefixs = ['', 'moz', 'webkit', 'ms', 'o']
		let lengthPrefixs = prefixs.length
		let requestFn
		let cancelFn
		let changeEvent
		let isFullScreen

		if (document.cancelFullscreen !== undefined) {
			requestFn = 'requestFullscreen'
			cancelFn = 'exitFullscreen'
			changeEvent = 'fullscreenchange'
		} else {
			while (lengthPrefixs--) {
				if (
					(prefixs[lengthPrefixs] !== 'moz' || document.mozFullScreenEnabled) &&
					document[prefixs[lengthPrefixs] + 'CancelFullScreen'] !== undefined
				) {
					requestFn = prefixs[lengthPrefixs] + 'RequestFullScreen'
					cancelFn = prefixs[lengthPrefixs] + 'CancelFullScreen'
					changeEvent = prefixs[lengthPrefixs] + 'fullscreenchange'
					isFullScreen =
						prefixs[lengthPrefixs] === 'webkit'
							? prefixs[lengthPrefixs] + 'IsFullScreen'
							: prefixs[lengthPrefixs] + 'FullScreen'
				}
			}
		}

		const fullscreen = {
			requestFn: requestFn,
			cancelFn: cancelFn,
			changeEvent: changeEvent,
			isFullScreen: isFullScreen
		}

		return requestFn ? fullscreen : false
	}

	/**
	 * Request fullscreen after user action
	 */
	requestFullscreen() {
		const { requestFn } = this.supportFullScreen

		if (this.player[requestFn]) {
			// Request fullscreen on parentNode player, to display custom controls
			this.player.parentNode[requestFn]()
			this.isFullScreen = true
			this.wrapperPlayer.classList.add('v-fullscreenButton-display')
			this.wrapperPlayer.querySelector('.v-fullscreenButton').classList.add('v-exit')
		}
	}

	/**
	 * Exit fullscreen after user action
	 */
	exitFullscreen() {
		const { cancelFn } = this.supportFullScreen

		if (document[cancelFn]) {
			document[cancelFn]()

			this.wrapperPlayer.classList.remove('v-fullscreenButton-display')
			this.wrapperPlayer.querySelector('.v-fullscreenButton').classList.remove('v-exit')

			this.isFullScreen = false
		}
	}

	/**
	 * Function executed on keyup event listener
	 * Toggle the video on spacebar press
	 * @param {Object} e Event listener datas
	 */
	onKeyup(e) {
		if (e.keyCode === 32) {
			this.togglePlayPause()
		} else if (e.keyCode === 37) {
			this.fastForward({ direction: 'backward' })
		} else if (e.keyCode === 39) {
			this.fastForward({ direction: 'forward' })
		}
	}

	/**
	 * Function executed on mousemove event listener
	 * Toggle controls display on mousemove event
	 */
	onMousemove() {
		if (this.isPaused === false && this.options.autoHide && this.options.controls) {
			this.wrapperPlayer.querySelector('.v-controlBar').classList.remove('hidden')
			clearTimeout(this.timerAutoHide)

			this.timerAutoHide = setTimeout(() => {
				this.wrapperPlayer.querySelector('.v-controlBar').classList.add('hidden')
			}, this.delayAutoHide)
		}
	}

	/**
	 * Update current time displaying in the control bar and the width of the progress bar
	 */
	updateCurrentTime() {
		const currentTime = Math.round(this.getCurrentTime())
		const duration = this.getDuration()
		const width = (currentTime * 100) / duration
		const timeElement = this.wrapperPlayer.querySelector('.v-currentTime')

		this.wrapperPlayer.querySelector('.v-progressSeek').style.width = `${width}%`

		if (timeElement !== null) {
			timeElement.innerHTML = this.constructor.formatVideoTime(currentTime)
		}
	}

	/**
	 * Unbind event listeners
	 */
	removeEvents() {
		if (this.options.controls && this.options.progressBar) {
			this.wrapperPlayer
				.querySelector('.v-progressBar')
				.removeEventListener('change', this.onProgressChanged)
		}

		this.wrapperPlayer.removeEventListener('click', this.onClickOnPlayer)
		this.wrapperPlayer.removeEventListener('dblclick', this.onDoubleClickOnPlayer)
		this.wrapperPlayer.removeEventListener('keyup', this.onKeyup)
		this.wrapperPlayer.removeEventListener('mousemove', this.onMousemove)

		window.removeEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen)
	}

	/**
	 * Destroy the player
	 * Remove event listeners, player instance and player HTML
	 */
	destroy() {
		this.pause()
		this.removeEvents()

		typeof this.removeSpecificEvents === 'function' && this.removeSpecificEvents()
		typeof this.removeInstance === 'function' && this.removeInstance()

		this.wrapperPlayer.remove()
	}

	/**
	 * Check if browser support touch event
	 * @returns {Boolean} Touch event support
	 */
	isTouch() {
		return (
			'ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch)
		)
	}

	/**
	 * Convert video time second to 00:00 display
	 * @param {Float|Integer} time Current time
	 */
	static formatVideoTime(time) {
		const ms = time * 1000
		const min = (ms / 1000 / 60) << 0
		const sec = (ms / 1000) % 60 << 0
		let timeInString = ''

		timeInString += min < 10 ? '0' : ''
		timeInString += min + ':'
		timeInString += sec < 10 ? '0' : ''
		timeInString += sec

		return timeInString
	}
}

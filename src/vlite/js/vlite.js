/**
 * @license MIT
 * @name vlitejs
 * @version 4.0.0
 * @author: Yoriiis aka Joris DANIEL <joris.daniel@gmail.com>
 * @description: vLitejs is a fast and lightweight Javascript library for customizing HTML5 and Youtube video players in Javascript with a minimalist theme
 * {@link https://yoriiis.github.io/vlitejs}
 * @copyright 2021 Joris DANIEL <https://yoriiis.github.io/vlitejs>
 **/

'use strict'

import PlayerHtml5 from '../../providers/html5'
import Player from './player'
import { createElement, Fragment } from 'jsx-dom'
import validateTarget from 'validate-target'
import { capitalized, isTouch, checkSupportFullScreen } from 'shared/utils/utils'
import LoaderTemplate from 'shared/loader/assets/scripts/loader'
import BigPlayTemplate from 'shared/big-play/assets/scripts/big-play'
import OverlayTemplate from 'shared/overlay/assets/scripts/overlay'
import PosterTemplate from 'shared/poster/assets/scripts/poster'
import ControlBar from 'shared/control-bar/assets/scripts/control-bar'

const vliteProviders = {
	html5: PlayerHtml5
}
const vlitePlugins = {}
const DEFAULT_OPTIONS = {
	audio: {
		autoplay: false,
		controls: true,
		playPause: true,
		progressBar: true,
		time: true,
		volume: true,
		loop: false
	},
	video: {
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
		playsinline: true,
		loop: false,
		muted: false
	}
}

/**
 * vlitejs entrypoint
 * @module vLite/entrypoint
 */
class vlitejs {
	/**
	 * @constructor
	 * @param {Object} options
	 * @param {(String|HTMLElement)} options.selector CSS selector or HTML element
	 * @param {Object} options.options Player options
	 * @param {String} options.provider Player provider
	 * @param {Object} options.plugins Player plugins
	 * @param {Function} options.onReady Callback function when the player is ready
	 */
	constructor({ selector, options = {}, provider = 'html5', plugins = [], onReady }) {
		// Detect the type of the selector (string or HTMLElement)
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector)
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			throw new TypeError('vlitejs :: The element or selector supplied is not valid.')
		}

		this.plugins = plugins
		this.onReady = onReady
		this.delayAutoHide = 3000
		this.mode = this.element instanceof HTMLAudioElement ? 'audio' : 'video'
		this.touchSupport = isTouch()

		// Check fullscreen support API on different browsers and cached prefixs
		this.supportFullScreen = checkSupportFullScreen()

		// Update config from element attributes
		if (this.element.hasAttribute('autoplay')) {
			options.autoplay = true
		}
		if (this.element.hasAttribute('playsinline')) {
			options.playsinline = true
		}
		if (this.element.hasAttribute('muted')) {
			options.muted = true
		}
		if (this.element.hasAttribute('loop')) {
			options.loop = true
		}

		this.options = Object.assign({}, DEFAULT_OPTIONS[this.mode], options)
		this.autoHideGranted = this.mode === 'video' && this.options.autoHide && this.options.controls

		// Add play inline attribute
		if (this.options.playsinline) {
			this.element.setAttribute('playsinline', true)
			this.element.setAttribute('webkit-playsinline', true)
		}

		this.onClickOnPlayer = this.onClickOnPlayer.bind(this)
		this.togglePlayPause = this.togglePlayPause.bind(this)
		this.onDoubleClickOnPlayer = this.onDoubleClickOnPlayer.bind(this)
		this.onKeyup = this.onKeyup.bind(this)
		this.onMousemove = this.onMousemove.bind(this)
		this.onChangeFullScreen = this.onChangeFullScreen.bind(this)

		const ProviderInstance = vliteProviders[provider]
		if (!ProviderInstance) {
			throw new Error(`vlitejs :: Unknown provider "${provider}"`)
		}

		this.wrapElement()

		this.instancePlayer = new ProviderInstance({
			element: this.element,
			container: this.container,
			options: this.options,
			onCallbackReady: this.onCallbackReady.bind(this),
			instanceParent: this
		})
		this.instancePlayer.init()

		if (this.options.controls) {
			this.controlBar = new ControlBar({
				container: this.container,
				options: this.options,
				mode: this.mode,
				playerInstance: this.instancePlayer
			})
		}

		this.render()
		this.addEvents()
		this.getPluginInstance(this.plugins).forEach(({ id, Plugin }) => {
			const plugin = new Plugin({ player: this.instancePlayer })
			if (plugin.providers.includes(provider) && plugin.types.includes(this.mode)) {
				plugin.init()
			} else {
				throw new Error(
					`vlitejs :: The "${id}" plugin is only compatible with providers:"${plugin.providers}" and types:"${plugin.types}"`
				)
			}
		})
	}

	/**
	 * Get plugins instances from the registered list
	 * @param {Array} plugins List of plugins to enabled
	 * @returns {Array} List of plugins instances to enabled
	 */
	getPluginInstance(plugins) {
		const pluginsInstance = []
		const pluginsIds = Object.keys(vlitePlugins)

		plugins.forEach((id) => {
			if (pluginsIds.includes(id)) {
				pluginsInstance.push({ id, Plugin: vlitePlugins[id] })
			} else {
				throw new Error(`vlitejs :: Unknown plugin "${id}".`)
			}
		})

		return pluginsInstance
	}

	/**
	 * The player is initialized and ready
	 * @param {Class} response Player instance
	 */
	onCallbackReady(response) {
		this.loading(false)

		// Execute the callback function
		typeof this.callback === 'function' && this.callback(this)
	}

	/**
	 * Build the DOM of the player
	 */
	render() {
		this.container.appendChild(
			<>{this.mode === 'audio' ? this.renderAudioElement() : this.renderVideoElement()}</>
		)
		this.controlBar.init()
	}

	/**
	 * Render the video element
	 * @returns {HTMLElement} Generated HTML
	 */
	renderVideoElement() {
		return (
			<>
				<OverlayTemplate fastForward={!this.touchSupport} />
				<LoaderTemplate />
				{this.options.poster && <PosterTemplate posterUrl={this.options.poster} />}
				{this.options.bigPlay && <BigPlayTemplate />}
				{this.options.controls && this.controlBar.getTemplate()}
			</>
		)
	}

	/**
	 * Render the aido element
	 * @returns {HTMLElement} Generated HTML
	 */
	renderAudioElement() {
		return this.controlBar.getTemplate()
	}

	/**
	 * Add evnets listeners
	 */
	addEvents() {
		this.autoHideGranted && this.container.addEventListener('mousemove', this.onMousemove)
		this.container.addEventListener('click', this.onClickOnPlayer)
		this.container.addEventListener('dblclick', this.onDoubleClickOnPlayer)
		this.container.addEventListener('keyup', this.onKeyup)
		window.addEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen)
	}

	/**
	 * On click on the player
	 * @param {Object} e Event data
	 */
	onClickOnPlayer(e) {
		const target = e.target
		const validateTargetPlayPauseButton = validateTarget({
			target: target,
			selectorString: '.v-poster, .v-overlay, .v-bigPlay, .v-playPauseButton',
			nodeName: ['div', 'button']
		})

		if (validateTargetPlayPauseButton) {
			this.togglePlayPause(e)
		}
	}

	/**
	 * Toggle the video status (play|pause)
	 */
	togglePlayPause(e) {
		e && e.preventDefault()

		if (this.mode === 'video' && this.container.classList.contains('v-firstStart')) {
			this.container.focus()
		}

		this.container.classList.contains('v-paused')
			? this.instancePlayer.play()
			: this.instancePlayer.pause()
	}

	/**
	 * On keyup event on the media element
	 * @param {Object} e Event listener datas
	 */
	onKeyup(e) {
		// Stop and start the auto hide timer on selected key code
		const validKeyCode = [9, 32, 37, 39]
		if (this.autoHideGranted && validKeyCode.includes(e.keyCode)) {
			this.stopAutoHideTimer()
			this.startAutoHideTimer()
		}

		if (e.keyCode === 32) {
			// Toggle the media element on spacebar press
			this.togglePlayPause(e)
		} else if (e.keyCode === 37) {
			// Backward the media element on arrow left press
			this.fastForward('backward')
		} else if (e.keyCode === 39) {
			// Forward the media element on arrow right press
			this.fastForward('forward')
		}
	}

	/**
	 * Trigger the video fast forward (front and rear)
	 * @param {String} direction Direction (backward|forward)
	 */
	fastForward(direction) {
		this.instancePlayer.getCurrentTime().then((seconds) => {
			this.instancePlayer.seekTo(direction === 'backward' ? seconds - 5 : seconds + 5)
		})
	}

	/**
	 * On double click on the player
	 * @param {Object} e Event data
	 */
	onDoubleClickOnPlayer(e) {
		const target = e.target
		const validateTargetOverlay = validateTarget({
			target: target,
			selectorString: '.v-overlay',
			nodeName: ['div']
		})
		if (validateTargetOverlay) {
			this.instancePlayer.toggleFullscreen(e)
		}
	}

	/**
	 * Wrapa the media element
	 */
	wrapElement() {
		const wrapper = document.createElement('div')
		wrapper.classList.add(
			'v-vlite',
			'v-firstStart',
			'v-paused',
			'v-loading',
			`v-style${capitalized(this.mode)}`
		)
		wrapper.setAttribute('tabindex', 0)
		this.element.parentNode.insertBefore(wrapper, this.element)
		wrapper.appendChild(this.element)

		// Store the reference
		this.container = wrapper
	}

	/**
	 * On mousemove on the player
	 */
	onMousemove() {
		if (!this.isPaused) {
			this.stopAutoHideTimer()
			this.startAutoHideTimer()
		}
	}

	/**
	 * Stop the auto hide timer and show the video control bar
	 */
	stopAutoHideTimer() {
		if (this.mode === 'video') {
			this.container.querySelector('.v-controlBar').classList.remove('hidden')
			clearTimeout(this.timerAutoHide)
		}
	}

	/**
	 * Start the auto hide timer and hide the video control bar after a delay
	 */
	startAutoHideTimer() {
		if (this.mode === 'video' && !this.isPaused) {
			this.timerAutoHide = setTimeout(() => {
				this.container.querySelector('.v-controlBar').classList.add('hidden')
			}, this.delayAutoHide)
		}
	}

	/**
	 * On fullscreen change
	 * @doc https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
	 * @param {Object} e Event data
	 */
	onChangeFullScreen(e) {
		!document[this.supportFullScreen.isFullScreen] &&
			this.isFullScreen &&
			this.exitFullscreen(e.target)
	}

	/**
	 * Update the loader status
	 * @param {Boolean} state Status of the loader
	 */
	loading(state) {
		this.container.classList[state ? 'add' : 'remove']('v-loading')
	}

	/**
	 * Destroy the player instance
	 */
	destroy() {
		this.instancePlayer.destroy()
		this.options.controls && this.controlBar.destroy()
	}
}

// Expose the Player instance, used by the provider API
vlitejs.Player = Player

// Expose the provider registration
vlitejs.registerProvider = (id, instance) => {
	if (typeof instance !== 'undefined') {
		if (!Object.keys(vliteProviders).includes(id)) {
			vliteProviders[id] = instance
			return
		}
		throw new Error(`vlitejs :: The provider id "${id}" is already registered.`)
	}
	throw new Error(`vlitejs :: The provider id "${id}" is undefined.`)
}

// Expose the plugin registration
vlitejs.registerPlugin = (id, instance) => {
	if (typeof instance !== 'undefined') {
		if (!Object.keys(vlitePlugins).includes(id)) {
			vlitePlugins[id] = instance
			return
		}
		throw new Error(`vlitejs :: The plugin id "${id}" is already registered.`)
	}
	throw new Error(`vlitejs :: The plugin id "${id}" is undefined.`)
}

export default vlitejs

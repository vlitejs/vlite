/**
 * @license MIT
 * @name vlitejs
 * @version 3.0.4
 * @author: Yoriiis aka Joris DANIEL <joris.daniel@gmail.com>
 * @description: vLitejs is a fast and lightweight Javascript library for customizing HTML5 and Youtube video players in Javascript with a minimalist theme
 * {@link https://yoriiis.github.io/vlitejs}
 * @copyright 2021 Joris DANIEL <https://yoriiis.github.io/vlitejs>
 **/

'use strict'

import PlayerYoutube from './player-youtube'
import PlayerHtml5 from './player-html5'
import PlayerVimeo from './player-vimeo'

// Set Youtube API configuration for the queue if the API is not ready
const VLITE_QUEUE = {
	youtube: {
		apiLoading: false,
		apiReady: false,
		apiReadyQueue: []
	},
	vimeo: {
		apiLoading: false,
		apiReady: false,
		apiReadyQueue: []
	}
}

/**
 * vlitejs entrypoint
 * @module vLite/entrypoint
 */
export default class vlitejs {
	/**
	 * Instanciate the constructor
	 * @constructor
	 * @param {String|Object} selector CSS selector or query selector
	 * @param {Object} options Player options
	 * @param {Function} onReady Callback function executed when the player is ready
	 */
	constructor({ selector, options = undefined, onReady }) {
		this.player = null

		// Detect the type of the selector (string or object)
		if (typeof selector === 'string') {
			this.player = document.querySelector(selector)
		} else if (typeof selector === 'object') {
			this.player = selector
		}
		if (this.player === null) {
			console.warn('[vLite] - Selector not found')
			return
		}

		this.options = options
		this.onReady = onReady

		this.initPlayer()
	}

	/**
	 * Initialize the player (Youtube or HTML5)
	 */
	initPlayer() {
		// Detect the player type (Youtube or HTML5)
		if (this.player.hasAttribute('data-youtube-id')) {
			this.initializeApiQueue({ type: 'youtube' })
		} else if (this.player.hasAttribute('data-vimeo-id')) {
			this.initializeApiQueue({ type: 'vimeo' })
		} else {
			// Initialize the HTML5 Player
			this.instancePlayer = new PlayerHtml5({
				selector: this.player,
				options: this.options,
				onReady: this.onReady
			})
			this.instancePlayer.init()
		}
	}

	/**
	 * Initialize the queue and the API
	 * @param {Object} options
	 * @param {String} options.type API type
	 */
	initializeApiQueue({ type }) {
		// Detect if the API is ready
		if (!VLITE_QUEUE[type].apiReady) {
			// Load the API if necessary
			if (!VLITE_QUEUE[type].apiLoading) {
				VLITE_QUEUE[type].apiLoading = true
				type === 'youtube' ? this.loadYoutubeAPI() : this.loadVimeoAPI()
			}

			// Create a queue to load players when the API is ready
			VLITE_QUEUE[type].apiReadyQueue.push({
				player: this.player,
				options: this.options,
				onReady: this.onReady
			})
		} else {
			// Youtube API is already available, initialize the Youtube player
			this.instancePlayer = new PlayerYoutube({
				selector: this.player,
				options: this.options,
				onReady: this.onReady
			})
			this.instancePlayer.init()
		}
	}

	/**
	 * Load the Youtube API
	 */
	loadYoutubeAPI() {
		const script = this.createScriptElement({ src: 'https://youtube.com/iframe_api' })
		window.onYouTubeIframeAPIReady = () => this.onApiReady({ type: 'youtube' })
		document.getElementsByTagName('body')[0].appendChild(script)
	}

	/**
	 * Load the Vimeo API
	 */
	loadVimeoAPI() {
		const script = this.createScriptElement({ src: 'https://player.vimeo.com/api/player.js' })
		script.onload = (response) => this.onApiReady({ type: 'vimeo' })
		document.getElementsByTagName('body')[0].appendChild(script)
	}

	/**
	 * On API ready
	 * @param {Object} options
	 * @param {String} options.type API type
	 */
	onApiReady({ type }) {
		const PlayerInstance = type === 'youtube' ? PlayerYoutube : PlayerVimeo

		VLITE_QUEUE[type].apiReady = true

		// Initialize the player queue
		VLITE_QUEUE[type].apiReadyQueue.forEach((element) => {
			this.instancePlayer = new PlayerInstance({
				selector: element.player,
				options: element.options,
				onReady: element.onReady
			})
			this.instancePlayer.init()
		})
		VLITE_QUEUE[type].apiReadyQueue = []
	}

	/**
	 * Create script element
	 * @param {*} param0
	 * @returns {HTMLElement} Script tag
	 */
	createScriptElement({ src }) {
		const script = document.createElement('script')
		script.async = true
		script.type = 'text/javascript'
		script.src = src

		return script
	}

	/**
	 * Destroy the player instance
	 */
	destroy() {
		this.instancePlayer.destroy()
	}
}

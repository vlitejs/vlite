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

// Set Youtube API configuration for the queue if the API is not ready
const _VliteYoutube = {
	apiLoading: false,
	apiReady: false,
	apiReadyQueue: []
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
			// Detect if the Youtube API is ready
			if (!_VliteYoutube.apiReady) {
				// Load the Youtube API if necessary
				if (!_VliteYoutube.apiLoading) {
					_VliteYoutube.apiLoading = true
					this.loadYoutubeAPI()
				}

				// Create a queue to load players when the API is ready
				_VliteYoutube.apiReadyQueue.push({
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
	 * Load the Youtube API
	 */
	loadYoutubeAPI() {
		const script = document.createElement('script')
		script.async = true
		script.type = 'text/javascript'
		script.src = 'https://youtube.com/iframe_api'

		// Function called when the API is ready
		window.onYouTubeIframeAPIReady = () => {
			_VliteYoutube.apiReady = true

			// Initialize the player queue
			_VliteYoutube.apiReadyQueue.forEach((element) => {
				this.instancePlayer = new PlayerYoutube({
					selector: element.player,
					options: element.options,
					onReady: element.onReady
				})
			})
			_VliteYoutube.apiReadyQueue = []
		}

		document.getElementsByTagName('body')[0].appendChild(script)
	}

	/**
	 * Destroy the player instance
	 */
	destroy() {
		this.instancePlayer.destroy()
	}
}

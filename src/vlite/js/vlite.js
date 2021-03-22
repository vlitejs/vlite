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

import PlayerHtml5 from '../../providers/html5'
import Player from './player'

const Providers = {
	html5: PlayerHtml5
}

/**
 * vlitejs entrypoint
 * @module vLite/entrypoint
 */
class vlitejs {
	/**
	 * Instanciate the constructor
	 * @constructor
	 * @param {String|Object} selector CSS selector or query selector
	 * @param {Object} options Player options
	 * @param {Function} onReady Callback function executed when the player is ready
	 */
	constructor({ selector, options = {}, provider = 'html5', onReady }) {
		let element = null

		// Detect the type of the selector (string or HTMLElement)
		if (typeof selector === 'string') {
			element = document.querySelector(selector)
		} else if (selector instanceof HTMLElement) {
			element = selector
		} else {
			throw new TypeError('vlitejs :: The element or selector supplied is not valid.')
		}

		const ProviderInstance = Providers[provider]
		if (ProviderInstance) {
			const instancePlayer = new ProviderInstance({
				element,
				options,
				onReady
			})
			instancePlayer.init()
		} else {
			throw new TypeError(`vlitejs :: Unknown provider "${provider}"`)
		}
	}

	/**
	 * Destroy the player instance
	 */
	destroy() {
		this.instancePlayer.destroy()
	}
}

vlitejs.Player = Player

vlitejs.registerProvider = (id, instance) => {
	if (!Object.keys(Providers).includes(id)) {
		Providers[id] = instance
	} else {
		throw new TypeError(`vlitejs::registerProvider, the provider id "${id}" is already registered.`)
	}
}

export default vlitejs

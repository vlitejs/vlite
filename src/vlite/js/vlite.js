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

const vliteProviders = {
	html5: PlayerHtml5
}
const vlitePlugins = {}

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
	constructor({ selector, options = {}, provider = 'html5', plugins = [], onReady }) {
		let element = null

		// Detect the type of the selector (string or HTMLElement)
		if (typeof selector === 'string') {
			element = document.querySelector(selector)
		} else if (selector instanceof HTMLElement) {
			element = selector
		} else {
			throw new TypeError('vlitejs :: The element or selector supplied is not valid.')
		}

		const ProviderInstance = vliteProviders[provider]
		if (ProviderInstance) {
			const pluginsInstance = this.getPluginInstance(plugins)
			const instancePlayer = new ProviderInstance({
				element,
				options,
				plugins: pluginsInstance,
				onReady
			})
			instancePlayer.init()
		} else {
			throw new TypeError(`vlitejs :: Unknown provider "${provider}"`)
		}
	}

	getPluginInstance(plugins) {
		const pluginsInstance = []
		const pluginsIds = Object.keys(vlitePlugins)

		plugins.forEach((id) => {
			if (pluginsIds.includes(id)) {
				pluginsInstance.push(vlitePlugins[id])
			} else {
				throw new TypeError(`vlitejs :: Unknown plugin "${id}"`)
			}
		})

		return pluginsInstance
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
	if (!Object.keys(vliteProviders).includes(id)) {
		vliteProviders[id] = instance
	} else {
		throw new TypeError(`vlitejs::registerProvider, the provider id "${id}" is already registered.`)
	}
}

vlitejs.registerPlugin = (id, instance) => {
	if (!Object.keys(vlitePlugins).includes(id)) {
		vlitePlugins[id] = instance
	} else {
		throw new TypeError(`vlitejs::registerPlugin, the plugin id "${id}" is already registered.`)
	}
}

export default vlitejs

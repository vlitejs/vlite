import { type pluginParameter } from 'shared/assets/types/types'

/**
 * Vlitejs Sample plugin
 * @module Vlitejs/plugins/sample
 */
export default class SamplePlugin {
	player: any

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.player Player instance
	 */
	constructor({ player }: pluginParameter) {
		this.player = player
	}

	/**
	 * Initialize the plugin
	 */
	init() {
		// Initialize the plugin here
	}

	/**
	 * Destroy the plugin
	 */
	destroy() {
		// Destroy the plugin here
	}
}

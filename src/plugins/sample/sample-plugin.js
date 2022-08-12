/**
 * Vlitejs Sample plugin
 * @module Vlitejs/plugins/sample
 */
export default class SamplePlugin {
	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.player Player instance
	 */
	constructor({ player }) {
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

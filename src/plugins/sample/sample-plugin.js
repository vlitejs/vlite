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
		// Plugin code here
	}
}

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
	init() {}
}

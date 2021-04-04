export default class SamplePlugin {
	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.playerInstance Player instance
	 */
	constructor({ playerInstance }) {
		this.playerInstance = playerInstance
	}

	/**
	 * Initialize the plugin
	 */
	init() {}
}

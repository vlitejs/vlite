export default class SamplePlugin {
	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.player Player class instance
	 */
	constructor({ player }) {
		this.player = player
		this.video = this.player.element
		this.vliteInstance = this.player.vliteInstance
	}

	/**
	 * Initialize the plugin
	 */
	init() {
		// The plugin is initialized
	}
}

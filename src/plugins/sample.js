export default class SamplePlugin {
	providers = []
	types = []

	constructor({ player }) {
		this.player = player
		this.video = this.player.element
	}

	init() {}
}

import { Options } from 'shared/assets/interfaces/interfaces'

interface Player {
	container: HTMLElement
	element: HTMLVideoElement
	options: Options
}

export default class SamplePlugin {
	player: Player
	video: HTMLVideoElement

	providers = []
	types = []

	constructor({ player }: { player: Player }) {
		this.player = player
		this.video = this.player.element
	}

	init() {}
}

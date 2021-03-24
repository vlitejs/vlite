import './subtitle.css'

export default class Subtitle {
	constructor({ player }) {
		this._this = this
		this.player = player
		this.video = this.player.element
		this.tracks = this.video.textTracks[0]
		this.tracks.mode = 'hidden' // must occur before cues is retrieved
		this.cues = [...this.tracks.cues]

		this.onMetadataLoaded = this.onMetadataLoaded.bind(this)

		this.init()
	}

	init() {
		this.render()
		this.captions = this.player.container.querySelector('.v-captions')
		this.addEvents()
	}

	render() {
		this.player.container.insertAdjacentHTML('beforeend', '<div class="v-captions"></div>')
	}

	addEvents() {
		this.player.element.addEventListener('loadedmetadata', this.onMetadataLoaded)
	}

	onMetadataLoaded() {
		const _this = this

		const onEnter = function () {
			_this.captions.innerHTML = this.text
			_this.captions.classList.add('active')
		}

		const onExit = function () {
			_this.captions.classList.remove('active')
		}

		this.cues.forEach((cue) => {
			cue.onenter = onEnter
			cue.onexit = onExit
		})
	}

	onEnter() {}

	onExit() {}
}

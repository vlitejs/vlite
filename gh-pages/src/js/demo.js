import validateTarget from 'validate-target'
import '../../../dist/vlite.css'
import Vlitejs from '../../../dist/vlite'
import VlitejsSubtitle from '../../../dist/plugins/subtitle'
import VlitejsPip from '../../../dist/plugins/pip'
// import VlitejsYoutube from '../../../dist/providers/youtube'
// import VlitejsVimeo from '../../../dist/providers/vimeo'

export default class Demo {
	constructor() {
		this.nav = document.querySelector('.nav')
		this.content = document.querySelector('.content')
		this.instance = null
		this.options = {
			video: {
				autoplay: false,
				controls: true,
				playPause: true,
				progressBar: true,
				time: true,
				volume: true,
				fullscreen: true,
				poster: 'images/poster.jpg',
				bigPlay: true,
				autoHide: true,
				playsinline: true,
				loop: false,
				muted: false
			},
			audio: {
				autoplay: false,
				controls: true,
				playPause: true,
				progressBar: true,
				time: true,
				volume: true
			}
		}
		this.templates = {
			'html5-video':
				'<video id="player" class="vlite-js" src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></video>',
			'html5-audio':
				'<audio id="player" class="vlite-js" src="https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3"></audio>',
			'youtube-video': '<div id="player" class="vlite-js" data-youtube-id="aqz-KE-bpKQ"></div>',
			'vimeo-video': '<div id="player" class="vlite-js" data-vimeo-id="1084537"></div>'
		}

		this.onClickOnNav = this.onClickOnNav.bind(this)
	}

	init() {
		Vlitejs.registerPlugin('subtitle', VlitejsSubtitle)
		Vlitejs.registerPlugin('pip', VlitejsPip)
		// Vlitejs.registerProvider('youtube', VlitejsYoutube)
		// Vlitejs.registerProvider('vimeo', VlitejsVimeo)

		this.addEvents()
		this.initMedia({ provider: 'html5', type: 'video' })
	}

	addEvents() {
		this.nav.addEventListener('click', this.onClickOnNav)
	}

	onClickOnNav(e) {
		const target = e.target
		const navButton = validateTarget({
			target: target,
			selectorString: '.nav-listItemButton',
			nodeName: ['button']
		})

		if (navButton) {
			this.toggleNavButton(e)
		}
	}

	toggleNavButton(e) {
		e.preventDefault()

		const target = e.target
		const currentActive = this.nav.querySelector('.active')

		if (!target.classList.contains('active')) {
			currentActive.classList.remove('active')
			target.classList.add('active')

			this.destroyPreviousMedia()
			this.initMedia({
				provider: target.getAttribute('data-provider'),
				type: target.getAttribute('data-type')
			})
		}
	}

	destroyPreviousMedia() {
		this.instance.destroy()
		this.instance = null
	}

	initMedia({ provider, type }) {
		this.content.innerHTML = this.templates[`${provider}-${type}`]

		this.instance = new Vlitejs('#player', {
			options: this.options[type],
			// plugins: ['subtitle', 'pip'],
			provider,
			onReady: function (player) {
				console.log(player)
				player.on('play', () => console.log('play'))
				player.on('pause', () => console.log('pause'))
				player.on('ended', () => console.log('ended'))
				player.on('progress', () => console.log('progress'))
				player.on('volumechange', () => console.log('volumechange'))
				player.on('timeupdate', () => console.log('timeupdate'))
				player.on('enterfullscreen', () => console.log('enterfullscreen'))
				player.on('exitfullscreen', () => console.log('exitfullscreen'))
				player.on('enterpip', () => console.log('enterpip'))
				player.on('leavepip', () => console.log('leavepip'))
				player.on('trackenabled', () => console.log('trackenabled'))
				player.on('trackdisabled', () => console.log('trackdisabled'))
			}
		})
	}
}

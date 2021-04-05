import Vlitejs from '../../dist/vlite.js'
import VlitejsSubtitle from '../../dist/plugins/subtitle.js'
import VlitejsPip from '../../dist/plugins/pip.js'

Vlitejs.registerPlugin('subtitle', VlitejsSubtitle)
Vlitejs.registerPlugin('pip', VlitejsPip)

/* eslint-disable no-unused-vars */
const player = new Vlitejs('#player-html5', {
	options: {
		autoplay: false,
		controls: true,
		playPause: true,
		progressBar: true,
		time: true,
		volume: true,
		fullscreen: true,
		poster: '../assets/poster.jpg',
		bigPlay: true,
		autoHide: true,
		playsinline: true,
		loop: false,
		muted: false
	},
	plugins: ['subtitle', 'pip'],
	onReady: function (player) {
		console.log(player)

		player.container.addEventListener('play', () => console.log('play'))
		player.container.addEventListener('pause', () => console.log('pause'))
		player.container.addEventListener('ended', () => console.log('ended'))
		player.container.addEventListener('progress', () => console.log('progress'))
		player.container.addEventListener('volumechange', () => console.log('volumechange'))
		player.container.addEventListener('timeupdate', () => console.log('timeupdate'))
		player.container.addEventListener('enterfullscreen', () => console.log('enterfullscreen'))
		player.container.addEventListener('exitfullscreen', () => console.log('exitfullscreen'))
		player.container.addEventListener('enterpip', () => console.log('enterpip'))
		player.container.addEventListener('leavepip', () => console.log('leavepip'))
		player.container.addEventListener('trackenabled', () => console.log('trackenabled'))
		player.container.addEventListener('trackdisabled', () => console.log('trackdisabled'))
	}
})
/* eslint-enable no-unused-vars */

import '../../dist/vlite.css'
import '../../dist/plugins/sticky.css'
import VlitejsSticky from '../../dist/plugins/sticky.js'
import Vlitejs from '../../dist/vlite.js'

Vlitejs.registerPlugin('sticky', VlitejsSticky, {
	mode: 'instant',
	width: 500,
	offset: 20,
	ratio: 16 / 9
})

new Vlitejs('#player', {
	options: {
		controls: true,
		autoplay: false,
		playPause: true,
		progressBar: true,
		time: true,
		volume: true,
		fullscreen: true,
		poster: 'https://yoriiis.github.io/cdn/static/vlitejs/demo-poster.jpg',
		bigPlay: true,
		playsinline: true,
		loop: false,
		muted: false,
		autoHide: true
	},
	plugins: ['sticky'],
	onReady: (player) => {
		console.log(player)

		player.on('entersticky', () => console.log('entersticky'))
		player.on('leavesticky', () => console.log('leavesticky'))
	}
})

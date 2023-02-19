import '../../dist/vlite.css'
import '../../dist/plugins/volume-bar.css'
import Vlitejs from '../../dist/vlite.js'
import VlitejsVimeo from '../../dist/providers/vimeo.js'
import VlitejsVolumeBar from '../../dist/plugins/volume-bar'

Vlitejs.registerProvider('vimeo', VlitejsVimeo)
Vlitejs.registerPlugin('volume-bar', VlitejsVolumeBar)

const vlite = new Vlitejs('#player', {
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
		autoHide: true,
		providerParams: {}
	},
	provider: 'vimeo',
	plugins: ['volume-bar'],
	onReady: (player) => {
		console.log(player)

		player.on('play', () => console.log('play'))
		player.on('pause', () => console.log('pause'))
		player.on('progress', () => console.log('progress'))
		player.on('timeupdate', () => console.log('timeupdate'))
		player.on('volumechange', () => console.log('volumechange'))
		player.on('enterfullscreen', () => console.log('enterfullscreen'))
		player.on('exitfullscreen', () => console.log('exitfullscreen'))
		player.on('ended', () => console.log('ended'))
	}
})

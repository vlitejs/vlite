import 'vlitejs/vlite.css'
import 'vlitejs/plugins/volume-bar.css'
import Vlitejs from 'vlitejs'
import VlitejsVolumeBar from 'vlitejs/plugins/volume-bar.js'
import { changeSourceEvent } from '../shared/utils.js'

Vlitejs.registerPlugin('volume-bar', VlitejsVolumeBar)

new Vlitejs('#player', {
	options: {
		controls: true,
		autoplay: false,
		playPause: true,
		progressBar: true,
		time: true,
		volume: true,
		loop: false
	},
	plugins: ['volume-bar'],
	onReady: (player) => {
		console.log(player)

		player.on('play', () => console.log('play'))
		player.on('pause', () => console.log('pause'))
		player.on('progress', () => console.log('progress'))
		player.on('timeupdate', () => console.log('timeupdate'))
		player.on('volumechange', () => console.log('volumechange'))
		player.on('sourcechange', () => console.log('sourcechange'))
		player.on('ended', () => console.log('ended'))

		changeSourceEvent({ player })
	}
})

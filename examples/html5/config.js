import 'vlitejs/vlite.css'
import 'vlitejs/plugins/subtitle.css'
import 'vlitejs/plugins/pip.css'
import 'vlitejs/plugins/cast.css'
import 'vlitejs/plugins/airplay.css'
import 'vlitejs/plugins/volume-bar.css'
import Vlitejs from 'vlitejs'
import VlitejsAirplay from 'vlitejs/plugins/airplay.js'
import VlitejsCast from 'vlitejs/plugins/cast.js'
import VlitejsHotkeys from 'vlitejs/plugins/hotkeys.js'
import VlitejsPip from 'vlitejs/plugins/pip.js'
import VlitejsSubtitle from 'vlitejs/plugins/subtitle.js'
import VlitejsVolumeBar from 'vlitejs/plugins/volume-bar.js'
import { changeSourceEvent } from '../shared/utils.js'

Vlitejs.registerPlugin('subtitle', VlitejsSubtitle)
Vlitejs.registerPlugin('pip', VlitejsPip)
Vlitejs.registerPlugin('cast', VlitejsCast, {
	textTrackStyle: {
		backgroundColor: '#21212190'
	},
	metadata: {
		title: 'The Jungle Book',
		subtitle: 'Walt Disney Animation Studios'
	}
})
Vlitejs.registerPlugin('airplay', VlitejsAirplay)
Vlitejs.registerPlugin('volume-bar', VlitejsVolumeBar)
Vlitejs.registerPlugin('hotkeys', VlitejsHotkeys, {
	seekStep: 3,
	volumeStep: 0.2
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
	plugins: ['subtitle', 'pip', 'cast', 'airplay', 'volume-bar', 'hotkeys'],
	onReady: (player) => {
		console.log(player)

		player.on('play', () => console.log('play'))
		player.on('pause', () => console.log('pause'))
		player.on('progress', () => console.log('progress'))
		player.on('timeupdate', () => console.log('timeupdate'))
		player.on('volumechange', () => console.log('volumechange'))
		player.on('sourcechange', () => console.log('sourcechange'))
		player.on('enterfullscreen', () => console.log('enterfullscreen'))
		player.on('exitfullscreen', () => console.log('exitfullscreen'))
		player.on('enterpip', () => console.log('enterpip'))
		player.on('leavepip', () => console.log('leavepip'))
		player.on('trackenabled', () => console.log('trackenabled'))
		player.on('trackdisabled', () => console.log('trackdisabled'))
		player.on('ended', () => console.log('ended'))
		player.on('castsessionstarted', () => console.log('castsessionstarted'))
		player.on('castsessionended', () => console.log('castsessionended'))

		changeSourceEvent({ player })
	}
})

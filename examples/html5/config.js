import '../../dist/vlite.css'
import '../../dist/plugins/subtitle.css'
import '../../dist/plugins/cast.css'
import '../../dist/plugins/airplay.css'
import '../../dist/plugins/ima.css'
import Vlitejs from '../../dist/vlite.js'
import VlitejsSubtitle from '../../dist/plugins/subtitle.js'
import VlitejsPip from '../../dist/plugins/pip.js'
import VlitejsCast from '../../dist/plugins/cast.js'
import VlitejsAirplay from '../../dist/plugins/airplay.js'
import VlitejsIma from '../../dist/plugins/ima.js'

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
Vlitejs.registerPlugin('ima', VlitejsIma, {
	adTagUrl:
		'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator='
})

/* eslint-disable no-unused-vars */
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
		autoHide: true
	},
	plugins: ['subtitle', 'pip', 'cast', 'airplay', 'ima'],
	onReady: function (player) {
		console.log(player)

		player.on('play', () => console.log('play'))
		player.on('pause', () => console.log('pause'))
		player.on('progress', () => console.log('progress'))
		player.on('timeupdate', () => console.log('timeupdate'))
		player.on('volumechange', () => console.log('volumechange'))
		player.on('enterfullscreen', () => console.log('enterfullscreen'))
		player.on('exitfullscreen', () => console.log('exitfullscreen'))
		player.on('enterpip', () => console.log('enterpip'))
		player.on('leavepip', () => console.log('leavepip'))
		player.on('trackenabled', () => console.log('trackenabled'))
		player.on('trackdisabled', () => console.log('trackdisabled'))
		player.on('ended', () => console.log('ended'))
		player.on('castsessionstarted', () => console.log('castsessionstarted'))
		player.on('castsessionended', () => console.log('castsessionended'))
	}
})
/* eslint-enable no-unused-vars */

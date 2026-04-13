import 'vlitejs/vlite.css'
import 'vlitejs/plugins/ima.css'
import Vlitejs, { type Player } from 'vlitejs'
import VlitejsIma from 'vlitejs/plugins/ima.js'

Vlitejs.registerPlugin('ima', VlitejsIma, {
	adTagUrl:
		'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
	updateImaSettings: (imaSettings: { setLocale: (locale: string) => void }) => {
		imaSettings.setLocale('en')
	}
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
	plugins: ['ima'],
	onReady: (player: Player) => {
		console.log(player)

		player.on('adsmanager', (e: Event) => console.log('adsmanager', (e as CustomEvent).detail))
		player.on('adsloader', (e: Event) => console.log('adsloader', (e as CustomEvent).detail))
		player.on('adsrequest', (e: Event) => console.log('adsrequest', (e as CustomEvent).detail))
	}
})

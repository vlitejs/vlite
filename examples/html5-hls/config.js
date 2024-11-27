import '../../dist/vlite.css'
import VlitejsPip from '../../dist/plugins/pip.js'
import Vlitejs from '../../dist/vlite.js'

Vlitejs.registerPlugin('pip', VlitejsPip)

document.addEventListener('DOMContentLoaded', () => {
	const source = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
	const video = document.querySelector('video')

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
			poster: 'https://yoriiis.github.io/cdn/static/vlitejs/demo-poster-big-buck-bunny.jpg',
			bigPlay: true,
			playsinline: true,
			loop: false,
			muted: false,
			autoHide: true
		},
		plugins: ['pip'],
		onReady: (player) => {
			console.log(player)
		}
	})
	/* eslint-enable no-unused-vars */

	if (!Hls.isSupported()) {
		video.src = source
	} else {
		const hls = new Hls()
		hls.loadSource(source)
		hls.attachMedia(video)
	}
})

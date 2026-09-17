import 'vlitejs/vlite.css'
import Vlitejs, { type Player } from 'vlitejs'
import VlitejsPip from 'vlitejs/plugins/pip.js'

/** Chargé via CDN dans index.html (hls.js). */
declare const Hls: {
	isSupported(): boolean
	new (): {
		loadSource(url: string): void
		attachMedia(media: HTMLMediaElement): void
	}
}

Vlitejs.registerPlugin('pip', VlitejsPip)

document.addEventListener('DOMContentLoaded', () => {
	const source = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
	const video = document.querySelector('video')

	new Vlitejs('#player', {
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
		onReady: (player: Player) => {
			console.log(player)
		}
	})

	if (!video) {
		return
	}

	if (!Hls.isSupported()) {
		video.src = source
	} else {
		const hls = new Hls()
		hls.loadSource(source)
		hls.attachMedia(video)
	}
})

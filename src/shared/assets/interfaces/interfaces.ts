export interface FullScreenSupport {
	requestFn: string
	cancelFn: string
	changeEvent: string
	isFullScreen: string
}

export interface playerParameters {
	element: HTMLAudioElement | HTMLVideoElement
	container: HTMLElement
	options: Options
	vlitejs: any
}

export interface pluginParameter {
	player: playerParameters
}

export interface Options {
	autoplay: Boolean
	controls: Boolean
	playPause: Boolean
	progressBar: Boolean
	time: Boolean
	volume: Boolean
	fullscreen: Boolean
	poster: null | string
	bigPlay: Boolean
	autoHide: Boolean
	playsinline: Boolean
	loop: Boolean
	muted: Boolean
	[key: string]: Boolean | null | string
}

export interface configEvent {
	type: string
	listener: EventListener
}

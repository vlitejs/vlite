export interface Constructable<T> {
	new (...args: any): T
}

export interface FullScreenSupport {
	requestFn: string
	cancelFn: string
	changeEvent: string
	isFullScreen: string
}

export interface playerParameters {
	media: HTMLAudioElement | HTMLVideoElement
	container: HTMLElement
	options: Options
	type: string
	Vlitejs: any
}

export interface pluginParameter {
	player: playerParameters
	options: any
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
	autoHideDelay: number
	playsinline: Boolean
	loop: Boolean
	muted: Boolean
	[key: string]: Boolean | null | string | number
}

export interface configEvent {
	type: string
	listener: EventListener
}

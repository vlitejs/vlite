import type Player from 'core/player.js'

export type Constructable<T> = {
	new (...args: any): T
}

export type FullScreenSupport = {
	requestFn: string
	cancelFn: string
	changeEvent: string
	isFullScreen: string
}

export type Options = {
	autoplay: boolean
	controls: boolean
	playPause: boolean
	progressBar: boolean
	time: boolean
	volume: boolean
	fullscreen: boolean
	poster: null | string
	bigPlay: boolean
	autoHide: boolean
	autoHideDelay: number
	playsinline: boolean
	loop: boolean
	muted: boolean
	[key: string]: boolean | null | string | number
}

export type playerParameters = {
	media: HTMLAudioElement | HTMLVideoElement
	container: Element
	options: Options
	type: string
	Vlitejs: any
}

export type pluginParameter = {
	player: Player
	options: any
}

export type configEvent = {
	type: string
	listener: EventListener
}

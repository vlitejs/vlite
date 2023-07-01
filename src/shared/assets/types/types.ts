import type Player from 'core/player'

export type Constructable<T> = new (...args: any) => T

export interface FullScreenSupport {
	requestFn: string
	cancelFn: string
	changeEvent: string
	isFullScreen: string
}

export interface Options {
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

export interface playerParameters {
	media: HTMLAudioElement | HTMLVideoElement
	container: Element
	options: Options
	type: string
	Vlitejs: any
}

export interface pluginParameter {
	player: Player
	options: any
}

export interface configEvent {
	type: string
	listener: EventListener
}

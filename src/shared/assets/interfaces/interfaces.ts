// TODO: Centralized all interface here?

export interface interfaceVliteProviders {
	[key: string]: any
}

export interface interfaceVlitePlugins {
	[key: string]: any
}

export interface interfacePluginsInstance {
	id: string
	Plugin: any
}

export interface FullScreenSupport {
	requestFn: string
	cancelFn: string
	changeEvent: string
	isFullScreen: string
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
}

export interface interfaceDefaultOptions {
	[key: string]: {
		[key: string]: any
	}
}

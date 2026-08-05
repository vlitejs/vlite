import type Player from 'core/player.js'

export type Constructable<T> = {
	new (...args: unknown[]): T
}

/**
 * Events dispatched on the player container (`CustomEvent`, except plugin-specific extensions).
 * `(string & {})` keeps autocomplete for known names while still allowing other strings.
 */
export type PlayerEventName =
	| 'play'
	| 'pause'
	| 'progress'
	| 'timeupdate'
	| 'volumechange'
	| 'sourcechange'
	| 'ended'
	| 'end'
	| 'enterfullscreen'
	| 'exitfullscreen'
	| 'enterpip'
	| 'leavepip'
	| 'trackenabled'
	| 'trackdisabled'
	| 'castsessionstarted'
	| 'castsessionended'
	| 'airplaysessionstarted'
	| 'airplaysessionended'
	| 'entersticky'
	| 'leavesticky'
	| 'adsloader'
	| 'adsrequest'
	| 'adsmanager'
	| 'playing'
	| 'waiting'
	| 'seeking'
	| 'seeked'
	| (string & {})

/**
 * Plugin class passed to `Vlitejs.registerPlugin`.
 * `options` is `any` at this boundary so each plugin can narrow types internally.
 */
export type VlitePluginConstructor = new (args: {
	player: Player
	options?: any
}) => {
	init(): void
	providers: string[]
	types: string[]
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

/** Arguments for the `Player` constructor (other data is provided via `Vlitejs`). */
export type playerParameters = {
	Vlitejs: any
	type: string
}

/**
 * Factory passed to `Vlitejs.registerProvider`.
 * The second argument is optional (options stored when `registerProvider` is called).
 */
export type VliteProviderFactory = (
	base: abstract new (...args: never[]) => Player,
	options?: any
) => new (
	args: playerParameters
) => unknown

export type pluginParameter = {
	player: Player
	options?: unknown
}

export type configEvent = {
	type: PlayerEventName
	listener: EventListener
}

/** Third argument to `Vlitejs.registerProvider`: keys are provider ids, values are provider-specific options. */
export type RegisterProviderOptions = Record<string, unknown>

import './vlite.css'

import BigPlayTemplate from 'components/big-play/big-play.js'
import LoaderTemplate from 'components/loader/loader.js'
import OverlayTemplate from 'components/overlay/overlay.js'
import PosterTemplate from 'components/poster/poster.js'
import { initializePlugins, registerPlugin } from 'plugins/plugin.js'
import { getProviderInstance, registerProvider } from 'providers/provider.js'
import type { FullScreenSupport, Options } from 'shared/assets/types/types.js'
import { checkSupportFullScreen } from 'shared/utils/utils.js'
import validateTarget from 'validate-target'
import Player from './player.js'

export type interfaceDefaultOptions = Record<string, Record<string, any>>

const DEFAULT_OPTIONS: interfaceDefaultOptions = {
	audio: {
		controls: true,
		autoplay: false,
		playPause: true,
		progressBar: true,
		time: true,
		volume: true,
		loop: false
	},
	video: {
		controls: true,
		autoplay: false,
		playPause: true,
		progressBar: true,
		time: true,
		volume: true,
		fullscreen: true,
		poster: null,
		bigPlay: true,
		playsinline: true,
		loop: false,
		muted: false,
		autoHide: false,
		autoHideDelay: 3000,
		providerParams: {}
	}
}

/**
 * Vlitejs entrypoint
 * @module vLite/entrypoint
 */
class Vlitejs {
	media: HTMLVideoElement | HTMLAudioElement | HTMLDivElement
	provider: string
	onReady: () => void
	type: string
	supportFullScreen: FullScreenSupport
	options: Options
	autoHideGranted: boolean
	outerContainer: HTMLElement
	container: HTMLElement
	player: Player
	controlBar: any
	registerPlugin!: () => void
	registerProvider!: () => void
	timerAutoHide!: number

	/**
	 * @constructor
	 * @param selector CSS selector or HTML element
	 * @param options
	 * @param options.options Player options
	 * @param options.provider Player provider
	 * @param options.plugins Player plugins
	 * @param options.onReady Callback function when the player is ready
	 */
	constructor(
		selector: string | HTMLElement,
		{
			options = {},
			provider = 'html5',
			plugins = [],
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onReady = () => {}
		}: {
			options?: Options | object
			provider?: string
			plugins?: string[]
			onReady?: () => void
		} = {}
	) {
		// Detect the type of the selector (string or HTMLElement)
		if (typeof selector === 'string') {
			// @ts-ignore: Object is possibly 'null'.
			this.media = document.querySelector(selector)
		} else if (
			selector instanceof HTMLVideoElement ||
			selector instanceof HTMLAudioElement ||
			selector instanceof HTMLDivElement
		) {
			this.media = selector
		} else {
			throw new TypeError('vlitejs :: The element or selector supplied is not valid.')
		}

		this.provider = provider
		this.onReady = onReady
		this.type = this.media instanceof HTMLAudioElement ? 'audio' : 'video'

		// Check fullscreen support API on different browsers and cached prefixs
		this.supportFullScreen = checkSupportFullScreen()

		// Update config from element attributes
		const htmlAttributes: string[] = ['autoplay', 'playsinline', 'muted', 'loop']
		htmlAttributes.forEach((item: string) => {
			if (this.media.hasAttribute(item)) {
				// @ts-ignore
				options[item] = true
				// @ts-ignore
			} else if (options[item]) {
				this.media.setAttribute(item, '')
			}
		})

		this.options = { ...DEFAULT_OPTIONS[this.type], ...options } as Options
		this.autoHideGranted =
			this.type === 'video' && !!this.options.autoHide && !!this.options.controls

		// Disable fullscreen on iPhone, not supported yet
		if (/(iPhone)/gi.test(window.navigator.userAgent)) {
			this.options.fullscreen = false
		}

		this.onClickOnPlayer = this.onClickOnPlayer.bind(this)
		this.onDoubleClickOnPlayer = this.onDoubleClickOnPlayer.bind(this)
		this.onMousemove = this.onMousemove.bind(this)
		this.onChangeFullScreen = this.onChangeFullScreen.bind(this)

		const ProviderInstance = getProviderInstance(provider, Player)

		this.wrapElement()
		this.container = this.media.closest('.v-container') as HTMLElement
		this.outerContainer = this.container.closest('.v-vlite') as HTMLElement

		this.type === 'video' && this.renderLayout()
		this.player = new ProviderInstance({
			type: this.type,
			Vlitejs: this
		})

		this.player.build()
		this.addEvents()

		initializePlugins({
			plugins,
			provider,
			type: this.type,
			player: this.player
		})
	}

	/**
	 * Wrap the media element
	 */
	wrapElement() {
		const outerContainer = document.createElement('div')
		outerContainer.classList.add(
			'v-vlite',
			'v-firstStart',
			'v-paused',
			'v-loading',
			`v-${this.type}`
		)

		const container = document.createElement('div')
		container.setAttribute('tabindex', '0')
		container.classList.add('v-container')
		outerContainer.appendChild(container)

		const parentElement = this.media.parentNode as HTMLElement
		parentElement.insertBefore(outerContainer, this.media)
		container.appendChild(this.media)
	}

	/**
	 * Build the HTML of the player
	 */
	renderLayout() {
		const template = `
			${OverlayTemplate()}
			${LoaderTemplate()}
			${this.options.poster ? PosterTemplate({ posterUrl: this.options.poster }) : ''}
			${this.options.bigPlay ? BigPlayTemplate() : ''}
		`
		this.container.insertAdjacentHTML('beforeend', template)
	}

	/**
	 * Add evnets listeners
	 */
	addEvents() {
		if (this.type === 'video') {
			this.container.addEventListener('click', this.onClickOnPlayer)
			this.container.addEventListener('dblclick', this.onDoubleClickOnPlayer)
			this.autoHideGranted && this.container.addEventListener('mousemove', this.onMousemove)
			document.addEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen)
		}
	}

	/**
	 * On click on the player
	 * @param e Event data
	 */
	onClickOnPlayer(e: Event) {
		const target = e.target as HTMLElement
		const validateTargetPlayPauseButton = validateTarget({
			target,
			selectorString: '.v-poster, .v-overlay, .v-bigPlay',
			nodeName: ['div', 'button']
		})

		if (validateTargetPlayPauseButton) {
			this.player.controlBar.togglePlayPause(e)
			target.matches('.v-bigPlay') && this.container.focus()
		}
	}

	/**
	 * On double click on the player
	 * @param e Event data
	 */
	onDoubleClickOnPlayer(e: Event) {
		const target = e.target
		const validateTargetOverlay = validateTarget({
			target,
			selectorString: '.v-overlay',
			nodeName: ['div']
		})

		if (validateTargetOverlay) {
			this.player.controlBar.toggleFullscreen(e)
		}
	}

	/**
	 * On mousemove on the player
	 */
	onMousemove() {
		if (!this.player.isPaused && this.autoHideGranted) {
			this.stopAutoHideTimer()
			this.startAutoHideTimer()
		}
	}

	/**
	 * On fullscreen change (espace key pressed)
	 * @doc https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
	 */
	onChangeFullScreen() {
		if (!document[this.supportFullScreen.isFullScreen] && this.player.isFullScreen) {
			this.player.exitFullscreen({ escKey: true })
		}
	}

	/**
	 * Stop the auto hide timer and show the video control bar
	 */
	stopAutoHideTimer() {
		if (this.type === 'video' && this.player.elements.controlBar) {
			this.player.elements.controlBar.classList.remove('v-hidden')
			clearTimeout(this.timerAutoHide)
		}
	}

	/**
	 * Start the auto hide timer and hide the video control bar after a delay
	 */
	startAutoHideTimer() {
		if (this.type === 'video' && !this.player.isPaused && this.player.elements.controlBar) {
			this.timerAutoHide = window.setTimeout(() => {
				this.player.elements.controlBar?.classList.add('v-hidden')
			}, this.options.autoHideDelay)
		}
	}

	/**
	 * Remove events listeners
	 */
	removeEvents() {
		if (this.type === 'video') {
			this.container.removeEventListener('click', this.onClickOnPlayer)
			this.container.removeEventListener('dblclick', this.onDoubleClickOnPlayer)
			this.autoHideGranted && this.container.removeEventListener('mousemove', this.onMousemove)
			window.removeEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen)
		}
	}

	/**
	 * Destroy the player
	 */
	destroy() {
		this.removeEvents()
		this.player.destroy()
		this.player.controlBar.destroy()
	}
}

// Expose the provider registration
// @ts-ignore
Vlitejs.registerProvider = registerProvider

// Expose the plugin registration
// @ts-ignore
Vlitejs.registerPlugin = registerPlugin

export default Vlitejs

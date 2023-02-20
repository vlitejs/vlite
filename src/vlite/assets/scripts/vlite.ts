import Player from './player'
import validateTarget from 'validate-target'
import { checkSupportFullScreen } from 'shared/utils/utils'
import LoaderTemplate from '../../components/loader/assets/scripts/loader'
import BigPlayTemplate from '../../components/big-play/assets/scripts/big-play'
import OverlayTemplate from '../../components/overlay/assets/scripts/overlay'
import PosterTemplate from '../../components/poster/assets/scripts/poster'
import { Options, FullScreenSupport } from 'shared/assets/interfaces/interfaces'
import { registerProvider, getProviderInstance } from '../../../providers/provider'
import { registerPlugin, initializePlugins } from '../../../plugins/plugin'

type TimerHandle = number

export interface interfaceDefaultOptions {
	[key: string]: {
		[key: string]: any
	}
}

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
	Player: any
	media: HTMLVideoElement | HTMLAudioElement | HTMLDivElement
	provider: string
	onReady: () => void
	type: string
	supportFullScreen: FullScreenSupport
	options: Options
	autoHideGranted: boolean
	container: HTMLElement
	player: any
	controlBar: any
	registerPlugin!: () => void
	registerProvider!: () => void
	timerAutoHide!: TimerHandle

	/**
	 * @constructor
	 * @param {(String|HTMLElement)} selector CSS selector or HTML element
	 * @param {Object} options
	 * @param {Object} options.options Player options
	 * @param {String} options.provider Player provider
	 * @param {Object} options.plugins Player plugins
	 * @param {Function} options.onReady Callback function when the player is ready
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
			plugins?: Array<string>
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
		const htmlAttributes: Array<string> = ['autoplay', 'playsinline', 'muted', 'loop']
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
		this.onKeydown = this.onKeydown.bind(this)
		this.onMousemove = this.onMousemove.bind(this)
		this.onChangeFullScreen = this.onChangeFullScreen.bind(this)

		const ProviderInstance = getProviderInstance(provider, Player)

		this.wrapElement()
		this.container = this.media.parentNode as HTMLElement

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
		const wrapper = document.createElement('div')
		wrapper.classList.add('v-vlite', 'v-firstStart', 'v-paused', 'v-loading', `v-${this.type}`)
		wrapper.setAttribute('tabindex', '0')
		const parentElement = this.media.parentNode as HTMLElement
		parentElement.insertBefore(wrapper, this.media)
		wrapper.appendChild(this.media)
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
		this.container.addEventListener('keydown', this.onKeydown)
	}

	/**
	 * On click on the player
	 * @param {Event} e Event data
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
	 * @param {Event} e Event data
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
	 * On keydown event on the media element
	 * @param {KeyboardEvent} e Event listener datas
	 */
	onKeydown(e: KeyboardEvent) {
		const activeElement = document.activeElement
		const { keyCode } = e

		// Stop and start the auto hide timer on selected key code
		if (
			[9, 32, 37, 39].includes(keyCode) &&
			this.autoHideGranted &&
			(activeElement === this.container || activeElement?.closest('.v-vlite'))
		) {
			this.stopAutoHideTimer()
			this.startAutoHideTimer()
		}

		// Backward or forward video with arrow keys
		if (
			[37, 39].includes(keyCode) &&
			(activeElement === this.container || activeElement === this.player.elements.progressBar)
		) {
			// Prevent default behavior on input range
			e.preventDefault()

			if (keyCode === 37) {
				this.fastForward('backward')
			} else if (keyCode === 39) {
				this.fastForward('forward')
			}
		}

		// Increase or decrease volume with arrow keys
		if (
			[38, 40].includes(keyCode) &&
			(activeElement === this.container || activeElement === this.player.elements.volume)
		) {
			if (keyCode === 38) {
				this.increaseVolume()
			} else if (keyCode === 40) {
				this.decreaseVolume()
			}
		}

		// Toggle the media playback with spacebar key
		if (keyCode === 32 && activeElement === this.container) {
			this.player.controlBar.togglePlayPause(e)
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
	 * Trigger the video fast forward (front and rear)
	 * @param {String} direction Direction (backward|forward)
	 */
	fastForward(direction: string) {
		this.player.getCurrentTime().then((seconds: number) => {
			this.player.seekTo(direction === 'backward' ? seconds - 5 : seconds + 5)
		})
	}

	/**
	 * Increase the player volume
	 */
	increaseVolume() {
		this.player.isMuted && this.player.unMute()
		this.player.getVolume().then((volume: number) => {
			this.player.setVolume(Math.round((volume + 0.1) * 10) / 10)
		})
	}

	/**
	 * Decrease the player volume
	 */
	decreaseVolume() {
		this.player.getVolume().then((volume: number) => {
			this.player.setVolume(Math.round((volume - 0.1) * 10) / 10)
		})
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
				this.player.elements.controlBar.classList.add('v-hidden')
			}, this.options.autoHideDelay)
		}
	}

	/**
	 * Remove events listeners
	 */
	removeEvents() {
		this.container.removeEventListener('keydown', this.onKeydown)

		if (this.type === 'video') {
			this.container.removeEventListener('click', this.onClickOnPlayer)
			this.container.removeEventListener('dblclick', this.onDoubleClickOnPlayer)
			this.autoHideGranted &&
				this.container.removeEventListener('mousemove', this.onMousemove)
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

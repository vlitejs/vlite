import ControlBar from 'components/control-bar/control-bar.js'
import type { configEvent, Options, playerParameters } from 'shared/assets/types/types.js'
import { formatVideoTime, isTouch } from 'shared/utils/utils.js'

/**
 * Vlitejs Player
 * @module Vlitejs/Player
 */
export default abstract class Player {
	Vlitejs: any
	type: string
	media: HTMLAudioElement | HTMLVideoElement
	options: Options
	isCast: boolean
	isLinearAd: boolean
	isFullScreen: boolean
	isMuted: boolean
	isPaused: null | boolean
	controlBar: ControlBar
	playerEvents: configEvent[]
	isTouch: boolean
	plugins: Record<string, any>

	elements: {
		outerContainer: HTMLElement
		container: HTMLElement
		bigPlay: HTMLElement | null
		poster: HTMLElement | null
		controlBar: HTMLElement | null
		playPause: HTMLElement | null
		progressBar: HTMLInputElement | null
		currentTime: HTMLElement | null
		duration: HTMLElement | null
		volume: HTMLElement | null
		fullscreen: HTMLElement | null
	}

	/**
	 * @constructor
	 * @param options
	 * @param options.Vlitejs Vlitejs instance
	 * @param options.type Player type (video|audio)
	 */
	constructor({ Vlitejs, type }: playerParameters) {
		this.Vlitejs = Vlitejs
		this.type = type
		this.plugins = {}
		this.media = Vlitejs.media
		this.options = Vlitejs.options
		this.isCast = false
		this.isLinearAd = false

		this.elements = {
			container: Vlitejs.container,
			outerContainer: Vlitejs.outerContainer,
			bigPlay: Vlitejs.container.querySelector('.v-bigPlay'),
			poster: Vlitejs.container.querySelector('.v-poster'),
			controlBar: null,
			playPause: null,
			progressBar: null,
			currentTime: null,
			duration: null,
			volume: null,
			fullscreen: null
		}

		this.isFullScreen = false
		this.isMuted = this.options.muted
		this.isPaused = null
		this.playerEvents = []
		this.isTouch = isTouch()

		this.controlBar = new ControlBar({
			player: this,
			type
		})
	}

	/**
	 * Build the player
	 */
	build() {
		this.options.controls && this.controlBar.init()
		this.init()
	}

	/**
	 * init
	 * Extends by the provider
	 * @abstract
	 */
	public abstract init(): void

	/**
	 * waitUntilVideoIsReady
	 * Extends by the provider
	 * @abstract
	 */
	public abstract waitUntilVideoIsReady(): Promise<any>

	/**
	 * getInstance
	 * Extends by the provider
	 * @abstract
	 */
	public abstract getInstance(): HTMLElement

	/**
	 * getCurrentTime
	 * Extends by the provider
	 * @abstract
	 */
	public abstract getCurrentTime(): Promise<number>

	/**
	 * methodSeekTo
	 * Extends by the provider
	 * @abstract
	 */
	public abstract methodSeekTo(newTime: number): void

	/**
	 * getDuration
	 * Extends by the provider
	 * @abstract
	 */
	public abstract getDuration(): Promise<number>

	/**
	 * methodPlay
	 * Extends by the provider
	 * @abstract
	 */
	public abstract methodPlay(): void

	/**
	 * methodPause
	 * Extends by the provider
	 * @abstract
	 */
	public abstract methodPause(): void

	/**
	 * methodSetVolume
	 * Extends by the provider
	 * @abstract
	 */
	public abstract methodSetVolume(newVolume: number): void

	/**
	 * methodGetVolume
	 * Extends by the provider
	 * @abstract
	 */
	public abstract methodGetVolume(): Promise<number>

	/**
	 * methodMute
	 * Extends by the provider
	 * @abstract
	 */
	public abstract methodMute(): void

	/**
	 * methodUnMute
	 * Extends by the provider
	 * @abstract
	 */
	public abstract methodUnMute(): void

	/**
	 * On the player is ready
	 */
	onReady() {
		this.options.muted && this.mute()
		this.media.classList.add('v-media')

		// The iframe needs to be ignored by the focus
		this.media.setAttribute('tabindex', '-1')

		// If player has autoplay option, play now
		if (this.options.autoplay) {
			// Autoplay on video is authorize only when the media element is muted
			!this.media.muted && this.mute()

			this.play()
		}

		this.Vlitejs.onReady instanceof Function && this.Vlitejs.onReady.call(this, this)

		if (this.media.preload === 'none' && this.Vlitejs.provider === 'html5') {
			this.media.addEventListener('loadedmetadata', () => this.triggerOnReady())
		} else {
			this.triggerOnReady()
		}
		this.loading(false)
	}

	/**
	 * Trigger on ready component's functions
	 */
	triggerOnReady() {
		this.options.controls && this.controlBar.onReady()
		Object.keys(this.plugins).forEach((id) => {
			this.plugins[id].onReady instanceof Function && this.plugins[id].onReady()
		})
	}

	/**
	 * Add media action listeners on the container
	 * @param type Event type
	 * @param listener Event listener
	 */
	on(type: string, listener: EventListener) {
		if (listener instanceof Function) {
			this.playerEvents.push({ type, listener })
			this.elements.container.addEventListener(type, listener)
		}
	}

	/**
	 * Remove media action listeners on the container
	 * @param type Event type
	 * @param listener Event listener
	 */
	off(type: string, listener: EventListener) {
		if (listener instanceof Function) {
			this.elements.container.removeEventListener(type, listener)
		}
	}

	/**
	 * Dispatch custom event on the container
	 * @param type Event type
	 * @param detail Event detail
	 */
	dispatchEvent(type: string, detail?: unknown) {
		this.elements.container.dispatchEvent(
			new window.CustomEvent(type, {
				detail
			})
		)
	}

	/**
	 * Update the loader status
	 * @param state Status of the loader
	 */
	loading(state: boolean) {
		this.elements.outerContainer.classList[state ? 'add' : 'remove']('v-loading')
		this.dispatchEvent('progress')
	}

	/**
	 * On time update
	 * Update current time displaying in the control bar
	 * Udpdate the progress bar
	 */
	onTimeUpdate() {
		if (this.options.time) {
			Promise.all([this.getCurrentTime(), this.getDuration()]).then(
				([seconds, duration]: [number, number]) => this.updateProgressBar({ seconds, duration })
			)
		}
	}

	/**
	 * Update the progress bar
	 * @param options
	 * @param options.seconds Current time in seconds
	 * @param options.duration Duration in seconds
	 * @param options.isRemote Cast mode is enabled
	 */
	updateProgressBar({
		seconds,
		duration,
		isRemote = false
	}: {
		seconds: number
		duration: number
		isRemote?: boolean
	}) {
		const currentTime = Math.round(seconds)
		if (this.elements.progressBar) {
			const width = (currentTime * 100) / duration
			this.elements.progressBar.value = `${width}`
			this.elements.progressBar.style.setProperty('--vlite-progressValue', `${width}%`)
			this.elements.progressBar.setAttribute('aria-valuenow', `${Math.round(seconds)}`)
		}

		if (this.elements.currentTime) {
			this.elements.currentTime.innerHTML = formatVideoTime(currentTime)
		}

		!isRemote && this.dispatchEvent('timeupdate')
	}

	/**
	 * On media ended
	 */
	onMediaEnded() {
		if (this.options.loop) {
			this.play()
		} else {
			this.elements.outerContainer.classList.replace('v-playing', 'v-paused')
			this.elements.outerContainer.classList.add('v-firstStart')
			this.isPaused = null
		}

		if (this.elements.poster) {
			this.elements.poster.classList.add('v-active')
		}

		if (this.type === 'video' && this.elements.bigPlay) {
			this.elements.bigPlay.setAttribute('aria-label', 'Play')
		}

		if (this.elements.playPause) {
			this.elements.playPause.setAttribute('aria-label', 'Play')
			this.elements.playPause.classList.remove('v-controlPressed')
		}

		if (this.elements.progressBar) {
			this.elements.progressBar.value = '0'
			this.elements.progressBar.style.setProperty('--vlite-progressValue', '0%')
			this.elements.progressBar.removeAttribute('aria-valuenow')
		}

		if (this.elements.currentTime) {
			this.elements.currentTime.innerHTML = '00:00'
		}

		this.dispatchEvent('ended')
	}

	/**
	 * Play the media element
	 */
	play() {
		if (this.isLinearAd) return

		if (this.isPaused === null) {
			this.elements.outerContainer.classList.remove('v-firstStart')

			if (this.type === 'video' && this.elements.poster) {
				this.elements.poster.classList.remove('v-active')
			}
		}

		!this.isCast && this.methodPlay()
		this.isPaused = false
		this.elements.outerContainer.classList.replace('v-paused', 'v-playing')

		if (this.elements.playPause) {
			this.elements.playPause.setAttribute('aria-label', 'Pause')
			this.elements.playPause.classList.add('v-controlPressed')
		}

		if (this.type === 'video' && this.elements.bigPlay) {
			this.elements.bigPlay.setAttribute('aria-label', 'Pause')
		}
		this.afterPlayPause()

		this.dispatchEvent('play')
	}

	/**
	 * Pause the media element
	 */
	pause() {
		!this.isCast && this.methodPause()
		this.isPaused = true
		this.elements.outerContainer.classList.replace('v-playing', 'v-paused')

		if (this.elements.playPause) {
			this.elements.playPause.setAttribute('aria-label', 'Play')
			this.elements.playPause.classList.remove('v-controlPressed')
		}

		if (this.type === 'video' && this.elements.bigPlay) {
			this.elements.bigPlay.setAttribute('aria-label', 'Play')
		}
		this.afterPlayPause()

		this.dispatchEvent('pause')
	}

	/**
	 * Callback function after the play|pause
	 */
	afterPlayPause() {
		if (this.Vlitejs.autoHideGranted) {
			this.Vlitejs.stopAutoHideTimer()
			!this.isPaused && this.Vlitejs.startAutoHideTimer()
		}
	}

	/**
	 * Set player volume
	 * @param volume New volume
	 */
	setVolume(volume: number) {
		let adjustedVolume = volume
		if (adjustedVolume > 1) {
			adjustedVolume = 1
		} else if (adjustedVolume <= 0) {
			adjustedVolume = 0
			this.isMuted = true
			if (this.elements.volume) {
				this.elements.volume.classList.add('v-controlPressed')
			}
		} else {
			this.isMuted = false
			if (this.elements.volume) {
				this.elements.volume.classList.remove('v-controlPressed')
			}
		}

		this.methodSetVolume(adjustedVolume)
		this.dispatchEvent('volumechange', {
			volume: adjustedVolume
		})
	}

	/**
	 * Get player volume
	 * @returns Player volume
	 */
	getVolume(): Promise<number> {
		return new window.Promise((resolve) => {
			this.methodGetVolume().then((volume: number) => {
				resolve(volume)
			})
		})
	}

	/**
	 * Mute the volume on the media element
	 */
	mute() {
		this.methodMute()
		this.isMuted = true

		if (this.elements.volume) {
			this.elements.volume.classList.add('v-controlPressed')
			this.elements.volume.setAttribute('aria-label', 'Unmute')
		}

		this.dispatchEvent('volumechange')
	}

	/**
	 * Unmute the volume on the media element
	 */
	unMute() {
		this.methodUnMute()
		this.isMuted = false

		if (this.elements.volume) {
			this.elements.volume.classList.remove('v-controlPressed')
			this.elements.volume.setAttribute('aria-label', 'Mute')
		}

		this.dispatchEvent('volumechange')
	}

	/**
	 * Update the current time of the media element
	 * @param newTime New current time of the media element
	 */
	seekTo(newTime: number) {
		this.methodSeekTo(newTime)
	}

	/**
	 * Set the media source
	 * @param source New media source URL
	 */
	setSource(source: string) {
		this.media.src = source
		this.media.load()
	}

	/**
	 * Request the fullscreen
	 */
	requestFullscreen() {
		const { requestFn } = this.Vlitejs.supportFullScreen

		// @ts-expect-error: Object is possibly 'null'.
		if (this.media[requestFn]) {
			// Request fullscreen on parentNode player, to display custom controls
			// @ts-expect-error: Object is possibly 'null'.
			this.elements.container[requestFn]()
			this.isFullScreen = true
			this.elements.outerContainer.classList.add('v-fullscreen')

			if (this.elements.fullscreen) {
				this.elements.fullscreen.classList.add('v-controlPressed')
				this.elements.fullscreen.setAttribute('aria-label', 'Exit fullscreen')
			}

			this.dispatchEvent('enterfullscreen')
		}
	}

	/**
	 * Exit the fullscreen
	 * @param options
	 * @param options.escKey The exit is trigger by the esk key
	 */
	exitFullscreen({ escKey = false }: { escKey?: boolean } = {}) {
		const { cancelFn } = this.Vlitejs.supportFullScreen

		if (document[cancelFn]) {
			!escKey && document[cancelFn]()
			this.isFullScreen = false

			this.elements.outerContainer.classList.remove('v-fullscreen')

			if (this.elements.fullscreen) {
				this.elements.fullscreen.classList.remove('v-controlPressed')
				this.elements.fullscreen.setAttribute('aria-label', 'Enter fullscreen')
			}

			this.dispatchEvent('exitfullscreen')
		}
	}

	/**
	 * Destroy the player
	 * Remove event listeners, player instance and HTML
	 */
	destroy() {
		// Call the destroy function on each plugins
		Object.keys(this.plugins).forEach((id) => {
			this.plugins[id].destroy instanceof Function && this.plugins[id].destroy()
		})

		this.controlBar?.destroy()

		this.playerEvents.forEach((event) => {
			this.elements.container.removeEventListener(event.type, event.listener)
		})
		this.elements.container.remove()
	}
}

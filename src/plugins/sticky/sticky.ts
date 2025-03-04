import './sticky.css'
import type Player from 'core/player.js'
import svgClose from 'shared/assets/svgs/close.svg'

type WindowSizes = {
	clientWidth: number
	innerHeight: number
}

type pluginParameter = {
	player: Player
	options: {
		mode?: string
		width?: number
		offset?: number
		ratio?: number
	}
}

/**
 * Vlitejs Sticky plugin
 * @module Vlitejs/plugins/sticky
 */
export default class Sticky {
	player: any
	closeStickyButton!: HTMLElement
	windowSizes: WindowSizes
	isSticky: boolean
	isPlayerSeen: boolean
	stickyIsClosed: boolean
	isOutViewport: null | boolean
	observer!: IntersectionObserver
	resizeTimer!: number
	mode: string
	width: number
	offset: number
	ratio: number

	providers = ['html5', 'youtube', 'dailymotion', 'vimeo']
	types = ['video']

	/**
	 * @constructor
	 * @param options
	 * @param options.player Player instance
	 * @param options.options Plugins options
	 */
	constructor({ player, options = {} }: pluginParameter) {
		this.player = player

		this.mode = options.mode ?? 'on'
		this.width = options.width ?? 400
		this.offset = options.offset ?? 20
		this.ratio = options.ratio ?? 16 / 9

		this.windowSizes = {
			clientWidth: document.documentElement.clientWidth,
			innerHeight: window.innerHeight
		}
		this.isSticky = false
		this.stickyIsClosed = false
		this.isOutViewport = null
		this.isPlayerSeen = false

		this.onClickOnCloseStickyButton = this.onClickOnCloseStickyButton.bind(this)
		this.onScroll = this.onScroll.bind(this)
		this.onResize = this.onResize.bind(this)
	}

	/**
	 * Initialize
	 */
	init() {
		this.render()
		this.closeStickyButton = this.player.elements.container.querySelector('.v-closeStickyButton')

		this.addEvents()
	}

	/**
	 * Render the plugin HTML
	 */
	render() {
		// @TODO: svg is cropped
		const template = `<button class="v-closeStickyButton">${svgClose}</button>`
		this.player.elements.container.insertAdjacentHTML('beforeend', template)
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.observer = new window.IntersectionObserver(this.callbackOnIntersection.bind(this), {
			rootMargin: '0px',
			threshold: 0.0
		})
		this.observer.observe(this.player.elements.outerContainer)

		this.closeStickyButton.addEventListener('click', this.onClickOnCloseStickyButton)

		window.addEventListener('scroll', this.onScroll, {
			passive: true
		})
		window.addEventListener('resize', this.onResize)
	}

	/**
	 * Handles scroll events for determining which action to take
	 * based on current scroll value
	 */
	onScroll() {
		this.updateSticky()
	}

	/**
	 * Update sticky position
	 * @param options
	 * @param options.resize Update is trigger by the resize event
	 */
	updateSticky({ resize = false } = {}) {
		if (this.isStickyGranted()) {
			if (!this.isSticky || resize) {
				this.setStickyOn()
			}
		} else {
			if (this.isSticky) {
				this.setStickyOff()
			}
		}
	}

	/**
	 * On window resize event
	 */
	onResize() {
		this.windowSizes.clientWidth = document.documentElement.clientWidth
		this.windowSizes.innerHeight = window.innerHeight

		clearTimeout(this.resizeTimer)
		this.resizeTimer = window.setTimeout(() => this.updateSticky({ resize: true }), 0)
	}

	/**
	 * Callback method on player intersection actions
	 * @callback
	 * @param entries List of elements being watched
	 */
	callbackOnIntersection(entries: IntersectionObserverEntry[]) {
		entries.forEach((entry: IntersectionObserverEntry) => {
			if (entry.isIntersecting) {
				this.inViewport()
			} else {
				this.outViewport()
			}
		})
	}

	/**
	 * Player is inside viewport
	 */
	inViewport() {
		this.isPlayerSeen = true
		this.isOutViewport = false

		this.isStickyGranted() && this.setStickyOff()
	}

	/**
	 * Player is outside the viewport
	 */
	outViewport() {
		this.isOutViewport = true

		this.isStickyGranted() && this.setStickyOn()
	}

	/**
	 * Check if the sticky is granted
	 * @returns Sticky is granted
	 */
	isStickyGranted() {
		return !this.stickyIsClosed && this.isOutViewport && (this.mode === 'instant' || this.isPlayerSeen)
	}

	/**
	 * Set the sticky
	 */
	setStickyOn() {
		this.player.dispatchEvent('entersticky')

		this.isSticky = true
		this.player.elements.outerContainer.classList.add('v-sticky')

		const height = this.width / this.ratio
		const x = this.windowSizes.clientWidth - this.width - this.offset
		const y = this.windowSizes.innerHeight - height - this.offset

		this.player.elements.container.style.width = `${this.width}px`
		this.player.elements.container.style.height = `${height}px`

		this.player.elements.container.style.transform = `translate3d(${x}px, ${y}px, 0)`
	}

	/**
	 * Unset the sticky
	 */
	setStickyOff() {
		this.player.dispatchEvent('leavesticky')

		this.isSticky = false

		this.player.elements.outerContainer.classList.remove('v-sticky')
		this.player.elements.container.style.removeProperty('width')
		this.player.elements.container.style.removeProperty('height')
		this.player.elements.container.style.removeProperty('transform')
	}

	/**
	 * On click on the close button
	 * @param e Event data
	 */
	onClickOnCloseStickyButton(e: Event) {
		e.preventDefault()
		this.stickyIsClosed = true
		this.setStickyOff()
	}

	/**
	 * Destroy the plugin
	 */
	destroy() {
		this.closeStickyButton.removeEventListener('click', this.onClickOnCloseStickyButton)
		window.removeEventListener('scroll', this.onScroll)
		window.removeEventListener('resize', this.onResize)
		this.observer.unobserve(this.player.elements.outerContainer)
	}
}

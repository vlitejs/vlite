import svgClose from 'shared/assets/svgs/close.svg'
import { pluginParameter } from 'shared/assets/interfaces/interfaces'

interface WindowSizes {
	innerWidth: number
	innerHeight: number
}

/**
 * Vlitejs Sticky plugin
 * @module Vlitejs/plugins/sticky
 */
export default class Sticky {
	player: any
	options: any
	closeStickyButton!: HTMLElement
	windowSizes: WindowSizes
	isSticky: boolean
	isPlayerSeen: boolean
	stickyIsClosed: boolean
	isOutViewport: null | boolean
	observer!: IntersectionObserver
	resizeTimer!: number

	providers = ['html5']
	types = ['video']

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.player Player instance
	 */
	constructor({ player, options = {} }: pluginParameter) {
		this.player = player
		this.options = options

		const DEFAULTS = {
			offset: 50,
			mode: 'on'
		}

		this.options = { ...DEFAULTS, ...this.options }
		this.windowSizes = {
			innerWidth: window.innerWidth,
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
		this.closeStickyButton =
			this.player.elements.container.querySelector('.v-closeStickyButton')

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

	onResize() {
		this.windowSizes.innerWidth = window.innerWidth
		this.windowSizes.innerHeight = window.innerHeight

		clearTimeout(this.resizeTimer)
		this.resizeTimer = window.setTimeout(() => this.updateSticky({ resize: true }), 0)
	}

	/**
	 * Callback method: On a player intersection actions
	 * @callback
	 * @param {Array} entries List of HTML elements being watched
	 */
	callbackOnIntersection(entries: Array<IntersectionObserverEntry>) {
		entries.forEach((entry: IntersectionObserverEntry) => {
			// @TODO: how if it is several players?
			if (entry.isIntersecting) {
				this.inViewport()
			} else {
				this.outViewport()
			}
		})
	}

	inViewport() {
		this.isPlayerSeen = true
		this.isOutViewport = false

		this.isStickyGranted() && this.setStickyOff()
	}

	outViewport() {
		this.isOutViewport = true

		this.isStickyGranted() && this.setStickyOn()
	}

	isStickyGranted() {
		return (
			!this.stickyIsClosed &&
			this.isOutViewport &&
			(this.options.mode === 'instant' || this.isPlayerSeen)
		)
	}

	setStickyOn() {
		this.player.dispatchEvent('entersticky')

		this.isSticky = true
		this.player.elements.outerContainer.classList.add('v-sticky')

		const width = 400
		const height = 400 * 0.5625
		const x = this.windowSizes.innerWidth - width - this.options.offset
		const y = this.windowSizes.innerHeight - height - this.options.offset

		this.player.elements.container.style.width = `${width}px`
		this.player.elements.container.style.height = `${height}px`

		this.player.elements.container.style.transform = `translate3d(${x}px, ${y}px, 0)`
	}

	setStickyOff() {
		this.player.dispatchEvent('leavesticky')

		this.isSticky = false

		this.player.elements.outerContainer.classList.remove('v-sticky')
		this.player.elements.container.style.removeProperty('width')
		this.player.elements.container.style.removeProperty('height')
		this.player.elements.container.style.removeProperty('transform')
	}

	/**
	 * On click on the subtitle button
	 * @param {Event} e Event data
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

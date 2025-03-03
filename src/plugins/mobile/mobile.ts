import type Player from 'core/player.js'

type pluginParameter = {
	player: Player
	options: {
		seekTime?: number
		volumeStep?: number
		tapTimeout?: number
	}
}

/**
 * Vlitejs Mobile plugin
 * @module Vlitejs/plugins/Mobile
 */
export default class Mobile {
	player: any
	seekTime: number
	volumeStep: number
	tapTimeout: number
	taps: number

	providers = ['html5', 'youtube', 'dailymotion', 'vimeo']
	types = ['video', 'audio']

	/**
	 * @constructor
	 * @param options
	 * @param options.player Player instance
	 * @param options.options Plugin options
	 */
	constructor({ player, options = {} }: pluginParameter) {
		this.player = player
		this.seekTime = options.seekTime ?? 5
		this.volumeStep = options.volumeStep ?? 0.1
		this.tapTimeout = options.tapTimeout ?? 300
		this.taps = 0

		// Add play toggle overlay
		this.addChild('playToggle', {})
		// TODO maybe can be replaced with:
		// this.player.container.insertAdjacentHTML('beforeend', '<div class="v-playToggle"></div>')

		// Clear overlay when playback starts or with control fade
		player.on(['playing', 'userinactive'], e => {
			this.removeClass('show-play-toggle')
		})

		// A 0 inactivity timeout won't work here
		if (this.player_.options_.inactivityTimeout === 0) {
			this.player_.options_.inactivityTimeout = 5000
		}

		/**
		 * Debounced tap handler.
		 * Seeks number of (taps - 1) * configured seconds to skip.
		 * One tap is a non-op
		 *
		 * @param {Event} event
		 */
		this.handleTaps_ = videojs.fn.debounce(async event => {
			const increment = (this.taps - 1) * this.seekTime

			this.taps = 0
			if (increment < 1) {
				return
			}

			const rect = this.el_.getBoundingClientRect()
			const x = event.changedTouches[0].clientX - rect.left

			// Check if double tap is in left or right area
			if (x < rect.width * 0.4) {
				await this.fastForward('backward')
				// TODO remove - ORIGINAL IMPLEMENTATION:
				// this.player_.currentTime(Math.max(0, this.player_.currentTime() - increment))
				this.addClass('reverse')
			} else if (x > rect.width - (rect.width * 0.4)) {
				await this.fastForward('forward')
				// TODO remove - ORIGINAL IMPLEMENTATION:
				// this.player_.currentTime(Math.min(this.player_.duration(), this.player_.currentTime() + increment))
				this.removeClass('reverse')
			} else {
				return
			}

			// Remove play toggle if showing
			this.removeClass('show-play-toggle')

			// Remove and readd class to trigger animation
			this.setAttribute('data-skip-text', `${increment} ${this.localize('seconds')}`)
			this.removeClass('skip')
			window.requestAnimationFrame(() => {
				this.addClass('skip')
			})
		}, this.tapTimeout)

		this.enable()
	}

	/**
	 * Initialize
	 */
	init() {
		this.addEvents()
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		// TODO
		// this.player.container.addEventListener('keydown', this.onKeydown)
	}

	// TODO refactor to use common function
	/**
	 * Trigger the video fast forward (front and rear)
	 * @param direction Direction (backward|forward)
	 */
	fastForward(direction: string) {
		return this.player.getCurrentTime().then((seconds: number) => {
			this.player.seekTo(
				direction === 'backward' ? seconds - this.seekTime : seconds + this.seekTime
			)
		})
	}

	/**
	 * Destroy the plugin
	 */
	destroy() {
		// TODO
		// this.player.container.removeEventListener('keydown', this.onKeydown)
	}
}

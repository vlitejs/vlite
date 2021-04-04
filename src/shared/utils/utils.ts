import { FullScreenSupport } from 'shared/assets/interfaces/interfaces'

declare global {
	interface Document {
		[key: string]: any
	}
	interface Window {
		DocumentTouch: any
	}
}

/**
 * Capitalized the first character of a string
 * @param {String} string
 * @returns {String} Capitalized string
 */
export function capitalized(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Convert video time second to 00:00 display
 * @param {Number} time Current time
 * @returns {String} Formatted time
 */
export function formatVideoTime(time: number): string {
	const ms = time * 1000
	const min = (ms / 1000 / 60) << 0
	const sec = (ms / 1000) % 60 << 0
	let timeInString = ''

	timeInString += min < 10 ? '0' : ''
	timeInString += min + ':'
	timeInString += sec < 10 ? '0' : ''
	timeInString += sec

	return timeInString
}

/**
 * Check fullscreen support API on different browsers and cached prefixs
 * @returns {Object} Fullscreen utils functions
 */
export function checkSupportFullScreen(): FullScreenSupport {
	const prefix = getBrowserPrefix()

	return {
		requestFn: prefix ? `${prefix}RequestFullScreen` : 'requestFullscreen',
		cancelFn: prefix ? `${prefix}ExitFullscreen` : 'exitFullscreen',
		changeEvent: prefix ? `${prefix}fullscreenchange` : 'fullscreenchange',
		isFullScreen: prefix ? `${prefix}FullscreenElement` : 'fullscreenElement'
	}
}

/**
 * Get browser prefix used by the fullscreen API
 * @returns {String} Browser prefix (webkit|moz|ms)
 */
export function getBrowserPrefix(): string {
	if (document.exitFullscreen instanceof Function) return ''

	const prefixs = ['webkit', 'moz', 'ms']

	return (
		prefixs.find(
			(prefix: string) =>
				document[prefix + 'ExitFullscreen'] instanceof Function ||
				document[`${prefix}CancelFullScreen`] instanceof Function
		) || ''
	)
}

/**
 * Get CSS transition duration value
 * @param {HTMLElement} target - Target element to calculate from
 * @param {Boolean} isMilliseconds - Should the duration be returned in milliseconds or not
 * @returns {Number} Transition duration in seconds or milliseconds
 */
export function getCSSTransitionDuration({
	target,
	isMilliseconds = false
}: {
	target: HTMLElement
	isMilliseconds: Boolean
}) {
	return (
		parseFloat(window.getComputedStyle(target).transitionDuration) * (isMilliseconds ? 1000 : 1)
	)
}

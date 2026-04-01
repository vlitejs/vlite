import type { FullScreenSupport } from 'shared/assets/types/types.js'

declare global {
	interface Document {
		[key: string]: any
	}
	interface Window {
		DocumentTouch: any
	}
}

/**
 * Convert video time second to 0:00 display
 * 
 * E.g.:
 * - 0 → 0:00
 * - 65 → 1:05
 * - 3600 → 1:00:00
 * - 3665 → 1:01:05
 * - 96520 → 26:48:40
 * @param time Current time
 * @returns Formatted time
 */
export function formatVideoTime(time: number): string {
	const hour = Math.floor(time / 3600)
	const min = Math.floor((time % 3600) / 60)
	const sec = Math.floor(time % 60)

	if (hour > 0) {
		return `${hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
	}

	return `${min}:${sec < 10 ? `0${sec}` : sec}`
}

/**
 * Check fullscreen support API on different browsers and cached prefixs
 * @returns Fullscreen utils functions
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
 * @returns Browser prefix (webkit|moz|ms)
 */
export function getBrowserPrefix(): string {
	if (document.exitFullscreen instanceof Function) return ''

	const prefixs = ['webkit', 'moz', 'ms']

	return (
		prefixs.find(
			(prefix: string) =>
				document[`${prefix}ExitFullscreen`] instanceof Function ||
				document[`${prefix}CancelFullScreen`] instanceof Function
		) || ''
	)
}

/**
 * Check if the device is touch
 * @returns Is touch
 */
export function isTouch(): boolean {
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

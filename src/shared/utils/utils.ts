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
 * Convert video time second to 00:00 display
 * @param time Current time
 * @returns Formatted time
 */
export function formatVideoTime(time: number): string {
	const ms = time * 1000
	const min = (ms / 1000 / 60) << 0
	const sec = ((ms / 1000) % 60) << 0
	let timeInString = ''

	timeInString += min < 10 ? '0' : ''
	timeInString += `${min}:`
	timeInString += sec < 10 ? '0' : ''
	timeInString += sec

	return timeInString
}

/**
 * Check fullscreen support API on different browsers and cached prefixs
 * @returns Fullscreen utils functions
 */
export function checkSupportFullScreen(): FullScreenSupport {
  const support = [
    'requestFullscreen,exitFullscreen,fullscreenchange,fullscreenElement',
    'webkitRequestFullscreen,webkitExitFullscreen,webkitfullscreenchange,webkitFullscreenElement',
    'mozRequestFullScreen,mozCancelFullScreen,mozfullscreenchange,mozFullScreenElement',
    'webkitEnterFullscreen,webkitExitFullscreen,webkitfullscreenchange,webkitDisplayingFullscreen'
  ]
  const items: string[] = (support.find((e) => document[e.split(',')[0]] instanceof Function) || support[0]).split(',');
  return {
    requestFn: items[0],
    cancelFn: items[1],
    changeEvent: items[2],
    isFullScreen: items[3]
  }
}

/**
 * Check if the device is touch
 * @returns Is touch
 */
export function isTouch(): boolean {
	return !!('ontouchstart' in document.documentElement)
}

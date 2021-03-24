export function capitalized(string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Convert video time second to 00:00 display
 * @param {Float|Integer} time Current time
 */
export function formatVideoTime(time) {
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
 * Check if browser support touch event
 * @returns {Boolean} Touch event support
 */
export function isTouch() {
	return (
		'ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch)
	)
}

/**
 * Check fullscreen support API on different browsers and cached prefixs
 */
export function checkSupportFullScreen() {
	const prefixs = ['', 'moz', 'webkit', 'ms', 'o']
	let lengthPrefixs = prefixs.length
	let requestFn
	let cancelFn
	let changeEvent
	let isFullScreen

	if (document.cancelFullscreen !== undefined) {
		requestFn = 'requestFullscreen'
		cancelFn = 'exitFullscreen'
		changeEvent = 'fullscreenchange'
	} else {
		while (lengthPrefixs--) {
			if (
				(prefixs[lengthPrefixs] !== 'moz' || document.mozFullScreenEnabled) &&
				document[prefixs[lengthPrefixs] + 'CancelFullScreen'] !== undefined
			) {
				requestFn = prefixs[lengthPrefixs] + 'RequestFullScreen'
				cancelFn = prefixs[lengthPrefixs] + 'CancelFullScreen'
				changeEvent = prefixs[lengthPrefixs] + 'fullscreenchange'
				isFullScreen =
					prefixs[lengthPrefixs] === 'webkit'
						? prefixs[lengthPrefixs] + 'IsFullScreen'
						: prefixs[lengthPrefixs] + 'FullScreen'
			}
		}
	}

	const fullscreen = {
		requestFn: requestFn,
		cancelFn: cancelFn,
		changeEvent: changeEvent,
		isFullScreen: isFullScreen
	}

	return requestFn ? fullscreen : false
}

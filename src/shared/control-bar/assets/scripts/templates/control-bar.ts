import svgPlay from 'shared/assets/svgs/play.svg'
import svgPause from 'shared/assets/svgs/pause.svg'
import svgVolumeHigh from 'shared/assets/svgs/volume-high.svg'
import svgVolumeMute from 'shared/assets/svgs/volume-mute.svg'
import svgFullscreen from 'shared/assets/svgs/fullscreen.svg'
import svgFullscreenExit from 'shared/assets/svgs/fullscreen-exit.svg'
import { capitalized } from 'shared/utils/utils'
import { Options } from 'shared/assets/interfaces/interfaces'

/**
 * Big play template
 * @param {Object} options
 * @param {Object} options.options Player options
 * @param {Boolean} options.isMuted Player is muted
 * @param {String} options.type Player type (video|audio)
 * @returns {String} Generated HTML
 */
export default function ({
	options,
	isMuted,
	type
}: {
	options: Options
	isMuted: Boolean
	type: string
}): string {
	return `<div class="v-controlBar v-style${capitalized(type)}">${
		options.playPause ? playPauseElement() : ''
	}${options.time ? timeElement() : ''}${options.progressBar ? progressBarElement() : ''}${
		options.volume ? volumeElement({ isMuted }) : ''
	}${options.fullscreen ? fullscreenElement() : ''}</div>`
}

/**
 * Play pause button template
 * @returns {String} Generated HTML
 */
function playPauseElement(): string {
	return `<button class="v-playPauseButton v-controlButton" aria-label="Play">${svgPlay}${svgPause}</button>`
}

/**
 * Time template
 * @returns {String} Generated HTML
 */
function timeElement(): string {
	return `<div class="v-time"><span class="v-currentTime">00:00</span>&nbsp;/&nbsp;<span class="v-duration"></span></div>`
}

/**
 * Progress bar template
 * @returns {String} Generated HTML
 */
function progressBarElement(): string {
	return `<input type="range" class="v-progressBar" min="0" max="100" step="0.01" value="0" aria-label="Seek" aria-valuemin="0" />`
}

/**
 * Volume button template
 * @returns {String} Generated HTML
 */
function volumeElement({ isMuted }: { isMuted: Boolean }) {
	const muteClass = isMuted ? ' v-controlPressed' : ''
	return `<button class="v-volumeButton v-controlButton${muteClass}">${svgVolumeHigh}${svgVolumeMute}</button>`
}

/**
 * Fullscreen button template
 * @returns {String} Generated HTML
 */
function fullscreenElement(): string {
	return `<button class="v-fullscreenButton v-controlButton" aria-label="Enter fullscreen">${svgFullscreen}${svgFullscreenExit}</span></button>`
}

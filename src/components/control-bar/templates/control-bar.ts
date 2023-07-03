import svgPlay from 'shared/assets/svgs/play.svg'
import svgPause from 'shared/assets/svgs/pause.svg'
import svgVolumeHigh from 'shared/assets/svgs/volume-high.svg'
import svgVolumeMute from 'shared/assets/svgs/volume-mute.svg'
import svgFullscreen from 'shared/assets/svgs/fullscreen.svg'
import svgFullscreenExit from 'shared/assets/svgs/fullscreen-exit.svg'
import { Options } from 'shared/assets/types/types.js'

/**
 * Big play template
 * @param options
 * @param options.options Player options
 * @param options.isMuted Player is muted
 * @param options.isVideo Player type is video
 * @returns Generated HTML
 */
export default function controlBar({
	options,
	isMuted,
	isVideo
}: {
	options: Options
	isMuted: boolean
	isVideo: boolean
}): string {
	if (isVideo) {
		return `<div class="v-controlBar">${options.playPause ? playPauseElement() : ''}${
			options.time ? timeElement() : ''
		}${options.progressBar ? progressBarElement() : ''}${
			options.volume ? volumeElement({ isMuted }) : ''
		}${options.fullscreen ? fullscreenElement() : ''}</div>`
	}

	return `<div class="v-controlBar">${options.playPause ? playPauseElement() : ''}${
		options.time ? timeElement() : ''
	}${options.progressBar ? progressBarElement() : ''}${
		options.volume ? volumeElement({ isMuted }) : ''
	}</div>`
}

/**
 * Play pause button template
 * @returns Generated HTML
 */
function playPauseElement(): string {
	return `<button class="v-playPauseButton v-controlButton" aria-label="Play">${svgPlay}${svgPause}</button>`
}

/**
 * Time template
 * @returns Generated HTML
 */
function timeElement(): string {
	return `<div class="v-time"><span class="v-currentTime">00:00</span>&nbsp;/&nbsp;<span class="v-duration"></span></div>`
}

/**
 * Progress bar template
 * @returns Generated HTML
 */
function progressBarElement(): string {
	return `<input type="range" class="v-progressBar v-progressBarStyle" min="0" max="100" step="0.01" value="0" aria-label="Seek" aria-valuemin="0" />`
}

/**
 * Volume button template
 * @returns Generated HTML
 */
function volumeElement({ isMuted }: { isMuted: boolean }) {
	const muteClass = isMuted ? ' v-controlPressed' : ''
	return `<button class="v-volumeButton v-controlButton${muteClass}">${svgVolumeHigh}${svgVolumeMute}</button>`
}

/**
 * Fullscreen button template
 * @returns Generated HTML
 */
function fullscreenElement(): string {
	return `<button class="v-fullscreenButton v-controlButton" aria-label="Enter fullscreen">${svgFullscreen}${svgFullscreenExit}</span></button>`
}

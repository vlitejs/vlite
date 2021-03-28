import { createElement } from 'jsx-dom'
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
 * @param {String} options.mode Media mode (video|audio)
 * @returns {HTMLElement} Generated HTML
 */
export default function ({
	options,
	isMuted,
	mode
}: {
	options: Options
	isMuted: Boolean
	mode: string
}): JSX.Element {
	const ariaValueMin = 0
	return (
		<div className={`v-controlBar v-style${capitalized(mode)}`}>
			{options.playPause && (
				<button className="v-playPauseButton v-controlButton" aria-label="Play">
					<span className="v-controlButtonIcon v-iconPlay" innerHTML={svgPlay}></span>
					<span className="v-controlButtonIcon v-iconPause" innerHTML={svgPause}></span>
				</button>
			)}
			{options.time && (
				<div className="v-time">
					<span className="v-currentTime">00:00</span>&nbsp;/&nbsp;
					<span className="v-duration"></span>
				</div>
			)}
			{options.progressBar && (
				<input
					type="range"
					className="v-progressBar"
					min="0"
					max="100"
					step="0.01"
					value="0"
					aria-label="Seek"
					aria-valuemin={ariaValueMin}
				/>
			)}
			{options.volume && (
				<button className={`v-volumeButton v-controlButton${isMuted ? ' v-pressed' : ''}`}>
					<span className="v-controlButtonIcon v-iconVolumeHigh" innerHTML={svgVolumeHigh}></span>
					<span className="v-controlButtonIcon v-iconVolumeMute" innerHTML={svgVolumeMute}></span>
				</button>
			)}
			{options.fullscreen && (
				<button className="v-fullscreenButton v-controlButton" aria-label="Enter fullscreen">
					<span className="v-controlButtonIcon v-iconFullscreen" innerHTML={svgFullscreen}></span>
					<span className="v-controlButtonIcon v-iconShrink" innerHTML={svgFullscreenExit}></span>
				</button>
			)}
		</div>
	)
}

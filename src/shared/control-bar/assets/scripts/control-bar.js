import { createElement } from 'jsx-dom'
import svgPlay from 'shared/assets/svgs/play.svg'
import svgPause from 'shared/assets/svgs/pause.svg'
import svgVolumeHigh from 'shared/assets/svgs/volume-high.svg'
import svgVolumeMute from 'shared/assets/svgs/volume-mute.svg'
import svgFullscreen from 'shared/assets/svgs/fullscreen.svg'
import svgFullscreenExit from 'shared/assets/svgs/fullscreen-exit.svg'

export default function ({ progressBar, playPause, time, volume, fullscreen }) {
	return (
		<div className="v-controlBar">
			{progressBar && (
				<div className="v-progressBar">
					<div className="v-progressSeek"></div>
					<input
						type="range"
						className="v-progressInput"
						min="0"
						max="100"
						step="0.01"
						value="0"
						orient="horizontal"
					/>
				</div>
			)}
			<div className="v-controlBarContent">
				{playPause && (
					<button className="v-playPauseButton">
						<span className="v-playerIcon v-iconPlay" innerHTML={svgPlay}></span>
						<span className="v-playerIcon v-iconPause" innerHTML={svgPause}></span>
					</button>
				)}
				{time && (
					<div className="v-time">
						<span className="v-currentTime">00:00</span>&nbsp;/&nbsp;
						<span className="v-duration"></span>
					</div>
				)}
				{volume && (
					<button className="v-volumeButton">
						<span className="v-playerIcon v-iconVolumeHigh" innerHTML={svgVolumeHigh}></span>
						<span className="v-playerIcon v-iconVolumeMute" innerHTML={svgVolumeMute}></span>
					</button>
				)}
				{fullscreen && (
					<button className="v-fullscreenButton">
						<span className="v-playerIcon v-iconFullscreen" innerHTML={svgFullscreen}></span>
						<span className="v-playerIcon v-iconShrink" innerHTML={svgFullscreenExit}></span>
					</button>
				)}
			</div>
		</div>
	)
}

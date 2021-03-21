import { createElement } from 'jsx-dom'
import svgBigPlay from 'shared/assets/svgs/big-play.svg'

export default function () {
	return (
		<div className="v-bigPlayButton" data-v-toggle-play-pause>
			<span className="v-playerIcon v-iconBigPlay" innerHTML={svgBigPlay}></span>
		</div>
	)
}

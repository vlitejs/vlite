import { createElement } from 'jsx-dom'
import svgBigPlay from 'shared/assets/svgs/big-play.svg'

/**
 * Big play template
 * @returns {HTMLElement} Generated HTML
 */
export default function () {
	return <button className="v-bigPlay" innerHTML={svgBigPlay}></button>
}

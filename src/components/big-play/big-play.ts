import './big-play.css'
import svgBigPlay from 'shared/assets/svgs/big-play.svg'

/**
 * Big play template
 * @returns Generated HTML
 */
export default function bigPlay(): string {
	return `<button class="v-bigPlay" aria-label="Play">${svgBigPlay}</button>`
}

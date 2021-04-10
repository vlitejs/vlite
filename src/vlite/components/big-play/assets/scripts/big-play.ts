import svgBigPlay from 'shared/assets/svgs/big-play.svg'

/**
 * Big play template
 * @returns {String} Generated HTML
 */
export default function (): string {
	return `<button class="v-bigPlay v-controlButton">${svgBigPlay}</button>`
}

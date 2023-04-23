import './poster.css'

/**
 * Poster template
 * @param {Object} options
 * @param {Object} options.posterUrl Poster url
 * @returns {String} Generated HTML
 */
export default function poster({ posterUrl = '' }: { posterUrl: string }): string {
	const posterStyle = posterUrl && ` style="background-image: url(${posterUrl})"`
	return `<div class="v-poster v-active"${posterStyle}></div>`
}

import './poster.css'

/**
 * Poster template
 * @param options
 * @param options.posterUrl Poster url
 * @returns Generated HTML
 */
export default function poster({ posterUrl = '' }: { posterUrl: string }): string {
	const posterStyle = posterUrl && ` style="background-image: url(${posterUrl})"`
	return `<div class="v-poster v-active"${posterStyle}></div>`
}

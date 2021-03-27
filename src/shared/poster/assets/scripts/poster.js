import { createElement } from 'jsx-dom'

/**
 * Loader template
 * @param {Object} options
 * @param {Object} options.posterUrl Poster url
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ posterUrl = '' }) {
	const style = {
		backgroundImage: posterUrl && `url(${posterUrl})`
	}
	return <div className="v-poster v-active" style={style}></div>
}

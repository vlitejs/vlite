import { createElement } from 'jsx-dom'

/**
 * Loader template
 * @returns {HTMLElement} Generated HTML
 */
export default function () {
	return (
		<div className="v-loader">
			<div className="v-loaderContent">
				<div className="v-loaderBounce1"></div>
				<div className="v-loaderBounce2"></div>
				<div className="v-loaderBounce3"></div>
			</div>
		</div>
	)
}

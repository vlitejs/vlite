/**
 * Loader template
 * @returns {String} Generated HTML
 */
export default function loader(): string {
	return `
		<div class="v-loader">
			<div class="v-loaderContent">
				<div class="v-loaderBounce1"></div>
				<div class="v-loaderBounce2"></div>
				<div class="v-loaderBounce3"></div>
			</div>
		</div>
	`
}

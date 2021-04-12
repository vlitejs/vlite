const path = require('path')

module.exports = (api) => {
	return {
		plugins: [
			require('postcss-import')(),
			require('postcss-url')(),
			require('postcss-preset-env')({
				stage: 2,
				features: {
					'custom-properties': {
						warnings: true,
						preserve: true
					}
				}
			}),
			require('postcss-nested')(),
			require('postcss-custom-media')({
				preserve: false
			})
		]
	}
}

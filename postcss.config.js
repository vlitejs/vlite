const path = require('path')

module.exports = {
	plugins: [
		require('postcss-import')({
			path: path.resolve(__dirname, `./src`)
		}),
		require('postcss-preset-env')({
			stage: 2,
			features: {
				'custom-properties': {
					warnings: true,
					preserve: false
				}
			}
		}),
		require('postcss-nested')()
	]
}

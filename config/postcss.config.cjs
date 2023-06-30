module.exports = {
	plugins: [
		require('postcss-import'),
		require('postcss-url'),
		require('postcss-preset-env')({
			stage: 2,
			features: {
				'nesting-rules': false,
				'custom-properties': {
					warnings: true,
					preserve: true
				}
			}
		}),
		require('postcss-nested'),
		require('postcss-custom-media')({
			preserve: false
		})
	]
}

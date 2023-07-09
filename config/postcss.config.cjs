module.exports = {
	plugins: {
		'postcss-import': {},
		'postcss-url': {},
		'postcss-nested': {},

		'postcss-preset-env': {
			stage: 2,
			features: {
				'nesting-rules': false,
				'custom-properties': {
					warnings: true,
					preserve: true
				}
			}
		},

		'postcss-custom-media': {
			preserve: false
		}
	}
}

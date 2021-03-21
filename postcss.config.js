const path = require('path')
const crypto = require('crypto')
const md5 = (string) =>
	crypto
		.createHash('md5')
		.update(string)
		.digest('hex')

module.exports = (api) => {
	const isProduction = api.mode === 'production'

	return {
		plugins: [
			require('postcss-import')(),
			require('postcss-url')(),
			require('postcss-custom-properties-transformer')({
				transformer: ({ property }) => (isProduction ? md5(property).slice(0, 4) : property)
			}),
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
				importFrom: [path.resolve(__dirname, './src/shared/assets/styles/vars.css')],
				preserve: false
			})
		]
	}
}

import postcssImport from 'postcss-import'
import postcssUrl from 'postcss-url'
import postcssPresetEnv from 'postcss-preset-env'
import postcssNested from 'postcss-nested'
import postcssCustomMedia from 'postcss-custom-media'

export default function postCssConfig() {
	return {
		plugins: [
			postcssImport(),
			postcssUrl(),
			postcssPresetEnv({
				stage: 2,
				features: {
					'custom-properties': {
						warnings: true,
						preserve: true
					}
				}
			}),
			postcssNested(),
			postcssCustomMedia({
				preserve: false
			})
		]
	}
}

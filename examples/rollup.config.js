import path from 'path'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { fromRollup } from '@web/dev-server-rollup'
import rollupReplace from '@rollup/plugin-replace'
import { fromRollup } from '@web/dev-server-rollup'

const replace = fromRollup(rollupReplace)

const isProduction = process.env.ENV === 'production'
const dir = path.resolve(__dirname, '../dist')

const plugins = [
	commonjs(),
	nodeResolve({ browser: true }),
	typescript({
		include: 'src/**'
	}),
	postcss({
		config: {
			path: 'config/postcss.config.mjs'
		},
		extract: true
	})
]

if (isProduction) {
	// Use custom Terser configuration to remove the Microsoft copyright from tslib and keep the banner plugin
	// Terser is executed after the banner plugin
	plugins.push(
		terser({
			format: {
				comments: (node, comment) => {
					if (comment.type === 'comment2') {
						return /Yoriiis/i.test(comment.value)
					}
				}
			}
		})
	)
}

const entries = [
	{
		path: 'src/vlite/config.js',
		output: `${dir}/vlite.js`
	}
]

const config = entries.map(({ path, output }) => ({
	input: path,
	output: [
		{
			exports: 'named',
			file: output,
			format: 'es'
		}
	],
	plugins
}))

export default config

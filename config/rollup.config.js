import { resolve } from 'path'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import svg from 'rollup-plugin-svg'
import { banner, providers, plugins } from './package'

const isProduction = process.env.ENV === 'production'
const outputDirectory = resolve(__dirname, '../dist')

const createConfig = ({ input, outputFile }) => {
	const terserConfig = terser({
		format: {
			comments: (node, comment) => {
				if (comment.type === 'comment2') {
					return /Yoriiis/i.test(comment.value)
				}
			}
		}
	})

	return {
		input,
		output: [
			{
				banner,
				exports: 'named',
				file: `${outputDirectory}/${outputFile}`,
				format: 'es'
			}
		],
		plugins: [
			commonjs(),
			nodeResolve({ browser: true }),
			typescript({
				include: 'src/**/*.ts'
			}),
			svg(),
			postcss({
				config: {
					path: 'postcss.config.cjs'
				},
				extract: true
			}),
			alias({
				entries: [
					{ find: 'shared', replacement: resolve('src/shared') },
					{ find: 'components', replacement: resolve('src/components') },
					{ find: 'providers', replacement: resolve('src/providers') },
					{ find: 'plugins', replacement: resolve('src/plugins') }
				]
			}),
			...(isProduction ? [terserConfig] : [])
		]
	}
}

export default [
	...providers.map((provider) =>
		createConfig({
			input: `./src/providers/${provider}/${provider}.ts`,
			outputFile: `providers/${provider}.js`
		})
	),
	...plugins.map((plugin) =>
		createConfig({
			input: `./src/plugins/${plugin}/${plugin}.ts`,
			outputFile: `plugins/${plugin}.js`
		})
	),
	createConfig({
		input: `./src/core/vlite.ts`,
		outputFile: `vlite.js`
	})
]

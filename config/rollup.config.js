import { resolve } from 'path'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import svg from 'rollup-plugin-svg'
import postcss from 'rollup-plugin-postcss'
import alias from '@rollup/plugin-alias'
import { terser } from 'rollup-plugin-terser'
import { banner, providers, plugins } from './package'

const isProduction = process.env.ENV === 'production'
const outputDirectory = resolve(__dirname, '../dist')

const createConfig = ({ input, outputFile }) => {
	return {
		input,
		output: [
			{
				banner,
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
					path: resolve(__dirname, 'postcss.config.cjs')
				},
				extract: true,
				minimize: isProduction
			}),
			alias({
				entries: [
					{ find: 'shared', replacement: resolve('src/shared') },
					{ find: 'components', replacement: resolve('src/components') },
					{ find: 'providers', replacement: resolve('src/providers') },
					{ find: 'plugins', replacement: resolve('src/plugins') }
				]
			}),
			...(isProduction ? [terser()] : [])
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

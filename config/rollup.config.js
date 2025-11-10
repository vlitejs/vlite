import path from 'node:path'
import { fileURLToPath } from 'node:url'
import alias from '@rollup/plugin-alias'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import svg from 'rollup-plugin-svg'
import { banner, plugins, providers } from './package.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isProduction = process.env.ENV === 'production'
const outputDirectory = path.resolve(__dirname, '../dist')

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
			nodeResolve({ browser: true }),
			typescript({
				include: 'src/**/*.ts'
			}),
			svg(),
			postcss({
				config: {
					path: path.resolve(__dirname, 'postcss.config.cjs')
				},
				extract: true,
				minimize: isProduction
			}),
			alias({
				entries: [
					{ find: 'shared', replacement: path.resolve('src/shared') },
					{ find: 'components', replacement: path.resolve('src/components') },
					{ find: 'providers', replacement: path.resolve('src/providers') },
					{ find: 'plugins', replacement: path.resolve('src/plugins') }
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
		input: './src/core/vlite.ts',
		outputFile: 'vlite.js'
	})
]

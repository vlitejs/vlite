import path from 'node:path'
import { fileURLToPath } from 'node:url'
import alias from '@rollup/plugin-alias'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import svg from 'rollup-plugin-svg'
import dts from 'rollup-plugin-dts'
import { banner, plugins, providers } from './package.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isProduction = process.env.ENV === 'production'
const outputDirectory = path.resolve(__dirname, '../dist')

// Extracted alias to be reused in both JS and DTS
const aliasConfig = alias({
	entries: [
		{ find: 'shared', replacement: path.resolve('src/shared') },
		{ find: 'components', replacement: path.resolve('src/components') },
		{ find: 'providers', replacement: path.resolve('src/providers') },
		{ find: 'plugins', replacement: path.resolve('src/plugins') },
		{ find: 'core', replacement: path.resolve('src/core') }
	]
})

// JavaScript files (.js)
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
			aliasConfig,
			...(isProduction ? [terser()] : [])
		]
	}
}

// TypeScript Declaration files (.d.ts)
const createDtsConfig = ({ input, outputFile }) => {
	return {
		input,
		output: [{
			file: `${outputDirectory}/${outputFile.replace('.js', '.d.ts')}`,
			format: 'es'
		}],
		plugins: [
			aliasConfig, // Resolve absolute paths in types
			dts()
		],
		// Ignore CSS and SVG files during type generation to avoid errors
		external: [/\.css$/, /\.svg$/] 
	}
}

const configs = [
	// Core
	createConfig({
		input: './src/core/vlite.ts',
		outputFile: 'vlite.js'
	}),
	createDtsConfig({
		input: './src/core/vlite.ts',
		outputFile: 'vlite.js'
	})
]

// Providers
providers.forEach((provider) => {
	const options = {
		input: `./src/providers/${provider}/${provider}.ts`,
		outputFile: `providers/${provider}.js`
	}
	configs.push(
		createConfig(options),
		createDtsConfig(options)
	)
})

// Plugins
plugins.forEach((plugin) => {
	const options = {
		input: `./src/plugins/${plugin}/${plugin}.ts`,
		outputFile: `plugins/${plugin}.js`
	}
	configs.push(
		createConfig(options),
		createDtsConfig(options)
	)
})

export default configs

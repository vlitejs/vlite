import { resolve } from 'path'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import svg from 'rollup-plugin-svg'
import { version } from '../package.json'

const isProduction = process.env.ENV === 'production'
const outputDirectory = resolve(__dirname, '../dist')
const banner =
	'/*!\n' +
	` * vLitejs v${version}\n` +
	` * (c) 2019-${new Date().getFullYear()} Yoriiis\n` +
	' * Released under the MIT License.\n' +
	' */'

const plugins = [
	commonjs(),
	nodeResolve({ browser: true }),
	typescript({
		include: 'src/**'
	}),
	svg(),
	postcss({
		config: {
			path: 'config/postcss.config.mjs'
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
		output: `${outputDirectory}/vlite.js`
	},
	{
		path: 'src/providers/youtube/youtube.ts',
		output: `${outputDirectory}/providers/youtube.js`
	},
	{
		path: 'src/providers/vimeo/vimeo.ts',
		output: `${outputDirectory}/providers/vimeo.js`
	},
	{
		path: 'src/providers/dailymotion/dailymotion.ts',
		output: `${outputDirectory}/providers/dailymotion.js`
	},
	{
		path: 'src/plugins/subtitle/config.js',
		output: `${outputDirectory}/plugins/subtitle.js`
	},
	{
		path: 'src/plugins/pip/config.js',
		output: `${outputDirectory}/plugins/pip.js`
	},
	{
		path: 'src/plugins/cast/config.js',
		output: `${outputDirectory}/plugins/cast.js`
	},
	{
		path: 'src/plugins/airplay/config.js',
		output: `${outputDirectory}/plugins/airplay.js`
	},
	{
		path: 'src/plugins/ima/config.js',
		output: `${outputDirectory}/plugins/ima.js`
	},
	{
		path: 'src/plugins/volume-bar/config.js',
		output: `${outputDirectory}/plugins/volume-bar.js`
	}
]

const config = entries.map(({ path, output }) => ({
	input: path,
	output: [
		{
			banner,
			exports: 'named',
			file: output,
			format: 'es'
		}
	],
	plugins
}))

export default config

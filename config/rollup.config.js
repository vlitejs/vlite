import path from 'path'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import svg from 'rollup-plugin-svg'
import { version } from '../package.json'

const isProduction = process.env.ENV === 'production'
const dir = path.resolve(__dirname, '../dist')
const banner =
	'/*!\n' +
	` * vLitejs v${version}\n` +
	` * (c) 2019-${new Date().getFullYear()} Yoriiis\n` +
	' * Released under the MIT License.\n' +
	' */'

// Use custom Terser configuration to remove the Microsoft copyright from tslib and keep the banner plugin
// Terser is executed after the banner plugin
const terserConfig = terser({
	format: {
		comments: (node, comment) => {
			if (comment.type === 'comment2') {
				return /Yoriiis/i.test(comment.value)
			}
		}
	}
})

export default [
	{
		input: 'src/vlite/config.js',
		output: [
			{
				banner,
				exports: 'named',
				file: `${dir}/vlite.js`,
				format: 'es',
				assetFileNames: '[name]-[hash][extname]'
			}
		],
		plugins: [
			commonjs(),
			nodeResolve({ browser: true }),
			typescript({
				include: 'src/**',
				noForceEmit: false,
				typescript: require('typescript')
			}),
			svg(),
			postcss({
				config: {
					path: 'config/postcss.config.mjs'
				},
				extract: true
			}),
			// styles({ mode: 'extract', minimize: false, include: ['**/*.css'], inject: true }),
			alias({
				entries: [{ find: 'shared', replacement: path.resolve('src/shared') }]
			})
		].concat(isProduction ? [terserConfig] : [])
	}
]

import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

export default function webpackConfig(env, argv) {
	const isProduction = argv.mode === 'production'

	return {
		entry: {
			home: resolveApp('examples/home/config.js'),
			html5: resolveApp('examples/html5/config.js'),
			'html5-hls': resolveApp('examples/html5-hls/config.js'),
			'html5-ima': resolveApp('examples/html5-ima/config.js'),
			'html5-sticky': resolveApp('examples/html5-sticky/config.js'),
			audio: resolveApp('examples/audio/config.js'),
			youtube: resolveApp('examples/youtube/config.js'),
			vimeo: resolveApp('examples/vimeo/config.js'),
			dailymotion: resolveApp('examples/dailymotion/config.js')
		},
		watchOptions: {
			ignored: /node_modules/
		},
		devtool: isProduction ? false : 'source-map',
		output: {
			path: resolveApp('examples/dist/'),
			filename: 'scripts/[name].js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					include: [resolveApp('examples'), resolveApp('dist')]
				},
				{
					test: /\.css$/,
					include: [resolveApp('examples'), resolveApp('dist')],
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						}
					]
				}
			]
		},
		resolve: {
			extensions: ['.js', '.css']
		},
		devServer: {
			static: {
				directory: resolveApp('examples')
			},
			historyApiFallback: true,
			port: 3000,
			compress: true,
			hot: true
			// host: '0.0.0.0',
			// https: true, // For IMA plugin
		},
		context: appDirectory,
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'styles/[name].css',
				chunkFilename: 'styles/[name].css'
			}),
			new webpack.optimize.ModuleConcatenationPlugin(),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: resolveApp('examples/home/index.html'),
				chunks: ['home']
			}),
			new HtmlWebpackPlugin({
				filename: 'html5/index.html',
				template: resolveApp('examples/html5/index.html'),
				chunks: ['html5'],
				publicPath: '../'
			}),
			new HtmlWebpackPlugin({
				filename: 'html5-hls/index.html',
				template: resolveApp('examples/html5-hls/index.html'),
				chunks: ['html5-hls'],
				publicPath: '../'
			}),
			new HtmlWebpackPlugin({
				filename: 'html5-ima/index.html',
				template: resolveApp('examples/html5-ima/index.html'),
				chunks: ['html5-ima'],
				publicPath: '../'
			}),
			new HtmlWebpackPlugin({
				filename: 'html5-sticky/index.html',
				template: resolveApp('examples/html5-sticky/index.html'),
				chunks: ['html5-sticky'],
				publicPath: '../'
			}),
			new HtmlWebpackPlugin({
				filename: 'youtube/index.html',
				template: resolveApp('examples/youtube/index.html'),
				chunks: ['youtube'],
				publicPath: '../'
			}),
			new HtmlWebpackPlugin({
				filename: 'vimeo/index.html',
				template: resolveApp('examples/vimeo/index.html'),
				chunks: ['vimeo'],
				publicPath: '../'
			}),
			new HtmlWebpackPlugin({
				filename: 'dailymotion/index.html',
				template: resolveApp('examples/dailymotion/index.html'),
				chunks: ['dailymotion'],
				publicPath: '../'
			}),
			new HtmlWebpackPlugin({
				filename: 'audio/index.html',
				template: resolveApp('examples/audio/index.html'),
				chunks: ['audio'],
				publicPath: '../'
			}),
			...(isProduction ? [new webpack.ProgressPlugin()] : [])
		],
		stats: {
			assets: true,
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false,
			children: false,
			entrypoints: false,
			excludeAssets: /.map$/,
			assetsSort: '!size'
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					extractComments: false,
					parallel: true,
					terserOptions: {
						compress: {
							// Drop console.log|console.info|console.debug
							// Keep console.warn|console.error
							pure_funcs: ['console.log', 'console.info', 'console.debug']
						},
						mangle: true
					}
				})
			],
			chunkIds: 'deterministic', // or 'named'
			removeAvailableModules: true,
			removeEmptyChunks: true,
			mergeDuplicateChunks: true,
			providedExports: false,
			splitChunks: false
		}
	}
}

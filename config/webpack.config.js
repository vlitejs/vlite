const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { libraryName, banner, providers, plugins } = require('./package')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)
const firstLetterUppercase = (string) => string.charAt(0).toUpperCase() + string.slice(1)

/**
 *
 * @param {Object} options
 * @param {Object} options.entry Webpack entry
 * @param {Boolean} options.library Webpack library name
 * @param {Boolean} options.isProduction Webpack production mode
 * @returns {Object} Webpack configuration object
 */
const createConfig = ({ entry, library = false, isProduction }) => {
	const output = {
		path: resolveApp('dist'),
		filename: '[name].js'
	}
	if (library) {
		output.library = {
			name: library,
			type: 'umd',
			export: 'default'
		}
	}

	return {
		watch: !isProduction,
		entry,
		watchOptions: {
			ignored: /node_modules/
		},
		devtool: isProduction ? false : 'source-map',
		output,
		module: {
			rules: [
				{
					test: /\.js$/,
					include: resolveApp('src'),
					use: [
						{
							loader: 'babel-loader'
						}
					]
				},
				{
					test: /\.ts$/,
					include: resolveApp('src'),
					use: [
						{
							loader: 'babel-loader'
						},
						{
							loader: 'ts-loader'
						}
					]
				},
				{
					test: /\.css$/,
					include: resolveApp('src'),
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									config: resolveApp('config/postcss.config.js')
								}
							}
						}
					]
				},
				{
					test: /\.(svg)$/i,
					include: resolveApp('src'),
					type: 'asset/source',
					generator: {
						filename: '[name][ext]'
					}
				}
			]
		},
		resolve: {
			extensions: ['.js', '.ts', '.css'],
			alias: {
				shared: resolveApp('src/shared'),
				components: resolveApp('src/components'),
				providers: resolveApp('src/providers'),
				plugins: resolveApp('src/plugins')
			}
		},
		context: appDirectory,
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[name].css'
			}),
			new webpack.optimize.ModuleConcatenationPlugin(),
			new webpack.BannerPlugin(banner),
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
						}
					}
				}),
				new CssMinimizerPlugin()
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

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production'

	return [
		...providers.map((provider) =>
			createConfig({
				entry: {
					[`providers/${provider}`]: `./src/providers/${provider}/${provider}`
				},
				library: `${libraryName}${firstLetterUppercase(provider)}`,
				isProduction
			})
		),
		...plugins.map((plugin) =>
			createConfig({
				entry: {
					[`plugins/${plugin}`]: `./src/plugins/${plugin}/${plugin}`
				},
				library: `${libraryName}${firstLetterUppercase(plugin)}`,
				isProduction
			})
		),
		createConfig({
			entry: {
				vlite: './src/core/vlite'
			},
			library: libraryName,
			isProduction
		})
	]
}

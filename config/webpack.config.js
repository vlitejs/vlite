const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { name, version, license, author } = require('../package.json')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)
const libraryName = 'Vlitejs'

// Banner for vLitejs assets
const banner = `@license ${license}
@name ${name}
@version ${version}
@copyright ${new Date().getUTCFullYear()} ${author}`

// Providers list
const providers = [
	{
		entrykey: 'providers/youtube',
		library: `${libraryName}Youtube`,
		path: './src/providers/youtube/youtube'
	},
	{
		entrykey: 'providers/vimeo',
		library: `${libraryName}Vimeo`,
		path: './src/providers/vimeo/vimeo'
	},
	{
		entrykey: 'providers/dailymotion',
		library: `${libraryName}Dailymotion`,
		path: './src/providers/dailymotion/dailymotion'
	}
]

// Plugins list
const plugins = [
	{
		entrykey: 'plugins/subtitle',
		library: `${libraryName}Subtitle`,
		path: './src/plugins/subtitle/config'
	},
	{
		entrykey: 'plugins/pip',
		library: `${libraryName}Pip`,
		path: './src/plugins/pip/config'
	},
	{
		entrykey: 'plugins/cast',
		library: `${libraryName}Cast`,
		path: './src/plugins/cast/config'
	},
	{
		entrykey: 'plugins/airplay',
		library: `${libraryName}Airplay`,
		path: './src/plugins/airplay/config'
	},
	{
		entrykey: 'plugins/ima',
		library: `${libraryName}Ima`,
		path: './src/plugins/ima/config'
	},
	{
		entrykey: 'plugins/volume-bar',
		library: `${libraryName}VolumeBar`,
		path: './src/plugins/volume-bar/config'
	}
]

/**
 *
 * @param {Object} options Generator options
 * @param {Object} options.entry Webpack entry
 * @param {Boolean} options.library Webpack library name
 * @param {Boolean} options.isProduction Webpack production mode
 * @returns {Object} Webpack configuration object
 */
const generator = ({ entry, library = false, isProduction }) => {
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

	const config = {
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
				shared: resolveApp('src/shared')
			}
		},
		context: appDirectory,
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[name].css'
			}),
			new webpack.optimize.ModuleConcatenationPlugin(),
			new webpack.BannerPlugin(banner)
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

	if (!isProduction) {
		config.plugins.push(new webpack.ProgressPlugin())
	}

	return config
}

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production'
	const configs = []

	const configsProviders = providers.map((provider) =>
		generator({
			entry: {
				[provider.entrykey]: provider.path
			},
			library: provider.library,
			isProduction
		})
	)
	const configsPlugins = plugins.map((plugin) =>
		generator({
			entry: {
				[plugin.entrykey]: plugin.path
			},
			library: plugin.library,
			isProduction
		})
	)

	configs.push(
		generator({
			entry: {
				vlite: './src/vlite/config.js'
			},
			library: libraryName,
			isProduction
		}),
		...configsProviders,
		...configsPlugins
	)
	return configs
}

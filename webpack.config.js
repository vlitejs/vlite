const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const generator = ({ entry, library = false, isProduction }) => {
	const output = {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: '[name].js'
	}
	if (library) {
		output.library = library
		output.libraryTarget = 'umd'
		output.libraryExport = 'default'
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
					include: path.resolve(__dirname, './src'),
					use: [
						{
							loader: 'babel-loader'
						}
					]
				},
				{
					test: /\.css$/,
					include: path.resolve(__dirname, './src'),
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									config: path.resolve(__dirname, 'postcss.config.js')
								}
							}
						}
					]
				},
				{
					test: /\.(svg)$/i,
					include: path.resolve(__dirname, './src/'),
					type: 'asset/source',
					generator: {
						filename: '[name][ext]'
					}
				}
			]
		},
		resolve: {
			extensions: ['.js', '.ts', '.tsx', '.css'],
			alias: {
				shared: path.resolve(__dirname, './src/shared')
			}
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[name].css'
			}),
			new webpack.optimize.ModuleConcatenationPlugin()
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
	const configs = []

	const providers = [
		{
			entrykey: 'providers/youtube',
			library: 'vlitejsYoutube',
			path: './src/providers/youtube'
		},
		{
			entrykey: 'providers/vimeo',
			'providers/youtube': 'vlitejsVimeo',
			path: './src/providers/vimeo'
		}
	]
	const plugins = [
		{
			entrykey: 'plugins/subtitle',
			library: 'vlitejsSubtitle',
			path: './src/plugins/subtitle/config'
		},
		{
			entrykey: 'plugins/picture-in-picture',
			library: 'vlitejsPictureInPicture',
			path: './src/plugins/picture-in-picture/config'
		}
	]

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
			library: 'vlitejs',
			isProduction
		}),
		generator({
			entry: {
				demo: './src/demo/config.js'
			},
			isProduction
		}),
		...configsProviders,
		...configsPlugins
	)
	return configs
}

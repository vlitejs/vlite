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

	const configVlitejs = generator({
		entry: {
			vlite: './src/vlite/config.js'
		},
		library: 'vlitejs',
		isProduction
	})
	const configProviderYoutube = generator({
		entry: {
			'providers/youtube': './src/providers/youtube'
		},
		library: 'vlitejsYoutube',
		isProduction
	})
	const configProviderVimeo = generator({
		entry: {
			'providers/vimeo': './src/providers/vimeo'
		},
		library: 'vlitejsVimeo',
		isProduction
	})
	const configDemo = generator({
		entry: {
			demo: './src/demo/config.js'
		},
		isProduction
	})
	return [configVlitejs, configProviderYoutube, configProviderVimeo, configDemo]
}

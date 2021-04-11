const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production'

	return {
		watch: !isProduction,
		entry: {
			html5: `${path.resolve(__dirname, './html5/config.js')}`,
			youtube: `${path.resolve(__dirname, './youtube/config.js')}`
		},
		watchOptions: {
			ignored: /node_modules/
		},
		devtool: isProduction ? false : 'source-map',
		output: {
			path: path.resolve(__dirname, './dist'),
			publicPath: '/dist/',
			filename: 'scripts/[name].js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					include: [path.resolve(__dirname, './'), path.resolve(__dirname, '../dist')],
					use: [
						{
							loader: 'babel-loader'
						}
					]
				},
				{
					test: /\.css$/,
					include: [path.resolve(__dirname, './'), path.resolve(__dirname, '../dist')],
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									config: path.resolve(__dirname, '../postcss.config.js')
								}
							}
						}
					]
				}
			]
		},
		resolve: {
			extensions: ['.js']
		},
		plugins: [
			new webpack.ProgressPlugin(),
			new MiniCssExtractPlugin({
				filename: 'styles/[name].css',
				chunkFilename: 'styles/[name].css'
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

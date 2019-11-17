const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = (env, argv) => {

	const isProduction = argv.mode === 'production';

	return {
		watch: !isProduction,
		entry: {
			vlite: './src/config.js'
		},
		devtool: !isProduction ? 'source-map' : 'none',
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
		output: {
			path: path.resolve(__dirname, './build'),
			publicPath: '/build/',
			filename: 'js/vlite.js',
			library: 'vLite',
			libraryTarget: 'umd',
			sourceMapFilename: '[file].map'
		},
		module: {
			rules: [{
				test: /\.js$/,
				include: path.resolve(__dirname, './src/js'),
				use: [
					{
						loader: 'babel-loader'
					}
				]
			}, {
				test: /\.css$/,
				include: path.resolve(__dirname, './src/css'),
				use: [
					MiniCssExtractPlugin.loader, {
						loader: 'css-loader'
					}, {
						loader: 'postcss-loader',
						options: {
							config: {
								path: path.resolve(__dirname, './')
							}
						}
					}
				]
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			}]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: `css/[name].css`,
				chunkFilename: `css/[name].css`
			}),
			new webpack.optimize.ModuleConcatenationPlugin()
		],
		optimization: {
			minimizer: [
				new TerserPlugin({
					extractComments: false,
					cache: true,
					parallel: true,
					sourceMap: false,
					terserOptions: {
						extractComments: 'all',
						compress: {
							drop_console: true
						},
						mangle: true
					}
				}),
				new OptimizeCSSAssetsPlugin({})
			],
			namedModules: true,
			removeAvailableModules: false,
			removeEmptyChunks: false,
			mergeDuplicateChunks: true,
			occurrenceOrder: true,
			providedExports: false,
			splitChunks: false
		}
	};
};

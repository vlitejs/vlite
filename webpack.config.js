const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	watch: true,
	mode: 'development',
	entry: './src/js/vlite.js',
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
		'assetsSort': '!size'
	},
	output: {
		path: path.resolve(__dirname, './build'),
		publicPath: '/build/',
		filename: 'js/vlite.js',
		library: 'vLite',
		libraryTarget: 'umd',
		sourceMapFilename: '[file].map',
	},
	module: {
		rules: [{
			test: /\.js$/,
			include: path.resolve(__dirname, './src/js'),
			use: [{
				loader: 'babel-loader'
			}]
		}, {
			test: /\.css$/,
			include: path.resolve(__dirname, './src/css'),
			use: [
				MiniCssExtractPlugin.loader,
				{ loader: 'css-loader' },
				{
					loader: 'postcss-loader',
					options: {
						config: {
							path: path.resolve(__dirname, './')
						}
					}
				}
			]
		}, {
			test: /\.(woff(2)?)(\?[a-z0-9=&.]+)?$/,
			include: path.resolve(__dirname, './src/fonts'),
			loader: 'file-loader',
			options: {
				name: `fonts/[name].[ext]`
			}
		}]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `css/[name].css`,
			chunkFilename: `css/[name].css`
		})
	],
	optimization: {
		minimize: false,
		namedModules: true,
		removeAvailableModules: false,
		removeEmptyChunks: false,
		mergeDuplicateChunks: true,
		occurrenceOrder: true,
		providedExports: false,
		splitChunks: false
	}
};

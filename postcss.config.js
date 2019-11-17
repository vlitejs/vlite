const path = require('path');

module.exports = {
	plugins: [
		require('postcss-import')({
			path: path.resolve(__dirname, `./src`)
		}),
		require('postcss-preset-env')({
			stage: 2
		}),
		require('postcss-nested')(),
		require('postcss-css-variables')
	]
};

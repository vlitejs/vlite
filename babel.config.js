module.exports = function (api) {
	const presets = [['@babel/preset-env']]

	api.cache(true)

	const plugins = ['@babel/plugin-transform-modules-commonjs', '@babel/proposal-class-properties']

	return {
		presets,
		plugins
	}
}

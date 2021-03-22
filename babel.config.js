module.exports = function (api) {
	const presets = [['@babel/preset-env']]

	api.cache(true)

	const plugins = [
		'@babel/plugin-transform-modules-commonjs',
		'@babel/proposal-class-properties',
		[
			'@babel/plugin-transform-react-jsx',
			{
				pragma: 'createElement',
				pragmaFrag: 'Fragment'
			}
		]
	]

	return {
		presets,
		plugins
	}
}

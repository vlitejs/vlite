module.exports = function(api) {
	const presets = [
		[
			'@babel/preset-env',
			{
				targets: {
					node: '8.11.2'
				}
			}
		]
	];

	api.cache(true);

	return {
		presets
	}
};

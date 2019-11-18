module.exports = {
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		ecmaFeatures: {
			impliedStrict: true,
			experimentalObjectRestSpread: true
		},
		sourceType: 'module'
	},

	env: {
		browser: true,
		node: true
	},

	extends: 'eslint:recommended',

	rules: {
		indent: ['error', 'tab', { ignoredNodes: ['TemplateLiteral > *'] }],
		'no-tabs': 0,
		"no-console": 0
	},

	globals: {
		document: false,
		navigator: false,
		window: false
	}
}

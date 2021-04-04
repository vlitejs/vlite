module.exports = {
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		ecmaFeatures: {
			impliedStrict: true,
			experimentalObjectRestSpread: true,
			jsx: true
		},
		sourceType: 'module'
	},

	env: {
		browser: true,
		node: true,
		jest: true
	},

	extends: ['standard'],

	plugins: ['prettier'],

	rules: {
		indent: ['error', 'tab', { ignoredNodes: ['TemplateLiteral *'] }],
		'no-tabs': 0,
		'space-before-function-paren': [
			'error',
			{ anonymous: 'always', named: 'never', asyncArrow: 'always' }
		]
	},

	globals: {
		document: false,
		navigator: false,
		window: false,
		vlitejs: false
	}
}

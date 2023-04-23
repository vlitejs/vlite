module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		requireConfigFile: false,
		ecmaVersion: 6,
		ecmaFeatures: {
			impliedStrict: true,
			experimentalObjectRestSpread: true
		},
		sourceType: 'module'
	},

	env: {
		browser: true,
		node: true,
		es6: true
	},

	extends: ['standard', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],

	rules: {
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		indent: ['error', 'tab', { ignoredNodes: ['TemplateLiteral *'], SwitchCase: 1 }],
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
		chrome: false,
		cast: false
	}
}

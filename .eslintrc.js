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

	extends: ['standard', 'plugin:react/recommended'],

	plugins: ['prettier'],

	rules: {
		indent: ['error', 'tab', { ignoredNodes: ['TemplateLiteral *'] }],
		'no-tabs': 0,
		'space-before-function-paren': [
			'error',
			{ anonymous: 'always', named: 'never', asyncArrow: 'always' }
		],
		'react/prop-types': 0,
		'react/display-name': 0,
		'react/jsx-key': 0
	},

	globals: {
		document: false,
		navigator: false,
		window: false,
		vlitejs: false
	},

	settings: {
		react: {
			pragma: 'createElement',
			fragment: 'Fragment',
			version: '0' // Remove the warning of the missing React package
		}
	}
}

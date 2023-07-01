module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		requireConfigFile: false,
		ecmaVersion: 'latest',
		ecmaFeatures: {
			impliedStrict: true,
			experimentalObjectRestSpread: true
		},
		sourceType: 'module',
		project: 'tsconfig.json'
	},

	env: {
		browser: true,
		node: true,
		es6: true
	},

	extends: [
		// 'standard',
		'standard-with-typescript',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended'
	],

	rules: {
		'@typescript-eslint/no-misused-promises': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		indent: ['error', 'tab', { ignoredNodes: ['TemplateLiteral *'], SwitchCase: 1 }],
		'no-tabs': 0,
		'space-before-function-paren': [
			'error',
			{ anonymous: 'always', named: 'never', asyncArrow: 'always' }
		],
		'linebreak-style': ['error', 'unix']
	},

	globals: {
		document: false,
		navigator: false,
		window: false,
		chrome: false,
		cast: false
	},

	ignorePatterns: ['node_modules', 'examples', 'config', 'dist']
}

module.exports = {
	printWidth: 100,
	useTabs: true,
	semi: false,
	trailingComma: 'none',
	singleQuote: true,
	arrowParens: 'always',
	overrides: [
		{
			files: '*.md',
			options: {
				proseWrap: 'preserve',
				tabWidth: 2,
				useTabs: false,
				singleQuote: true,
				semi: true
			}
		},
		{
			files: '*.html',
			options: {
				printWidth: 500
			}
		}
	]
}

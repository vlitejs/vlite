module.exports = {
	extends: 'stylelint-config-standard',
	rules: {
		indentation: 4,
		'unit-whitelist': ['em', 'rem', '%', 'px', 's', 'deg', 'fr', 'vh', 'ms'],
		'no-descending-specificity': true
	}
}

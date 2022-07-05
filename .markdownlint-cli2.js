const path = require('path')

module.exports = {
	config: {
		MD013: false, // Line length
		MD024: false, // Multiple headers with the same content
		MD033: false // No inline HTML
	},
	ignores: ['**/node_modules/**']
}

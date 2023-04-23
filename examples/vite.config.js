export default {
	build: {
		outDir: 'examples/dist/html5',
		assetsDir: '',
		rollupOptions: {
			input: {
				html5: 'examples/html5/config.js',
				'html5-hls': 'examples/html5-hls/config.js'
			}
		}
	},
	css: { postcss: 'config/postcss.config.js' },
	server: {
		host: 'localhost',
		port: 3000
	},
	base: '/examples'
}

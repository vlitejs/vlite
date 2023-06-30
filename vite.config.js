import { resolve } from 'path'
import { defineConfig } from 'vite'

// export default {
// 	root: 'examples',
// 	build: {
// 		outDir: 'dist',
// 		// assetsDir: '',
// 		rollupOptions: {
// 			input: {
// 				// home: 'config.js',
// 				html5: './html5/index.html'
// 				// 'html5-hls': 'html5-hls/config.js',
// 				// 'html5-ima': 'html5-ima/config.js',
// 				// 'html5-sticky': 'html5-sticky/config.js',
// 				// audio: 'audio/config.js',
// 				// youtube: 'youtube/config.js',
// 				// vimeo: 'vimeo/config.js',
// 				// dailymotion: 'dailymotion/config.js'
// 			}
// 		}
// 	},
// 	// resolve: {
// 	// 	alias: {
// 	// 		html5: 'html5/index.html'
// 	// 	}
// 	// },
// 	// css: { postcss: 'config/postcss.config.js' },
// server: {
// 	host: 'localhost',
// 	port: 3000
// }
// }

console.log(resolve(__dirname, 'html5/index.html'))
export default defineConfig({
	// root: 'examples'
	build: {
		rollupOptions: {
			input: {
				html5: resolve(__dirname, 'html5/index.html')
			}
		}
	},
	server: {
		host: 'localhost',
		port: 3000
	}
})

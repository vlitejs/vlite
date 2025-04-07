import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: '../tests',
	outputDir: '../test-results',
	webServer: {
		command: 'npm run build && npm run start:example',
		url: 'http://localhost:3000',
		timeout: 60 * 1000,
		reuseExistingServer: !process.env.CI
	},
	reporter: !process.env.GITHUB_ACTIONS
		? [
				['list', { printSteps: true, forceColor: true }],
				['html', { open: 'never' }]
			]
		: 'html',
	projects: [
		{
			name: 'Chrome Desktop',
			use: {
				channel: 'chrome',
				viewport: { width: 1280, height: 800 }
			}
		},
		{
			name: 'Chrome Mobile (Pixel 7)',
			use: {
				...devices['Pixel 7'],
				channel: 'chrome'
			}
		},
		{
			name: 'Firefox Desktop',
			use: {
				browserName: 'firefox',
				viewport: { width: 1280, height: 800 }
			}
		},
		{
			name: 'Safari Desktop (WebKit)',
			use: {
				browserName: 'webkit',
				viewport: { width: 1280, height: 800 }
			}
		},
		{
			name: 'Safari Mobile (iPhone 14)',
			use: {
				...devices['iPhone 14'],
				browserName: 'webkit'
			}
		}
	]
})

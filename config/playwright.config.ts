import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: '../tests',
	outputDir: '../test-results',
	webServer: {
		command: 'npm run build && npm run start:example',
		url: 'http://localhost:3000',
		timeout: 60 * 1000,
		reuseExistingServer: !process.env.GITHUB_ACTIONS
	},
	reporter: process.env.GITHUB_ACTIONS
		? [['github'], ['line'], ['html', { open: 'never' }]]
		: [
				['list', { printSteps: true, forceColor: true }],
				['html', { open: 'never' }]
			],
	use: {
		actionTimeout: 0,
		trace: process.env.GITHUB_ACTIONS ? 'retain-on-failure' : 'on',
		screenshot: process.env.GITHUB_ACTIONS ? 'only-on-failure' : 'on',
		video: process.env.GITHUB_ACTIONS ? 'retain-on-failure' : 'on'
	},
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

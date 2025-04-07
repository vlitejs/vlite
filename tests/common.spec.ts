import { test, expect } from '@playwright/test'

const providers = ['html5', 'youtube', 'vimeo', 'dailymotion']

providers.forEach((provider) => {
	test.describe(`${provider} Player`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto(`http://localhost:3000/${provider}`)
		})

		test('should initialize the player', async ({ page }) => {
			const player = await page.$('.v-vlite')
			expect(player).not.toBeNull()

			const playButton = await page.$('.v-bigPlay')
			expect(playButton).not.toBeNull()
		})
	})
})

test.describe('Audio Player', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:3000/audio')
	})

	test('should initialize the player', async ({ page }) => {
		const player = await page.$('.v-vlite')
		expect(player).not.toBeNull()

		const playButton = await page.$('.v-playPauseButton')
		expect(playButton).not.toBeNull()
	})
})

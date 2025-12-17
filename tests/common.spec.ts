import { expect, test } from '@playwright/test'

const providers = ['html5', 'youtube', 'vimeo', 'dailymotion', 'audio']

export async function checkElements({ page, isVideo = true }: { page: Page; isVideo?: boolean }) {
	// Player container
	const player = page.locator('.v-vlite')
	await expect(player).toHaveCount(1)

	// Control bar
	const controlBar = page.locator('.v-controlBar')
	await expect(controlBar).toHaveCount(1)

	// Play/Pause
	const playPauseButton = page.locator('.v-playPauseButton')
	await expect(playPauseButton).toHaveCount(1)

	// Current time
	const currentTime = page.locator('.v-currentTime')
	await expect(currentTime).toHaveCount(1)

	// Progress bar
	const progressBar = page.locator('.v-progressBar')
	await expect(progressBar).toHaveCount(1)
	await expect(progressBar).toHaveJSProperty('step', '0.01')
	await expect(progressBar).toHaveJSProperty('value', '0')

	// Volume
	const volumeButton = page.locator('.v-volumeButton')
	await expect(volumeButton).toHaveCount(1)

	const volumeBar = page.locator('.v-volumeBar')
	await expect(volumeBar).toHaveCount(1)
	await expect(volumeBar).toHaveJSProperty('step', '0.1')
	await expect(volumeBar).toHaveJSProperty('value', '1')

	if (isVideo) {
		const loader = page.locator('.v-loader')
		await expect(loader).toHaveCount(1)

		const overlay = page.locator('.v-overlay')
		await expect(overlay).toHaveCount(1)

		const poster = page.locator('.v-poster')
		await expect(poster).toHaveCount(1)

		const bigPlay = page.locator('.v-bigPlay')
		await expect(bigPlay).toHaveCount(1)

		// Fullscreen button sauf iPhone
		const isIPhone = await page.evaluate(() => /iPhone/i.test(navigator.userAgent))
		if (!isIPhone) {
			const fullscreenButton = page.locator('.v-fullscreenButton')
			await expect(fullscreenButton).toHaveCount(1)
		}
	}
}

providers.forEach((provider) => {
	test.describe(`${provider} Player`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto(`http://localhost:3000/${provider}`)
		})

		test('should check the required elements', async ({ page }) => {
			// await page.waitForTimeout(3000)
			await checkElements({ page, isVideo: provider !== 'audio' })
		})
	})
})

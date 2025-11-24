import { expect, test } from '@playwright/test'

const providers = ['html5', 'youtube', 'vimeo', 'dailymotion', 'audio']

async function checkElements({ page, isVideo = true }) {
	const player = await page.$('.v-vlite')
	expect(player).not.toBeNull()

	const controlBar = await page.$('.v-controlBar')
	expect(controlBar).not.toBeNull()

	const playPauseButton = await page.$('.v-playPauseButton')
	expect(playPauseButton).not.toBeNull()

	const currentTime = await page.$('.v-currentTime')
	expect(currentTime).not.toBeNull()

	const progressBar = await page.$('.v-progressBar')
	expect(progressBar).not.toBeNull()

	const progressBarStep = await progressBar.getAttribute('step')
	expect(progressBarStep).toBe('0.01')

	const progressBarValue = await progressBar.getAttribute('value')
	expect(progressBarValue).toBe('0')

	const volumeButton = await page.$('.v-volumeButton')
	expect(volumeButton).not.toBeNull()

	const volumeBar = await page.$('.v-volumeBar')
	expect(volumeBar).not.toBeNull()

	const volumeBarStep = await volumeBar.getAttribute('step')
	expect(volumeBarStep).toBe('0.1')

	const volumeBarValue = await volumeBar.getAttribute('value')
	expect(volumeBarValue).toBe('1')

	if (isVideo) {
		const loader = await page.$('.v-loader')
		expect(loader).not.toBeNull()

		const overlay = await page.$('.v-overlay')
		expect(overlay).not.toBeNull()

		const poster = await page.$('.v-poster')
		expect(poster).not.toBeNull()

		const bigPlay = await page.$('.v-bigPlay')
		expect(bigPlay).not.toBeNull()

		const userAgent = await page.evaluate(() => navigator.userAgent)
		const isIPhone = /(iPhone)/gi.test(userAgent)

		if (!isIPhone) {
			const fullscreenButton = await page.$('.v-fullscreenButton')
			expect(fullscreenButton).not.toBeNull()
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

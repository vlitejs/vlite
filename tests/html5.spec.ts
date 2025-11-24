import { expect, test } from '@playwright/test'

test.describe('HTML5 Player Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:3000/html5')

		await page.waitForFunction(() => {
			const video = document.querySelector('video')
			return video && video.duration > 0
		})
	})

	test('should check the required elements', async ({ page }) => {
		const trackButtonOff = await page.$('.v-trackButton[data-language="off"]')
		expect(trackButtonOff).not.toBeNull()

		const trackButtonEn = await page.$('.v-trackButton[data-language="en"]')
		expect(trackButtonEn).not.toBeNull()

		const trackButtonFr = await page.$('.v-trackButton[data-language="fr"]')
		expect(trackButtonFr).not.toBeNull()

		const subtitleButton = await page.$('.v-subtitleButton')
		expect(subtitleButton).not.toBeNull()
	})

	test('Test pause video on overlay click (desktop only)', async ({ page }, _testInfo) => {
		const isTouch = await page.evaluate(
			() => 'ontouchstart' in window || navigator.maxTouchPoints > 0
		)
		test.skip(isTouch, 'Desktop only test')

		await page.click('.v-bigPlay')
		await page.click('.v-overlay')

		const isPaused = await page.evaluate(() => {
			const video = document.querySelector('video')
			return video.paused
		})
		expect(isPaused).toBe(true)
	})

	test('Test pause video on pause button', async ({ page }) => {
		await page.click('.v-bigPlay')
		await page.click('.v-playPauseButton')

		const isPaused = await page.evaluate(() => {
			const video = document.querySelector('video')
			return video.paused
		})
		expect(isPaused).toBe(true)
	})

	test('Test seek video on progress bar change', async ({ page }) => {
		await page.click('.v-bigPlay')
		await page.click('.v-playPauseButton')

		const duration = await page.evaluate(() => document.querySelector('video').duration)

		const targetTimeInSeconds = 10
		const percentageValue = (targetTimeInSeconds / duration) * 100

		await page.evaluate((percentage) => {
			const progressBar = document.querySelector('.v-progressBar')
			progressBar.value = percentage.toString()
			progressBar.dispatchEvent(new Event('input'))
		}, percentageValue)

		await page.waitForTimeout(100)

		const currentTime = await page.evaluate(() => document.querySelector('video').currentTime)

		expect(currentTime).toBeCloseTo(targetTimeInSeconds, 0)
	})

	test('Test mute on volume button click', async ({ page }) => {
		await page.click('.v-bigPlay')
		await page.click('.v-volumeButton')

		const muted = await page.evaluate(() => document.querySelector('video').muted)
		expect(muted).toBe(true)
	})

	test('Test volume change on volume bar change', async ({ page }) => {
		await page.click('.v-bigPlay')

		await page.evaluate(() => {
			const volumeBar = document.querySelector('.v-volumeBar')
			volumeBar.value = '0.1'
			volumeBar.dispatchEvent(new Event('input'))
		})

		const volume = await page.evaluate(() => document.querySelector('video').volume)
		expect(volume).toBe(0.1)
	})
})

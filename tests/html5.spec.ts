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
		// Check DOM presence instead of visibility
		await expect(page.locator('.v-trackButton[data-language="off"]')).toHaveCount(1)
		await expect(page.locator('.v-trackButton[data-language="en"]')).toHaveCount(1)
		await expect(page.locator('.v-trackButton[data-language="fr"]')).toHaveCount(1)
		await expect(page.locator('.v-subtitleButton')).toHaveCount(1)
	})

	test('Test pause video on overlay click (desktop only)', async ({ page }) => {
		const isTouch = await page.evaluate(
			() => 'ontouchstart' in window || navigator.maxTouchPoints > 0
		)
		test.skip(isTouch, 'Desktop only test')

		await page.click('.v-bigPlay')
		await page.click('.v-overlay')

		const video = page.locator('video')
		const isPaused = await video.evaluate((v) => v.paused)
		expect(isPaused).toBe(true)
	})

	test('Test pause video on pause button', async ({ page }) => {
		await page.click('.v-bigPlay')
		await page.click('.v-playPauseButton')

		const video = page.locator('video')
		const isPaused = await video.evaluate((v) => v.paused)
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

		const currentTime = await page.locator('video').evaluate((video) => video.currentTime)
		expect(currentTime).toBeCloseTo(targetTimeInSeconds, 0)
	})

	test('Test mute on volume button click', async ({ page }) => {
		await page.click('.v-bigPlay')
		await page.click('.v-volumeButton')

		const video = page.locator('video')
		const isMuted = await video.evaluate((v) => v.muted)
		expect(isMuted).toBe(true)
	})

	test('Test volume change on volume bar change', async ({ page }) => {
		await page.click('.v-bigPlay')

		await page.evaluate(() => {
			const volumeBar = document.querySelector('.v-volumeBar')
			volumeBar.value = '0.1'
			volumeBar.dispatchEvent(new Event('input'))
		})

		const volume = await page
			.locator('video')
			.evaluate((video) => Math.round(video.volume * 10) / 10)
		expect(volume).toBe(0.1)
	})
})

test.describe('HTML5 Player Mobile Overlay Tests', () => {
	test.beforeEach(async ({ page }) => {
		// Force a touch-like environment before any script runs
		await page.addInitScript(() => {
			Object.defineProperty(navigator, 'maxTouchPoints', {
				get() {
					return 1
				},
				configurable: true
			})
		})

		await page.goto('http://localhost:3000/html5')

		await page.waitForFunction(() => {
			const video = document.querySelector('video')
			return video && video.duration > 0
		})
	})

	test('should show control bar on first overlay tap and pause on second', async ({ page }) => {
		const video = page.locator('video')
		const controlBar = page.locator('.v-controlBar')

		await page.click('.v-bigPlay')

		// Wait long enough for auto-hide to hide the control bar (autoHideDelay = 3000ms)
		await page.waitForTimeout(3500)

		const initiallyHidden = await controlBar.evaluate((el) => el.classList.contains('v-hidden'))

		// First overlay tap: should show the control bar but keep playback running
		await page.click('.v-overlay')
		const controlBarVisibleAfterFirstTap = await controlBar.evaluate((el) =>
			el.classList.contains('v-hidden')
		)
		const pausedAfterFirstTap = await video.evaluate((v) => v.paused)

		// Second overlay tap: should pause the video
		await page.click('.v-overlay')
		const pausedAfterSecondTap = await video.evaluate((v) => v.paused)

		expect(initiallyHidden).toBe(true)
		expect(controlBarVisibleAfterFirstTap).toBe(false)
		expect(pausedAfterFirstTap).toBe(false)
		expect(pausedAfterSecondTap).toBe(true)
	})
})

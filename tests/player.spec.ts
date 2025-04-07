import { expect, test } from '@playwright/test'

test.describe('HTML5 Player Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:3000/html5')
	})

	test('Test player is initialized', async ({ page }) => {
		const player = await page.$('.v-vlite')
		expect(player).not.toBeNull()

		const playButton = await page.$('.v-bigPlay')
		expect(playButton).not.toBeNull()
	})

	test('Test big play button starts playback', async ({ page }) => {
		await page.click('.v-bigPlay')

		const isPlaying = await page.evaluate(() => {
			const video = document.querySelector('#player')
			return !video.paused
		})
		expect(isPlaying).toBe(true)
	})

	test('Test pause video on overlay click', async ({ page }) => {
		await page.click('.v-bigPlay')
		await page.click('.v-overlay')

		const isPaused = await page.evaluate(() => {
			const video = document.querySelector('video')
			return video.paused
		})
		expect(isPaused).toBe(true)
	})

	test('Test mute on volume button click', async ({ page }) => {
		await page.click('.v-bigPlay')
		await page.click('.v-volumeButton')

		const muted = await page.evaluate(() => {
			const video = document.querySelector('video')
			return video.muted
		})
		expect(muted).toBe(true)
	})

	test('Test enter fullscreen button works', async ({ page, browserName }, testInfo) => {
		const isSafariMobile = browserName === 'webkit' && testInfo.project.name.includes('iPhone')
		if (isSafariMobile) {
			test.skip(true, 'Fullscreen is not reliably supported on iOS Safari in automated tests')
		}

		await page.click('.v-bigPlay')
		await page.click('.v-fullscreenButton')

		const isFullscreen = await page.evaluate(() => {
			return document.fullscreenElement !== null
		})
		expect(isFullscreen).toBe(true)
	})

	test('Test exit fullscreen button works', async ({ page, browserName }, testInfo) => {
		const isSafariMobile = browserName === 'webkit' && testInfo.project.name.includes('iPhone')
		if (isSafariMobile) {
			test.skip(true, 'Fullscreen is not reliably supported on iOS Safari in automated tests')
		}

		await page.click('.v-bigPlay')
		await page.click('.v-fullscreenButton')
		await page.click('.v-fullscreenButton')

		const isFullscreen = await page.evaluate(() => {
			return document.fullscreenElement !== null
		})
		expect(isFullscreen).toBe(false)
	})
})

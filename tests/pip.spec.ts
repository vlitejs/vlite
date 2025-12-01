import { expect, test } from '@playwright/test'

test.describe('PIP Plugin Tests', () => {
	const checkIfPipAvailable = () =>
		'pictureInPictureEnabled' in document && document.pictureInPictureEnabled

	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:3000/html5')

		await page.waitForFunction(() => document.querySelector('video')?.duration)
	})

	test('should check PIP button is present', async ({ page }) => {
		if (!(await page.evaluate(checkIfPipAvailable))) {
			test.skip(true, 'PIP API not available in this browser')
			return
		}

		const pipButton = await page.$('.v-pipButton')
		expect(pipButton).not.toBeNull()

		const buttonClass = await pipButton?.getAttribute('class')
		expect(buttonClass).toContain('v-controlButton')
	})

	test('should enter PIP mode on button click', async ({ page, browserName }) => {
		// Skip on WebKit (Safari) as PIP behavior is different and may require user gesture
		test.skip(browserName === 'webkit', 'PIP has restrictions on Safari/WebKit')

		if (!(await page.evaluate(checkIfPipAvailable))) {
			test.skip(true, 'PIP API not available in this browser')
			return
		}

		await page.click('.v-bigPlay')
		await page.waitForTimeout(500)
		await page.click('.v-pipButton')
		await page.waitForFunction(() => document.pictureInPictureElement !== null, { timeout: 5000 })

		const isInPipMode = await page.evaluate(() => document.pictureInPictureElement !== null)
		expect(isInPipMode).toBe(true)
	})

	test('should exit PIP mode on button click', async ({ page, browserName }) => {
		// Skip on WebKit (Safari) as PIP behavior is different and may require user gesture
		test.skip(browserName === 'webkit', 'PIP has restrictions on Safari/WebKit')

		if (!(await page.evaluate(checkIfPipAvailable))) {
			test.skip(true, 'PIP API not available in this browser')
			return
		}

		await page.click('.v-bigPlay')
		await page.waitForTimeout(500)
		await page.click('.v-pipButton')
		await page.waitForFunction(() => document.pictureInPictureElement !== null, { timeout: 5000 })
		await page.click('.v-pipButton')
		await page.waitForFunction(() => document.pictureInPictureElement === null, { timeout: 5000 })

		const isStillInPipMode = await page.evaluate(() => document.pictureInPictureElement !== null)
		expect(isStillInPipMode).toBe(false)
	})
})

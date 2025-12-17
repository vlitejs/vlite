import { expect, test } from '@playwright/test'

test.describe('Accessibility Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:3000/html5')
		await page.waitForSelector('.v-bigPlay', { state: 'visible' })

		await page.waitForFunction(() => {
			const video = document.querySelector('video')
			return video && video.duration > 0
		})
	})

	test('should navigate through controls with Tab key (desktop only)', async ({
		page,
		browserName
	}) => {
		const isTouch = await page.evaluate(
			() => 'ontouchstart' in window || navigator.maxTouchPoints > 0
		)
		test.skip(isTouch, 'Desktop only test')
		test.skip(browserName === 'webkit', 'Safari has different Tab navigation behavior')

		// Focus on play/pause button to start
		await page.focus('.v-playPauseButton')

		let focusedElement = await page.evaluate(() => document.activeElement?.className)
		expect(focusedElement).toContain('v-playPauseButton')

		// Tab to progress bar
		await page.keyboard.press('Tab')
		focusedElement = await page.evaluate(() => document.activeElement?.className)
		expect(focusedElement).toContain('v-progressBar')

		// Tab to volume button
		await page.keyboard.press('Tab')
		focusedElement = await page.evaluate(() => document.activeElement?.className)
		expect(focusedElement).toContain('v-volumeButton')

		// Tab to volume bar
		await page.keyboard.press('Tab')
		focusedElement = await page.evaluate(() => document.activeElement?.className)
		expect(focusedElement).toContain('v-volumeBar')

		// Tab to subtitle button
		await page.keyboard.press('Tab')
		focusedElement = await page.evaluate(() => document.activeElement?.className)
		expect(focusedElement).toContain('v-subtitleButton')
	})

	test('should activate controls with Enter/Space on focused button', async ({ page }) => {
		// Focus play/pause button
		await page.focus('.v-playPauseButton')

		// Press Enter to activate
		await page.keyboard.press('Enter')

		const isPaused = await page.evaluate(() => document.querySelector('video')?.paused)
		expect(isPaused).toBe(false)
	})

	test('should have proper ARIA labels on interactive elements', async ({ page }) => {
		await expect(page.locator('.v-playPauseButton')).toHaveAttribute('aria-label', 'Play')
		await expect(page.locator('.v-progressBar')).toHaveAttribute('aria-label', 'Seek')
		await expect(page.locator('.v-volumeBar')).toHaveAttribute('aria-label', 'Volume')
		await expect(page.locator('.v-volumeButton')).toHaveAttribute('aria-label', 'Mute')
	})

	test('should update ARIA labels when state changes', async ({ page }) => {
		const playPause = page.locator('.v-playPauseButton')

		// Initial state: Play button
		await expect(playPause).toHaveAttribute('aria-label', 'Play')

		// Click to play
		await page.click('.v-bigPlay')

		// Should change to Pause
		await expect(playPause).toHaveAttribute('aria-label', 'Pause')

		const volumeButton = page.locator('.v-volumeButton')

		// Initial state: Mute button
		await expect(volumeButton).toHaveAttribute('aria-label', 'Mute')

		// Click to mute
		await page.click('.v-volumeButton')

		// Should change to Unmute
		await expect(volumeButton).toHaveAttribute('aria-label', 'Unmute')
	})

	test('should have proper ARIA roles and attributes', async ({ page }) => {
		const progressBar = page.locator('.v-progressBar')
		await expect(progressBar).toHaveAttribute('aria-valuemin', '0')
		await expect(progressBar).toHaveAttribute('max', '100')
		await expect(progressBar).toHaveAttribute('type', 'range')

		const volumeBar = page.locator('.v-volumeBar')
		await expect(volumeBar).toHaveAttribute('aria-valuemin', '0')
		await expect(volumeBar).toHaveAttribute('max', '1')
		await expect(volumeBar).toHaveAttribute('type', 'range')
	})

	test('should support Shift+Tab for reverse navigation (desktop only)', async ({
		page,
		browserName
	}) => {
		const isTouch = await page.evaluate(
			() => 'ontouchstart' in window || navigator.maxTouchPoints > 0
		)
		test.skip(isTouch, 'Desktop only test')
		test.skip(browserName === 'webkit', 'Safari has different Tab navigation behavior')

		// Start from subtitle button
		await page.focus('.v-subtitleButton')
		let focusedElement = await page.evaluate(() => document.activeElement?.className)
		expect(focusedElement).toContain('v-subtitleButton')

		// Shift+Tab to go back to volume bar
		await page.keyboard.press('Shift+Tab')
		focusedElement = await page.evaluate(() => document.activeElement?.className)
		expect(focusedElement).toContain('v-volumeBar')

		// Shift+Tab to go back to volume button
		await page.keyboard.press('Shift+Tab')
		focusedElement = await page.evaluate(() => document.activeElement?.className)
		expect(focusedElement).toContain('v-volumeButton')
	})

	test('should have proper keyboard focus order and focus-visible styles (desktop only)', async ({
		page
	}) => {
		const isTouch = await page.evaluate(
			() => 'ontouchstart' in window || navigator.maxTouchPoints > 0
		)
		test.skip(isTouch, 'Desktop only test')

		const controls = [
			'.v-bigPlay',
			'.v-playPauseButton',
			'.v-progressBar',
			'.v-volumeButton',
			'.v-volumeBar',
			'.v-subtitleButton',
			'.v-pipButton',
			'.v-castButton',
			'.v-fullscreenButton'
		]

		const verifyFocus = async (selector: string) => {
			const control = page.locator(selector)
			const focused = await control.evaluate((el) => el === document.activeElement)
			expect(focused).toBe(true)

			const hasFocusVisible = await control.evaluate((el) => el.matches(':focus-visible'))
			expect(hasFocusVisible).toBe(true)
		}

		// Tab to reach the player
		await page.keyboard.press('Tab')

		for (const selector of controls) {
			const control = page.locator(selector)
			if ((await control.count()) > 0) {
				await page.keyboard.press('Tab')
				await verifyFocus(selector)
			} else {
				console.log(`Optional element skipped: ${selector}`)
			}
		}
	})
})

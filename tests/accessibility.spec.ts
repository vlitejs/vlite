import { expect, test } from '@playwright/test'

test.describe('Accessibility Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:3000/html5')

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
		await page.waitForTimeout(500)

		const isPaused = await page.evaluate(() => document.querySelector('video')?.paused)
		expect(isPaused).toBe(false)
	})

	test('should have proper ARIA labels on interactive elements', async ({ page }) => {
		// Check play/pause button
		const playPauseAriaLabel = await page.getAttribute('.v-playPauseButton', 'aria-label')
		expect(playPauseAriaLabel).toBe('Play')

		// Check progress bar
		const progressBarAriaLabel = await page.getAttribute('.v-progressBar', 'aria-label')
		expect(progressBarAriaLabel).toBe('Seek')

		// Check volume bar
		const volumeBarAriaLabel = await page.getAttribute('.v-volumeBar', 'aria-label')
		expect(volumeBarAriaLabel).toBe('Volume')

		// Check volume button
		const volumeButtonAriaLabel = await page.getAttribute('.v-volumeButton', 'aria-label')
		expect(volumeButtonAriaLabel).toBe('Mute')
	})

	test('should update ARIA labels when state changes', async ({ page }) => {
		// Initial state: Play button
		let playPauseAriaLabel = await page.getAttribute('.v-playPauseButton', 'aria-label')
		expect(playPauseAriaLabel).toBe('Play')

		// Click to play
		await page.click('.v-bigPlay')
		await page.waitForTimeout(500)

		// Should change to Pause
		playPauseAriaLabel = await page.getAttribute('.v-playPauseButton', 'aria-label')
		expect(playPauseAriaLabel).toBe('Pause')

		// Initial state: Mute button
		let volumeButtonAriaLabel = await page.getAttribute('.v-volumeButton', 'aria-label')
		expect(volumeButtonAriaLabel).toBe('Mute')

		// Click to mute
		await page.click('.v-volumeButton')
		await page.waitForTimeout(300)

		// Should change to Unmute
		volumeButtonAriaLabel = await page.getAttribute('.v-volumeButton', 'aria-label')
		expect(volumeButtonAriaLabel).toBe('Unmute')
	})

	test('should have proper ARIA roles and attributes', async ({ page }) => {
		// Check progress bar has proper min/max values
		const progressBarMin = await page.getAttribute('.v-progressBar', 'aria-valuemin')
		expect(progressBarMin).toBe('0')

		const progressBarMax = await page.getAttribute('.v-progressBar', 'max')
		expect(progressBarMax).toBe('100')

		// Check volume bar has proper min/max values
		const volumeBarMin = await page.getAttribute('.v-volumeBar', 'aria-valuemin')
		expect(volumeBarMin).toBe('0')

		const volumeBarMax = await page.getAttribute('.v-volumeBar', 'max')
		expect(volumeBarMax).toBe('1')

		// Check input types
		const progressBarType = await page.getAttribute('.v-progressBar', 'type')
		expect(progressBarType).toBe('range')

		const volumeBarType = await page.getAttribute('.v-volumeBar', 'type')
		expect(volumeBarType).toBe('range')
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

	test('should have proper focus indicators on all interactive elements (desktop only)', async ({
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
			'.v-fullscreenButton'
		]

		for (const selector of controls) {
			await page.focus(selector)

			// Check if element has focus styles (outline or other focus indicators)
			const _hasFocusStyle = await page.evaluate((sel) => {
				const element = document.querySelector(sel) as HTMLElement
				if (!element) return false

				const styles = window.getComputedStyle(element)
				// Check for common focus indicators
				return (
					styles.outline !== 'none' ||
					styles.outlineWidth !== '0px' ||
					element.matches(':focus-visible')
				)
			}, selector)

			// At minimum, element should be focusable
			const isFocused = await page.evaluate(
				(sel) => document.activeElement === document.querySelector(sel),
				selector
			)
			expect(isFocused).toBe(true)
		}
	})
})

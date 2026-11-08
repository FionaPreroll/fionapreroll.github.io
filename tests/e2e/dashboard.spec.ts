import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { hydrated, stayLocal } from './page.ts';

test.beforeEach(({ page }) => stayLocal(page));

test('the footer’s small link leads to the dashboard, which search engines skip', async ({
	page
}) => {
	await page.goto('/en/');
	await hydrated(page);
	await page.getByRole('contentinfo').getByRole('link', { name: 'Dashboard' }).click();
	await expect(page).toHaveURL(/\/en\/dashboard\/$/);
	await expect(page.getByRole('heading', { level: 1, name: 'Dashboard' })).toBeVisible();
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
	await expect(page.locator('[data-repo]')).toHaveCount(11);
});

test('the dashboard keeps its page when the language changes', async ({ page }) => {
	await page.goto('/en/dashboard/');
	await page.waitForLoadState('networkidle');
	await page.getByRole('link', { name: 'Auf Deutsch lesen' }).click();
	await expect(page).toHaveURL(/\/de\/dashboard\/$/);
	await expect(page.getByText('Kommandozentrale · 11 Repositories')).toBeVisible();
	await page.getByRole('link', { name: 'Zurück zur Startseite' }).click();
	await expect(page).toHaveURL(/\/de\/$/);
});

test.describe('in a German browser', () => {
	test.use({ locale: 'de-DE' });

	test('/dashboard/ moves to /de/dashboard/', async ({ page }) => {
		await page.goto('/dashboard/');
		await expect(page).toHaveURL(/\/de\/dashboard\/$/);
	});
});

for (const colorScheme of ['light', 'dark'] as const) {
	test(`the dashboard is accessible in ${colorScheme} colors`, async ({ page }) => {
		await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
		await page.goto('/en/dashboard/');
		await page.waitForLoadState('networkidle');
		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze();
		expect(results.violations.map((v) => v.id)).toEqual([]);
	});
}

test('the dashboard fits a phone', async ({ page }) => {
	await page.setViewportSize({ width: 360, height: 780 });
	await page.goto('/en/dashboard/');
	const overflow = await page.evaluate(
		() => document.documentElement.scrollWidth - document.documentElement.clientWidth
	);
	expect(overflow).toBeLessThanOrEqual(0);
});

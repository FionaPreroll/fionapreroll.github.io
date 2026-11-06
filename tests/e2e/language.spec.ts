import { expect, test } from '@playwright/test';
import { hydrated } from './page.ts';

test.describe('in a German browser', () => {
	test.use({ locale: 'de-DE' });

	test('/ moves to /de/, /en/ stays English', async ({ page }) => {
		await page.goto('/#vibe-laser');
		await expect(page).toHaveURL(/\/de\/#vibe-laser$/);
		await expect(page.locator('html')).toHaveAttribute('lang', 'de');
		await page.goto('/en/');
		await expect(page).toHaveURL(/\/en\/$/);
		await expect(page.getByRole('heading', { level: 2, name: 'Projects' })).toBeVisible();
	});

	test('/ stays English once English was chosen', async ({ page }) => {
		await page.goto('/de/');
		await hydrated(page);
		await page.getByRole('link', { name: 'Read in English' }).click();
		await expect(page).toHaveURL(/\/en\/$/);
		await expect(page.locator('html')).toHaveAttribute('lang', 'en');
		await page.goto('/');
		await expect(page).toHaveURL(/localhost:\d+\/$/);
		await expect(page.getByRole('heading', { level: 2, name: 'Projects' })).toBeVisible();
	});
});

test.describe('in an English browser', () => {
	test.use({ locale: 'en-US' });

	test('/ stays English, and goes German once German was chosen', async ({ page }) => {
		await page.goto('/');
		await hydrated(page);
		await expect(page).toHaveURL(/localhost:\d+\/$/);
		await page.getByRole('link', { name: 'Auf Deutsch lesen' }).click();
		await expect(page).toHaveURL(/\/de\/$/);
		await expect(page.getByRole('heading', { level: 2, name: 'Projekte' })).toBeVisible();
		await expect(page.locator('html')).toHaveAttribute('lang', 'de');
		await page.goto('/');
		await expect(page).toHaveURL(/\/de\/$/);
	});
});

import { expect, test } from '@playwright/test';
import { hydrated, loadAllImages, watchErrors } from './page.ts';

test('the English page shows eleven projects without errors', async ({ page }) => {
	const errors = watchErrors(page);
	await page.goto('/en/');
	await hydrated(page);
	await expect(page).toHaveTitle(/Engineering experiments, shipped with care/);
	await expect(page.locator('html')).toHaveAttribute('lang', 'en');
	await expect(page.getByRole('article')).toHaveCount(11);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		'Engineering experiments, shipped with care.'
	);
	expect(errors).toEqual([]);
});

test('every screenshot and the avatar load', async ({ page }) => {
	await page.goto('/en/');
	await loadAllImages(page);
	const broken = await page.evaluate(() =>
		[...document.images].filter((image) => image.naturalWidth === 0).map((image) => image.src)
	);
	expect(broken).toEqual([]);
	expect(await page.locator('img').count()).toBeGreaterThan(80);
});

test('the German page is German, prerendered as such', async ({ page, request }) => {
	const html = await (await request.get('/de/')).text();
	expect(html).toContain('<html lang="de">');
	expect(html).toContain('Engineering-Experimente, mit Sorgfalt ausgeliefert.');
	// The details are in the HTML too, for search engines and printing.
	expect(html).toContain('Unter der Haube');
	await page.goto('/de/');
	await expect(page.getByRole('heading', { level: 2, name: 'Projekte' })).toBeVisible();
});

test('the page has what link previews and search engines read', async ({ request }) => {
	const html = await (await request.get('/')).text();
	expect(html).toContain(
		'<meta property="og:image" content="https://fionapreroll.github.io/og.png"'
	);
	expect(html).toContain(
		'<link rel="alternate" hreflang="de" href="https://fionapreroll.github.io/de/"'
	);
	expect(html).toContain('"@type":"Person"');
	expect((await request.get('/og.png')).ok()).toBe(true);
	expect((await request.get('/robots.txt')).ok()).toBe(true);
	expect((await request.get('/sitemap.xml')).ok()).toBe(true);
});

test('the 404 page leads home in both languages', async ({ page }) => {
	await page.goto('/404.html');
	await expect(page.getByRole('heading', { name: 'Lost in orbit' })).toBeVisible();
	await page.getByRole('link', { name: 'Zur Startseite' }).click();
	await expect(page).toHaveURL(/\/de\/$/);
});

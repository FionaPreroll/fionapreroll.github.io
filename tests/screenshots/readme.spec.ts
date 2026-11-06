import { expect, test } from '@playwright/test';
import { hydrated, loadAllImages } from '../e2e/page.ts';

// `pnpm screenshots`: the pictures of the README in docs/screenshots/, and static/og.png, which
// link previews show. A picture is written again only where the page changed.

test.use({ deviceScaleFactor: 1 });

test.beforeEach(async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' });
});

async function open(page: import('@playwright/test').Page, path = '/en/') {
	await page.goto(path);
	await hydrated(page);
	await loadAllImages(page);
}

test('home', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 860 });
	await open(page);
	await expect(page).toHaveScreenshot(['docs', 'screenshots', 'home.png']);
});

test('project', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 860 });
	await open(page);
	await page.locator('#vibe-mugames').scrollIntoViewIfNeeded();
	await page.evaluate(() => {
		document
			.getElementById('vibe-mugames')
			?.scrollIntoView({ block: 'start', behavior: 'instant' });
	});
	await expect(page).toHaveScreenshot(['docs', 'screenshots', 'project.png']);
});

test('details', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 860 });
	await open(page);
	await page.locator('#vibe-laser').getByRole('button', { name: 'Show details' }).click();
	await expect(page.locator('#vibe-laser-details')).toHaveAttribute('data-expanded', 'true');
	await page.evaluate(() => {
		document
			.getElementById('vibe-laser-details')
			?.scrollIntoView({ block: 'start', behavior: 'instant' });
		window.scrollBy(0, -340);
	});
	await expect(page).toHaveScreenshot(['docs', 'screenshots', 'details.png']);
});

test('lightbox', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 860 });
	await open(page);
	await page.getByRole('button', { name: /^Enlarge: The Logo Spectrum/ }).click();
	await expect(page.getByRole('dialog')).toBeVisible();
	await expect(page).toHaveScreenshot(['docs', 'screenshots', 'lightbox.png']);
});

test('dark, in German', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
	await page.setViewportSize({ width: 1280, height: 860 });
	await open(page, '/de/');
	await page.evaluate(() => {
		document
			.getElementById('vibe-p2pgame')
			?.scrollIntoView({ block: 'start', behavior: 'instant' });
		window.scrollBy(0, -90);
	});
	await expect(page).toHaveScreenshot(['docs', 'screenshots', 'dark-de.png']);
});

test('phone', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await open(page);
	await expect(page).toHaveScreenshot(['docs', 'screenshots', 'phone.png']);
});

test('link preview', async ({ page }) => {
	await page.setViewportSize({ width: 1200, height: 630 });
	await open(page);
	await expect(page).toHaveScreenshot(['static', 'og.png']);
});

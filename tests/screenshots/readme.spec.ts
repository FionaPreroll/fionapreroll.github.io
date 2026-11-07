import { expect, test } from '@playwright/test';
import { hydrated, loadAllImages } from '../e2e/page.ts';

// `pnpm screenshots`: the pictures of the README in docs/screenshots/, and static/og.png, which
// link previews show. A picture is written again only where the page changed.

test.use({ deviceScaleFactor: 1 });

test.beforeEach(async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' });
});

async function open(page: import('@playwright/test').Page, path = '/en/', ready = 'dialog') {
	await page.goto(path);
	await hydrated(page, ready);
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

/** A badge as shields draw them, so that the picture does not change with the state of CI. */
function badge(left: string, right: string): string {
	const l = left.length * 7 + 10;
	const r = right.length * 7 + 10;
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${l + r}" height="20"><rect width="${l + r}" height="20" rx="3" fill="#555"/><rect x="${l}" width="${r}" height="20" rx="3" fill="#4c1"/><g fill="#fff" font-family="Verdana,sans-serif" font-size="11"><text x="5" y="14">${left}</text><text x="${l + 5}" y="14">${right}</text></g></svg>`;
}

test('dashboard', async ({ page }) => {
	await page.route(/actions\/workflows\/.*badge\.svg/, (route) =>
		route.fulfill({ contentType: 'image/svg+xml', body: badge('CI', 'passing') })
	);
	await page.route(/codecov\.io\/.*badge\.svg/, (route) =>
		route.fulfill({ contentType: 'image/svg+xml', body: badge('codecov', '100%') })
	);
	await page.setViewportSize({ width: 1280, height: 860 });
	await open(page, '/en/dashboard/', 'main');
	await expect(page).toHaveScreenshot(['docs', 'screenshots', 'dashboard.png']);
});

test('link preview', async ({ page }) => {
	await page.setViewportSize({ width: 1200, height: 630 });
	await open(page);
	await expect(page).toHaveScreenshot(['static', 'og.png']);
});

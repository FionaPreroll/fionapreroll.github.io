import { expect, type Page } from '@playwright/test';

/** Fails the test on any error the page logs or throws. */
export function watchErrors(page: Page): string[] {
	const errors: string[] = [];
	page.on('console', (message) => {
		if (message.type() === 'error') errors.push(message.text());
	});
	page.on('pageerror', (error) => errors.push(String(error)));
	return errors;
}

/** Loads every lazy image and waits for all of them. */
export async function loadAllImages(page: Page): Promise<void> {
	await page.evaluate(async () => {
		const images = [...document.images];
		for (const image of images) image.loading = 'eager';
		await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
	});
}

/**
 * Waits until SvelteKit has started, so that clicks reach the page's code: the homepage is ready
 * once its lightbox is there, other pages once `ready` is.
 */
export async function hydrated(page: Page, ready = 'dialog'): Promise<void> {
	await expect(page.locator('body')).toHaveAttribute('data-sveltekit-preload-data', 'hover');
	await page.waitForFunction((selector) => document.querySelector(selector) !== null, ready);
	await page.waitForLoadState('networkidle');
}

const badge =
	'<svg xmlns="http://www.w3.org/2000/svg" width="80" height="20"><rect width="80" height="20" fill="#888"/></svg>';

/**
 * Answers every request to another host with a plain badge, so that a slow GitHub or Codecov
 * cannot hold up `networkidle`.
 */
export async function stayLocal(page: Page): Promise<void> {
	await page.route(
		(url) => url.hostname !== 'localhost',
		(route) => route.fulfill({ contentType: 'image/svg+xml', body: badge })
	);
}

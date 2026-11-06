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

/** Waits until SvelteKit has started, so that clicks reach the page's code. */
export async function hydrated(page: Page): Promise<void> {
	await expect(page.locator('body')).toHaveAttribute('data-sveltekit-preload-data', 'hover');
	await page.waitForFunction(() => document.querySelector('dialog') !== null);
	await page.waitForLoadState('networkidle');
}

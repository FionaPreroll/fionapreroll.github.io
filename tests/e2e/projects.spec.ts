import { expect, test } from '@playwright/test';
import { hydrated } from './page.ts';

test('a project’s details fold out with more screenshots and links', async ({ page }) => {
	await page.goto('/en/');
	await hydrated(page);
	const laser = page.locator('#vibe-laser');
	const details = page.locator('#vibe-laser-details');
	await expect(details.getByRole('heading', { name: 'Under the hood' })).toBeHidden();
	await laser.getByRole('button', { name: 'Show details' }).click();
	await expect(details.getByRole('heading', { name: 'Under the hood' })).toBeVisible();
	await expect(details.getByRole('link', { name: /Changelog/ })).toHaveAttribute(
		'href',
		'https://github.com/FionaPreroll/vibe-laser/blob/main/CHANGELOG.md'
	);
	await laser.getByRole('button', { name: 'Hide details' }).click();
	await expect(details.getByRole('heading', { name: 'Under the hood' })).toBeHidden();
});

test('a link to a project opens its details and scrolls to it', async ({ page }) => {
	await page.goto('/en/#vibe-portredirect');
	await hydrated(page);
	await expect(
		page.locator('#vibe-portredirect-details').getByRole('link', { name: /Security review/ })
	).toBeVisible();
	await expect(page.locator('#vibe-portredirect')).toBeInViewport();
	await page.getByRole('link', { name: 'Spielekiste' }).first().click();
	await expect(page).toHaveURL(/#vibe-mugames$/);
	await expect(page.locator('#vibe-mugames-details').getByText('Under the hood')).toBeVisible();
});

test('a technology filters the projects', async ({ page }) => {
	await page.goto('/en/');
	await hydrated(page);
	await page.getByRole('button', { name: /^Rust\b.*in 2 of the projects/ }).click();
	await expect(page.getByRole('status')).toHaveText(/2 of 10 projects use Rust\./);
	await expect(page.getByRole('article')).toHaveCount(2);
	await expect(page.locator('#projects')).toBeInViewport();
	await page.getByRole('button', { name: 'Show all projects' }).click();
	await expect(page.getByRole('article')).toHaveCount(10);
});

test('the lightbox steps through the screenshots by key and closes with Escape', async ({
	page
}) => {
	await page.goto('/en/');
	await hydrated(page);
	await page
		.getByRole('button', {
			name: 'Enlarge: The title screen: the ship and its pilot ride the wormhole'
		})
		.click();
	const dialog = page.getByRole('dialog', { name: 'Screenshots of Wormhole Surfing' });
	await expect(dialog).toBeVisible();
	await expect(dialog.getByText('1 of 5')).toBeVisible();
	await page.keyboard.press('ArrowRight');
	await expect(dialog.getByText('2 of 5')).toBeVisible();
	await expect(dialog.getByRole('img')).toHaveAttribute('alt', /The ride/);
	await page.keyboard.press('Escape');
	await expect(dialog).toBeHidden();
});

test('the theme switch goes light, dark and back, and is remembered', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'light' });
	await page.goto('/en/');
	await hydrated(page);
	const html = page.locator('html');
	await expect(html).not.toHaveClass(/dark/);
	await page.getByRole('button', { name: /Color theme: like the system/ }).click();
	await page.getByRole('button', { name: /Color theme: light/ }).click();
	await expect(html).toHaveClass(/dark/);
	await page.reload();
	await expect(html).toHaveClass(/dark/);
	await expect(page.getByRole('button', { name: /Color theme: dark/ })).toBeVisible();
});

test('it follows a dark system', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'dark' });
	await page.goto('/en/');
	await expect(page.locator('html')).toHaveClass(/dark/);
});

test('printing opens every project’s details and leaves out the controls', async ({ page }) => {
	await page.goto('/en/');
	await hydrated(page);
	await page.emulateMedia({ media: 'print' });
	await expect(page.locator('#vibe-stundenplan-details').getByText('Under the hood')).toBeVisible();
	await expect(page.getByRole('banner')).toBeHidden();
	await expect(page.getByRole('button', { name: 'Show details' }).first()).toBeHidden();
});

test('a phone gets no sideways scrolling', async ({ page }) => {
	await page.setViewportSize({ width: 360, height: 780 });
	await page.goto('/en/');
	await hydrated(page);
	await page.locator('#vibe-mugames').getByRole('button', { name: 'Show details' }).click();
	const overflow = await page.evaluate(
		() => document.documentElement.scrollWidth - document.documentElement.clientWidth
	);
	expect(overflow).toBeLessThanOrEqual(0);
});

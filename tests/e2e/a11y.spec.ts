import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { hydrated } from './page.ts';

async function violations(page: import('@playwright/test').Page) {
	const results = await new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
		.analyze();
	return results.violations.map(
		(v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`
	);
}

for (const colorScheme of ['light', 'dark'] as const) {
	test(`the page is accessible in ${colorScheme} colors`, async ({ page }) => {
		await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
		await page.goto('/en/');
		await hydrated(page);
		await page.locator('#vibe-p2pgame').getByRole('button', { name: 'Show details' }).click();
		await expect(page.locator('#vibe-p2pgame-details')).toHaveAttribute('data-expanded', 'true');
		expect(await violations(page)).toEqual([]);
	});
}

test('the German page and the lightbox are accessible', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/de/');
	await hydrated(page);
	expect(await violations(page)).toEqual([]);
	await page.getByRole('button', { name: /^Vergrößern: Ein gelöstes Level/ }).click();
	await expect(page.getByRole('dialog')).toBeVisible();
	expect(await violations(page)).toEqual([]);
});

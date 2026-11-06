import { defineConfig } from '@playwright/test';
import base from './playwright.config.ts';

// The README's screenshots and the picture for link previews: `pnpm screenshots` writes them to
// docs/screenshots/ and static/og.png (tests/screenshots/readme.spec.ts names the paths).
export default defineConfig({
	...base,
	testDir: 'tests/screenshots',
	outputDir: 'test-results/screenshots',
	reporter: 'list',
	snapshotPathTemplate: '{arg}{ext}',
	// Write a picture again only where the page differs from it.
	updateSnapshots: 'changed',
	expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.002 } }
});

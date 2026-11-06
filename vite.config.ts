import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: { runes: true },
			// A static site for GitHub Pages: every page is prerendered to HTML at build time.
			adapter: adapter(),
			// English at / and /en/, German at /de/ (see src/params.ts and README, "Languages").
			prerender: { entries: ['/', '/en/', '/de/'] }
		}),
		// Only in Vitest: Svelte's browser build and a cleanup after every test.
		svelteTesting()
	],
	test: {
		include: ['src/**/*.test.ts', 'tools/**/*.test.ts'],
		environment: 'happy-dom',
		setupFiles: ['src/test/setup.ts'],
		expect: { requireAssertions: true },
		coverage: {
			provider: 'v8',
			// Every source file, components too, so files without tests count as uncovered.
			include: ['src/**/*.{ts,svelte}'],
			exclude: ['src/**/*.test.ts', 'src/test/**', 'src/**/*.d.ts'],
			// lcov for Codecov, a table for the terminal.
			reporter: ['text', 'lcov'],
			// Below 95 %, `pnpm test:coverage` (and with it `pnpm check` and CI) fails.
			thresholds: { lines: 95, statements: 95, functions: 95, branches: 95 }
		}
	}
});

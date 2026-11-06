import { describe, expect, it, vi } from 'vitest';
import { brokenStorage, memoryStorage } from '../test/render.ts';
import { nextTheme, readTheme, Theme, THEME_KEY } from './theme.svelte.ts';

/** A media query for prefers-color-scheme: dark that the test can flip. */
function fakeMedia(matches: boolean) {
	const listeners = new Set<(event: MediaQueryListEvent) => void>();
	return {
		matches,
		addEventListener: vi.fn((_: string, listener: (event: MediaQueryListEvent) => void) => {
			listeners.add(listener);
		}),
		removeEventListener: vi.fn((_: string, listener: (event: MediaQueryListEvent) => void) => {
			listeners.delete(listener);
		}),
		flip(to: boolean) {
			for (const listener of listeners) listener({ matches: to } as MediaQueryListEvent);
		},
		listeners
	};
}

function setup(stored: Record<string, string> = {}, systemDark = false) {
	const storage = memoryStorage(stored);
	const media = fakeMedia(systemDark);
	const root = document.createElement('html');
	const theme = new Theme({ storage, media, root: () => root });
	return { storage, media, root, theme };
}

describe('nextTheme', () => {
	it('goes from the system’s to light, dark and round again', () => {
		expect(nextTheme('system')).toBe('light');
		expect(nextTheme('light')).toBe('dark');
		expect(nextTheme('dark')).toBe('system');
	});
});

describe('readTheme', () => {
	it('reads light and dark, and the system’s for anything else', () => {
		expect(readTheme(memoryStorage({ [THEME_KEY]: 'light' }))).toBe('light');
		expect(readTheme(memoryStorage({ [THEME_KEY]: 'dark' }))).toBe('dark');
		expect(readTheme(memoryStorage({ [THEME_KEY]: 'purple' }))).toBe('system');
		expect(readTheme(memoryStorage())).toBe('system');
		expect(readTheme(null)).toBe('system');
		expect(readTheme(brokenStorage)).toBe('system');
	});
});

describe('Theme', () => {
	it('follows the system until a choice is made', () => {
		const { theme, root, media } = setup({}, true);
		const stop = theme.start();
		expect(theme.choice).toBe('system');
		expect(root.classList.contains('dark')).toBe(true);
		media.flip(false);
		expect(root.classList.contains('dark')).toBe(false);
		stop();
		expect(media.listeners.size).toBe(0);
	});

	it('starts from the stored choice', () => {
		const { theme, root } = setup({ [THEME_KEY]: 'dark' });
		theme.start();
		expect(theme.choice).toBe('dark');
		expect(theme.dark).toBe(true);
		expect(root.classList.contains('dark')).toBe(true);
	});

	it('stores each choice, and forgets it back at the system’s', () => {
		const { theme, root, storage } = setup();
		theme.start();
		theme.cycle();
		expect(theme.choice).toBe('light');
		expect(storage.data.get(THEME_KEY)).toBe('light');
		expect(root.classList.contains('dark')).toBe(false);
		theme.cycle();
		expect(storage.data.get(THEME_KEY)).toBe('dark');
		expect(root.classList.contains('dark')).toBe(true);
		theme.cycle();
		expect(storage.data.has(THEME_KEY)).toBe(false);
		expect(theme.choice).toBe('system');
	});

	it('keeps a choice for the page where storage throws', () => {
		const root = document.createElement('html');
		const theme = new Theme({ storage: brokenStorage, media: null, root: () => root });
		theme.start();
		theme.cycle();
		theme.cycle();
		expect(theme.choice).toBe('dark');
		expect(root.classList.contains('dark')).toBe(true);
		theme.start()();
	});

	it('uses the page’s storage, media query and <html> by default', () => {
		localStorage.setItem(THEME_KEY, 'dark');
		const theme = new Theme();
		theme.start();
		expect(document.documentElement.classList.contains('dark')).toBe(true);
		theme.cycle();
		expect(localStorage.getItem(THEME_KEY)).toBeNull();
		localStorage.clear();
		document.documentElement.classList.remove('dark');
	});

	it('copes without matchMedia', () => {
		vi.stubGlobal('matchMedia', undefined);
		const root = document.createElement('html');
		const theme = new Theme({ storage: null, root: () => root });
		theme.start();
		expect(theme.dark).toBe(false);
		vi.unstubAllGlobals();
	});
});

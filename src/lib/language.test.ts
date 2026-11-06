import { afterEach, describe, expect, it, vi } from 'vitest';
import { brokenStorage, memoryStorage } from '../test/render.ts';
import {
	isLang,
	LANG_KEY,
	langOf,
	otherLang,
	pathOf,
	rememberLang,
	safeStorage
} from './language.ts';

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('the languages of the page', () => {
	it('are English and German', () => {
		expect(isLang('en')).toBe(true);
		expect(isLang('de')).toBe(true);
		expect(isLang('fr')).toBe(false);
		expect(isLang(undefined)).toBe(false);
	});

	it('are English unless the address says /de/', () => {
		expect(langOf(undefined)).toBe('en');
		expect(langOf('en')).toBe('en');
		expect(langOf('de')).toBe('de');
	});

	it('have addresses that never move to the other language', () => {
		expect(pathOf('en')).toBe('/en/');
		expect(pathOf('de')).toBe('/de/');
	});

	it('switch to each other', () => {
		expect(otherLang('en')).toBe('de');
		expect(otherLang('de')).toBe('en');
	});
});

describe('rememberLang', () => {
	it('keeps the chosen language', () => {
		const storage = memoryStorage();
		rememberLang('de', storage);
		expect(storage.data.get(LANG_KEY)).toBe('de');
	});

	it('does nothing without storage, or where storage throws', () => {
		expect(() => rememberLang('en', null)).not.toThrow();
		expect(() => rememberLang('en', brokenStorage)).not.toThrow();
	});

	it('uses localStorage by default', () => {
		const storage = memoryStorage();
		vi.stubGlobal('localStorage', storage);
		rememberLang('en');
		expect(storage.data.get(LANG_KEY)).toBe('en');
	});
});

describe('safeStorage', () => {
	it('is localStorage', () => {
		expect(safeStorage()).toBe(globalThis.localStorage);
	});

	it('is null where reading localStorage throws', () => {
		vi.spyOn(globalThis, 'localStorage', 'get').mockImplementation(() => {
			throw new Error('blocked');
		});
		expect(safeStorage()).toBeNull();
		vi.restoreAllMocks();
	});

	it('is null where there is none', () => {
		vi.stubGlobal('localStorage', undefined);
		expect(safeStorage()).toBeNull();
	});
});

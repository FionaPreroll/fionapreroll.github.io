import { describe, expect, it } from 'vitest';
import { de } from './de.ts';
import { en } from './en.ts';
import { createI18n, formatMonth, translate } from './index.ts';

describe('translate', () => {
	it('gives the text in the language asked for', () => {
		expect(translate('en', 'nav.projects')).toBe('Projects');
		expect(translate('de', 'nav.projects')).toBe('Projekte');
	});

	it('fills in the parameters', () => {
		expect(translate('en', 'lightbox.count', { i: 2, n: 9 })).toBe('2 of 9');
		expect(translate('de', 'projects.gadget', { n: '07' })).toBe('Gadget Nr. 07');
	});

	it('leaves a placeholder without its parameter as it is', () => {
		expect(translate('en', 'lightbox.count', { i: 1 })).toBe('1 of {n}');
	});
});

describe('the catalogs', () => {
	it('have the same keys in both languages', () => {
		expect(Object.keys(de).sort()).toEqual(Object.keys(en).sort());
	});

	it('have no empty texts', () => {
		for (const text of [...Object.values(en), ...Object.values(de)]) {
			expect(text.trim()).not.toBe('');
		}
	});

	it('use the same placeholders in both languages', () => {
		const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
		for (const key of Object.keys(en) as (keyof typeof en)[]) {
			expect(placeholders(de[key]), key).toEqual(placeholders(en[key]));
		}
	});
});

describe('formatMonth', () => {
	it('writes a month and year in the page’s language', () => {
		expect(formatMonth('en', '2026-10')).toBe('Oct 2026');
		expect(formatMonth('de', '2026-10')).toBe('Okt. 2026');
	});

	it('leaves what is not YYYY-MM as it is', () => {
		expect(formatMonth('en', 'soon')).toBe('soon');
	});
});

describe('createI18n', () => {
	it('follows the language it is given whenever a text is asked for', () => {
		let lang: 'en' | 'de' = 'en';
		const i18n = createI18n(() => lang);
		expect(i18n.lang).toBe('en');
		expect(i18n.t('nav.contact')).toBe('Contact');
		expect(i18n.l({ en: 'Hello', de: 'Hallo' })).toBe('Hello');
		lang = 'de';
		expect(i18n.lang).toBe('de');
		expect(i18n.t('nav.contact')).toBe('Kontakt');
		expect(i18n.l({ en: 'Hello', de: 'Hallo' })).toBe('Hallo');
	});
});

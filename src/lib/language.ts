import { LANGS, type Lang } from '../content/types.ts';

export function isLang(value: unknown): value is Lang {
	return (LANGS as readonly unknown[]).includes(value);
}

/** The language of a page by the [[lang]] part of its address: English unless it is /de/. */
export function langOf(param: string | undefined): Lang {
	return param === 'de' ? 'de' : 'en';
}

/**
 * The address of a page in `lang`, such as /de/ or /en/dashboard/: these never move to another
 * language. `page` is the part after the language, ending in a slash.
 */
export function pathOf(lang: Lang, page = ''): string {
	return `/${lang}/${page}`;
}

/** The other language, which the switch in the header leads to. */
export function otherLang(lang: Lang): Lang {
	return lang === 'de' ? 'en' : 'de';
}

export const LANG_KEY = 'lang';

/**
 * Remembers a language chosen with the switch: / then shows that language, whatever the browser
 * asks for (see the script in src/app.html).
 */
export function rememberLang(lang: Lang, storage: Pick<Storage, 'setItem'> | null = safeStorage()) {
	try {
		storage?.setItem(LANG_KEY, lang);
	} catch {
		// Storage that throws, as in some private windows: nothing is remembered.
	}
}

/** localStorage, or null where reading it throws. */
export function safeStorage(): Storage | null {
	try {
		return globalThis.localStorage ?? null;
	} catch {
		return null;
	}
}

import { getContext, setContext } from 'svelte';
import type { Lang, Localized } from '../content/types.ts';
import { de } from './de.ts';
import { en, type MessageKey } from './en.ts';

export type { MessageKey };

const catalogs: Record<Lang, Record<MessageKey, string>> = { en, de };

export type Params = Record<string, string | number>;

/** The text of `key` in `lang`, with every `{name}` replaced by `params.name`. */
export function translate(lang: Lang, key: MessageKey, params: Params = {}): string {
	return catalogs[lang][key].replace(/\{(\w+)\}/g, (match, name: string) =>
		name in params ? String(params[name]) : match
	);
}

/** A month given as YYYY-MM, such as "Oct 2026" or "Okt. 2026"; anything else as it is. */
export function formatMonth(lang: Lang, month: string): string {
	const match = /^(\d{4})-(\d{2})$/.exec(month);
	if (!match) return month;
	const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1));
	return new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
		date
	);
}

/** What components use for their texts: the page's language, t() for the catalog, l() for content. */
export interface I18n {
	readonly lang: Lang;
	t(key: MessageKey, params?: Params): string;
	l(text: Localized): string;
}

/** An I18n whose language is whatever `getLang` says when a text is asked for. */
export function createI18n(getLang: () => Lang): I18n {
	return {
		get lang() {
			return getLang();
		},
		t: (key, params) => translate(getLang(), key, params),
		l: (text) => text[getLang()]
	};
}

const KEY = Symbol('i18n');

/** Makes `i18n` the texts of every component below the caller. */
export function setI18n(i18n: I18n): I18n {
	return setContext(KEY, i18n);
}

/** The texts set by a component above: call it while the component is created. */
export function useI18n(): I18n {
	return getContext<I18n>(KEY);
}

export { KEY as I18N_KEY };

import { render } from '@testing-library/svelte';
import type { Component } from 'svelte';
import type { Lang } from '../content/types.ts';
import { createI18n, I18N_KEY } from '../i18n/index.ts';

/** Renders a component below the texts of `lang`, as Home.svelte gives them in the app. */
export function renderIn(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- any component, with its props
	component: Component<any>,
	props: Record<string, unknown>,
	lang: Lang = 'en'
) {
	return render(component, {
		props,
		context: new Map([[I18N_KEY, createI18n(() => lang)]])
	} as Parameters<typeof render>[1]);
}

/** A Storage in memory. */
export function memoryStorage(entries: Record<string, string> = {}) {
	const data = new Map(Object.entries(entries));
	return {
		getItem: (key: string) => data.get(key) ?? null,
		setItem: (key: string, value: string) => void data.set(key, value),
		removeItem: (key: string) => void data.delete(key),
		data
	};
}

/** A Storage whose every call throws, as in some private windows. */
export const brokenStorage = {
	getItem(): string | null {
		throw new Error('blocked');
	},
	setItem(): void {
		throw new Error('blocked');
	},
	removeItem(): void {
		throw new Error('blocked');
	}
};

import { safeStorage } from './language.ts';

/** The color theme a visitor chose with the switch in the header. */
export type ThemeChoice = 'system' | 'light' | 'dark';

export const THEME_KEY = 'theme';

const ORDER: readonly ThemeChoice[] = ['system', 'light', 'dark'];

/** The choice after `choice` when the switch is pressed: system, light, dark and round again. */
export function nextTheme(choice: ThemeChoice): ThemeChoice {
	return ORDER[(ORDER.indexOf(choice) + 1) % ORDER.length] ?? 'system';
}

/** The stored choice; the system's unless light or dark was stored. */
export function readTheme(storage: Pick<Storage, 'getItem'> | null): ThemeChoice {
	try {
		const value = storage?.getItem(THEME_KEY);
		return value === 'light' || value === 'dark' ? value : 'system';
	} catch {
		return 'system';
	}
}

export interface ThemeOptions {
	storage?: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> | null;
	media?: Pick<MediaQueryList, 'matches' | 'addEventListener' | 'removeEventListener'> | null;
	root?: () => HTMLElement;
}

/**
 * The color theme: the `dark` class on <html> follows the visitor's choice, or the system's
 * setting while the choice is "system". The script in src/app.html applies the same rule before
 * the first paint.
 */
export class Theme {
	choice: ThemeChoice = $state('system');
	#systemDark = $state(false);
	readonly #storage: ThemeOptions['storage'];
	readonly #media: ThemeOptions['media'];
	readonly #root: () => HTMLElement;

	constructor(options: ThemeOptions = {}) {
		this.#storage = options.storage === undefined ? safeStorage() : options.storage;
		this.#media =
			options.media === undefined
				? (globalThis.matchMedia?.('(prefers-color-scheme: dark)') ?? null)
				: options.media;
		this.#root = options.root ?? (() => document.documentElement);
	}

	get dark(): boolean {
		return this.choice === 'dark' || (this.choice === 'system' && this.#systemDark);
	}

	/** Reads the stored choice and follows the system from now on; returns what stops that. */
	start(): () => void {
		this.choice = readTheme(this.#storage ?? null);
		this.#systemDark = this.#media?.matches ?? false;
		this.#apply();
		const onChange = (event: MediaQueryListEvent) => {
			this.#systemDark = event.matches;
			this.#apply();
		};
		this.#media?.addEventListener('change', onChange);
		return () => this.#media?.removeEventListener('change', onChange);
	}

	/** The next choice, stored for the next visit. */
	cycle(): void {
		this.choice = nextTheme(this.choice);
		try {
			if (this.choice === 'system') this.#storage?.removeItem(THEME_KEY);
			else this.#storage?.setItem(THEME_KEY, this.choice);
		} catch {
			// Storage that throws: the choice holds until the page closes.
		}
		this.#apply();
	}

	#apply(): void {
		this.#root().classList.toggle('dark', this.dark);
	}
}

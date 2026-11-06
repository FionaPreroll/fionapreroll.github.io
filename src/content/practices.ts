import type { IconName } from '../ui/icons.ts';
import type { Localized } from './types.ts';

/** A habit that runs through the projects, with the projects that show it best. */
export interface Practice {
	id: string;
	icon: IconName;
	title: Localized;
	body: Localized;
	/** Slugs of projects where it shows. */
	seenIn: string[];
}

export const practices: Practice[] = [
	{
		id: 'typed',
		icon: 'shield-check',
		title: { en: 'Typed end to end', de: 'Durchgehend typisiert' },
		body: {
			en: 'TypeScript in strict mode, Rust where it counts, and schemas at every border where data comes in: saves, level packs, imports and the network.',
			de: 'TypeScript im Strict-Modus, Rust, wo es darauf ankommt, und Schemas an jeder Grenze, an der Daten hereinkommen: Spielstände, Levelpakete, Importe und das Netzwerk.'
		},
		seenIn: ['vibe-laser', 'vibe-wormholesurfing', 'vibe-portredirect', 'vibe-visualizer']
	},
	{
		id: 'tested',
		icon: 'beaker',
		title: { en: 'Tested in real browsers', de: 'In echten Browsern getestet' },
		body: {
			en: 'Unit tests with Vitest, Playwright tests that play the actual app, property-based tests, soak tests that hunt memory leaks, and accessibility checks with axe.',
			de: 'Unit-Tests mit Vitest, Playwright-Tests, die die echte App spielen, eigenschaftsbasierte Tests, Soak-Tests auf der Jagd nach Speicherlecks und Barrierefreiheits-Checks mit axe.'
		},
		seenIn: ['vibe-wormholesurfing', 'vibe-puzzles', 'vibe-visualizer', 'vibe-mugames']
	},
	{
		id: 'ci',
		icon: 'arrow-path',
		title: { en: 'CI on every push', de: 'CI bei jedem Push' },
		body: {
			en: 'GitHub Actions run type checks, lint, tests and coverage on every push. Deploys wait until everything is green, and CI builds the screenshots, Android apps and release binaries.',
			de: 'GitHub Actions prüfen Typen, Lint, Tests und Coverage bei jedem Push. Deployments warten, bis alles grün ist, und die CI baut Screenshots, Android-Apps und Release-Binaries.'
		},
		seenIn: ['vibe-puzzles', 'vibe-portredirect', 'vibe-p2pgame', 'vibe-laser']
	},
	{
		id: 'offline',
		icon: 'device-phone-mobile',
		title: { en: 'Offline, private, installable', de: 'Offline, privat, installierbar' },
		body: {
			en: 'Web apps that keep working without a connection, install like apps and keep data on the device. Capacitor turns them into Android apps that update from their own GitHub releases.',
			de: 'Web-Apps, die ohne Verbindung weiterlaufen, sich wie Apps installieren lassen und Daten auf dem Gerät behalten. Capacitor macht daraus Android-Apps, die sich aus ihren eigenen GitHub-Releases aktualisieren.'
		},
		seenIn: ['vibe-mugames', 'vibe-p2pgame', 'vibe-wormholesurfing', 'vibe-visualizer']
	},
	{
		id: 'bilingual',
		icon: 'language',
		title: { en: 'In two languages', de: 'In zwei Sprachen' },
		body: {
			en: 'Every text in English and German, with typed catalogs, so that a missing translation fails the type check instead of showing up on screen.',
			de: 'Jeder Text auf Englisch und Deutsch, mit typisierten Katalogen, damit eine fehlende Übersetzung schon die Typprüfung scheitern lässt statt auf dem Bildschirm aufzutauchen.'
		},
		seenIn: ['vibe-wormholesurfing', 'vibe-laser', 'vibe-puzzles', 'vibe-musicbanana']
	},
	{
		id: 'documented',
		icon: 'book-open',
		title: { en: 'Written down', de: 'Aufgeschrieben' },
		body: {
			en: 'READMEs that explain how things work and why, architecture and protocol documents, decision records, and changelogs in the Keep a Changelog format.',
			de: 'READMEs, die erklären, wie etwas funktioniert und warum, Architektur- und Protokolldokumente, Entscheidungsprotokolle und Changelogs im Format von Keep a Changelog.'
		},
		seenIn: ['vibe-portredirect', 'vibe-mugames', 'vibe-visualizer', 'vibe-stundenplan']
	}
];

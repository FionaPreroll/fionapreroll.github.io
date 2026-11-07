import type { LinkKind } from '../content/types.ts';
import type { IconName } from './icons.ts';

/** The icon of each kind of link, on the cards and on the dashboard. */
export const linkIcon: Record<LinkKind, IconName> = {
	live: 'rocket-launch',
	apk: 'arrow-down-tray',
	releases: 'tag',
	packages: 'cube',
	docker: 'cube-transparent',
	readme: 'book-open',
	docs: 'document-text',
	changelog: 'clock',
	privacy: 'shield-check'
};

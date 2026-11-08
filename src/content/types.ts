/** The languages of the page: English at / and /en/, German at /de/. */
export type Lang = 'en' | 'de';

export const LANGS: readonly Lang[] = ['en', 'de'];

/** A text in every language of the page. */
export type Localized = Record<Lang, string>;

/** The topics the projects are grouped by, in the order the page shows them. */
export type GroupId = 'games' | 'networking' | 'audio' | 'everyday';

export const GROUPS: readonly GroupId[] = ['games', 'networking', 'audio', 'everyday'];

/** Where a project runs. */
export type Platform =
	'web' | 'pwa' | 'android' | 'windows' | 'macos' | 'linux' | 'docker' | 'server';

/** What a link leads to: it picks the link's icon and, without a label of its own, its text. */
export type LinkKind =
	'live' | 'apk' | 'releases' | 'packages' | 'docker' | 'readme' | 'docs' | 'changelog' | 'privacy';

export interface ProjectLink {
	kind: LinkKind;
	href: string;
	/** Names the link where its kind alone does not, such as one document among several. */
	label?: Localized;
}

/** A screenshot, by its path in the project's repository (see tools/shots.ts). */
export interface Shot {
	file: string;
	caption: Localized;
	/** The part that stays in view when the picture is cropped to the hero frame. */
	focus?: 'top' | 'center';
}

export interface Project {
	/** The repository's name under github.com/FionaPreroll, and the anchor of its card. */
	slug: string;
	name: string;
	group: GroupId;
	/** The month of the first commit, as YYYY-MM. */
	started: string;
	/** For the dashboard: the workflow whose badge says whether main is green, and Codecov. */
	ci: { workflow: string; coverage: boolean };
	tagline: Localized;
	motivation: Localized;
	summary: Localized;
	/** What it does, for the details. */
	features: Localized[];
	/** How it is built and tested, for the details. */
	engineering: Localized[];
	stack: string[];
	platforms: Platform[];
	links: ProjectLink[];
	/** The pictures on the card: one wide screenshot, or two or three of a phone side by side. */
	hero: Shot[];
	/** The further screenshots in the details. */
	gallery: Shot[];
}

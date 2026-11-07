import { profile } from './profile.ts';
import { projects } from './projects.ts';
import { GROUPS, type GroupId, type Project, type ProjectLink } from './types.ts';

/** One repository on the dashboard (/dashboard/), with the addresses its row links to. */
export interface DashboardRepo {
	slug: string;
	name: string;
	repo: string;
	/** The deployed site or app, if there is one. */
	live?: string;
	/** The badge of the workflow that says whether main is green, and that workflow's runs. */
	ci: { badge: string; page: string };
	/** The Codecov badge and page, for repositories that report coverage. */
	coverage?: { badge: string; page: string };
	actions: string;
	issues: string;
	pulls: string;
	/** Releases, the Android app, packages and Docker images. */
	downloads: ProjectLink[];
}

export interface DashboardGroup {
	/** A group of the homepage, or `site` for this homepage itself. */
	id: GroupId | 'site';
	repos: DashboardRepo[];
}

const DOWNLOADS = new Set(['apk', 'releases', 'packages', 'docker']);

function row(
	slug: string,
	name: string,
	ci: Project['ci'],
	live: string | undefined,
	downloads: ProjectLink[]
): DashboardRepo {
	const repo = `${profile.github}/${slug}`;
	const codecov = `https://codecov.io/gh/${profile.login}/${slug}`;
	return {
		slug,
		name,
		repo,
		live,
		ci: {
			badge: `${repo}/actions/workflows/${ci.workflow}/badge.svg?branch=main`,
			page: `${repo}/actions/workflows/${ci.workflow}?query=branch%3Amain`
		},
		coverage: ci.coverage
			? { badge: `${codecov}/branch/main/graph/badge.svg`, page: codecov }
			: undefined,
		actions: `${repo}/actions`,
		issues: `${repo}/issues`,
		pulls: `${repo}/pulls`,
		downloads
	};
}

/** The projects of the homepage in its groups and order, then this site. */
export const dashboard: DashboardGroup[] = [
	...GROUPS.map((id) => ({
		id,
		repos: projects
			.filter((project) => project.group === id)
			.map((project) =>
				row(
					project.slug,
					project.name,
					project.ci,
					project.links.find((link) => link.kind === 'live')?.href,
					project.links.filter((link) => DOWNLOADS.has(link.kind))
				)
			)
	})),
	{
		id: 'site',
		repos: [
			row(
				'fionapreroll.github.io',
				'fionapreroll.github.io',
				{ workflow: 'ci.yml', coverage: true },
				`${profile.site}/`,
				[]
			)
		]
	}
];

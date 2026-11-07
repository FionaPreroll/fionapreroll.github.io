import { describe, expect, it } from 'vitest';
import { dashboard, row } from './dashboard.ts';
import { projects } from './projects.ts';

const repos = dashboard.flatMap((group) => group.repos);
const repo = (slug: string) => repos.find((r) => r.slug === slug)!;

describe('the dashboard', () => {
	it('lists every project in the homepage’s groups and order, then this site', () => {
		expect(dashboard.map((group) => group.id)).toEqual([
			'games',
			'networking',
			'audio',
			'everyday',
			'site'
		]);
		expect(repos.map((r) => r.slug)).toEqual([
			...projects.map((p) => p.slug),
			'fionapreroll.github.io'
		]);
	});

	it('links each repository’s CI on main, its Codecov page and its issues', () => {
		expect(repo('vibe-laser')).toMatchObject({
			repo: 'https://github.com/FionaPreroll/vibe-laser',
			live: 'https://fionapreroll.github.io/vibe-laser/',
			ci: {
				badge:
					'https://github.com/FionaPreroll/vibe-laser/actions/workflows/ci.yml/badge.svg?branch=main',
				page: 'https://github.com/FionaPreroll/vibe-laser/actions/workflows/ci.yml?query=branch%3Amain'
			},
			coverage: {
				badge: 'https://codecov.io/gh/FionaPreroll/vibe-laser/branch/main/graph/badge.svg',
				page: 'https://codecov.io/gh/FionaPreroll/vibe-laser'
			},
			actions: 'https://github.com/FionaPreroll/vibe-laser/actions',
			issues: 'https://github.com/FionaPreroll/vibe-laser/issues',
			pulls: 'https://github.com/FionaPreroll/vibe-laser/pulls',
			downloads: []
		});
	});

	it('knows the repositories that differ', () => {
		expect(repo('vibe-portredirect').ci.badge).toContain('/actions/workflows/rust-test.yml/');
		expect(repo('vibe-portredirect').live).toBeUndefined();
		expect(repo('vibe-stundenplan').coverage?.page).toBe(
			'https://codecov.io/gh/FionaPreroll/vibe-stundenplan'
		);
		expect(repos.every((r) => r.coverage)).toBe(true);
		expect(repo('fionapreroll.github.io').live).toBe('https://fionapreroll.github.io/');
	});

	it('leaves out Codecov for a repository that reports no coverage', () => {
		const plain = row('demo', 'Demo', { workflow: 'test.yml', coverage: false }, undefined, []);
		expect(plain.coverage).toBeUndefined();
		expect(plain.ci.badge).toBe(
			'https://github.com/FionaPreroll/demo/actions/workflows/test.yml/badge.svg?branch=main'
		);
	});

	it('gathers the downloads: the app, releases, packages and Docker images', () => {
		expect(repo('vibe-p2pgame').downloads.map((link) => link.kind)).toEqual([
			'apk',
			'releases',
			'packages',
			'packages',
			'packages'
		]);
		expect(repo('vibe-musicbanana').downloads.map((link) => link.kind)).toEqual(['docker']);
	});
});

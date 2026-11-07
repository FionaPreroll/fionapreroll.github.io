import { render, screen, within } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { dashboard } from '../content/dashboard.ts';
import Dashboard from './Dashboard.svelte';

const row = (slug: string) =>
	within(document.querySelector(`[data-repo="${slug}"]`) as HTMLElement);

describe('Dashboard', () => {
	it('lists the eleven repositories in five groups', () => {
		render(Dashboard, { lang: 'en' });
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Dashboard');
		expect(screen.getByText('Mission control · 11 repositories')).toBeInTheDocument();
		expect(document.querySelectorAll('[data-repo]')).toHaveLength(11);
		expect(screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent?.trim())).toEqual([
			'Games 03',
			'Networking & peer to peer 03',
			'Music & audio 03',
			'Everyday 01',
			'This site 01'
		]);
	});

	it('is hidden from search engines, and speaks the page’s language', () => {
		render(Dashboard, { lang: 'en' });
		expect(document.title).toBe('Dashboard · Fiona');
		expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute(
			'content',
			'noindex, nofollow'
		);
		expect(document.documentElement.lang).toBe('en');
		expect(screen.getByRole('link', { name: 'Back to the homepage' })).toHaveAttribute(
			'href',
			'/en/'
		);
		expect(screen.getByRole('link', { name: 'Auf Deutsch lesen' })).toHaveAttribute(
			'href',
			'/de/dashboard/'
		);
	});

	it('links a project’s deployment, source, CI, coverage, issues and pull requests', () => {
		render(Dashboard, { lang: 'en' });
		const laser = row('vibe-laser');
		const href = (name: string) => laser.getByRole('link', { name: new RegExp(`^${name}`) });
		expect(href('Open Vibe Laser')).toHaveAttribute(
			'href',
			'https://fionapreroll.github.io/vibe-laser/'
		);
		expect(href('Repository of Vibe Laser')).toHaveAttribute(
			'href',
			'https://github.com/FionaPreroll/vibe-laser'
		);
		expect(href('Actions of Vibe Laser')).toHaveAttribute(
			'href',
			'https://github.com/FionaPreroll/vibe-laser/actions'
		);
		expect(href('Issues of Vibe Laser')).toHaveAttribute(
			'href',
			'https://github.com/FionaPreroll/vibe-laser/issues'
		);
		expect(href('Pull requests of Vibe Laser')).toHaveAttribute(
			'href',
			'https://github.com/FionaPreroll/vibe-laser/pulls'
		);
		const ci = href('CI of Vibe Laser on main');
		expect(ci).toHaveAttribute('title', 'CI of Vibe Laser on main');
		expect(ci.querySelector('img')).toHaveAttribute(
			'src',
			'https://github.com/FionaPreroll/vibe-laser/actions/workflows/ci.yml/badge.svg?branch=main'
		);
		expect(href('Coverage of Vibe Laser on Codecov')).toHaveAttribute(
			'href',
			'https://codecov.io/gh/FionaPreroll/vibe-laser'
		);
	});

	it('keeps the place of a missing deployment, and says when there is no coverage', () => {
		render(Dashboard, { lang: 'en' });
		const portredirect = row('vibe-portredirect');
		expect(portredirect.queryByRole('link', { name: /^Open/ })).toBeNull();
		expect(
			document.querySelector('[data-repo="vibe-portredirect"] li[aria-hidden="true"]')
		).not.toBeNull();
		expect(screen.queryByText('no coverage')).not.toBeInTheDocument();
	});

	it('says when a repository reports no coverage', () => {
		const [games] = dashboard;
		const laser = games!.repos.find((r) => r.slug === 'vibe-laser')!;
		render(Dashboard, {
			lang: 'en',
			groups: [{ id: 'games', repos: [{ ...laser, coverage: undefined }] }]
		});
		expect(screen.getByText('Mission control · 1 repositories')).toBeInTheDocument();
		expect(row('vibe-laser').getByText('no coverage')).toBeInTheDocument();
		expect(row('vibe-laser').queryByRole('link', { name: /^Coverage/ })).toBeNull();
	});

	it('names every download by its project', () => {
		render(Dashboard, { lang: 'en' });
		const spark = row('vibe-p2pgame');
		expect(spark.getByRole('link', { name: /^Spark Hunt: Android app \(APK\)/ })).toHaveAttribute(
			'href',
			'https://github.com/FionaPreroll/vibe-p2pgame/releases/latest/download/spark-hunt.apk'
		);
		expect(
			spark.getByRole('link', { name: /^Spark Hunt: Package @fionapreroll\/p2p-nearby/ })
		).toBeInTheDocument();
		expect(row('vibe-laser').queryByRole('link', { name: /^Vibe Laser:/ })).toBeNull();
	});

	it('speaks German', () => {
		render(Dashboard, { lang: 'de' });
		expect(screen.getByText('Kommandozentrale · 11 Repositories')).toBeInTheDocument();
		expect(screen.getByRole('heading', { level: 2, name: /^Diese Seite/ })).toBeInTheDocument();
		expect(row('vibe-laser').getByRole('link', { name: /^Vibe Laser öffnen/ })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Zurück zur Startseite' })).toHaveAttribute(
			'href',
			'/de/'
		);
		expect(document.documentElement.lang).toBe('de');
	});
});

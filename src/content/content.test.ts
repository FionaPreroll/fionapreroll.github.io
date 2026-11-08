import { describe, expect, it } from 'vitest';
import { icons } from '../ui/icons.ts';
import { practices } from './practices.ts';
import { profile } from './profile.ts';
import { projects } from './projects.ts';
import { picture } from './shots.ts';
import { GROUPS, type Localized } from './types.ts';

/** The repositories the page shows, as asked for. */
const SHOWCASED = [
	'vibe-wormholesurfing',
	'vibe-mugames',
	'vibe-portredirect',
	'vibe-p2pgame',
	'vibe-puzzles',
	'vibe-laser',
	'audioref',
	'vibe-soundlab',
	'vibe-musicbanana',
	'vibe-visualizer',
	'vibe-stundenplan'
];

function texts(project: (typeof projects)[number]): Localized[] {
	return [
		project.tagline,
		project.motivation,
		project.summary,
		...project.features,
		...project.engineering,
		...project.links.flatMap((link) => (link.label ? [link.label] : [])),
		...[...project.hero, ...project.gallery].map((shot) => shot.caption)
	];
}

describe('the projects', () => {
	it('are the eleven showcased repositories, each once', () => {
		expect(projects.map((p) => p.slug).sort()).toEqual([...SHOWCASED].sort());
	});

	it('stand in the order of their groups', () => {
		const order = projects.map((p) => GROUPS.indexOf(p.group));
		expect(order).toEqual([...order].sort((a, b) => a - b));
		expect(new Set(projects.map((p) => p.group))).toEqual(new Set(GROUPS));
	});

	it.each(projects)('$name has every text in English and German', (project) => {
		for (const text of texts(project)) {
			expect(text.en.trim(), JSON.stringify(text)).not.toBe('');
			expect(text.de.trim(), JSON.stringify(text)).not.toBe('');
		}
	});

	it.each(projects)('$name is described in full', (project) => {
		expect(project.started).toMatch(/^20\d\d-(0[1-9]|1[0-2])$/);
		expect(project.features.length).toBeGreaterThanOrEqual(3);
		expect(project.engineering.length).toBeGreaterThanOrEqual(3);
		expect(project.stack.length).toBeGreaterThan(0);
		expect(new Set(project.stack).size).toBe(project.stack.length);
		expect(project.platforms.length).toBeGreaterThan(0);
		expect(project.links.some((link) => link.kind === 'readme')).toBe(true);
	});

	it.each(projects)('$name links only to https addresses, each once', (project) => {
		for (const link of project.links) expect(link.href).toMatch(/^https:\/\//);
		expect(new Set(project.links.map((l) => l.href)).size).toBe(project.links.length);
	});

	it.each(projects)('$name has its screenshots fetched', (project) => {
		expect(project.hero.length).toBeGreaterThanOrEqual(1);
		expect(project.hero.length).toBeLessThanOrEqual(3);
		expect(project.gallery.length).toBeGreaterThan(0);
		for (const shot of [...project.hero, ...project.gallery]) {
			expect(() => picture(project.slug, shot)).not.toThrow();
		}
	});

	it.each(projects.filter((p) => p.hero.length > 1))(
		'$name shows only phones held upright side by side',
		(project) => {
			for (const shot of project.hero) expect(picture(project.slug, shot).portrait).toBe(true);
		}
	);
});

describe('the practices', () => {
	it('point to projects on the page, with icons that exist', () => {
		const slugs = new Set(projects.map((p) => p.slug));
		for (const practice of practices) {
			expect(practice.icon in icons).toBe(true);
			for (const slug of practice.seenIn) expect(slugs.has(slug), slug).toBe(true);
			expect(practice.title.de).not.toBe('');
			expect(practice.body.de).not.toBe('');
		}
	});
});

describe('the profile', () => {
	it('has a contact address and the GitHub account', () => {
		expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+$/);
		expect(profile.github).toBe(`https://github.com/${profile.login}`);
		expect(profile.site).toBe('https://fionapreroll.github.io');
	});
});

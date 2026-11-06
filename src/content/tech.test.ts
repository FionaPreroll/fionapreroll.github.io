import { describe, expect, it } from 'vitest';
import { projects } from './projects.ts';
import { techCounts } from './tech.ts';
import type { Project } from './types.ts';

const project = (stack: string[]) => ({ stack }) as Project;

describe('techCounts', () => {
	it('counts every technology, most used first, then by name', () => {
		expect(
			techCounts([project(['Svelte', 'Rust']), project(['Rust', 'Axum']), project(['Rust'])])
		).toEqual([
			{ name: 'Rust', count: 3 },
			{ name: 'Axum', count: 1 },
			{ name: 'Svelte', count: 1 }
		]);
	});

	it('has every technology of the page once', () => {
		const counts = techCounts(projects);
		expect(new Set(counts.map((c) => c.name)).size).toBe(counts.length);
		expect(counts.reduce((sum, c) => sum + c.count, 0)).toBe(
			projects.reduce((sum, p) => sum + p.stack.length, 0)
		);
	});
});

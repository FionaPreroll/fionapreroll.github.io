import type { Project } from './types.ts';

export interface TechCount {
	name: string;
	count: number;
}

/** Every technology in the projects' stacks with how many use it, most used first, then by name. */
export function techCounts(list: readonly Project[]): TechCount[] {
	const counts = new Map<string, number>();
	for (const project of list) {
		for (const name of project.stack) counts.set(name, (counts.get(name) ?? 0) + 1);
	}
	return [...counts]
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'en'));
}

import manifest from './shots.json' with { type: 'json' };
import type { Shot } from './types.ts';

/** A screenshot's entry in shots.json, written by `pnpm shots` (tools/shots.ts). */
export interface ShotFile {
	path: string;
	width: number;
	height: number;
	widths: number[];
	svg?: boolean;
}

/** What an <img> needs to show a screenshot: its address, the sizes for srcset, and its size. */
export interface Picture {
	src: string;
	srcset?: string;
	width: number;
	height: number;
	/** Taller than wide, as a phone held upright. */
	portrait: boolean;
}

const files: Record<string, ShotFile> = manifest;

/** The files of `shot` in the project `slug`; throws for a screenshot `pnpm shots` has not fetched. */
export function picture(slug: string, shot: Shot, list: Record<string, ShotFile> = files): Picture {
	const file = list[`${slug}/${shot.file}`];
	if (!file) throw new Error(`${slug}/${shot.file} is missing from shots.json: run pnpm shots`);
	const portrait = file.height > file.width;
	if (file.svg) {
		return { src: `${file.path}.svg`, width: file.width, height: file.height, portrait };
	}
	const largest = file.widths[file.widths.length - 1];
	return {
		src: `${file.path}-${largest}.webp`,
		srcset: file.widths.map((w) => `${file.path}-${w}.webp ${w}w`).join(', '),
		width: file.width,
		height: file.height,
		portrait
	};
}

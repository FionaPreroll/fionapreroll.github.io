// The pure parts of tools/shots.ts, apart so that they can be tested without the network or sharp.

/** The widths a screenshot is written in: a small one for cards and a large one for the lightbox. */
export const WIDTHS: readonly number[] = [640, 1440];

const LARGEST = 1440;

/** The widths of the WebP files for a picture `native` pixels wide; never wider than the original. */
export function widthsFor(native: number): number[] {
	const largest = Math.min(native, LARGEST);
	return [...WIDTHS.filter((w) => w < largest), largest];
}

/** The raw address of a file on a repository's main branch. */
export function rawUrl(owner: string, slug: string, file: string): string {
	return `https://raw.githubusercontent.com/${owner}/${slug}/main/${file}`;
}

/** The file name without its folders and extension: docs/screenshots/ride.png gives ride. */
export function baseName(file: string): string {
	const name = file.split('/').pop() ?? file;
	return name.replace(/\.[^.]+$/, '');
}

export function isSvg(file: string): boolean {
	return file.toLowerCase().endsWith('.svg');
}

/**
 * Whether an SVG may be served from this site: SVGs are copied as they are, and one opened by its
 * address would run its scripts on this origin, so any script, event handler or foreign object
 * keeps it out.
 */
export function isSafeSvg(text: string): boolean {
	return !/<script|<foreignObject|\son[a-z]+\s*=|javascript:/i.test(text);
}

/** The size an SVG asks for, from its width and height (in px or pt) or else its viewBox. */
export function svgSize(text: string): { width: number; height: number } {
	const tag = /<svg\b[^>]*>/i.exec(text)?.[0];
	if (!tag) throw new Error('Not an SVG');
	const attr = (name: string) => new RegExp(`\\s${name}="([^"]+)"`).exec(tag)?.[1];
	const length = (value: string | undefined) => {
		const match = value ? /^([\d.]+)(px|pt)?$/.exec(value) : null;
		if (!match) return undefined;
		// 1 pt is 4/3 px.
		return Math.round(Number(match[1]) * (match[2] === 'pt' ? 4 / 3 : 1));
	};
	const width = length(attr('width'));
	const height = length(attr('height'));
	if (width && height) return { width, height };
	const box = attr('viewBox')
		?.trim()
		.split(/[\s,]+/)
		.map(Number);
	if (box?.length === 4 && box[2] && box[3]) {
		return { width: Math.round(box[2]), height: Math.round(box[3]) };
	}
	throw new Error('An SVG without width and height or viewBox');
}

/** One screenshot in src/content/shots.json. */
export interface ShotEntry {
	/** The address without width and extension, such as /shots/vibe-laser/solved. */
	path: string;
	width: number;
	height: number;
	/** The widths of its WebP files; empty for an SVG, which is served as it is. */
	widths: number[];
	svg?: true;
}

/** The manifest with its keys sorted, so that a run that changes nothing changes no line. */
export function sortedManifest(entries: Record<string, ShotEntry>): Record<string, ShotEntry> {
	return Object.fromEntries(Object.entries(entries).sort(([a], [b]) => a.localeCompare(b)));
}

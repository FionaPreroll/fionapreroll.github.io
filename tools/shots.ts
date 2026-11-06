// `pnpm shots`: fetches every screenshot that src/content/projects.ts names from its repository,
// writes it as WebP in the widths of WIDTHS into static/shots/<repository>/ (SVGs as they are),
// fetches the GitHub avatar, and lists every picture with its size in src/content/shots.json.
// Files in static/shots/ that no project names any more are removed.
//
// SHOTS_FROM=<folder> reads the repositories from clones in that folder instead of GitHub, e.g.
// SHOTS_FROM=~/code reads ~/code/vibe-laser/docs/screenshots/solved.png.

import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { profile } from '../src/content/profile.ts';
import { projects } from '../src/content/projects.ts';
import {
	baseName,
	isSafeSvg,
	isSvg,
	rawUrl,
	type ShotEntry,
	sortedManifest,
	svgSize,
	widthsFor
} from './shotsPlan.ts';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'static', 'shots');
const from = process.env.SHOTS_FROM;
// WebP quality: screenshots with text stay sharp at 82, at a fraction of the PNG's size.
const QUALITY = 82;

async function fetchFile(slug: string, file: string): Promise<Buffer> {
	if (from) return readFile(path.join(from, slug, file));
	const url = rawUrl(profile.login, slug, file);
	const response = await fetch(url);
	if (!response.ok) throw new Error(`${url}: ${response.status} ${response.statusText}`);
	return Buffer.from(await response.arrayBuffer());
}

async function writeShot(slug: string, file: string): Promise<[string, ShotEntry]> {
	const data = await fetchFile(slug, file);
	const name = baseName(file);
	const dir = path.join(out, slug);
	await mkdir(dir, { recursive: true });
	const entry: ShotEntry = { path: `/shots/${slug}/${name}`, width: 0, height: 0, widths: [] };
	if (isSvg(file)) {
		const text = data.toString('utf8');
		if (!isSafeSvg(text)) throw new Error(`${slug}/${file}: the SVG holds scripts or handlers`);
		Object.assign(entry, svgSize(text), { svg: true });
		await writeFile(path.join(dir, `${name}.svg`), text);
	} else {
		const { width, height } = await sharp(data).metadata();
		entry.width = width;
		entry.height = height;
		entry.widths = widthsFor(width);
		for (const w of entry.widths) {
			await sharp(data)
				.resize({ width: w })
				.webp({ quality: QUALITY, effort: 6 })
				.toFile(path.join(dir, `${name}-${w}.webp`));
		}
	}
	return [`${slug}/${file}`, entry];
}

async function writeAvatar(): Promise<void> {
	const response = await fetch(`https://avatars.githubusercontent.com/u/${profile.githubId}?v=4`);
	if (!response.ok) throw new Error(`Avatar: ${response.status} ${response.statusText}`);
	const data = Buffer.from(await response.arrayBuffer());
	for (const size of [128, 256]) {
		await sharp(data)
			.resize(size, size, { fit: 'cover' })
			.webp({ quality: 88 })
			.toFile(path.join(root, 'static', `avatar-${size}.webp`));
	}
}

/** Removes files in static/shots/ that the manifest does not name. */
async function prune(manifest: Record<string, ShotEntry>): Promise<void> {
	const keep = new Set<string>();
	for (const entry of Object.values(manifest)) {
		const files = entry.svg
			? [`${entry.path}.svg`]
			: entry.widths.map((w) => `${entry.path}-${w}.webp`);
		for (const file of files) keep.add(path.join(root, 'static', file));
	}
	for (const slug of await readdir(out)) {
		const dir = path.join(out, slug);
		for (const file of await readdir(dir)) {
			const full = path.join(dir, file);
			if (!keep.has(full)) {
				await rm(full);
				console.log(`removed ${path.relative(root, full)}`);
			}
		}
	}
}

const manifest: Record<string, ShotEntry> = {};
for (const project of projects) {
	for (const shot of [...project.hero, ...project.gallery]) {
		const [key, entry] = await writeShot(project.slug, shot.file);
		manifest[key] = entry;
		console.log(`${key} → ${entry.path} (${entry.width}×${entry.height})`);
	}
}
await prune(manifest);
await writeAvatar();
await writeFile(
	path.join(root, 'src', 'content', 'shots.json'),
	`${JSON.stringify(sortedManifest(manifest), null, '\t')}\n`
);
console.log(`${Object.keys(manifest).length} screenshots in src/content/shots.json`);

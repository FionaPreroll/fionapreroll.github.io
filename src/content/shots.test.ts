import { describe, expect, it } from 'vitest';
import { picture, type ShotFile } from './shots.ts';

const caption = { en: 'A', de: 'B' };

const list: Record<string, ShotFile> = {
	'demo/a.png': { path: '/shots/demo/a', width: 1280, height: 720, widths: [640, 1280] },
	'demo/phone.png': { path: '/shots/demo/phone', width: 400, height: 800, widths: [400] },
	'demo/graph.svg': { path: '/shots/demo/graph', width: 500, height: 200, widths: [], svg: true }
};

describe('picture', () => {
	it('gives a WebP in every width, the largest as the fallback', () => {
		expect(picture('demo', { file: 'a.png', caption }, list)).toEqual({
			src: '/shots/demo/a-1280.webp',
			srcset: '/shots/demo/a-640.webp 640w, /shots/demo/a-1280.webp 1280w',
			width: 1280,
			height: 720,
			portrait: false
		});
	});

	it('knows a phone held upright', () => {
		expect(picture('demo', { file: 'phone.png', caption }, list).portrait).toBe(true);
	});

	it('serves an SVG as it is', () => {
		expect(picture('demo', { file: 'graph.svg', caption }, list)).toEqual({
			src: '/shots/demo/graph.svg',
			width: 500,
			height: 200,
			portrait: false
		});
	});

	it('names a screenshot that pnpm shots has not fetched', () => {
		expect(() => picture('demo', { file: 'missing.png', caption }, list)).toThrow(
			'demo/missing.png is missing from shots.json: run pnpm shots'
		);
	});

	it('reads shots.json by default', () => {
		const pic = picture('vibe-laser', { file: 'docs/screenshots/solved.png', caption });
		expect(pic.src).toBe('/shots/vibe-laser/solved-1440.webp');
	});
});

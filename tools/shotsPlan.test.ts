import { describe, expect, it } from 'vitest';
import {
	baseName,
	isSafeSvg,
	isSvg,
	rawUrl,
	sortedManifest,
	svgSize,
	widthsFor
} from './shotsPlan.ts';

describe('widthsFor', () => {
	it('writes a small and a large picture, never wider than the original', () => {
		expect(widthsFor(2560)).toEqual([640, 1440]);
		expect(widthsFor(1440)).toEqual([640, 1440]);
		expect(widthsFor(1280)).toEqual([640, 1280]);
		expect(widthsFor(640)).toEqual([640]);
		expect(widthsFor(420)).toEqual([420]);
	});
});

describe('file names', () => {
	it('builds the raw address on main', () => {
		expect(rawUrl('FionaPreroll', 'vibe-laser', 'docs/screenshots/solved.png')).toBe(
			'https://raw.githubusercontent.com/FionaPreroll/vibe-laser/main/docs/screenshots/solved.png'
		);
	});

	it('takes the name without folders and extension', () => {
		expect(baseName('docs/screenshots/ride.png')).toBe('ride');
		expect(baseName('logo.v2.jpg')).toBe('logo.v2');
		expect(baseName('README')).toBe('README');
	});

	it('knows an SVG', () => {
		expect(isSvg('docs/graph.SVG')).toBe(true);
		expect(isSvg('docs/graph.png')).toBe(false);
	});
});

describe('isSafeSvg', () => {
	it('lets a drawing through', () => {
		expect(isSafeSvg('<svg viewBox="0 0 1 1"><rect width="1" fill="white"/></svg>')).toBe(true);
	});

	it.each([
		'<svg><script>alert(1)</script></svg>',
		'<svg onload="alert(1)"></svg>',
		'<svg><foreignObject></foreignObject></svg>',
		'<svg><a href="javascript:alert(1)"></a></svg>'
	])('keeps out %s', (text) => {
		expect(isSafeSvg(text)).toBe(false);
	});
});

describe('svgSize', () => {
	it('reads px and pt', () => {
		expect(svgSize('<svg width="300px" height="150"></svg>')).toEqual({ width: 300, height: 150 });
		expect(svgSize('<svg width="388pt" height="44pt"></svg>')).toEqual({ width: 517, height: 59 });
	});

	it('falls back to the viewBox', () => {
		expect(svgSize('<svg width="100%" viewBox="0 0 396.18 154.15"></svg>')).toEqual({
			width: 396,
			height: 154
		});
	});

	it('refuses what has no size or is no SVG', () => {
		expect(() => svgSize('<svg></svg>')).toThrow('without width and height');
		expect(() => svgSize('<png/>')).toThrow('Not an SVG');
	});
});

describe('sortedManifest', () => {
	it('sorts the keys', () => {
		const entry = { path: '/x', width: 1, height: 1, widths: [1] };
		expect(Object.keys(sortedManifest({ b: entry, a: entry }))).toEqual(['a', 'b']);
	});
});

import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import Layout from '../+layout.svelte';
import { prerender, trailingSlash } from '../+layout.ts';
import Page from './+page.svelte';
import { load } from './+page.ts';

describe('the page', () => {
	it('is English unless its address says /de/', () => {
		const run = (lang?: string) => (load as (e: unknown) => unknown)({ params: { lang } });
		expect(run()).toEqual({ lang: 'en' });
		expect(run('en')).toEqual({ lang: 'en' });
		expect(run('de')).toEqual({ lang: 'de' });
	});

	it('is prerendered, with a slash at the end of its address', () => {
		expect(prerender).toBe(true);
		expect(trailingSlash).toBe('always');
	});

	it('shows the home page in its language', () => {
		render(Page, { data: { lang: 'de' } } as never);
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
			'Engineering-Experimente, mit Sorgfalt ausgeliefert.'
		);
	});

	it('has a layout that shows the page', () => {
		render(Layout, {
			children: createRawSnippet(() => ({ render: () => '<p>inside</p>' }))
		} as never);
		expect(screen.getByText('inside')).toBeInTheDocument();
	});
});

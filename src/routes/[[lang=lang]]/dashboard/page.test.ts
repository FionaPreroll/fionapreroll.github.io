import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Page from './+page.svelte';
import { load } from './+page.ts';

describe('the dashboard page', () => {
	it('is English unless its address says /de/', () => {
		const run = (lang?: string) => (load as (e: unknown) => unknown)({ params: { lang } });
		expect(run()).toEqual({ lang: 'en' });
		expect(run('de')).toEqual({ lang: 'de' });
	});

	it('shows the dashboard in its language', () => {
		render(Page, { data: { lang: 'de' } } as never);
		expect(screen.getByText('Kommandozentrale · 12 Repositories')).toBeInTheDocument();
	});
});

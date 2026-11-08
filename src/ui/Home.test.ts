import { fireEvent, render, screen, within } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Home from './Home.svelte';

function articles() {
	return screen.getAllByRole('article');
}

/** The headings of the groups that show. */
function groups() {
	return [...document.querySelectorAll('h3[id^="group-"]')].map((h) => h.textContent?.trim());
}

function dialog() {
	return document.querySelector('dialog') as HTMLDialogElement;
}

beforeEach(() => {
	history.replaceState(null, '', '/');
});

afterEach(() => {
	localStorage.clear();
	document.documentElement.className = '';
});

describe('Home', () => {
	it('shows the eleven projects, numbered, in their four groups', () => {
		render(Home, { lang: 'en' });
		expect(articles()).toHaveLength(11);
		expect(groups()).toEqual(['Games', 'Networking & peer to peer', 'Music & audio', 'Everyday']);
		const first = within(articles()[0] as HTMLElement);
		expect(first.getByRole('heading', { level: 4 })).toHaveTextContent('Wormhole Surfing');
		expect(first.getByText('Gadget No. 01')).toBeInTheDocument();
		expect(screen.getByText('Gadget No. 11')).toBeInTheDocument();
	});

	it('speaks German at /de/, and follows when the language changes', async () => {
		const { rerender } = render(Home, { lang: 'de' });
		expect(screen.getByRole('heading', { level: 2, name: 'Projekte' })).toBeInTheDocument();
		expect(screen.getByText('Gadget Nr. 01')).toBeInTheDocument();
		expect(document.documentElement.lang).toBe('de');
		expect(document.title).toBe('Fiona · Engineering-Experimente, mit Sorgfalt ausgeliefert');
		await rerender({ lang: 'en' });
		expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument();
		expect(document.documentElement.lang).toBe('en');
		expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://fionapreroll.github.io/'
		);
	});

	it('tells search engines who this is', () => {
		render(Home, { lang: 'de' });
		const script = document.head.querySelector('script[type="application/ld+json"]');
		const data = JSON.parse(script?.textContent ?? '{}');
		expect(data).toMatchObject({
			'@type': 'Person',
			name: 'Fiona',
			url: 'https://fionapreroll.github.io/de/'
		});
	});

	it('filters the projects by a technology, from the overview or a card', async () => {
		render(Home, { lang: 'en' });
		await fireEvent.click(screen.getByRole('button', { name: /^Rust\b.*in 3 of the projects/ }));
		expect(articles()).toHaveLength(3);
		expect(screen.getByRole('status')).toHaveTextContent('3 of 11 projects use Rust.');
		expect(groups()).toEqual(['Networking & peer to peer', 'Music & audio']);
		// The same technology again shows everything.
		await fireEvent.click(screen.getByRole('button', { name: /^Rust\b.*in 3 of the projects/ }));
		expect(articles()).toHaveLength(11);

		const card = within(articles()[0] as HTMLElement);
		await fireEvent.click(card.getByRole('button', { name: 'Show the projects with three.js' }));
		expect(articles()).toHaveLength(1);
		// The card's chip of the technology that filters shows everything again.
		await fireEvent.click(screen.getByRole('button', { name: 'Show the projects with three.js' }));
		expect(articles()).toHaveLength(11);
		await fireEvent.click(card.getByRole('button', { name: 'Show the projects with three.js' }));
		expect(
			within(articles()[0] as HTMLElement).getByRole('button', {
				name: 'Show the projects with three.js'
			})
		).toHaveAttribute('aria-pressed', 'true');
		await fireEvent.click(screen.getByRole('button', { name: 'Show all projects' }));
		expect(articles()).toHaveLength(11);
		expect(screen.queryByRole('status')).not.toBeInTheDocument();
	});

	it('folds a project’s details out and in', async () => {
		render(Home, { lang: 'en' });
		const laser = document.getElementById('vibe-laser') as HTMLElement;
		const details = document.getElementById('vibe-laser-details') as HTMLElement;
		const toggle = within(laser).getByRole('button', { name: /Show details/ });
		expect(details.inert).toBe(true);
		await fireEvent.click(toggle);
		expect(toggle).toHaveAttribute('aria-expanded', 'true');
		expect(toggle).toHaveTextContent('Hide details');
		expect(details.inert).toBe(false);
		expect(within(details).getByText('The level editor')).toBeInTheDocument();
		await fireEvent.click(toggle);
		expect(details.inert).toBe(true);
	});

	it('opens the details a link points to, even when the filter hides that project', async () => {
		history.replaceState(null, '', '/#vibe-laser');
		const { unmount } = render(Home, { lang: 'en' });
		expect(document.getElementById('vibe-laser-details')?.inert).toBe(false);

		await fireEvent.click(screen.getByRole('button', { name: /^Rust\b/ }));
		history.replaceState(null, '', '/#vibe-puzzles');
		await fireEvent(window, new HashChangeEvent('hashchange'));
		expect(articles()).toHaveLength(11);
		expect(document.getElementById('vibe-puzzles-details')?.inert).toBe(false);

		// A link to a project that the filter shows leaves the filter.
		await fireEvent.click(screen.getByRole('button', { name: /^Rust\b/ }));
		history.replaceState(null, '', '/#vibe-portredirect');
		await fireEvent(window, new HashChangeEvent('hashchange'));
		expect(articles()).toHaveLength(3);

		history.replaceState(null, '', '/#contact');
		await fireEvent(window, new HashChangeEvent('hashchange'));
		expect(articles()).toHaveLength(3);
		unmount();
	});

	it('shows the screenshots large, one after the other', async () => {
		render(Home, { lang: 'en' });
		expect(dialog().open).toBe(false);
		await fireEvent.click(
			screen.getByRole('button', {
				name: 'Enlarge: The title screen: the ship and its pilot ride the wormhole'
			})
		);
		expect(dialog().open).toBe(true);
		expect(dialog()).toHaveAccessibleName('Screenshots of Wormhole Surfing');
		const view = within(dialog());
		expect(view.getByText('1 of 5')).toBeInTheDocument();

		await fireEvent.click(view.getByRole('button', { name: 'Next screenshot' }));
		expect(view.getByText('2 of 5')).toBeInTheDocument();
		await fireEvent.click(view.getByRole('button', { name: 'Previous screenshot' }));
		await fireEvent.keyDown(dialog(), { key: 'ArrowLeft' });
		expect(view.getByText('5 of 5')).toBeInTheDocument();
		await fireEvent.keyDown(dialog(), { key: 'ArrowRight' });
		expect(view.getByText('1 of 5')).toBeInTheDocument();
		await fireEvent.keyDown(dialog(), { key: 'Enter' });
		expect(view.getByText('1 of 5')).toBeInTheDocument();

		const figure = dialog().querySelector('figure') as HTMLElement;
		await fireEvent.pointerUp(figure, { clientX: 10 });
		await fireEvent.pointerDown(figure, { clientX: 300 });
		await fireEvent.pointerUp(figure, { clientX: 100 });
		expect(view.getByText('2 of 5')).toBeInTheDocument();
		await fireEvent.pointerDown(figure, { clientX: 100 });
		await fireEvent.pointerUp(figure, { clientX: 300 });
		expect(view.getByText('1 of 5')).toBeInTheDocument();
		await fireEvent.pointerDown(figure, { clientX: 100 });
		await fireEvent.pointerUp(figure, { clientX: 120 });
		expect(view.getByText('1 of 5')).toBeInTheDocument();

		// A click inside stays; one on the backdrop, the dialog itself, closes.
		await fireEvent.click(figure);
		expect(dialog().open).toBe(true);
		await fireEvent.click(dialog());
		expect(dialog().open).toBe(false);
		expect(dialog().querySelector('figure')).toBeNull();
	});

	it('opens the gallery’s screenshots after the hero’s, and closes with its button', async () => {
		render(Home, { lang: 'en' });
		await fireEvent.click(screen.getByRole('button', { name: 'Enlarge: Ludo for up to four' }));
		expect(within(dialog()).getByText('5 of 12')).toBeInTheDocument();
		await fireEvent.click(within(dialog()).getByRole('button', { name: 'Close' }));
		expect(dialog().open).toBe(false);
	});
});

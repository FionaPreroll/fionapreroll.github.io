import { fireEvent, render, screen, within } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { projects } from '../content/projects.ts';
import { THEME_KEY } from '../lib/theme.svelte.ts';
import { renderIn } from '../test/render.ts';
import Contact from './Contact.svelte';
import ExternalLink from './ExternalLink.svelte';
import Footer from './Footer.svelte';
import Hero from './Hero.svelte';
import Icon from './Icon.svelte';
import LanguageSwitch from './LanguageSwitch.svelte';
import ProjectCard from './ProjectCard.svelte';
import SectionHeading from './SectionHeading.svelte';
import TechOverview from './TechOverview.svelte';
import ThemeToggle from './ThemeToggle.svelte';
import { createRawSnippet } from 'svelte';

afterEach(() => {
	localStorage.clear();
	document.documentElement.className = '';
	vi.unstubAllGlobals();
});

const bySlug = (slug: string) => projects.find((p) => p.slug === slug) ?? projects[0]!;

function card(project = projects[0]!, extra: Record<string, unknown> = {}) {
	const handlers = { ontoggle: vi.fn(), onpicktech: vi.fn(), onopen: vi.fn() };
	renderIn(ProjectCard, { project, number: 3, ...handlers, ...extra });
	return handlers;
}

describe('Icon', () => {
	it('draws the heroicon, size-5 unless told otherwise', () => {
		const { container } = render(Icon, { name: 'sun' });
		const svg = container.querySelector('svg');
		expect(svg).toHaveClass('size-5', 'shrink-0');
		expect(svg).toHaveAttribute('aria-hidden', 'true');
		render(Icon, { name: 'moon', class: 'size-9' });
		expect(document.querySelectorAll('svg')[1]).toHaveClass('size-9');
	});
});

describe('ExternalLink', () => {
	it('names a link of only an icon by its label, with a tooltip', () => {
		renderIn(ExternalLink, {
			href: 'https://example.com/',
			label: 'Example',
			children: createRawSnippet(() => ({ render: () => '<span>★</span>' }))
		});
		const link = screen.getByRole('link', { name: 'Example (opens on another site)' });
		expect(link).toHaveAttribute('title', 'Example');
	});

	it('opens in a new tab and says so to screen readers', () => {
		renderIn(ExternalLink, {
			href: 'https://example.com/',
			children: createRawSnippet(() => ({ render: () => '<span>Example</span>' }))
		});
		const link = screen.getByRole('link', { name: 'Example (opens on another site)' });
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener');
	});
});

describe('ProjectCard', () => {
	it('names its gadget number, start and texts', () => {
		card();
		expect(screen.getByText('Gadget No. 03')).toBeInTheDocument();
		expect(screen.getByText('since Nov 2026')).toBeInTheDocument();
		expect(screen.getAllByRole('link', { name: /Open it/ })[0]).toHaveAttribute(
			'href',
			'https://fionapreroll.github.io/vibe-wormholesurfing/'
		);
	});

	it('asks to fold its details out and in', async () => {
		const { ontoggle } = card();
		await fireEvent.click(screen.getByRole('button', { name: /Show details/ }));
		expect(ontoggle).toHaveBeenCalledWith(true);
		document.body.innerHTML = '';
		const again = card(projects[0], { expanded: true });
		await fireEvent.click(screen.getByRole('button', { name: /Hide details/ }));
		expect(again.ontoggle).toHaveBeenCalledWith(false);
	});

	it('picks a technology and opens screenshots', async () => {
		const { onpicktech, onopen } = card();
		await fireEvent.click(screen.getByRole('button', { name: 'Show the projects with Zod' }));
		expect(onpicktech).toHaveBeenCalledWith('Zod');
		await fireEvent.click(screen.getByRole('button', { name: /Enlarge: What it held/ }));
		expect(onopen).toHaveBeenCalledWith(4);
	});

	it('crops a single screenshot to the frame, unless it asks to be shown whole', () => {
		const hero = () => document.querySelector('article img');
		const frame = () => hero()?.closest('button')?.parentElement;
		card(bySlug('vibe-musicbanana'));
		expect(hero()).toHaveClass('object-cover', 'object-top');
		expect(frame()).toHaveClass('aspect-16/10');
		document.body.innerHTML = '';
		card(bySlug('vibe-portredirect'));
		expect(hero()).toHaveClass('object-cover', 'object-center');
		document.body.innerHTML = '';
		card(bySlug('audioref'));
		expect(hero()).toHaveClass('h-auto', 'w-full');
		expect(hero()).not.toHaveClass('object-cover');
		expect(frame()).not.toHaveClass('aspect-16/10');
	});

	it('offers what runs a project, else where to get it', () => {
		const primary = () => document.querySelector('a.btn-primary');
		card(bySlug('vibe-portredirect'));
		expect(primary()).toHaveTextContent('Releases');
		document.body.innerHTML = '';
		card(bySlug('vibe-musicbanana'));
		expect(primary()).toHaveTextContent('Docker image');
	});

	it('offers only its source when it has nothing else to run or get', () => {
		const project = {
			...projects[0]!,
			links: [{ kind: 'readme' as const, href: 'https://example.com/r' }]
		};
		card(project);
		const buttons = screen.getAllByRole('link').filter((a) => a.classList.contains('btn-primary'));
		expect(buttons).toHaveLength(0);
		expect(screen.getAllByRole('link', { name: /Source/ })).toHaveLength(2);
	});

	it('puts phones side by side', async () => {
		const { onopen } = card(bySlug('vibe-mugames'));
		await fireEvent.click(screen.getByRole('button', { name: 'Enlarge: Nine Men’s Morris' }));
		expect(onopen).toHaveBeenCalledWith(1);
	});
});

describe('Hero', () => {
	it('says she is open to new opportunities, unless she is not', () => {
		renderIn(Hero, {});
		expect(screen.getByText('Open to new opportunities')).toBeInTheDocument();
		expect(screen.getByRole('img', { name: /Fiona’s avatar/ })).toBeInTheDocument();
		document.body.innerHTML = '';
		renderIn(Hero, { openToWork: false });
		expect(screen.queryByText('Open to new opportunities')).not.toBeInTheDocument();
	});
});

describe('SectionHeading', () => {
	it('leaves out an intro it is not given', () => {
		const { container } = render(SectionHeading, { id: 'x', kicker: 'K', title: 'T' });
		expect(screen.getByRole('heading', { name: 'T' })).toHaveAttribute('id', 'x');
		expect(container.querySelectorAll('p')).toHaveLength(1);
	});
});

describe('TechOverview', () => {
	it('picks a technology, and the picked one again to show all', async () => {
		const onpick = vi.fn();
		const { rerender } = renderIn(TechOverview, { selected: null, onpick });
		const playwright = screen.getByRole('button', { name: /^Playwright\b/ });
		expect(playwright).toHaveClass('text-base');
		expect(screen.getByRole('button', { name: /^Svelte\b/ })).toHaveClass('text-sm');
		expect(screen.getByRole('button', { name: /^egui\b/ })).toHaveClass('text-xs');
		await fireEvent.click(playwright);
		expect(onpick).toHaveBeenLastCalledWith('Playwright');
		await rerender({ selected: 'Playwright', onpick });
		expect(playwright).toHaveAttribute('aria-pressed', 'true');
		await fireEvent.click(playwright);
		expect(onpick).toHaveBeenLastCalledWith(null);
	});
});

describe('Contact', () => {
	it('offers email, GitHub and printing', async () => {
		const print = vi.fn();
		vi.stubGlobal('print', print);
		renderIn(Contact, {});
		expect(screen.getByRole('link', { name: /Write an email/ })).toHaveAttribute(
			'href',
			'mailto:fipreroll+app@gmail.com'
		);
		expect(screen.getByRole('link', { name: /GitHub profile/ })).toHaveAttribute(
			'href',
			'https://github.com/FionaPreroll'
		);
		await fireEvent.click(screen.getByRole('button', { name: 'Print or save as PDF' }));
		expect(print).toHaveBeenCalledOnce();
	});
});

describe('Footer', () => {
	it('names the year and links the source', () => {
		renderIn(Footer, {}, 'de');
		expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} Fiona`))).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Quellcode dieser Seite/ })).toHaveAttribute(
			'href',
			'https://github.com/FionaPreroll/fionapreroll.github.io'
		);
		const dashboard = screen.getByRole('link', { name: 'Dashboard' });
		expect(dashboard).toHaveAttribute('href', '/de/dashboard/');
		expect(dashboard).toHaveAttribute('rel', 'nofollow');
	});
});

describe('LanguageSwitch', () => {
	it('leads to the other language and remembers the choice', async () => {
		render(LanguageSwitch, { lang: 'en' });
		const link = screen.getByRole('link', { name: 'Auf Deutsch lesen' });
		expect(link).toHaveAttribute('href', '/de/');
		expect(link).toHaveAttribute('lang', 'de');
		link.addEventListener('click', (event) => event.preventDefault());
		await fireEvent.click(link);
		expect(localStorage.getItem('lang')).toBe('de');
		document.body.innerHTML = '';
		render(LanguageSwitch, { lang: 'de' });
		expect(screen.getByRole('link', { name: 'Read in English' })).toHaveAttribute('href', '/en/');
	});
});

describe('ThemeToggle', () => {
	it('goes through the system’s, light and dark', async () => {
		localStorage.setItem(THEME_KEY, 'light');
		renderIn(ThemeToggle, {});
		const button = screen.getByRole('button', { name: 'Color theme: light. Change it' });
		await fireEvent.click(button);
		expect(button).toHaveAccessibleName('Color theme: dark. Change it');
		expect(document.documentElement).toHaveClass('dark');
		await fireEvent.click(button);
		expect(button).toHaveAccessibleName('Color theme: like the system. Change it');
		expect(localStorage.getItem(THEME_KEY)).toBeNull();
	});

	it('speaks German', () => {
		renderIn(ThemeToggle, {}, 'de');
		expect(
			screen.getByRole('button', { name: 'Farbschema: wie das System. Ändern' })
		).toBeInTheDocument();
		expect(within(document.body).getAllByRole('button')).toHaveLength(1);
	});
});

<script lang="ts">
	import { onMount } from 'svelte';
	import { profile } from '../content/profile.ts';
	import { projects } from '../content/projects.ts';
	import { GROUPS, type Lang } from '../content/types.ts';
	import { createI18n, setI18n } from '../i18n/index.ts';
	import Contact from './Contact.svelte';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Hero from './Hero.svelte';
	import Icon from './Icon.svelte';
	import Lightbox from './Lightbox.svelte';
	import Practices from './Practices.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import TechOverview from './TechOverview.svelte';

	let { lang }: { lang: Lang } = $props();

	const { t } = setI18n(createI18n(() => lang));

	/** Which projects show their details, by slug. */
	let expanded: Record<string, boolean> = $state({});
	/** The technology the projects are filtered by. */
	let tech: string | null = $state(null);
	/** The lightbox: which project's screenshots, and which one. */
	let viewer: { slug: string; index: number } | null = $state(null);

	const visible = $derived(
		tech ? projects.filter((p) => p.stack.includes(tech as string)) : projects
	);
	const groups = $derived(
		GROUPS.map((id) => ({ id, projects: visible.filter((p) => p.group === id) })).filter(
			(group) => group.projects.length > 0
		)
	);
	const viewed = $derived(viewer ? (projects.find((p) => p.slug === viewer?.slug) ?? null) : null);

	/** Its place on the whole page, whatever the filter: Gadget No. 01 stays No. 01. */
	const numberOf = (slug: string) => projects.findIndex((p) => p.slug === slug) + 1;

	function pickTech(name: string | null) {
		tech = tech === name ? null : name;
		document.getElementById('projects')?.scrollIntoView({ block: 'start' });
	}

	/** A link to #<slug> opens that project's details, and shows it whatever the filter. */
	function openFromHash() {
		const slug = decodeURIComponent(location.hash.slice(1));
		if (!projects.some((p) => p.slug === slug)) return;
		expanded[slug] = true;
		if (tech && !visible.some((p) => p.slug === slug)) tech = null;
	}

	onMount(() => {
		openFromHash();
		window.addEventListener('hashchange', openFromHash);
		return () => window.removeEventListener('hashchange', openFromHash);
	});

	// Moving between /en/ and /de/ keeps the page: <html lang> has to follow.
	$effect(() => {
		document.documentElement.lang = lang;
	});

	const url = $derived(lang === 'de' ? `${profile.site}/de/` : `${profile.site}/`);
	// Structured data for search engines: who this is, and where else to find her.
	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: profile.name,
			alternateName: profile.login,
			url,
			image: `${profile.site}/avatar-256.webp`,
			email: `mailto:${profile.email}`,
			sameAs: [profile.github],
			knowsAbout: ['TypeScript', 'Svelte', 'Rust', 'WebRTC', 'WebGL', 'Web Audio']
		}).replaceAll('<', '\\u003c')
	);
	// Split, as the closing tag written out would end this <script> block.
	const jsonLdTag = $derived(`<script type="application/ld+json">${jsonLd}</` + 'script>');
</script>

<svelte:head>
	<title>{t('meta.title')}</title>
	<meta name="description" content={t('meta.description')} />
	<link rel="canonical" href={url} />
	<link rel="alternate" hreflang="en" href="{profile.site}/" />
	<link rel="alternate" hreflang="de" href="{profile.site}/de/" />
	<link rel="alternate" hreflang="x-default" href="{profile.site}/" />
	<meta property="og:type" content="profile" />
	<meta property="og:title" content={t('meta.title')} />
	<meta property="og:description" content={t('meta.description')} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content="{profile.site}/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content={lang === 'de' ? 'de_DE' : 'en_US'} />
	<meta name="twitter:card" content="summary_large_image" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- our own JSON, with < escaped -->
	{@html jsonLdTag}
</svelte:head>

<div class="fixed inset-x-0 top-0 z-50 h-0.5 rainbow print:hidden" aria-hidden="true"></div>
<a
	href="#projects"
	class="sr-only z-50 rounded-full bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
>
	{t('skip')}
</a>

<Header {lang} />

<main>
	<Hero />

	<div class="mx-auto max-w-6xl space-y-28 px-4 sm:px-6 print:space-y-10">
		<section id="projects" class="scroll-mt-20" aria-labelledby="projects-title">
			<SectionHeading
				id="projects-title"
				kicker="01 · {t('nav.projects')}"
				title={t('projects.title')}
				intro={t('projects.intro')}
			/>

			{#if tech}
				<p
					class="mt-8 flex flex-wrap items-center gap-3 rounded-xl bg-accent-soft px-4 py-3 text-sm print:hidden"
					role="status"
				>
					<Icon name="funnel" class="size-4 text-accent" />
					{t('projects.filtered', { n: visible.length, total: projects.length, tech })}
					<button type="button" class="ml-auto btn-secondary py-1" onclick={() => (tech = null)}>
						<Icon name="x-mark" class="size-4" />
						{t('projects.filter.clear')}
					</button>
				</p>
			{/if}

			{#each groups as group (group.id)}
				<section class="mt-16" aria-labelledby="group-{group.id}">
					<div class="flex items-baseline gap-4 border-b border-line pb-3">
						<h3 id="group-{group.id}" class="text-2xl font-semibold">
							{t(`group.${group.id}.title`)}
						</h3>
						<p class="hidden text-sm text-muted sm:block">{t(`group.${group.id}.intro`)}</p>
						<span class="ml-auto label-mono text-muted" aria-hidden="true">
							{String(group.projects.length).padStart(2, '0')}
						</span>
					</div>
					<div class="mt-10 space-y-20 print:space-y-10">
						{#each group.projects as project (project.slug)}
							{@const number = numberOf(project.slug)}
							<ProjectCard
								{project}
								{number}
								flip={number % 2 === 0}
								{tech}
								expanded={expanded[project.slug] ?? false}
								ontoggle={(open) => (expanded[project.slug] = open)}
								onpicktech={pickTech}
								onopen={(index) => (viewer = { slug: project.slug, index })}
							/>
						{/each}
					</div>
				</section>
			{/each}
		</section>

		<Practices />

		<TechOverview selected={tech} onpick={pickTech} />

		<Contact />
	</div>
</main>

<Footer />

<Lightbox
	project={viewed}
	index={viewer?.index ?? 0}
	onindex={(index) => viewer && (viewer = { ...viewer, index })}
	onclose={() => (viewer = null)}
/>

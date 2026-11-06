<script lang="ts">
	import type { LinkKind, Platform, Project, ProjectLink } from '../content/types.ts';
	import { formatMonth, useI18n } from '../i18n/index.ts';
	import ExternalLink from './ExternalLink.svelte';
	import Gallery from './Gallery.svelte';
	import HeroShots from './HeroShots.svelte';
	import Icon from './Icon.svelte';
	import type { IconName } from './icons.ts';

	interface Props {
		project: Project;
		/** Its number on the page: Gadget No. 01 and on. */
		number: number;
		expanded?: boolean;
		/** Opens or closes the details. */
		ontoggle: (open: boolean) => void;
		/** Puts the screenshot on the right, so that cards alternate. */
		flip?: boolean;
		/** The technology the projects are filtered by, if any. */
		tech?: string | null;
		onpicktech: (name: string) => void;
		/** Opens the lightbox at a screenshot, counted over hero and gallery. */
		onopen: (index: number) => void;
	}

	let {
		project,
		number,
		expanded = false,
		ontoggle,
		flip = false,
		tech = null,
		onpicktech,
		onopen
	}: Props = $props();

	const i18n = useI18n();
	const { t, l } = i18n;

	const linkIcon: Record<LinkKind, IconName> = {
		live: 'rocket-launch',
		apk: 'arrow-down-tray',
		releases: 'tag',
		packages: 'cube',
		docker: 'cube-transparent',
		readme: 'book-open',
		docs: 'document-text',
		changelog: 'clock',
		privacy: 'shield-check'
	};

	const platformIcon: Record<Platform, IconName> = {
		web: 'globe-alt',
		pwa: 'arrow-down-on-square',
		android: 'device-phone-mobile',
		linux: 'command-line',
		docker: 'cube-transparent',
		server: 'server-stack'
	};

	const label = (link: ProjectLink) => (link.label ? l(link.label) : t(`link.${link.kind}`));

	const repo = $derived(`https://github.com/FionaPreroll/${project.slug}`);
	const gadget = $derived(t('projects.gadget', { n: String(number).padStart(2, '0') }));
	// The card's own buttons: what runs it, else where to get it.
	const primary = $derived.by(() => {
		const run = project.links.filter((link) => link.kind === 'live' || link.kind === 'apk');
		if (run.length) return run;
		const get = project.links.find((link) => link.kind === 'releases' || link.kind === 'docker');
		return get ? [get] : [];
	});
	const detailsId = $derived(`${project.slug}-details`);
</script>

<article id={project.slug} class="scroll-mt-20" aria-labelledby="{project.slug}-title">
	<div class="grid items-start gap-6 lg:grid-cols-12 lg:gap-10">
		<div class="lg:col-span-7 {flip ? 'lg:order-last' : ''}">
			<HeroShots {project} {onopen} />
		</div>

		<div class="lg:col-span-5">
			<p class="flex flex-wrap items-center gap-x-3 gap-y-1 label-mono text-accent">
				<span>{gadget}</span>
				<span class="text-muted"
					>{t('projects.since', { date: formatMonth(i18n.lang, project.started) })}</span
				>
			</p>
			<h4 id="{project.slug}-title" class="mt-2 text-3xl font-semibold tracking-tight">
				<a href="#{project.slug}" class="group inline-flex items-baseline gap-2 hover:text-accent">
					{project.name}
					<span
						class="text-muted opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100 print:hidden"
					>
						<Icon name="link" class="size-4" />
						<span class="sr-only">{t('projects.permalink', { name: project.name })}</span>
					</span>
				</a>
			</h4>
			<p class="mt-2 text-lg leading-snug">{l(project.tagline)}</p>

			<dl class="mt-5 space-y-4 text-[0.95rem] leading-relaxed">
				<div>
					<dt class="label-mono text-pink">{t('projects.why')}</dt>
					<dd class="mt-1 text-muted">{l(project.motivation)}</dd>
				</div>
				<div>
					<dt class="label-mono text-sky">{t('projects.what')}</dt>
					<dd class="mt-1 text-muted">{l(project.summary)}</dd>
				</div>
			</dl>

			<div class="mt-5 space-y-3">
				<div>
					<h5 class="sr-only">{t('projects.stack')}</h5>
					<ul class="flex flex-wrap gap-1.5" aria-label={t('projects.stack')}>
						{#each project.stack as name (name)}
							<li>
								<button
									type="button"
									class="chip transition hover:text-accent hover:ring-accent/50 {tech === name
										? 'bg-accent text-on-accent ring-accent hover:text-on-accent'
										: 'bg-surface'}"
									aria-pressed={tech === name}
									aria-label={t('projects.filter.by', { tech: name })}
									onclick={() => onpicktech(name)}
								>
									{name}
								</button>
							</li>
						{/each}
					</ul>
				</div>
				<div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted">
					<span class="label-mono">{t('projects.platforms')}</span>
					<ul class="flex flex-wrap gap-x-4 gap-y-1.5" aria-label={t('projects.platforms')}>
						{#each project.platforms as platform (platform)}
							<li class="inline-flex items-center gap-1.5">
								<Icon name={platformIcon[platform]} class="size-4 text-accent" />
								{t(`platform.${platform}`)}
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<div class="mt-6 flex flex-wrap items-center gap-2 print:hidden">
				{#each primary as link, i (link.href)}
					<ExternalLink href={link.href} class={i === 0 ? 'btn-primary' : 'btn-secondary'}>
						<Icon name={linkIcon[link.kind]} class="size-4" />
						{label(link)}
					</ExternalLink>
				{/each}
				<ExternalLink href={repo} class="btn-secondary">
					<Icon name="code-bracket" class="size-4" />
					{t('projects.source')}
				</ExternalLink>
				<button
					type="button"
					class="btn-ghost"
					aria-expanded={expanded}
					aria-controls={detailsId}
					onclick={() => ontoggle(!expanded)}
				>
					{expanded ? t('projects.details.hide') : t('projects.details.show')}
					<Icon
						name="chevron-down"
						class="size-4 transition-transform duration-300 {expanded ? 'rotate-180' : ''}"
					/>
				</button>
			</div>
		</div>
	</div>

	<!-- Always in the page, for search engines and printing; folded away with a grid row. -->
	<div
		id={detailsId}
		class="print-open grid transition-[grid-template-rows,visibility] duration-500 ease-out print:visible {expanded
			? 'visible'
			: 'invisible'}"
		style:grid-template-rows={expanded ? '1fr' : '0fr'}
		inert={!expanded}
		data-expanded={expanded}
	>
		<div class="min-h-0 overflow-hidden">
			<div
				class="mt-8 grid gap-10 border-t border-dashed border-line pt-8 lg:grid-cols-12 print:mt-4 print:pt-4"
			>
				<section class="lg:col-span-7 print:hidden">
					<h5 class="mb-3 label-mono text-muted">{t('projects.gallery')}</h5>
					<Gallery {project} {onopen} />
				</section>
				<div class="space-y-7 lg:col-span-5 print:lg:col-span-12">
					<section>
						<h5 class="label-mono text-muted">{t('projects.features')}</h5>
						<ul class="mt-2 space-y-1.5 text-[0.95rem] leading-relaxed">
							{#each project.features as item (item.en)}
								<li class="relative pl-5">
									<span
										class="absolute top-[0.6em] left-0 size-1.5 rounded-full bg-pink"
										aria-hidden="true"
									></span>
									{l(item)}
								</li>
							{/each}
						</ul>
					</section>
					<section>
						<h5 class="label-mono text-muted">{t('projects.engineering')}</h5>
						<ul class="mt-2 space-y-1.5 text-[0.95rem] leading-relaxed">
							{#each project.engineering as item (item.en)}
								<li class="relative pl-5">
									<span
										class="absolute top-[0.6em] left-0 size-1.5 rounded-full bg-sky"
										aria-hidden="true"
									></span>
									{l(item)}
								</li>
							{/each}
						</ul>
					</section>
					<section class="print-url">
						<h5 class="label-mono text-muted">{t('projects.links')}</h5>
						<ul class="mt-2 grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-2 print:grid-cols-1">
							{#each project.links as link (link.href)}
								<li>
									<ExternalLink
										href={link.href}
										class="inline-flex items-center gap-2 text-ink hover:text-accent"
									>
										<Icon name={linkIcon[link.kind]} class="size-4 text-muted" />
										{label(link)}
									</ExternalLink>
								</li>
							{/each}
							<li>
								<ExternalLink
									href={repo}
									class="inline-flex items-center gap-2 text-ink hover:text-accent"
								>
									<Icon name="code-bracket" class="size-4 text-muted" />
									{t('projects.source')}
								</ExternalLink>
							</li>
						</ul>
					</section>
				</div>
			</div>
		</div>
	</div>
</article>

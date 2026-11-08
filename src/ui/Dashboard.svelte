<script lang="ts">
	import { dashboard, type DashboardGroup } from '../content/dashboard.ts';
	import type { Lang } from '../content/types.ts';
	import { createI18n, setI18n } from '../i18n/index.ts';
	import { pathOf } from '../lib/language.ts';
	import ExternalLink from './ExternalLink.svelte';
	import Icon from './Icon.svelte';
	import type { IconName } from './icons.ts';
	import LanguageSwitch from './LanguageSwitch.svelte';
	import { linkIcon } from './linkIcons.ts';
	import ThemeToggle from './ThemeToggle.svelte';

	// The dashboard: every deployment and repository in one compact list, for Fiona herself. Only
	// a small link in the homepage's footer leads here, and search engines are asked to skip it.

	interface Props {
		lang: Lang;
		/** The rows to show: those of src/content/dashboard.ts unless given. */
		groups?: DashboardGroup[];
	}

	let { lang, groups = dashboard }: Props = $props();

	const { t, l } = setI18n(createI18n(() => lang));

	$effect(() => {
		document.documentElement.lang = lang;
	});

	const count = $derived(groups.reduce((sum, group) => sum + group.repos.length, 0));

	const title = (id: DashboardGroup['id']) =>
		id === 'site' ? t('dashboard.group.site') : t(`group.${id}.title`);

	const iconLink = 'btn-ghost size-8 px-0 text-muted hover:text-accent';
</script>

<svelte:head>
	<title>{t('dashboard.meta.title')}</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="fixed inset-x-0 top-0 z-50 h-0.5 rainbow" aria-hidden="true"></div>

<header class="sticky top-0 z-40 border-b border-line/70 bg-paper/80 backdrop-blur-md">
	<div class="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4 sm:px-6">
		<a
			href={pathOf(lang)}
			class="mr-auto inline-flex items-center gap-2 font-serif text-xl font-semibold"
			aria-label={t('dashboard.back')}
			title={t('dashboard.back')}
		>
			<Icon name="arrow-left" class="size-4 text-muted" />
			<span>Fiona<span class="text-pink">.</span></span>
		</a>
		<LanguageSwitch {lang} page="dashboard/" />
		<ThemeToggle />
	</div>
</header>

<main class="relative isolate mx-auto max-w-5xl px-4 pt-10 pb-20 sm:px-6">
	<div
		class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 graph-paper"
		aria-hidden="true"
	></div>
	<p class="flex items-center gap-3 label-mono text-accent">
		<span class="h-px w-6 rainbow" aria-hidden="true"></span>
		{t('dashboard.kicker', { n: count })}
	</p>
	<h1 class="mt-2 text-3xl font-semibold tracking-tight">{t('dashboard.title')}</h1>
	<p class="mt-2 text-muted">{t('dashboard.intro')}</p>

	{#each groups as group (group.id)}
		<section class="mt-10" aria-labelledby="dash-{group.id}">
			<h2
				id="dash-{group.id}"
				class="flex items-baseline border-b border-line pb-2 label-mono font-sans text-muted"
			>
				{title(group.id)}
				<span class="ml-auto" aria-hidden="true">{String(group.repos.length).padStart(2, '0')}</span
				>
			</h2>
			<ul class="divide-y divide-line">
				{#each group.repos as repo (repo.slug)}
					{@const links: { href: string; icon: IconName; label: string }[] = [
						...(repo.live
							? [{ href: repo.live, icon: 'rocket-launch' as const, label: t('dashboard.live', { name: repo.name }) }]
							: []),
						{ href: repo.repo, icon: 'code-bracket', label: t('dashboard.repo', { name: repo.name }) },
						{ href: repo.actions, icon: 'play', label: t('dashboard.actions', { name: repo.name }) },
						{ href: repo.issues, icon: 'exclamation-circle', label: t('dashboard.issues', { name: repo.name }) },
						{ href: repo.pulls, icon: 'arrows-right-left', label: t('dashboard.pulls', { name: repo.name }) }
					]}
					<li
						class="grid gap-x-6 gap-y-2 py-3 lg:grid-cols-[minmax(0,1fr)_auto_21.5rem] lg:items-center"
						data-repo={repo.slug}
					>
						<p class="min-w-0 truncate">
							<span class="font-medium">{repo.name}</span>
							<span class="ml-2 font-mono text-xs text-muted">{repo.slug}</span>
						</p>
						<!--
							The badges keep their width: the column grows with them, and they wrap on small screens.
							Coverage gets a slot as wide as Codecov's widest badge, so that the gap between the
							badges lines up from row to row, whatever the percentage.
						-->
						<p class="flex flex-wrap items-center gap-2 lg:justify-end">
							<ExternalLink
								href={repo.ci.page}
								label={t('dashboard.ci', { name: repo.name })}
								class="inline-flex shrink-0"
							>
								<img src={repo.ci.badge} alt="" height="20" class="h-5 w-auto" loading="lazy" />
							</ExternalLink>
							<span class="flex min-w-32 shrink-0">
								{#if repo.coverage}
									<ExternalLink
										href={repo.coverage.page}
										label={t('dashboard.coverage', { name: repo.name })}
										class="inline-flex shrink-0"
									>
										<img
											src={repo.coverage.badge}
											alt=""
											height="20"
											class="h-5 w-auto"
											loading="lazy"
										/>
									</ExternalLink>
								{:else}
									<span class="font-mono text-xs text-muted">{t('dashboard.nocoverage')}</span>
								{/if}
							</span>
						</p>
						<ul class="-ml-2 flex flex-wrap items-center">
							{#if !repo.live}
								<!-- Keeps the other links in line with the rows that have a deployment. -->
								<li class="hidden size-8 lg:block" aria-hidden="true"></li>
							{/if}
							{#each links as link (link.href)}
								<li>
									<ExternalLink href={link.href} label={link.label} class={iconLink}>
										<Icon name={link.icon} class="size-4.5" />
									</ExternalLink>
								</li>
							{/each}
							{#if repo.downloads.length}
								<li class="mx-1 h-5 w-px bg-line" aria-hidden="true"></li>
								{#each repo.downloads as link (link.href)}
									<li>
										<ExternalLink
											href={link.href}
											label={t('dashboard.download', {
												name: repo.name,
												label: link.label ? l(link.label) : t(`link.${link.kind}`)
											})}
											class={iconLink}
										>
											<Icon name={linkIcon[link.kind]} class="size-4.5" />
										</ExternalLink>
									</li>
								{/each}
							{/if}
						</ul>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</main>

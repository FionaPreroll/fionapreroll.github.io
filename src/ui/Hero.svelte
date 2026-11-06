<script lang="ts">
	import { profile } from '../content/profile.ts';
	import { projects } from '../content/projects.ts';
	import { useI18n } from '../i18n/index.ts';
	import Icon from './Icon.svelte';
	import Satellite from './Satellite.svelte';

	/** Shows the "Open to new opportunities" badge; profile.ts decides it for the page. */
	let { openToWork = profile.openToWork }: { openToWork?: boolean } = $props();

	const { t } = useI18n();

	const facts = $derived([
		{ label: t('hero.fact.projects'), value: String(projects.length) },
		{ label: t('hero.fact.code'), value: t('hero.fact.code.value') },
		{ label: t('hero.fact.platforms'), value: t('hero.fact.platforms.value') },
		{ label: t('hero.fact.i18n'), value: t('hero.fact.i18n.value') }
	]);
</script>

<section
	id="top"
	class="relative isolate scroll-mt-20 overflow-hidden"
	aria-labelledby="hero-title"
>
	<div
		class="pointer-events-none absolute inset-0 -z-10 graph-paper print:hidden"
		aria-hidden="true"
	></div>
	<div class="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 sm:pt-24 sm:pb-20 print:pt-0 print:pb-6">
		<div class="flex flex-col-reverse gap-10 md:flex-row md:items-center md:justify-between">
			<div class="max-w-2xl">
				{#if openToWork}
					<p
						class="mb-6 inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-sm text-muted ring-1 ring-line"
					>
						<span class="relative flex size-2" aria-hidden="true">
							<span
								class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60"
							></span>
							<span class="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
						</span>
						{t('hero.open')}
					</p>
				{/if}
				<p class="font-serif text-xl text-muted sm:text-2xl">{t('hero.hello')}</p>
				<h1
					id="hero-title"
					class="mt-2 text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl"
				>
					{t('hero.title')}
				</h1>
				<p class="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t('hero.intro')}</p>
				<div class="mt-8 flex flex-wrap gap-3 print:hidden">
					<a href="#projects" class="btn-primary px-5 py-2.5">
						{t('hero.cta.projects')}
						<Icon name="chevron-down" class="size-4" />
					</a>
					<a href="#contact" class="btn-secondary px-5 py-2.5">
						<Icon name="envelope" class="size-4" />
						{t('hero.cta.contact')}
					</a>
				</div>
				<p class="mt-10 flex items-center gap-3 label-mono text-muted">
					<Satellite class="h-3.5 w-7" />
					{profile.lab} · {profile.orbit}
				</p>
			</div>

			<div class="relative size-40 shrink-0 self-center sm:size-56 md:mr-6 print:size-28">
				<svg class="absolute inset-0 text-accent/40" viewBox="0 0 200 200" aria-hidden="true">
					<circle
						cx="100"
						cy="100"
						r="97"
						fill="none"
						stroke="currentColor"
						stroke-width="1.2"
						stroke-dasharray="1 7"
						stroke-linecap="round"
					/>
				</svg>
				<img
					src="/avatar-256.webp"
					srcset="/avatar-128.webp 128w, /avatar-256.webp 256w"
					sizes="(min-width: 640px) 176px, 128px"
					width="256"
					height="256"
					alt={t('hero.avatar')}
					class="absolute inset-[11%] size-[78%] rounded-full bg-shot shadow-xl ring-4 shadow-accent/15 ring-surface"
				/>
				<div class="absolute inset-0 animate-orbit print:hidden" aria-hidden="true">
					<Satellite class="absolute top-0 left-1/2 h-4 w-8 -translate-x-1/2 -translate-y-1/2" />
				</div>
			</div>
		</div>

		<dl
			class="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line lg:grid-cols-4 print:mt-6"
			aria-label={t('hero.facts')}
		>
			{#each facts as fact (fact.label)}
				<div class="bg-surface px-4 py-4 sm:px-5">
					<dt class="label-mono text-muted">{fact.label}</dt>
					<dd class="mt-1.5 font-medium">{fact.value}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

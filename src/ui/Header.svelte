<script lang="ts">
	import type { Lang } from '../content/types.ts';
	import { useI18n } from '../i18n/index.ts';
	import LanguageSwitch from './LanguageSwitch.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let { lang }: { lang: Lang } = $props();

	const { t } = useI18n();

	const sections = [
		{ id: 'projects', key: 'nav.projects' },
		{ id: 'practices', key: 'nav.practices' },
		{ id: 'tech', key: 'nav.tech' },
		{ id: 'contact', key: 'nav.contact' }
	] as const;
</script>

<header class="sticky top-0 z-40 border-b border-line/70 bg-paper/80 backdrop-blur-md print:hidden">
	<div class="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:px-6">
		<a href="#top" class="mr-auto font-serif text-xl font-semibold" aria-label={t('nav.home')}>
			Fiona<span class="text-pink">.</span>
		</a>
		<nav aria-label={t('nav.label')} class="hidden md:block">
			<ul class="flex items-center gap-1">
				{#each sections as section (section.id)}
					<li>
						<a href="#{section.id}" class="btn-ghost px-3">{t(section.key)}</a>
					</li>
				{/each}
			</ul>
		</nav>
		<span class="mx-1 hidden h-5 w-px bg-line md:block" aria-hidden="true"></span>
		<LanguageSwitch {lang} />
		<ThemeToggle />
	</div>
</header>

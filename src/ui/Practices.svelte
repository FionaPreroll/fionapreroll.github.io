<script lang="ts">
	import { practices } from '../content/practices.ts';
	import { projects } from '../content/projects.ts';
	import { useI18n } from '../i18n/index.ts';
	import Icon from './Icon.svelte';
	import SectionHeading from './SectionHeading.svelte';

	const { t, l } = useI18n();

	const names = new Map(projects.map((project) => [project.slug, project.name]));
</script>

<section id="practices" class="scroll-mt-20" aria-labelledby="practices-title">
	<SectionHeading
		id="practices-title"
		kicker="02 · {t('nav.practices')}"
		title={t('practices.title')}
		intro={t('practices.intro')}
	/>
	<ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each practices as practice (practice.id)}
			<li class="print-avoid rounded-2xl bg-surface p-6 ring-1 ring-line">
				<span
					class="inline-flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent"
				>
					<Icon name={practice.icon} class="size-5" />
				</span>
				<h3 class="mt-4 text-xl font-semibold">{l(practice.title)}</h3>
				<p class="mt-2 text-[0.95rem] leading-relaxed text-muted">{l(practice.body)}</p>
				<p class="mt-4 text-sm">
					<span class="mr-1 label-mono text-muted">{t('practices.seenIn')}</span>
					{#each practice.seenIn as slug (slug)}
						<a
							href="#{slug}"
							class="text-accent not-last:after:mx-1.5 not-last:after:text-muted not-last:after:content-['·'] hover:underline"
							>{names.get(slug)}</a
						>
					{/each}
				</p>
			</li>
		{/each}
	</ul>
</section>

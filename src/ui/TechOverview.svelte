<script lang="ts">
	import { projects } from '../content/projects.ts';
	import { techCounts } from '../content/tech.ts';
	import { useI18n } from '../i18n/index.ts';
	import SectionHeading from './SectionHeading.svelte';

	interface Props {
		/** The technology the projects are filtered by, if any. */
		selected: string | null;
		/** Picks a technology, or null to show every project again. */
		onpick: (name: string | null) => void;
	}

	let { selected, onpick }: Props = $props();

	const { t } = useI18n();

	const counts = techCounts(projects);
	const most = Math.max(...counts.map((c) => c.count));

	// The more projects use it, the larger it is: a quiet tag cloud.
	function size(count: number): string {
		const share = count / most;
		if (share > 0.75) return 'text-base px-3.5 py-1.5';
		if (share > 0.35) return 'text-sm px-3 py-1.5';
		return 'text-xs px-2.5 py-1';
	}
</script>

<section id="tech" class="scroll-mt-20" aria-labelledby="tech-title">
	<SectionHeading
		id="tech-title"
		kicker="03 · {t('nav.tech')}"
		title={t('tech.title')}
		intro={t('tech.intro')}
	/>
	<ul class="mt-8 flex flex-wrap gap-2">
		{#each counts as { name, count } (name)}
			<li>
				<button
					type="button"
					class="chip transition {size(count)} {selected === name
						? 'bg-accent text-on-accent ring-accent'
						: 'bg-surface hover:text-accent hover:ring-accent/50'}"
					aria-pressed={selected === name}
					onclick={() => onpick(selected === name ? null : name)}
				>
					{name}
					<span class="font-mono text-[0.7em] opacity-70" aria-hidden="true">{count}</span>
					<span class="sr-only">, {t('tech.count', { n: count })}</span>
				</button>
			</li>
		{/each}
	</ul>
</section>

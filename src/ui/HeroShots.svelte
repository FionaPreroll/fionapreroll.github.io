<script lang="ts">
	import { picture } from '../content/shots.ts';
	import type { Project } from '../content/types.ts';
	import { useI18n } from '../i18n/index.ts';

	interface Props {
		project: Project;
		/** Opens the lightbox at a screenshot, counted over hero and gallery. */
		onopen: (index: number) => void;
	}

	let { project, onopen }: Props = $props();

	const { t, l } = useI18n();

	const shots = $derived(project.hero.map((shot) => ({ shot, pic: picture(project.slug, shot) })));
	// Several pictures are phones held upright: they stand side by side like polaroids.
	const phones = $derived(shots.length > 1);
	const tilt = ['-rotate-3 translate-y-3', '-translate-y-2 z-10', 'rotate-3 translate-y-3'];
</script>

<div
	class="relative aspect-16/10 overflow-hidden rounded-2xl bg-shot ring-1 ring-line print:max-w-[65%]"
>
	{#if phones}
		<div
			class="absolute inset-0 bg-linear-to-br from-accent-soft via-paper to-pink-soft"
			aria-hidden="true"
		></div>
		<div class="absolute inset-0 graph-paper opacity-70" aria-hidden="true"></div>
		<div class="relative flex h-full items-center justify-center gap-[4%] px-[6%] py-[5%]">
			{#each shots as { shot, pic }, i (shot.file)}
				<button
					type="button"
					class="h-full shrink-0 transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 {tilt[
						i % tilt.length
					]}"
					aria-label={t('gallery.open', { caption: l(shot.caption) })}
					onclick={() => onopen(i)}
				>
					<img
						src={pic.src}
						srcset={pic.srcset}
						sizes="(min-width: 1024px) 200px, 28vw"
						width={pic.width}
						height={pic.height}
						alt={l(shot.caption)}
						loading="lazy"
						decoding="async"
						class="h-full w-auto rounded-xl bg-surface shadow-lg ring-1 shadow-ink/15 ring-ink/10"
					/>
				</button>
			{/each}
		</div>
	{:else}
		{#each shots as { shot, pic }, i (shot.file)}
			<button
				type="button"
				class="group block size-full"
				aria-label={t('gallery.open', { caption: l(shot.caption) })}
				onclick={() => onopen(i)}
			>
				<img
					src={pic.src}
					srcset={pic.srcset}
					sizes="(min-width: 1024px) 640px, 100vw"
					width={pic.width}
					height={pic.height}
					alt={l(shot.caption)}
					loading="lazy"
					decoding="async"
					class="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02] {shot.focus ===
					'top'
						? 'object-top'
						: 'object-center'}"
				/>
			</button>
		{/each}
	{/if}
</div>

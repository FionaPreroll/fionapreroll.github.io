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

	const shots = $derived(
		project.gallery.map((shot) => ({ shot, pic: picture(project.slug, shot) }))
	);
</script>

<ul class="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3">
	{#each shots as { shot, pic }, i (shot.file)}
		<li>
			<figure>
				<button
					type="button"
					class="group block aspect-4/3 w-full overflow-hidden rounded-lg bg-shot ring-1 ring-line transition hover:ring-accent/60"
					aria-label={t('gallery.open', { caption: l(shot.caption) })}
					onclick={() => onopen(project.hero.length + i)}
				>
					<img
						src={pic.src}
						srcset={pic.srcset}
						sizes="(min-width: 1024px) 200px, 45vw"
						width={pic.width}
						height={pic.height}
						alt=""
						loading="lazy"
						decoding="async"
						class="size-full transition-transform duration-500 group-hover:scale-[1.04] {pic.portrait
							? 'object-contain p-1.5'
							: 'object-cover object-top'}"
					/>
				</button>
				<figcaption class="mt-1.5 text-xs leading-snug text-muted">{l(shot.caption)}</figcaption>
			</figure>
		</li>
	{/each}
</ul>

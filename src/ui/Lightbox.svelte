<script lang="ts">
	import { picture } from '../content/shots.ts';
	import type { Project } from '../content/types.ts';
	import { useI18n } from '../i18n/index.ts';
	import Icon from './Icon.svelte';

	interface Props {
		/** The project whose screenshots are shown, or null while the lightbox is closed. */
		project: Project | null;
		/** The screenshot shown, counted over hero and gallery. */
		index: number;
		onindex: (index: number) => void;
		onclose: () => void;
	}

	let { project, index, onindex, onclose }: Props = $props();

	const { t, l } = useI18n();

	let dialog: HTMLDialogElement;
	let swipeFrom: number | null = null;

	const shots = $derived(project ? [...project.hero, ...project.gallery] : []);
	const shot = $derived(shots[index]);
	const pic = $derived(project && shot ? picture(project.slug, shot) : null);

	$effect(() => {
		if (project && !dialog.open) dialog.showModal();
		else if (!project && dialog.open) dialog.close();
	});

	function step(by: number) {
		onindex((index + by + shots.length) % shots.length);
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') step(-1);
		else if (event.key === 'ArrowRight') step(1);
		else return;
		event.preventDefault();
	}

	// A click on the backdrop lands on the dialog itself, outside its content.
	function onclick(event: MouseEvent) {
		if (event.target === dialog) dialog.close();
	}

	function onpointerdown(event: PointerEvent) {
		swipeFrom = event.clientX;
	}

	function onpointerup(event: PointerEvent) {
		if (swipeFrom === null) return;
		const distance = event.clientX - swipeFrom;
		swipeFrom = null;
		if (Math.abs(distance) > 50) step(distance < 0 ? 1 : -1);
	}
</script>

<dialog
	bind:this={dialog}
	aria-label={project ? t('lightbox.label', { name: project.name }) : undefined}
	class="m-auto max-h-none max-w-none bg-transparent p-0 text-ink backdrop:bg-[#0b0910]/85 backdrop:backdrop-blur-sm"
	{onclose}
	{onkeydown}
	{onclick}
>
	{#if project && shot && pic}
		<div class="flex h-dvh w-screen flex-col items-center justify-center gap-3 p-3 sm:p-6">
			<figure
				class="flex min-h-0 w-full max-w-6xl flex-1 flex-col items-center justify-center gap-3"
				{onpointerdown}
				{onpointerup}
			>
				<img
					src={pic.src}
					srcset={pic.srcset}
					sizes="90vw"
					width={pic.width}
					height={pic.height}
					alt={l(shot.caption)}
					class="max-h-full min-h-0 max-w-full rounded-lg bg-surface object-contain shadow-2xl"
				/>
				<figcaption class="max-w-2xl text-center text-sm text-white/85">
					<span class="font-medium text-white">{project.name}</span>
					· {l(shot.caption)}
					<span class="ml-2 font-mono text-xs text-white/60">
						{t('lightbox.count', { i: index + 1, n: shots.length })}
					</span>
				</figcaption>
			</figure>
			<div class="flex items-center gap-2">
				<button
					type="button"
					class="btn size-11 bg-white/10 px-0 text-white hover:bg-white/20"
					aria-label={t('lightbox.prev')}
					onclick={() => step(-1)}
				>
					<Icon name="chevron-left" />
				</button>
				<button
					type="button"
					class="btn size-11 bg-white/10 px-0 text-white hover:bg-white/20"
					aria-label={t('lightbox.next')}
					onclick={() => step(1)}
				>
					<Icon name="chevron-right" />
				</button>
				<button
					type="button"
					class="ml-4 btn size-11 bg-white/10 px-0 text-white hover:bg-white/20"
					aria-label={t('lightbox.close')}
					onclick={() => dialog.close()}
				>
					<Icon name="x-mark" />
				</button>
			</div>
		</div>
	{/if}
</dialog>

<script lang="ts" module>
	import type { Project } from '../content/types.ts';

	/** What the lightbox shows: a project's screenshot, counted over hero and gallery. */
	export interface Viewer {
		project: Project;
		index: number;
	}
</script>

<script lang="ts">
	import { picture } from '../content/shots.ts';
	import type { Shot } from '../content/types.ts';
	import { useI18n } from '../i18n/index.ts';
	import Icon from './Icon.svelte';

	interface Props {
		/** The screenshot shown, or null while the lightbox is closed. */
		viewer: Viewer | null;
		onindex: (index: number) => void;
		/** The dialog closed: by its button, its backdrop or Escape. */
		onclose: () => void;
	}

	let { viewer, onindex, onclose }: Props = $props();

	const { t, l } = useI18n();

	let dialog: HTMLDialogElement;
	let swipeFrom: number | null = null;

	const view = $derived.by(() => {
		if (!viewer) return null;
		const shots = [...viewer.project.hero, ...viewer.project.gallery];
		const shot = shots[viewer.index] as Shot;
		return { ...viewer, count: shots.length, shot, pic: picture(viewer.project.slug, shot) };
	});

	// It opens when given a screenshot; it closes itself, and then says so with onclose.
	$effect(() => {
		if (view && !dialog.open) dialog.showModal();
	});

	/** The screenshot `by` places on, round at the ends; called only while one shows. */
	function step(by: number) {
		const { index, count } = view!;
		onindex((index + by + count) % count);
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
	aria-label={view ? t('lightbox.label', { name: view.project.name }) : undefined}
	class="m-auto max-h-none max-w-none bg-transparent p-0 text-ink backdrop:bg-[#0b0910]/85 backdrop:backdrop-blur-sm"
	{onclose}
	{onkeydown}
	{onclick}
>
	{#if view}
		<div class="flex h-dvh w-screen flex-col items-center justify-center gap-3 p-3 sm:p-6">
			<figure
				class="flex min-h-0 w-full max-w-6xl flex-1 flex-col items-center justify-center gap-3"
				{onpointerdown}
				{onpointerup}
			>
				<img
					src={view.pic.src}
					srcset={view.pic.srcset}
					sizes="90vw"
					width={view.pic.width}
					height={view.pic.height}
					alt={l(view.shot.caption)}
					class="max-h-full min-h-0 max-w-full rounded-lg bg-surface object-contain shadow-2xl"
				/>
				<figcaption
					class="max-w-2xl rounded-2xl bg-[#0b0910]/80 px-4 py-1.5 text-center text-sm text-white/90"
				>
					<span class="font-medium text-white">{view.project.name}</span>
					· {l(view.shot.caption)}
					<span class="ml-2 font-mono text-xs text-white/75">
						{t('lightbox.count', { i: view.index + 1, n: view.count })}
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

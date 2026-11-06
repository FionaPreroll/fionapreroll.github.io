<script lang="ts">
	interface Props {
		id: string;
		/** The little label above, in the lab notebook's mono type. */
		kicker: string;
		title: string;
		intro?: string;
	}

	let { id, kicker, title, intro }: Props = $props();
</script>

<header class="max-w-2xl">
	<p class="flex items-center gap-3 label-mono text-accent">
		<span class="h-px w-6 rainbow" aria-hidden="true"></span>
		{kicker}
	</p>
	<h2 {id} class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
	{#if intro}
		<p class="mt-4 text-lg leading-relaxed text-muted">{intro}</p>
	{/if}
</header>

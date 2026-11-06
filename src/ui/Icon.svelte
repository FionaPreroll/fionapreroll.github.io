<script lang="ts">
	import { icons, type IconName } from './icons.ts';

	interface Props {
		name: IconName;
		/** Classes for the <svg>, such as its size: size-5 unless given. */
		class?: string;
	}

	let { name, class: className = 'size-5' }: Props = $props();

	// The SVGs come from the heroicons package, are hidden from screen readers already
	// (aria-hidden) and draw in currentColor.
	const svg = $derived(
		icons[name].replace('<svg ', `<svg class="${className} shrink-0" focusable="false" `)
	);
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -- the package's own SVG, not user input -->
{@html svg}

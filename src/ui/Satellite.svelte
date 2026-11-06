<script lang="ts">
	let { class: className = 'h-4 w-8' }: { class?: string } = $props();
</script>

<!-- A little satellite: two solar panels and a body, in the page's accents. -->
<svg viewBox="0 0 32 16" class={className} aria-hidden="true" focusable="false">
	<g class="text-sky" fill="currentColor">
		<rect x="0.5" y="4" width="10" height="8" rx="1" opacity="0.85" />
		<rect x="21.5" y="4" width="10" height="8" rx="1" opacity="0.85" />
	</g>
	<g stroke="var(--color-paper)" stroke-width="0.8" opacity="0.7">
		<path d="M3.8 4v8M7.2 4v8M24.8 4v8M28.2 4v8M0.5 8h10M21.5 8h10" />
	</g>
	<path d="M10.5 8h11" stroke="currentColor" stroke-width="1.2" class="text-muted" />
	<circle cx="16" cy="8" r="4.2" class="text-pink" fill="currentColor" />
	<circle cx="14.6" cy="6.6" r="1.2" fill="var(--color-paper)" opacity="0.8" />
</svg>

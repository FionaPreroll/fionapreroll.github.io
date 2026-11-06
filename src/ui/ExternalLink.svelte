<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useI18n } from '../i18n/index.ts';

	interface Props {
		href: string;
		class?: string;
		children: Snippet;
	}

	let { href, class: className = '', children }: Props = $props();

	const { t } = useI18n();
</script>

<!-- Opens in a new tab, so that the portfolio stays open; screen readers are told. -->
<a {href} class={className} target="_blank" rel="noopener">
	{@render children()}<span class="sr-only"> {t('link.external')}</span>
</a>

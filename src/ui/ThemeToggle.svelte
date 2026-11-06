<script lang="ts">
	import { onMount } from 'svelte';
	import { useI18n } from '../i18n/index.ts';
	import { Theme, type ThemeChoice } from '../lib/theme.svelte.ts';
	import Icon from './Icon.svelte';
	import type { IconName } from './icons.ts';

	let { theme = new Theme() }: { theme?: Theme } = $props();

	const { t } = useI18n();

	const icon: Record<ThemeChoice, IconName> = {
		system: 'computer-desktop',
		light: 'sun',
		dark: 'moon'
	};

	onMount(() => theme.start());

	const label = $derived(t('theme.label', { mode: t(`theme.${theme.choice}`) }));
</script>

<button
	type="button"
	class="btn-ghost size-9 px-0"
	aria-label={label}
	title={label}
	onclick={() => theme.cycle()}
>
	<Icon name={icon[theme.choice]} class="size-5" />
</button>

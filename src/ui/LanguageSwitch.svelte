<script lang="ts">
	import type { Lang } from '../content/types.ts';
	import { translate } from '../i18n/index.ts';
	import { otherLang, pathOf, rememberLang } from '../lib/language.ts';
	import Icon from './Icon.svelte';

	interface Props {
		lang: Lang;
		/** The page after the language, such as dashboard/: the switch leads to the same page. */
		page?: string;
	}

	let { lang, page = '' }: Props = $props();

	const other = $derived(otherLang(lang));
</script>

<!-- In the other language, so that it reads right to whoever is looking for it. -->
<a
	href={pathOf(other, page)}
	hreflang={other}
	lang={other}
	data-sveltekit-noscroll
	aria-label={translate(lang, 'lang.switch')}
	title={translate(lang, 'lang.switch')}
	class="btn-ghost px-3 font-mono text-xs tracking-widest"
	onclick={() => rememberLang(other)}
>
	<Icon name="language" class="size-4" />
	{other.toUpperCase()}
</a>

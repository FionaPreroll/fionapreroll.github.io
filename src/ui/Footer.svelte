<script lang="ts">
	import { profile } from '../content/profile.ts';
	import { useI18n } from '../i18n/index.ts';
	import ExternalLink from './ExternalLink.svelte';
	import Icon from './Icon.svelte';

	const { t } = useI18n();

	const year = new Date().getFullYear();
</script>

<footer class="mt-24 border-t border-line print:mt-8">
	<div
		class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6"
	>
		<p>© {year} {profile.name} · {t('footer.built')}</p>
		<p class="flex gap-5 print:hidden">
			<ExternalLink href={profile.source} class="hover:text-accent"
				>{t('footer.source')}</ExternalLink
			>
			<a href="#top" class="inline-flex items-center gap-1 hover:text-accent">
				{t('footer.top')}
				<Icon name="arrow-up" class="size-3.5" />
			</a>
		</p>
	</div>
</footer>

<script lang="ts">
	import { profile } from '../content/profile.ts';
	import { useI18n } from '../i18n/index.ts';
	import ExternalLink from './ExternalLink.svelte';
	import Icon from './Icon.svelte';
	import Satellite from './Satellite.svelte';

	const { t } = useI18n();
</script>

<section id="contact" class="scroll-mt-20" aria-labelledby="contact-title">
	<div
		class="print-avoid relative isolate overflow-hidden rounded-3xl bg-surface px-6 py-12 ring-1 ring-line sm:px-12 sm:py-16"
	>
		<div class="absolute inset-0 -z-10 graph-paper print:hidden" aria-hidden="true"></div>
		<Satellite class="absolute top-8 right-8 h-6 w-12 rotate-12 opacity-80 print:hidden" />
		<p class="flex items-center gap-3 label-mono text-accent">
			<span class="h-px w-6 rainbow" aria-hidden="true"></span>
			04 · {t('nav.contact')}
		</p>
		<h2 id="contact-title" class="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
			{t('contact.title')}
		</h2>
		<p class="mt-4 max-w-xl text-lg leading-relaxed text-muted">{t('contact.body')}</p>
		<ul class="mt-8 flex flex-wrap gap-3">
			<li>
				<a href="mailto:{profile.email}" class="btn-primary px-5 py-2.5">
					<Icon name="envelope" class="size-4" />
					<span class="sr-only">{t('contact.email')}:</span>
					{profile.email}
				</a>
			</li>
			<li>
				<ExternalLink href={profile.github} class="btn-secondary px-5 py-2.5">
					<Icon name="code-bracket" class="size-4" />
					<span class="sr-only">{t('contact.github')}:</span>
					github.com/{profile.login}
				</ExternalLink>
			</li>
			<li class="print:hidden">
				<button type="button" class="btn-ghost px-5 py-2.5" onclick={() => window.print()}>
					<Icon name="printer" class="size-4" />
					{t('contact.print')}
				</button>
			</li>
		</ul>
	</div>
</section>

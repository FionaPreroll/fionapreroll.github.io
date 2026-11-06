import type { Handle } from '@sveltejs/kit/hooks';
import { langOf } from './lib/language.ts';

/** Puts the page's language into <html lang="%lang%"> (src/app.html) as it is prerendered. */
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', langOf(event.params.lang))
	});

import { describe, expect, it } from 'vitest';
import { handle } from './hooks.server.ts';

async function render(lang: string | undefined) {
	let html = '<html lang="%lang%">';
	await handle({
		event: { params: { lang } },
		resolve: async (
			_event: unknown,
			options: { transformPageChunk: (chunk: { html: string }) => string }
		) => {
			html = options.transformPageChunk({ html });
			return new Response(html);
		}
	} as never);
	return html;
}

describe('handle', () => {
	it('writes the page’s language into <html lang>', async () => {
		expect(await render(undefined)).toBe('<html lang="en">');
		expect(await render('en')).toBe('<html lang="en">');
		expect(await render('de')).toBe('<html lang="de">');
	});
});

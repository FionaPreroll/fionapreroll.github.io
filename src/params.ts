import { defineParams } from '@sveltejs/kit/params';
import { isLang } from './lib/language.ts';

// [[lang=lang]] in src/routes: /en/ and /de/, besides / without one.
export const params = defineParams({
	lang: (param: string) => (isLang(param) ? param : undefined)
});

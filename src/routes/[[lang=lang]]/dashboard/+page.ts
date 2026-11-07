import { langOf } from '../../../lib/language.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => ({ lang: langOf(params.lang) });

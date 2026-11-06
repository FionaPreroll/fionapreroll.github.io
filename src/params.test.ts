import { describe, expect, it } from 'vitest';
import { params } from './params.ts';

const validate = (value: string) =>
	(params.lang as unknown as { '~standard': { validate(v: string): unknown } })[
		'~standard'
	].validate(value);

describe('the lang matcher', () => {
	it('takes en and de', () => {
		expect(validate('en')).toEqual({ value: 'en' });
		expect(validate('de')).toEqual({ value: 'de' });
	});

	it('refuses anything else', () => {
		expect(validate('fr')).toHaveProperty('issues');
	});
});

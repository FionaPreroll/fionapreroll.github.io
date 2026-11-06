import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import ts from 'typescript-eslint';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint recommends turning no-undef off in TypeScript projects: the type check
			// already finds undefined names.
			'no-undef': 'off',
			// The site lives at the root of fionapreroll.github.io, with no base path to resolve, and
			// most links lead to other sites.
			'svelte/no-navigation-without-resolve': ['error', { ignoreLinks: true }],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }
			]
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
			}
		}
	},
	{
		// Components get the language, paths and navigation through props and src/i18n, so that
		// they render the same in Vitest as in the app: only routes import from $app.
		files: ['src/ui/**', 'src/lib/**', 'src/i18n/**', 'src/content/**'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['$app/*'],
							message: 'Only src/routes imports from $app; pass what a component needs as props.'
						}
					]
				}
			]
		}
	}
);

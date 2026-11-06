# Notes for Claude

The README describes the project, its layout and its conventions. These rules hold in every session:

## Branches

- Work happens on `main` unless the owner asks for a branch.

## Changelog

- A change that visitors can see goes into `CHANGELOG.md`, under `## [Unreleased]`, in the section it belongs to (`### Added`, `### Changed`, `### Fixed` or `### Removed`). Write it for visitors, in English.
- Changes only developers notice (tests, tooling, refactoring) need no entry.
- A new version is made only when asked: see "Changelog and versions" in the README.

## Code

- Use pnpm, never npm or yarn. Run `pnpm check` before every push.
- Svelte 5 with runes only: `$props`, `$state`, `$derived` and `$effect`, events as attributes (`onclick`); no `export let`, no `on:` directives and no stores from `svelte/store`.
- SvelteKit 3 has no `svelte.config.js` and no `$lib` alias: its options go to `sveltekit()` in `vite.config.ts`, and imports are relative, ending in `.ts`.
- Only `src/routes` imports from `$app`. Components get what they need as props or from `src/i18n`, so that they render the same in Vitest as in the app; ESLint enforces it.
- Every text visitors see goes through `t()` from `useI18n()` (`src/i18n`), with an English and a German version. Texts in `src/content/` are `{ en, de }` pairs, shown with `l()`.
- Tailwind CSS 4 is configured in `src/app.css`, without a `tailwind.config.js`. Colors are tokens (`bg-paper`, `text-muted`, `text-accent`, …) that dark mode redefines, so components need no `dark:` variants for them.
- Icons are Heroicons (24 px, outline), drawn by `Icon.svelte` from the names in `src/ui/icons.ts`; add an icon there instead of pasting SVG into a component.
- The projects' screenshots are not edited by hand: `pnpm shots` writes `static/shots/` and `src/content/shots.json` from the paths in `src/content/projects.ts`.
- Coverage stays at 95 % or more for lines, statements, functions and branches: `pnpm test:coverage` fails below it.

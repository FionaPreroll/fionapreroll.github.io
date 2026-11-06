// Who the page is about, and how to reach her. The avatar is fetched by `pnpm shots`.
export const profile = {
	name: 'Fiona',
	login: 'FionaPreroll',
	github: 'https://github.com/FionaPreroll',
	/** GitHub's numeric user id, for the avatar's address. */
	githubId: 249721561,
	email: 'fipreroll+app@gmail.com',
	/** Shows the "Open to new opportunities" badge in the hero. */
	openToWork: true,
	site: 'https://fionapreroll.github.io',
	source: 'https://github.com/FionaPreroll/fionapreroll.github.io',
	/** From the GitHub profile, for the hero's footnote. */
	lab: 'Future Gadget Lab',
	orbit: 'Low Earth Orbit'
} as const;

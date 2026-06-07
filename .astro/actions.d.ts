declare module "astro:actions" {
	type Actions = typeof import("/Users/ek_mac/Documents/_portfolio/portfolio-astro/src/actions")["server"];

	export const actions: Actions;
}
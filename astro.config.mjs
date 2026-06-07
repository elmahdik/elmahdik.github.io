import { defineConfig } from 'astro/config';
// import netlify from '@astrojs/netlify';
import react from '@astrojs/react';

export default defineConfig({
    site: 'https://elmahdik.github.io',
    output: "hybrid",
    // adapter: netlify(),
    experimental: {
        actions: true,
    },
    integrations: [
        react({
            experimentalReactChildren: true,
        }),
    ]
});

// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// React integration is intentionally NOT registered: no Astro Islands need it
// in this build (ScrollReveal uses a vanilla inline <script> in BaseLayout).
// To add a React island later, run:
//   pnpm astro add react
// and use `client:visible` (or similar) on the component.

const SITE = 'https://55408suga.github.io';
const BASE = '/my_site/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory' },
  prefetch: false,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ja',
        locales: { ja: 'ja', en: 'en' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});

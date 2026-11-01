// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static site. build.format 'file' gives clean URLs without a trailing
// slash on Cloudflare Pages (/privacy, not /privacy/), matching the links
// already used by vibecoding77.com and TagMango.
export default defineConfig({
  site: 'https://25xacademy.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});

import { defineConfig } from 'astro/config';
import { site } from './src/config/site';

export default defineConfig({
  output: 'static',
  site: site.url,
  base: site.base,
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});

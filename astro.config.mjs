import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en', 'it'],
    routing: { prefixDefaultLocale: false },
  },
});

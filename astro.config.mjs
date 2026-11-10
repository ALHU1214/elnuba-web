import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// [PENDIENTE] dominio definitivo: elnuba.com o elnuba.es (pregunta 16 a Gonzalo)
export default defineConfig({
  site: 'https://elnuba.com',
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  // La hoja de estilos (8 KB comprimida) va dentro de cada página: el móvil pinta antes, sin esperar otra descarga (9-nov-2026)
  build: { inlineStylesheets: 'always' },
  vite: { plugins: [tailwindcss()] },
});

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// [PENDIENTE] dominio definitivo: elnuba.com o elnuba.es (pregunta 16 a Gonzalo)
// 10-nov-2026: la versión de prueba de GitHub Pages pasa SITE_URL y BASE_PATH (ver .github/workflows/publicar.yml).
// Sin ellas (en local y en el dominio definitivo) la web va en la raíz. Rutas internas siempre con ruta() de src/lib/ruta.ts.
export default defineConfig({
  site: process.env.SITE_URL || 'https://elnuba.com',
  base: process.env.BASE_PATH || '/',
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  // La hoja de estilos (8 KB comprimida) va dentro de cada página: el móvil pinta antes, sin esperar otra descarga (9-nov-2026)
  build: { inlineStylesheets: 'always' },
  vite: { plugins: [tailwindcss()] },
});

// sitemap.xml (13-nov-2026): sustituye al sitemap-index.xml del plugin de Astro. Un solo archivo con el nombre que
// buscan todas las herramientas, y solo con las páginas que queremos en Google (las de src/data/seo.ts).
// Si se crea una página nueva, añadirla en `paginas` de seo.ts (sale también en llms.txt).
import type { APIRoute } from 'astro';
import { ruta } from '../lib/ruta';
import { paginas } from '../data/seo';

export const GET: APIRoute = ({ site }) => {
  const urls = paginas.map((p) => `  <url><loc>${new URL(ruta(p.ruta), site).href}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

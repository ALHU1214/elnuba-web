// robots.txt (13-nov-2026): deja pasar a todos, también a los buscadores de las IA (ChatGPT, Perplexity, Claude,
// Gemini), y dice dónde está el sitemap. Como en aimanganell.com. Lo que no se quiere en Google va con noindex en la página.
import type { APIRoute } from 'astro';
import { ruta } from '../lib/ruta';

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL(ruta('/sitemap.xml'), site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });

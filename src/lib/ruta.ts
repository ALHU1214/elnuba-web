// Rutas internas con la "base" de la web (10-nov-2026).
// En el dominio definitivo la base es "/" y esto no cambia nada. En la versión de prueba de GitHub Pages
// la web vive en /elnuba-web/, y todos los enlaces, fotos y logos necesitan ese prefijo.
// Regla: cualquier ruta interna que empiece por "/" se escribe como ruta('/...').
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const ruta = (p: string) => (p.startsWith('/') ? base + p : p);

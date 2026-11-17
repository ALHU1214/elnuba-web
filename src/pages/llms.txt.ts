// llms.txt (13-nov-2026): resumen en texto plano para las IA, como en aimanganell.com.
// Google ha dicho que no lo usa; se pone porque no cuesta nada y otras IA sí lo leen.
// Todo sale de los mismos datos que la web (negocio.ts, catalogo.ts, preguntas.ts): nunca dice nada que no esté en ella.
import type { APIRoute } from 'astro';
import { ruta } from '../lib/ruta';
import { negocio, horarioTramos, fraseHorario } from '../data/negocio';
import { familiasPara, marcas } from '../data/catalogo';
import { preguntasInicio } from '../data/preguntas';
import { paginas, descripcionNegocio } from '../data/seo';

export const GET: APIRoute = ({ site }) => {
  const url = (r: string) => new URL(ruta(r), site).href;
  const d = negocio.direccion;
  const anios = negocio.anios ? `más de ${negocio.anios} años en el sector` : null;
  const lineas = [
    `# ${negocio.nombreCompleto}`,
    '',
    `> ${descripcionNegocio}`,
    '',
    `${negocio.nombre} (${negocio.razonSocial}) trabaja con colegios y centros educativos, empresas, despachos y organismos públicos${anios ? `, con ${anios}` : ''}. Vende al por mayor y al detalle.`,
    '',
    '## Contacto',
    '',
    `- Teléfono: ${negocio.telefono}`,
    `- Correo: ${negocio.email}`,
    `- Almacén y tienda: ${d.calle}, ${d.zona}, ${d.cp} ${d.localidad} (Tenerife). Aquí se recogen los pedidos.`,
    ...(negocio.horario ? [`- Horario de Los Majuelos: ${fraseHorario(horarioTramos)}.`] : []),
    '',
    '## Páginas',
    '',
    ...paginas.map((p) => `- [${p.nombre}](${url(p.ruta)}): ${p.resumen}`),
    '',
    '## Qué distribuimos',
    '',
    'Todo el material de papelería, escolar y de oficina. Algunos ejemplos por familia:',
    '',
    ...familiasPara().map((f) => `- ${f.nombre}: ${f.productos.join(', ').toLowerCase()}.`),
    '',
    `Marcas con las que trabajamos, entre otras: ${marcas.map((m) => m.nombre).join(', ')}.`,
    '',
    '## Preguntas frecuentes',
    '',
    ...preguntasInicio.flatMap((q) => [`### ${q.p}`, '', q.r, '']),
  ];
  return new Response(lineas.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

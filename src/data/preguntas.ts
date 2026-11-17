// Preguntas frecuentes (10-nov-2026, Álvaro: "más FAQ"). Solo con datos confirmados: CLAUDE.md del cliente,
// negocio.ts y catalogo.ts. Las que dependen de Gonzalo (condiciones y horario) salen solas cuando se rellenen.
import { negocio, condiciones, listaIslas, horarioTramos, fraseHorario } from './negocio';
import { marcas } from './catalogo';

// Temas = los botones de arriba de las preguntas del inicio. tinta: el color del icono y del nombre (contraste AA)
export const temas = {
  pedidos: { nombre: 'Pedidos', tinta: '#b93d0a', icono: 'M9 3h6v3H9z M8 4.5H5V21h14V4.5h-3 M8.5 11h7 M8.5 15h5' },
  reparto: { nombre: 'Reparto', tinta: '#7a5000', icono: 'M3 7h11v9H3z M14 10h4l3 3v3h-7 M7 19a2 2 0 1 0 0-.01 M17 19a2 2 0 1 0 0-.01' },
  material: { nombre: 'Material', tinta: '#b42323', icono: 'M4 20l4-1L19 8l-3-3L5 16z M14 7l3 3' },
  tiendas: { nombre: 'Tienda', tinta: '#13203a', icono: 'M4 9l1.5-5h13L20 9 M4 9h16v2a3 3 0 0 1-6 0 3 3 0 0 1-4 0 3 3 0 0 1-6 0z M5 13v7h14v-7' },
};
export type Tema = keyof typeof temas;
export type Pregunta = { p: string; r: string; tema?: Tema };

const d = negocio.direccion;
const nombresMarcas = marcas.map((m) => m.nombre);
const listaMarcas = `${nombresMarcas.slice(0, -1).join(', ')} y ${nombresMarcas.at(-1)}`;

export const preguntasInicio: Pregunta[] = [
  // Pedidos
  { tema: 'pedidos', p: '¿Cómo pido un presupuesto?', r: `Llámanos al ${negocio.telefono} o escríbenos a ${negocio.email} con la lista de lo que necesitas.` },
  ...(condiciones.plazoPresupuesto ? [{ tema: 'pedidos' as Tema, p: '¿Cuánto tardan en mandar el presupuesto?', r: `Te lo enviamos ${condiciones.plazoPresupuesto}.` }] : []),
  ...(condiciones.sinCompromiso ? [{ tema: 'pedidos' as Tema, p: '¿El presupuesto tiene algún compromiso?', r: 'No. El presupuesto es gratis y sin compromiso.' }] : []),
  { tema: 'pedidos', p: '¿Venden solo al por mayor?', r: 'No. También vendemos al público en nuestra tienda de Los Majuelos (La Laguna).' },
  { tema: 'pedidos', p: '¿Trabajan con colegios y organismos públicos?', r: 'Sí. Trabajamos con centros educativos y organismos públicos, además de con empresas y despachos.' },
  { tema: 'pedidos', p: '¿Puedo preguntar si tienen un artículo concreto?', r: 'Sí. Escríbenos o llámanos con el artículo y la marca, y te decimos si lo tenemos.' },
  ...(condiciones.pedidoMinimo ? [{ tema: 'pedidos' as Tema, p: '¿Hay pedido mínimo?', r: condiciones.pedidoMinimo }] : []),
  ...(condiciones.pago ? [{ tema: 'pedidos' as Tema, p: '¿Cómo se paga un pedido?', r: condiciones.pago }] : []),

  // Reparto
  { tema: 'reparto', p: '¿Reparten a todas las islas?', r: `Sí, a todas las islas Canarias: ${listaIslas}.` },
  ...(condiciones.entrega ? [{ tema: 'reparto' as Tema, p: '¿Cuánto tardan en entregar?', r: condiciones.entrega }] : []),
  { tema: 'reparto', p: '¿Me llevan el pedido al colegio o a la oficina?', r: 'Sí, te lo llevamos a tu colegio u oficina.' },
  // 11-nov-2026 (Álvaro): se recoge solo en Los Majuelos (la tienda está dentro del almacén).
  { tema: 'reparto', p: '¿Puedo pasar a recoger el pedido?', r: 'Sí, en nuestro almacén de Los Majuelos (La Laguna), que es el único punto de recogida.' },

  // Material (familias: las de catalogo.ts, escritas a mano para que se lean bien)
  { tema: 'material', p: '¿Qué material tienen?', r: 'Todo el material de papelería, escolar y de oficina: folios y papel, cuadernos y agendas, escritura, archivo (carpetas, dossiers, fundas para plastificar…), tóner y cartuchos, material de oficina (grapadoras, perforadoras, clips…), material escolar (mochilas, estuches, tijeras, reglas…), libros de texto, infantiles y jurídicos, y artículos de regalo. Si buscas algo concreto, pregúntanos.' },
  { tema: 'material', p: '¿Con qué marcas trabajan?', r: `Con muchas marcas, entre ellas ${listaMarcas}.` },
  { tema: 'material', p: '¿Tienen libros de texto?', r: 'Sí, suministramos libros de texto a centros educativos.' },

  // Tiendas
  { tema: 'tiendas', p: '¿Dónde están?', r: `Nuestro almacén y tienda están en ${d.calle}, ${d.zona}, ${d.cp} ${d.localidad} (Tenerife).` },
  { tema: 'tiendas', p: '¿Qué horario tienen?', r: `En Los Majuelos (oficinas, almacén y tienda): ${fraseHorario(horarioTramos)}.` },
  { tema: 'tiendas', p: '¿Se puede pagar con tarjeta en la tienda?', r: 'Sí. En la tienda de Los Majuelos puedes pagar con tarjeta de crédito, de débito y con el móvil.' },
  { tema: 'tiendas', p: '¿La tienda es accesible?', r: 'Sí. En la tienda de Los Majuelos, la entrada y los aseos son accesibles para personas con movilidad reducida. No tiene aparcamiento propio, pero se puede aparcar en la calle.' },
];

// Datos del negocio: la única fuente para toda la web.
// Solo datos verificados (ver ../../../CLAUDE.md). Lo que falta va a null y se ve como [PENDIENTE].

export const PUBLICADA = false; // true cuando se publique en el dominio definitivo (quita el noindex)

// Horarios (16-nov-2026, los dos los pasó Álvaro). De aquí salen el texto de la web (una línea por tramo), la frase de la
// pregunta frecuente y los datos para Google (openingHoursSpecification en seo.ts). horas vacío = cerrado.
type Tramo = { dias: string; frase: string; diasLd: string[]; horas: [string, string][] };
const lunesAJueves = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];
const horas = (t: Tramo, e = ' ') => (t.horas.length ? t.horas.map(([a, c]) => `de${e}${a}${e}a${e}${c}`).join(' y ') : 'cerrado');
// En la web, cada franja ("de 16:30 a 19:00") va entera: espacios que no se parten (si no, quedaba "a / 19:00")
const textoHorario = (tramos: Tramo[]) => tramos.map((t) => `${t.dias}, ${horas(t, ' ')}`);
// "de lunes a jueves, de 9:00 a 17:00, y los viernes, de 9:00 a 14:00" (los días cerrados no se nombran)
export const fraseHorario = (tramos: Tramo[]) => tramos.filter((t) => t.horas.length).map((t) => `${t.frase}, ${horas(t)}`).join(', y ');
export const horarioLd = (tramos: Tramo[]) => tramos.flatMap((t) => t.horas.map(([a, c]) => ({
  '@type': 'OpeningHoursSpecification', dayOfWeek: t.diasLd, opens: a.padStart(5, '0'), closes: c.padStart(5, '0'),
})));

// Los Majuelos (oficinas, almacén y tienda), pregunta 8: coincide con su ficha de Google. Fines de semana: no lo ha dicho.
export const horarioTramos: Tramo[] = [
  { dias: 'Lunes a jueves', frase: 'de lunes a jueves', diasLd: lunesAJueves, horas: [['9:00', '17:00']] },
  { dias: 'Viernes', frase: 'los viernes', diasLd: ['Friday'], horas: [['9:00', '14:00']] },
];
const horarioTexto = textoHorario(horarioTramos);
// Filas de la tabla de horario resaltada (Horario.astro, 16-nov-2026): "Lunes a jueves" · "9:00 – 17:00"
export const filasHorario = horarioTramos.map((t) => ({ dias: t.dias, horas: t.horas.length ? t.horas.map(([a, c]) => `${a} – ${c}`).join(' y ') : 'Cerrado' }));

export const negocio = {
  nombre: 'ELNUBA',
  nombreCompleto: 'ELNUBA Distribuciones de Papelería',
  razonSocial: 'Elnuba Distribuciones de Papelería SL',
  cif: 'B76593185',
  telefono: '922 62 63 69',
  telefonoE164: '+34922626369',
  email: 'elnubadistribuciones@yahoo.es', // confirmado por Álvaro el 20-oct
  direccion: {
    calle: 'Av. El Paso 43, bajo',
    zona: 'Polígono Industrial Los Majuelos',
    cp: '38108',
    localidad: 'San Cristóbal de La Laguna',
    provincia: 'Santa Cruz de Tenerife',
    isla: 'Tenerife',
  },
  anios: 35 as number | null, // confirmado el 20-oct (pregunta 1)
  horario: horarioTexto as string[] | null, // 16-nov-2026, Álvaro (pregunta 8)
  instagram: 'https://instagram.com/elnuba.libreria.papeleria',
  facebook: 'https://www.facebook.com/ELNUBALIBRERIAPAPELERIA/',
};

// Tienda abierta al público: solo la de Los Majuelos.
// 16-nov-2026 (Álvaro): la Librería Mararía (Candelaria) no sale en ninguna parte de la web: no es ELNUBA y confundía.
// 11-nov-2026 (Álvaro): la de Los Majuelos está dentro del almacén, así que allí sí se recogen pedidos.
// mapa: lo que se busca en Google Maps (11-nov-2026, mapas de Contacto). Comprobado que cae en su ficha de Google:
// "ELNUBA Distribuciones de Papelería y Librería".
// 13-nov-2026 (Álvaro): no hay aparcamiento propio (se aparca en la calle): fuera "aparcamiento adaptado", que venía de
// su ficha de Google. Accesibilidad dicha como recomiendan las guías y la norma: "accesible" (no "adaptado").
// 16-nov-2026 (Álvaro): "personas con movilidad reducida" en vez de "personas usuarias de silla de ruedas", y "aseos".
// Los Majuelos: la tienda está dentro del almacén, así que lleva el mismo horario (16-nov-2026).
export const tiendas = [
  { id: 'los-majuelos', nombre: 'Tienda de Los Majuelos', lugar: 'La Laguna', direccion: ['Av. El Paso 43, bajo', 'Polígono Industrial Los Majuelos', '38108 San Cristóbal de La Laguna'], telefono: '922 62 63 69', telefonoE164: '+34922626369', horario: horarioTexto as string[] | null, nota: 'Dentro de nuestro almacén.', mapa: 'ELNUBA Distribuciones de Papelería, Av. El Paso 43, La Laguna', extras: ['Entrada y aseos accesibles para personas con movilidad reducida', 'Pago con tarjeta de crédito, débito y con el móvil', 'Recogida de pedidos', 'Fotocopias, encuadernación y plastificado'] },
];


// Reparto (13-nov-2026, Álvaro): a las 8 islas Canarias. La web no se limita a Tenerife: solo dice que estamos en
// Tenerife cuando se da la dirección. Se escribe "todas las islas" (y, en las preguntas, la lista), nunca "8 islas"
// como cifra (decisión del 20-oct).
export const islas = ['Tenerife', 'Gran Canaria', 'Lanzarote', 'Fuerteventura', 'La Palma', 'La Gomera', 'El Hierro', 'La Graciosa'];
export const listaIslas = `${islas.slice(0, -1).join(', ')} y ${islas.at(-1)}`;

export const telHref = `tel:${negocio.telefonoE164}`;
// Correos de presupuesto con el asunto y un guion ya escritos (9-nov-2026, CRO): quien escribe solo rellena.
// Van en la voz del cliente y de "ustedes", como se habla en Canarias.
// 24-nov-2026 (Álvaro): el asunto acaba en "(desde la web)" para que ELNUBA sepa qué clientes llegan por la web.
// En el ordenador, al pulsar sale el menú para elegir Gmail, Outlook, Yahoo o el programa de correo (ElegirCorreo.astro).
export const marcaWeb = ' (desde la web)';
const correo = (asunto: string, cuerpo: string) =>
  `mailto:${negocio.email}?subject=${encodeURIComponent(asunto + marcaWeb)}&body=${encodeURIComponent(cuerpo.replace(/\n/g, '\r\n'))}`;
export const correos = {
  general: correo('Presupuesto de material',
    'Hola:\n\nQuería pedir presupuesto para este material:\n- \n- \n- \n\nCentro o empresa: \nIsla y municipio de entrega: \nTeléfono de contacto: \n\nGracias.'),
  colegio: correo('Presupuesto de material escolar',
    'Hola:\n\nLes envío la lista de material de nuestro centro para que nos preparen el presupuesto (la adjunto o la copio aquí):\n\n\nNombre del centro: \nIsla y municipio: \nTeléfono de contacto: \n\nGracias.'),
  empresa: correo('Presupuesto de material de oficina',
    'Hola:\n\nNecesitamos presupuesto para este material:\n- \n- \n- \n\nEmpresa u organismo: \nDirección de entrega: \nTeléfono de contacto: \n\nGracias.'),
  // 24-nov-2026 (Álvaro): fotocopias, encuadernación y plastificado en la tienda de Los Majuelos
  copias: correo('Consulta sobre fotocopias, encuadernación o plastificado',
    'Hola:\n\nQuería preguntar por (fotocopias, encuadernación o plastificado): \n\nCuántas páginas o copias: \nPara cuándo lo necesito: \nTeléfono de contacto: \n\nGracias.'),
  articulo: correo('Consulta por un artículo',
    'Hola:\n\n¿Tienen este artículo?\n- Artículo y marca: \n- Cantidad: \n\nTeléfono de contacto: \n\nGracias.'),
};
export type TipoCorreo = keyof typeof correos;
export const mailHref = correos.general;
// Sin plantilla: para los textos legales (aviso legal, privacidad), donde no se pide presupuesto
export const mailSimple = `mailto:${negocio.email}?subject=${encodeURIComponent('Consulta' + marcaWeb)}`;

// Lo que pregunta un comprador antes de pedir (9-nov-2026, CRO). [PENDIENTE] de Gonzalo (preguntas 20-24).
// Mientras sea null no sale nada; en cuanto se rellene, aparece solo en la portada y en las preguntas frecuentes.
export const condiciones = {
  plazoPresupuesto: null as string | null, // cómo se dice, p. ej. 'en el mismo día' → "Te lo enviamos en el mismo día"
  sinCompromiso: null as boolean | null,   // true → "Presupuesto sin compromiso"
  entrega: null as string | null,          // respuesta completa: plazos en Tenerife y en las otras islas
  pedidoMinimo: null as string | null,     // respuesta completa
  pago: null as string | null,             // respuesta completa: formas de pago
};

export const nav = [
  { href: '/colegios/', label: 'Colegios' },
  { href: '/empresas-y-organismos/', label: 'Empresas y organismos' },
  // 24-nov-2026 (Álvaro): para que los encuentre quien busca fotocopias, encuadernar o plastificar (estudiantes)
  { href: '/fotocopias-encuadernacion-plastificado/', label: 'Fotocopias' },
  { href: '/nosotros/', label: 'Nosotros' },
  { href: '/contacto/', label: 'Contacto' },
];

// Analítica (17-nov-2026, Álvaro: "le voy a poner Google Analytics y Clarity, así que tendrá que haber cookies").
// Mientras los dos estén a null no se carga nada, no sale el aviso de cookies y los textos legales siguen diciendo que
// la web no usa cookies (es lo que pasa de verdad). Al rellenarlos:
//  - sale el aviso de cookies (Consentimiento.astro) con "Rechazar" y "Aceptar" iguales, como pide la AEPD;
//  - cada herramienta se carga SOLO si el visitante la acepta, y se puede cambiar con "Configurar cookies" del pie;
//  - la política de privacidad y el aviso legal pasan a explicarlas, con la fecha de `desde`.
// Activado el 17-nov-2026 con las cuentas que creó Álvaro. Duración de las cookies comprobada (ver privacidad.astro).
// En Google Analytics: retención de datos a 14 meses y señales de Google desactivadas (lo hizo Álvaro al crearla).
export const analitica = {
  googleAnalytics: 'G-2E44PPZFE8' as string | null, // ID de medición de GA4, "G-XXXXXXXXXX" (Administrar > Flujos de datos)
  clarity: 'zf6zzsrlye' as string | null,         // ID del proyecto de Clarity (Settings > Overview), letras y números
  desde: '2026-11-17' as string | null,           // AAAA-MM-DD: el día en que se activan (fecha de los textos legales)
};
export const hayAnalitica = Boolean(analitica.googleAnalytics || analitica.clarity);

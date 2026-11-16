// Datos del negocio: la única fuente para toda la web.
// Solo datos verificados (ver ../../../CLAUDE.md). Lo que falta va a null y se ve como [PENDIENTE].

export const PUBLICADA = false; // true cuando se publique en el dominio definitivo (quita el noindex)

// Horario de Los Majuelos (oficinas, almacén y tienda). 16-nov-2026, Álvaro (pregunta 8): de lunes a jueves de 9:00 a
// 17:00 y los viernes de 9:00 a 14:00 (coincide con su ficha de Google). Los fines de semana no se mencionan: no lo ha dicho.
// De aquí salen el texto de la web y los datos para Google (openingHoursSpecification en seo.ts).
export const horarioTramos = [
  { dias: 'Lunes a jueves', diasLd: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], abre: '9:00', cierra: '17:00' },
  { dias: 'Viernes', diasLd: ['Friday'], abre: '9:00', cierra: '14:00' },
];
const horarioTexto = horarioTramos.map((t) => `${t.dias}, de ${t.abre} a ${t.cierra}`);

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

// Tiendas abiertas al público (20-oct: Álvaro pide nombrar las dos).
// 11-nov-2026 (Álvaro): la de Los Majuelos está dentro del almacén, así que allí sí se recogen pedidos. La de Candelaria
// es una tienda aparte, solo para el público que va a comprar: se nombra, pero sin decir que allí se pide o se recoge.
// mapa: lo que se busca en Google Maps (11-nov-2026, mapas de Contacto). Comprobado que cae en su ficha de Google:
// "ELNUBA Distribuciones de Papelería y Librería" y "Librería Papelería Mararía" (no confundir con LER Librerías).
// 13-nov-2026 (Álvaro): no hay aparcamiento propio (se aparca en la calle): fuera "aparcamiento adaptado", que venía de
// su ficha de Google. Accesibilidad dicha como recomiendan las guías y la norma: "accesible" (no "adaptado").
// 16-nov-2026 (Álvaro): "personas con movilidad reducida" en vez de "personas usuarias de silla de ruedas", y "aseos".
// Candelaria: nombre y dirección de su web antigua (papeleriaylibreriaelnuba.es, "frente al Ayuntamiento");
// teléfono de directorios y del listado de comercios del Ayuntamiento de Candelaria. [PENDIENTE] confirmar teléfono y horario (pregunta 9).
// Los Majuelos: la tienda está dentro del almacén, así que lleva el mismo horario (16-nov-2026).
export const tiendas = [
  { id: 'los-majuelos', nombre: 'Tienda de Los Majuelos', lugar: 'La Laguna', direccion: ['Av. El Paso 43, bajo', 'Polígono Industrial Los Majuelos', '38108 San Cristóbal de La Laguna'], telefono: '922 62 63 69', telefonoE164: '+34922626369', horario: horarioTexto as string[] | null, nota: 'Dentro de nuestro almacén.', mapa: 'ELNUBA Distribuciones de Papelería, Av. El Paso 43, La Laguna', extras: ['Entrada y aseos accesibles para personas con movilidad reducida', 'Pago con tarjeta de crédito, débito y con el móvil', 'Recogida de pedidos'] },
  { id: 'candelaria', nombre: 'Librería Mararía', lugar: 'Candelaria', direccion: ['C/ Periodista Ernesto Salcedo, 5', 'Frente al Ayuntamiento', 'Candelaria'], telefono: '922 50 26 65', telefonoE164: '+34922502665', horario: null as string[] | null, nota: 'Librería y papelería para el público, en el centro de Candelaria.', mapa: 'Librería Mararía, Calle Periodista Ernesto Salcedo 5, Candelaria', extras: [] as string[] },
];

// Reparto (13-nov-2026, Álvaro): a las 8 islas Canarias. La web no se limita a Tenerife: solo dice que estamos en
// Tenerife cuando se da la dirección. Se escribe "todas las islas" (y, en las preguntas, la lista), nunca "8 islas"
// como cifra (decisión del 20-oct).
export const islas = ['Tenerife', 'Gran Canaria', 'Lanzarote', 'Fuerteventura', 'La Palma', 'La Gomera', 'El Hierro', 'La Graciosa'];
export const listaIslas = `${islas.slice(0, -1).join(', ')} y ${islas.at(-1)}`;

export const telHref = `tel:${negocio.telefonoE164}`;
// Correos de presupuesto con el asunto y un guion ya escritos (9-nov-2026, CRO): quien escribe solo rellena.
// Van en la voz del cliente y de "ustedes", como se habla en Canarias.
const correo = (asunto: string, cuerpo: string) =>
  `mailto:${negocio.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo.replace(/\n/g, '\r\n'))}`;
export const correos = {
  general: correo('Presupuesto de material',
    'Hola:\n\nQuería pedir presupuesto para este material:\n- \n- \n- \n\nCentro o empresa: \nIsla y municipio de entrega: \nTeléfono de contacto: \n\nGracias.'),
  colegio: correo('Presupuesto de material escolar',
    'Hola:\n\nLes envío la lista de material de nuestro centro para que nos preparen el presupuesto (la adjunto o la copio aquí):\n\n\nNombre del centro: \nIsla y municipio: \nTeléfono de contacto: \n\nGracias.'),
  empresa: correo('Presupuesto de material de oficina',
    'Hola:\n\nNecesitamos presupuesto para este material:\n- \n- \n- \n\nEmpresa u organismo: \nDirección de entrega: \nTeléfono de contacto: \n\nGracias.'),
  articulo: correo('Consulta por un artículo',
    'Hola:\n\n¿Tienen este artículo?\n- Artículo y marca: \n- Cantidad: \n\nTeléfono de contacto: \n\nGracias.'),
};
export type TipoCorreo = keyof typeof correos;
export const mailHref = correos.general;
// Sin plantilla: para los textos legales (aviso legal, privacidad), donde no se pide presupuesto
export const mailSimple = `mailto:${negocio.email}`;

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
  { href: '/nosotros/', label: 'Nosotros' },
  { href: '/contacto/', label: 'Contacto' },
];

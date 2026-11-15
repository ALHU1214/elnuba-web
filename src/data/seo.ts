// Datos estructurados (JSON-LD) y páginas para buscadores e IA (13-nov-2026).
// Mismo criterio que aimanganell.com: un grafo con la empresa, la web y cada página, unido por @id,
// y la ficha de la empresa entera en todas las páginas. Solo datos reales que también se ven en la web.
// Lo que falta (horario, condiciones) se añade solo cuando se rellene en negocio.ts.
import { negocio, tiendas, islas } from './negocio';
import { familiasPara } from './catalogo';

// Páginas que se ofrecen a Google y a las IA (sitemap.xml y llms.txt). Las legales y la 404 no: llevan noindex.
export const paginas = [
  { ruta: '/', nombre: 'Inicio', resumen: 'Qué distribuye ELNUBA, para quién, cómo se pide y preguntas frecuentes.' },
  { ruta: '/colegios/', nombre: 'Colegios', resumen: 'Material escolar, libros de texto y material de dibujo y pintura para colegios y centros educativos.' },
  { ruta: '/empresas-y-organismos/', nombre: 'Empresas y organismos', resumen: 'Material de oficina, archivo, tóner y cartuchos para empresas, despachos y organismos públicos.' },
  { ruta: '/nosotros/', nombre: 'Nosotros', resumen: 'Quiénes somos y nuestras dos tiendas abiertas al público.' },
  { ruta: '/contacto/', nombre: 'Contacto', resumen: 'Teléfono, correo, dirección y cómo llegar.' },
];

export const descripcionNegocio =
  'Distribución de papelería, material escolar y de oficina desde Los Majuelos (La Laguna, Tenerife) para colegios, empresas y organismos públicos de todas las islas Canarias.';

const mapa = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// Servicio principal de cada página de cliente (va en su propia página y la ficha de la empresa apunta a él)
export const servicios = {
  colegios: { nombre: 'Suministro de material escolar a colegios y centros educativos', descripcion: 'Material escolar, libros de texto y material de dibujo y pintura para colegios públicos y privados. El centro manda su lista de material y ELNUBA le prepara el presupuesto.', publico: 'Colegios y centros educativos' },
  empresas: { nombre: 'Suministro de material de oficina a empresas y organismos públicos', descripcion: 'Material de oficina, archivo, tóner y cartuchos para empresas, despachos y organismos públicos, con entrega en la oficina.', publico: 'Empresas, despachos y organismos públicos' },
};
export type Servicio = (typeof servicios)[keyof typeof servicios];

export function grafo(o: { inicio: string; canonica: string; titulo: string; descripcion: string; logo: string; imagen: string; url: (r: string) => string; modificado?: string; servicio?: Servicio }) {
  const d = negocio.direccion;
  const idNegocio = `${o.inicio}#negocio`;
  const idWeb = `${o.inicio}#web`;
  const majuelos = tiendas[0];
  const mararia = tiendas[1];

  const negocioLd = {
    '@type': 'Store',
    '@id': idNegocio,
    name: negocio.nombre,
    alternateName: negocio.nombreCompleto,
    legalName: negocio.razonSocial,
    taxID: negocio.cif,
    description: descripcionNegocio,
    url: o.inicio,
    logo: { '@type': 'ImageObject', url: o.logo, width: 1200, height: 448 },
    image: o.imagen,
    telephone: negocio.telefonoE164,
    email: negocio.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${d.calle}, ${d.zona}`,
      postalCode: d.cp,
      addressLocality: d.localidad,
      addressRegion: d.provincia,
      addressCountry: 'ES',
    },
    hasMap: mapa(majuelos.mapa),
    areaServed: { '@type': 'AdministrativeArea', name: 'Islas Canarias', containsPlace: islas.map((name) => ({ '@type': 'Place', name })) },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: negocio.telefonoE164,
      email: negocio.email,
      areaServed: 'ES',
      availableLanguage: 'es',
    },
    paymentAccepted: 'Tarjeta de crédito, tarjeta de débito, pago con el móvil',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Entrada accesible para personas usuarias de silla de ruedas', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Aseo accesible para personas usuarias de silla de ruedas', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Aparcamiento propio', value: false },
    ],
    // La segunda tienda, como parte de la empresa: así su teléfono no se confunde con el principal
    department: {
      '@type': 'BookStore',
      name: mararia.nombre,
      description: mararia.nota,
      telephone: mararia.telefonoE164,
      address: {
        '@type': 'PostalAddress',
        streetAddress: mararia.direccion[0],
        addressLocality: 'Candelaria',
        addressRegion: d.provincia,
        addressCountry: 'ES',
      },
      hasMap: mapa(mararia.mapa),
    },
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', '@id': `${o.url('/colegios/')}#servicio`, name: servicios.colegios.nombre, url: o.url('/colegios/') } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', '@id': `${o.url('/empresas-y-organismos/')}#servicio`, name: servicios.empresas.nombre, url: o.url('/empresas-y-organismos/') } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Entrega a domicilio en tu colegio u oficina' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Reparto a todas las islas Canarias' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Recogida de pedidos en el almacén de Los Majuelos' } },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Qué distribuimos',
      itemListElement: familiasPara().map((f) => ({
        '@type': 'OfferCatalog',
        name: f.nombre,
        itemListElement: f.productos.map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Product', name } })),
      })),
    },
    sameAs: [negocio.instagram, negocio.facebook],
  };

  const webLd = {
    '@type': 'WebSite',
    '@id': idWeb,
    url: o.inicio,
    name: negocio.nombre,
    alternateName: negocio.nombreCompleto,
    inLanguage: 'es-ES',
    publisher: { '@id': idNegocio },
  };

  const paginaLd: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': `${o.canonica}#pagina`,
    url: o.canonica,
    name: o.titulo,
    description: o.descripcion,
    inLanguage: 'es-ES',
    isPartOf: { '@id': idWeb },
    about: { '@id': idNegocio },
    author: { '@id': idNegocio },
    publisher: { '@id': idNegocio },
    primaryImageOfPage: o.imagen,
  };
  if (o.modificado) paginaLd.dateModified = o.modificado;

  const nodos: Record<string, unknown>[] = [negocioLd, webLd, paginaLd];
  if (o.servicio) {
    const idServicio = `${o.canonica}#servicio`;
    paginaLd.mainEntity = { '@id': idServicio };
    nodos.push({
      '@type': 'Service',
      '@id': idServicio,
      name: o.servicio.nombre,
      description: o.servicio.descripcion,
      url: o.canonica,
      provider: { '@id': idNegocio },
      areaServed: { '@type': 'AdministrativeArea', name: 'Islas Canarias' },
      audience: { '@type': 'Audience', audienceType: o.servicio.publico },
    });
  }
  return { '@context': 'https://schema.org', '@graph': nodos };
}

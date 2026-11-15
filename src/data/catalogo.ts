// Familias de producto: lo que ELNUBA distribuye. La web no lleva catálogo (9-nov-2026): salen como información.
//
// 15-nov-2026 (Álvaro: "verificar que se vende eso, no poner cualquier cosa, y repartirlo mejor, no tan al azar").
// Solo lo comprobado:
//  - En las reuniones: bolígrafos (BIC), carpetas, folios y sobres (Gonzalo, 8-oct) y tóner y cartuchos (Elena, 15-oct).
//  - Por las marcas que trabajan (lista de Álvaro, 9-nov): Pilot (rotuladores), Tipp-Ex (correctores), Oxford
//    (cuadernos), Post-it (notas adhesivas), Apli (etiquetas), Alpino y Giotto (lápices de colores), Plastidecor
//    (ceras), Carioca (rotuladores de colores), Pritt (pegamento), Maped (tijeras y reglas), Milan (gomas), Totto (mochilas).
//  - Confirmados por Álvaro el 15-nov: libros de texto, libros jurídicos, libros infantiles, agendas y artículos de regalo.
//  - NO venden mobiliario ni maquinaria de impresión digital (Álvaro, 15-nov): venían de Páginas Amarillas. No ponerlos.
// Orden: primero lo que usan colegios y oficinas, luego lo del colegio y al final libros y regalo.
// Cada producto dice para quién es: en Colegios y en Empresas solo sale lo suyo (y la familia, si le queda algo).

export type Para = 'colegios' | 'empresas';
export type Producto = { nombre: string; para: Para[] };
// icono: el trazo de IconoFamilia.astro. nombres: si en una página la familia se queda solo con parte de lo suyo
export type Familia = { slug: string; nombre: string; icono: string; productos: Producto[]; nombres?: Partial<Record<Para, string>> };

const todos: Para[] = ['colegios', 'empresas'];
const p = (nombre: string, para: Para[] = todos): Producto => ({ nombre, para });

export const familias: Familia[] = [
  { slug: 'papel', nombre: 'Papel y cuadernos', icono: 'blocs-y-cuadernos', productos: [p('Folios'), p('Cuadernos y blocs'), p('Agendas'), p('Notas adhesivas'), p('Etiquetas')] },
  { slug: 'escritura', nombre: 'Escritura', icono: 'escritura', productos: [p('Bolígrafos'), p('Rotuladores'), p('Lápices'), p('Correctores')] },
  { slug: 'archivo', nombre: 'Archivo y oficina', icono: 'archivo-y-sobres', productos: [p('Carpetas y archivadores'), p('Sobres'), p('Tóner y cartuchos')] },
  { slug: 'escolar', nombre: 'Material escolar', icono: 'escolar', productos: [p('Pegamento', ['colegios']), p('Tijeras', ['colegios']), p('Reglas', ['colegios']), p('Gomas', ['colegios']), p('Mochilas', ['colegios'])] },
  { slug: 'dibujo', nombre: 'Dibujo y pintura', icono: 'bellas-artes', productos: [p('Lápices de colores', ['colegios']), p('Ceras', ['colegios']), p('Rotuladores de colores', ['colegios'])] },
  {
    slug: 'libros', nombre: 'Libros y regalo', icono: 'libros-de-texto', nombres: { colegios: 'Libros' },
    productos: [p('Libros de texto', ['colegios']), p('Libros infantiles', ['colegios']), p('Libros jurídicos', ['empresas']), p('Artículos de regalo', ['empresas'])],
  },
];

// Las familias de una página, ya con solo sus productos (sin `para`, todas enteras: el inicio)
export const familiasPara = (para?: Para) =>
  familias
    .map((f) => ({
      slug: f.slug,
      icono: f.icono,
      nombre: (para && f.nombres?.[para]) || f.nombre,
      productos: f.productos.filter((x) => !para || x.para.includes(para)).map((x) => x.nombre),
    }))
    .filter((f) => f.productos.length > 0);

// Marcas con las que trabaja ELNUBA, para la franja de logos del inicio.
// 9-nov-2026: lista que pasó Álvaro (14 marcas). Cada logo va en public/marcas/<archivo>.
// Origen: web oficial (Apli, Giotto, Totto, Milan, Maped: recortado sin el eslogan), Wikimedia Commons (Bic, Pilot, Pritt, Post-it)
// y seeklogo (Carioca, Oxford, Tipp-Ex; fondo blanco quitado).
// Alpino: web oficial alpino.eu (logo 2025). Plastidecor: imagen de la marca en su ficha de Amazon.es, fondo blanco quitado.
// Originales en proyecto/material-cliente/marcas/. 13-nov-2026: los PNG pasan a WebP de 100 px de alto (pesan la mitad
// o menos); los PNG de partida también se guardan en esa carpeta.
// alto: altura en px (en ordenador) para que todos los logos pesen lo mismo a la vista; los cuadrados van más altos y los macizos más bajos.
export type Marca = { archivo: string; nombre: string; alto: number };
export const marcas: Marca[] = [
  { archivo: 'apli.svg', nombre: 'Apli', alto: 30 },
  { archivo: 'giotto.svg', nombre: 'Giotto', alto: 32 },
  { archivo: 'bic.svg', nombre: 'BIC', alto: 38 },
  { archivo: 'pilot.svg', nombre: 'Pilot', alto: 34 },
  { archivo: 'pritt.svg', nombre: 'Pritt', alto: 50 },
  { archivo: 'carioca.webp', nombre: 'Carioca', alto: 34 },
  { archivo: 'maped.webp', nombre: 'Maped', alto: 48 },
  { archivo: 'alpino.svg', nombre: 'Alpino', alto: 28 },
  { archivo: 'plastidecor.webp', nombre: 'Plastidecor', alto: 26 },
  { archivo: 'totto.svg', nombre: 'Totto', alto: 38 },
  { archivo: 'tipp-ex.webp', nombre: 'Tipp-Ex', alto: 32 },
  { archivo: 'oxford.webp', nombre: 'Oxford', alto: 32 },
  { archivo: 'post-it.svg', nombre: 'Post-it', alto: 48 },
  { archivo: 'milan.svg', nombre: 'Milan', alto: 30 },
];

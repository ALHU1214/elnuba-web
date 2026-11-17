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
// 16-nov-2026, tarde (Álvaro): "ELNUBA tiene todo lo que una papelería puede tener": todo tipo de material escolar,
// grapadoras, fundas para plastificar, dossiers, muchísimos folios, papel, tóner y cartuchos, mochilas, estuches y libros
// de texto. "No puedes nombrar todo, pero que se entienda" que seguramente lo hay. Así que cada familia lleva ejemplos
// representativos de una papelería (no la lista entera) y el recuadro de abajo dice que es solo una muestra.
// Siguen fuera mobiliario y maquinaria de impresión digital (Álvaro, 15-nov).
// Reparto inspirado en la sección Papelería de Alcampo (compraonline.alcampo.es, 16-nov): los lápices de colores y las
// ceras van en Escritura, las notas adhesivas con los blocs y el archivo aparte. El tóner y los cartuchos van primero en
// "Oficina e impresión" porque se venden mucho a empresas.
// La lista de abajo va en el orden en que se escribió (papel, escritura, escolar, oficina, archivo, libros y regalo);
// el orden en que sale cada página lo pone `orden`, más abajo.
// Cada producto dice para quién es: en Colegios y en Empresas solo sale lo suyo (y la familia, si le queda algo).

export type Para = 'colegios' | 'empresas';
export type Producto = { nombre: string; para: Para[] };
// icono: el trazo de IconoFamilia.astro. nombres: si en una página la familia se queda solo con parte de lo suyo
export type Familia = { slug: string; nombre: string; icono: string; productos: Producto[]; nombres?: Partial<Record<Para, string>> };

const todos: Para[] = ['colegios', 'empresas'];
const p = (nombre: string, para: Para[] = todos): Producto => ({ nombre, para });

export const familias: Familia[] = [
  { slug: 'papel', nombre: 'Papel y cuadernos', icono: 'blocs-y-cuadernos', productos: [p('Folios'), p('Cartulinas y papel de colores', ['colegios']), p('Cuadernos y libretas'), p('Blocs y notas adhesivas'), p('Agendas')] },
  { slug: 'escritura', nombre: 'Escritura', icono: 'escritura', productos: [p('Bolígrafos'), p('Lápices y portaminas'), p('Rotuladores y subrayadores'), p('Lápices de colores y ceras', ['colegios']), p('Gomas y sacapuntas', ['colegios']), p('Correctores')] },
  { slug: 'escolar', nombre: 'Material escolar', icono: 'escolar', productos: [p('Mochilas y estuches', ['colegios']), p('Tijeras y pegamento', ['colegios']), p('Reglas, escuadras y compases', ['colegios']), p('Plastilina y manualidades', ['colegios'])] },
  { slug: 'oficina', nombre: 'Oficina e impresión', icono: 'ofimatica', productos: [p('Tóner'), p('Cartuchos de tinta'), p('Grapadoras y perforadoras'), p('Clips y cinta adhesiva'), p('Sobres'), p('Calculadoras')] },
  { slug: 'archivo', nombre: 'Archivo y clasificación', icono: 'archivo-y-sobres', productos: [p('Carpetas y archivadores'), p('Dossiers y fundas'), p('Fundas para plastificar'), p('Separadores'), p('Etiquetas')] },
  {
    slug: 'libros', nombre: 'Libros y regalo', icono: 'libros-de-texto', nombres: { colegios: 'Libros' },
    productos: [p('Libros de texto', ['colegios']), p('Libros infantiles', ['colegios']), p('Libros jurídicos', ['empresas']), p('Artículos de regalo', ['empresas'])],
  },
];

// Orden de las familias en cada página (17-nov-2026, con "el directorio"): primero lo que más pide ese cliente.
// Inicio: lo que comparten colegios y oficinas (papel, escritura, archivo, oficina) y después lo de cada uno.
// Colegios: lo escolar delante. Empresas: papel y tóner delante (Álvaro, 16-nov: folios y tóner se venden muchísimo).
const orden: Record<'inicio' | Para, string[]> = {
  inicio: ['papel', 'escritura', 'archivo', 'oficina', 'escolar', 'libros'],
  colegios: ['escolar', 'escritura', 'papel', 'archivo', 'oficina', 'libros'],
  empresas: ['papel', 'oficina', 'archivo', 'escritura', 'libros'],
};

// Las familias de una página, en su orden y ya con solo sus productos (sin `para`, todas enteras: el inicio).
// De aquí salen también los datos para Google y llms.txt, que siguen el orden del inicio.
export const familiasPara = (para?: Para) =>
  orden[para ?? 'inicio']
    .map((slug) => familias.find((f) => f.slug === slug)!)
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
// ancho (16-nov-2026, máster): el ancho en px que le toca a esa altura, según la proporción real del logo. Con las dos
// medidas el navegador reserva el sitio antes de cargar la imagen. Si se cambia un logo o su alto, volver a calcularlo.
export type Marca = { archivo: string; nombre: string; alto: number; ancho: number };
export const marcas: Marca[] = [
  { archivo: 'apli.svg', nombre: 'Apli', alto: 30, ancho: 105 },
  { archivo: 'giotto.svg', nombre: 'Giotto', alto: 32, ancho: 146 },
  { archivo: 'bic.svg', nombre: 'BIC', alto: 38, ancho: 100 },
  { archivo: 'pilot.svg', nombre: 'Pilot', alto: 34, ancho: 126 },
  { archivo: 'pritt.svg', nombre: 'Pritt', alto: 50, ancho: 54 },
  { archivo: 'carioca.webp', nombre: 'Carioca', alto: 34, ancho: 123 },
  { archivo: 'maped.webp', nombre: 'Maped', alto: 48, ancho: 71 },
  { archivo: 'alpino.svg', nombre: 'Alpino', alto: 28, ancho: 156 },
  { archivo: 'plastidecor.webp', nombre: 'Plastidecor', alto: 26, ancho: 212 },
  { archivo: 'totto.svg', nombre: 'Totto', alto: 38, ancho: 112 },
  { archivo: 'tipp-ex.webp', nombre: 'Tipp-Ex', alto: 32, ancho: 112 },
  { archivo: 'oxford.webp', nombre: 'Oxford', alto: 32, ancho: 137 },
  { archivo: 'post-it.svg', nombre: 'Post-it', alto: 48, ancho: 76 },
  { archivo: 'milan.svg', nombre: 'Milan', alto: 30, ancho: 123 },
];

// Familias de producto. Salen de lo que ELNUBA dice que vende (CLAUDE.md del cliente).
// [PENDIENTE] confirmar familias y quitar lo que no quiera que salga (pregunta 12).
// 9-nov-2026: la web no lleva catálogo (el cliente no lo va a pasar). Las familias salen como información, sin enlaces.

// resumen: solo si añade algo al nombre (para quién es). Si repetiría el título, se deja vacío y no sale.
// grupo (10-nov-2026): solo para ordenar el índice del cuaderno en columnas; no es un dato del cliente.
export type Grupo = 'papeleria' | 'oficina' | 'libreria' | 'arte-regalo';
export type Familia = { slug: string; nombre: string; resumen: string; para: ('colegios' | 'empresas')[]; grupo: Grupo };

// partes: si el grupo junta cosas distintas, su nombre se forma solo con las que salen en esa página
// (en Colegios solo hay dibujo y pintura y en Empresas solo regalo)
export const grupos: { id: Grupo; nombre: string; partes?: Record<string, string> }[] = [
  { id: 'papeleria', nombre: 'Papelería' },
  { id: 'oficina', nombre: 'Oficina' },
  { id: 'libreria', nombre: 'Librería' },
  { id: 'arte-regalo', nombre: 'Arte y regalo', partes: { 'bellas-artes': 'Arte', regalo: 'Regalo' } },
];

export const familias: Familia[] = [
  { slug: 'papel-y-etiquetas', nombre: 'Papel y etiquetas', resumen: 'Papel y etiquetas para el aula y la oficina.', para: ['colegios', 'empresas'], grupo: 'papeleria' },
  { slug: 'blocs-y-cuadernos', nombre: 'Blocs y cuadernos', resumen: 'Blocs y cuadernos para el aula y la oficina.', para: ['colegios', 'empresas'], grupo: 'papeleria' },
  { slug: 'escritura', nombre: 'Escritura', resumen: 'Bolígrafos y material de escritura.', para: ['colegios', 'empresas'], grupo: 'papeleria' },
  { slug: 'archivo-y-sobres', nombre: 'Archivo y sobres', resumen: '', para: ['colegios', 'empresas'], grupo: 'papeleria' },
  { slug: 'agendas', nombre: 'Agendas', resumen: '', para: ['colegios', 'empresas'], grupo: 'papeleria' },
  { slug: 'ofimatica', nombre: 'Tóner y cartuchos', resumen: '', para: ['empresas'], grupo: 'oficina' },
  { slug: 'mobiliario', nombre: 'Mobiliario de oficina', resumen: 'Mobiliario para oficinas y despachos.', para: ['empresas'], grupo: 'oficina' },
  { slug: 'impresion-digital', nombre: 'Maquinaria de impresión digital', resumen: '', para: ['empresas'], grupo: 'oficina' },
  { slug: 'libros-de-texto', nombre: 'Libros de texto', resumen: 'Libros de texto para centros educativos.', para: ['colegios'], grupo: 'libreria' },
  { slug: 'libros-juridicos', nombre: 'Libros jurídicos', resumen: 'Libros jurídicos para despachos y profesionales.', para: ['empresas'], grupo: 'libreria' },
  { slug: 'libreria-infantil', nombre: 'Librería infantil', resumen: '', para: ['colegios'], grupo: 'libreria' },
  { slug: 'bellas-artes', nombre: 'Dibujo y pintura', resumen: '', para: ['colegios'], grupo: 'arte-regalo' },
  { slug: 'regalo', nombre: 'Artículos de regalo', resumen: '', para: ['empresas'], grupo: 'arte-regalo' },
];

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

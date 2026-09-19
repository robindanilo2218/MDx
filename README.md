# MDx

Un editor de Markdown de una sola página: escribes, ves el resultado al lado, lo
imprimes en PDF y te llevas **un único archivo `.html`** que sigue funcionando sin
conexión y sin depender de nada ni de nadie.

Publicado en <https://md.crgm.app>.

## Qué hace

- **Convierte Markdown a HTML** con un motor propio de unas 900 líneas: sin
  librerías, sin CDN y sin peticiones a internet. Todo está dentro de `index.html`.
- **Catálogo de plantillas** (`▤ Plantillas`, o <kbd>Ctrl</kbd>+<kbd>K</kbd>) con 118
  documentos listos para usar, repartidos en dieciséis categorías: habilidades y
  subagentes de Claude Code, `CLAUDE.md` / `AGENTS.md` y reglas, comandos y hooks,
  roles y prompts, cómo escribir un `.md` para una IA, documentos de trabajo
  (informes, actas, propuestas, ADR, changelog…), trabajos académicos con la
  norma APA 7, un juego completo de mantenimiento eléctrico industrial (plan
  maestro, criticidad, LOTO, termografía, calidad de energía, causa raíz, KPIs y
  el uso de la IA en la planta), trece formularios para rellenar, seis
  diapositivas listas para presentar, cuatro hojas de cálculo, lógica y
  electricidad (tablas de verdad y escaleras PLC), rutas y viajes, organización
  y planificación (calendarios, planificadores) y libro/revista/periódico. Cada
  plantilla dice en qué ruta va el archivo y con qué nombre, y termina con las
  referencias de dónde sale su formato.
- **Funciona en redes cerradas y sin internet**: fuera de la sincronización con
  Google, la comunidad de plantillas y el contexto de mapas de las rutas GPX
  (todos opcionales y bajo pedido explícito), nada de la aplicación depende de
  una conexión — sirve igual en la intranet de una planta que en un equipo sin
  red.
- **Formularios que se rellenan sobre la vista**, sin abrir el editor: escribe
  `[[Nombre y apellidos]]` o `[[Fecha =fecha]]` y ahí aparece un recuadro donde
  pulsar y escribir; `[ ]` y `[x]` se marcan con el ratón, también dentro de una
  celda de tabla. Hay tipos para fecha, hora, número, texto largo, firma y listas
  de opciones (`[[Estado =Bueno/Regular/Malo]]`). Lo que escribes se guarda dentro
  del propio Markdown, así que se descarga, se imprime y se sigue rellenando otro
  día. El botón `✎▣ Rellenar` resalta lo que falta, activa los huecos `[así]` de
  cualquier plantilla y permite vaciar la hoja para volver a usarla. Vienen hechas
  el acta de reunión, el acta de entrega, los permisos de salida por horas y por
  días, el permiso de trabajo seguro, la revisión de herramienta, la inspección de
  planta de emergencia y de subestación, la entrega de EPP, la bitácora de turno,
  el reporte de incidente y la revisión de vehículo.
- **El catálogo viaja dentro del archivo**: la galería funciona igual servida por
  http que abriendo `index.html` a doble clic, sin servidor y sin conexión.
- **Dibuja diagramas** de los bloques `mermaid`: flujo, secuencia, estados,
  tarta, Gantt, clases, entidad-relación, mapa mental, C4 (contexto,
  contenedores y componentes), cuadrantes, línea de tiempo, trayecto de
  usuario (`journey`), ramas de Git (`gitGraph`) y flujo Sankey. El dibujo es
  un SVG hecho en casa, sin librerías: se imprime nítido, se adapta al tema
  claro u oscuro y funciona sin conexión.
- **Dibuja fórmulas** escritas en LaTeX, tanto `$E = mc^2$` o un bloque entre
  `$$` como `\(...\)` o un bloque entre `\[...\]` (el formato que usa
  Claude.ai), traducidas a MathML y dibujadas por el propio navegador: cero
  fuentes que descargar.
- **Presenta a pantalla completa** (`▶ Presentar`): cada línea `---` abre una
  diapositiva nueva; si el documento no tiene ninguna, cada título de primer
  nivel abre la suya. Se navega con flechas, espacio o clic, y se imprime una
  diapositiva por página. No es un archivo aparte: es el mismo Markdown, visto
  de otra forma. Dentro de Presentar hay un lápiz para anotar sobre la
  diapositiva actual (con cuatro colores), un botón `⊞ Miniaturas` para saltar
  de un vistazo a cualquier diapositiva, un `☰ Índice` con los títulos del
  documento y un botón `✎ Pizarrón` para abrir un lienzo en blanco a pantalla
  completa sin salir de la presentación.
- **Dibuja a mano** con el bloque `​```pizarra`, que guarda los trazos como
  texto plano dentro del documento, y con el **Pizarrón** (botón junto a
  `▶ Presentar`), un lienzo en blanco independiente de cualquier documento.
- **Mapas y dibujo técnico como texto**: rutas GPX con mapa 2D/3D y perfil de
  elevación (`​```gpx`), planos 2D acotados (`​```plano`), vistas isométricas
  (`​```iso`) y escenas 3D con perspectiva simple (`​```3d`), además de un
  `​```svg` de uso libre — todo con el mismo sanitizador que ya usan los
  diagramas `mermaid`, así que no hay imágenes que adjuntar ni servicios
  externos de por medio.
- **Calcula dentro de las tablas**: una celda con `[[Total =formula::SUMA(B2:B6)]]`
  se recalcula sola, con direcciones de celda al estilo de una hoja de cálculo
  (`B2`, rangos `B2:B6`) y las funciones `SUMA`, `PROMEDIO`, `MAX`, `MIN`,
  `CONTAR` y `REDONDEAR`. Sin `eval`: un evaluador propio y acotado.
- **Colorea el código** de 20 lenguajes (JavaScript, TypeScript, JSON, Python,
  CSS, HTML, Bash, YAML, SQL, Markdown, diff, INI, Java, C, C++, Go, Rust, PHP,
  Ruby y Lua) con sus apodos habituales, y pone la etiqueta del lenguaje en la
  esquina del bloque.
- **Colores en el texto** con clases listas (`rojo`, `verde`, `azul`, `naranja`,
  `morado`, `rosa`, `cian`, `gris`, `fondo`, `recuadro`…) que respetan el tema
  oscuro y la impresión.
- **Se guarda solo, y no solo el último**: cada documento que escribes, abres o
  sacas de una plantilla queda en el navegador (IndexedDB, y `localStorage` si el
  navegador no deja) con un nombre corto — `md01`, `md02`… Puedes irte a mirar
  plantillas y volver: lo anterior sigue ahí, en `◷ Recientes`, dentro de la
  misma galería. Nada sale de tu equipo.
- **Te avisa de lo que aún no has descargado**: abajo a la izquierda hay una
  píldora con el documento en curso y su estado — *guardado aquí, sin descargar*
  en ámbar, *descargado* en verde. Lo que vive en el navegador se pierde si
  borras los datos de navegación; lo único definitivo es lo que descargas.
- **Numera las descargas**: si el documento ya se descargó una vez (o lo abriste
  de tu equipo), la siguiente descarga sale como `informe-v2.md`, `informe-v3.md`…
  y así no pisas el archivo anterior.
- **Pestañas de documentos**: en cuanto tienes más de uno a mano, aparece una
  fila de pestañas bajo la barra para saltar de uno a otro (`Ctrl+Alt+←` y
  `Ctrl+Alt+→`, o el botón central del ratón para cerrar). Cerrar una pestaña no
  borra nada: el documento se queda en `◷ Recientes`. Con el teléfono tumbado y
  el editor abierto la fila se esconde —ahí no hay alto que gastar—, pero los
  atajos siguen funcionando.
- **Copia de seguridad de Recientes**: desde `◷ Recientes` se guarda un `.json`
  con todos los documentos del navegador y tus plantillas, y se restaura en otro
  equipo. Al restaurar no se pisa nada: solo entra lo que falta o lo que sea más
  nuevo, y si un número `md` ya está cogido se da otro libre.
- **Tus propias plantillas**: guarda el documento que tengas abierto en
  *Mis plantillas* y reutilízalo cuando quieras.
- **Abre archivos** `.md` de tu equipo, también arrastrándolos sobre la página.
- **Descarga con un solo botón** (`⤓ Descargar`) que pregunta el formato: el
  texto en `.md`, la página entera en `.html` con tu documento dentro (esa
  copia funciona a doble clic, sin servidor) o la vista en `.png` como imagen,
  hecha con el propio navegador y sin librerías.
- **Comparte** (`➦ Compartir`): copia el enlace de la plantilla en uso, envía
  el archivo `.md` por la hoja de compartir del sistema, copia el Markdown en
  crudo, o **copia con formato**: la vista ya renderizada, lista para pegar en
  un correo o un documento que admita texto enriquecido, con negritas, tablas
  y títulos incluidos. También **publica la plantilla en la Comunidad**: sube
  anónima y pública a Firestore (por REST, con `fetch` a secas y sin SDK) y te
  llevas un enlace `?p=<id>` para dársela a quien sea. La categoría
  **Comunidad** de la galería enseña lo publicado por todo el mundo; nada sale
  a internet hasta que entras ahí o pulsas Publicar. Lo que publicas desde tu
  navegador lleva un botón **retirar** en su propia tarjeta —solo tú lo ves, y
  solo mientras sea ese mismo navegador— para deshacerlo cuando quieras.
- **Cuenta de Google, opcional** (`◐ Cuenta`): documentos privados sincronizados
  con Firestore por REST (`fetch` a secas, sin el SDK de Google) y OAuth 2.0
  escrito a mano. Sondea cada 4 segundos; si dos pestañas o dos equipos editan
  el mismo documento, **nunca se pisa nada en silencio** — la versión más vieja
  queda a un lado como copia "(conflicto, hora)". La colaboración es por enlace
  (`?doc=<id>&u=<uid>`): a quien lo abre se le agrega solo como colaborador. No
  es tiempo real (no hay CRDT): es sondeo con red de seguridad.
- **Lógica y electricidad como texto**: tablas de verdad con operadores
  `&&`/`||`/`!` y escaleras PLC estilo IEC/NEMA, con ramas y salidas múltiples
  y la fila con error marcada en rojo sin tumbar el resto del diagrama.
- **Libro, revista y periódico** (desde `Insertar`): portada, capítulos,
  artículos y columnas que se **paginan de verdad** al imprimir (numeración,
  encabezados corridos, saltos de página), con modo Folleto y Pliegos
  (imposición 2-up a caballete) y dúplex automático. Usa Paged.js
  (`paged.polyfill.min.js`, en la misma carpeta) — la única pieza de este
  proyecto que no es código propio; sin ese archivo, todo lo demás sigue
  funcionando y solo se pierde la numeración de página al imprimir.
- **Lee el documento en voz alta** (`🔊 Leer`) con la síntesis de voz del propio
  navegador: sin librerías ni voces que descargar, salta código y diagramas al
  leer un párrafo (pero sí lee un bloque de código corto si es lo único
  seleccionado), y se detiene solo si cambias de pestaña.
- **Imprime limpio**: la barra de botones y el editor no salen en el papel.
- **Se lleva bien con el traductor del navegador**: la página declara su idioma
  con `hreflang`, el documento hereda el que digan sus metadatos (`idioma: en`) y
  el código, las fórmulas y los diagramas van marcados para que no se traduzcan.
- **Aplicación instalable** (PWA): se instala desde el navegador y funciona sin
  conexión gracias al service worker.
- **Puede ser la app predeterminada para `.md`**: una vez instalada, el sistema
  operativo puede abrir cualquier archivo Markdown con ella (doble clic, clic
  derecho → "Abrir con", o marcarla como predeterminada) gracias al `manifest.webmanifest`
  (`file_handlers`). Sólo en Chrome/Edge de escritorio o ChromeOS — Firefox y
  Safari no soportan esta API todavía.
- **Sirve en el móvil**: el documento se lee cómodo en una pantalla estrecha y el
  editor se pone arriba con el resultado debajo, en vez de dos columnas
  apretadas. La barra de botones entera se recoge en un menú de tres puntos
  (`⋮`) que enseña cada acción con su nombre y su explicación — el tooltip
  que un dedo sí puede leer.

### Sintaxis que entiende el motor

Títulos ATX y setext con identificador automático o manual (`{#mi-id}`), `[TOC]`,
párrafos y saltos duros, líneas divisorias, negrita, cursiva, tachado, resaltado,
superíndice y subíndice, listas ordenadas y sin ordenar (anidadas, de tareas, con
`start`), citas y siete tipos de aviso (`> [!NOTE]`, `[!TIP]`, `[!IMPORTANT]`,
`[!WARNING]`, `[!CAUTION]`, `[!ERROR]` — este último no existe ni en GitHub — y
el alias en español `[!AVISO]`), bloques de código con vallas o con sangría,
enlaces en línea, de referencia y automáticos, imágenes y figuras, tablas con
alineación y fórmulas de hoja de cálculo en sus celdas, notas al pie con enlace
de vuelta, listas de definiciones, abreviaturas, emojis por su nombre
(`:warning:`), HTML crudo, escapes con barra invertida, diagramas `mermaid`,
fórmulas en LaTeX, rutas GPX, planos, vistas isométricas y escenas 3D
(`gpx`/`plano`/`iso`/`3d`), pizarras dibujadas a mano (`pizarra`), tablas de
verdad y escaleras PLC (`verdad`/`ladder`), libros/revistas/periódicos
paginados y metadatos al principio del documento (*front matter*). En los
metadatos, `matematicas: no` apaga las fórmulas por si el documento habla de
dólares.

## Atajos

| Atajo | Qué hace |
| --- | --- |
| <kbd>Ctrl</kbd>+<kbd>E</kbd> | Abrir o cerrar el editor |
| <kbd>Ctrl</kbd>+<kbd>K</kbd> | Abrir el catálogo de plantillas |
| <kbd>Ctrl</kbd>+<kbd>P</kbd> | Imprimir o guardar en PDF |
| <kbd>Esc</kbd> | Cerrar el catálogo |

También entiende dos direcciones directas: `?nuevo=1` abre un documento en blanco
y `?plantilla=<id>` carga una plantilla concreta (por ejemplo
`?plantilla=claudemd-proyecto`).

## Escritorio (Windows / Linux)

Además de la PWA, `escritorio/` empaqueta MDx con Electron en tres formatos:
un **instalador** de Windows (`.exe`, NSIS), un **portable** de Windows
(`.exe` suelto, sin instalar) y un **AppImage** de Linux. Los tres llevan la
aplicación entera dentro (HTML, motor, plantillas): al abrirlos no descargan
nada de `md.crgm.app` ni de ningún otro sitio, así que funcionan sin conexión
desde el primer arranque.

El instalador y el AppImage se actualizan **solos** (electron-updater
contra los Releases de este repositorio): al abrir MDx, si hay una versión
nueva se descarga en segundo plano y se instala sola al cerrar la app (o al
pulsar "Reiniciar ahora" en el aviso). El portable **no** se actualiza solo
— es un único `.exe` sin una ubicación fija donde dejar la versión nueva —,
así que cada copia se queda tal como se descargó; para tener actualizaciones
automáticas hay que usar el instalador.

👉 **[Guía rápida](docs/GUIA-RAPIDA.md)** — cómo abrir cada uno, qué hacer si
Windows avisa "protegió tu PC" o si el `.AppImage` no hace nada en Debian, y
cómo dejarlos como aplicación predeterminada para `.md`.

Se generan con:

```bash
cd escritorio
npm install             # una vez, para traer electron/electron-builder/electron-updater
npm run build            # los tres a la vez (sin publicar)
npm run build:win         # solo Windows (instalador + portable)
npm run build:linux       # solo Linux (AppImage)
```

### Publicar una versión nueva

Compilar a mano en un solo ordenador es lo que hacía que el `.exe` portable
tardara tanto en abrir en otros equipos — Windows Defender y SmartScreen
solo "confían" rápido en un archivo en la máquina donde ya lo vieron antes,
y el portable siempre se re-extrae entero en una carpeta temporal cada vez
que se abre. Por eso ahora la compilación de verdad ocurre en
[`.github/workflows/build-desktop.yml`](.github/workflows/build-desktop.yml):
máquinas limpias de GitHub (una Windows, una Linux) compilan ambos sistemas
y publican los archivos directamente como *Release* del repositorio — nadie
depende de que "este ordenador" siga existiendo.

```bash
# subir la versión en escritorio/package.json, luego:
git tag escritorio-v1.0.1
git push origin escritorio-v1.0.1
```

Eso dispara el workflow, que compila y sube el instalador, el portable y el
AppImage al Release `escritorio-v1.0.1`, junto con `latest.yml` /
`latest-linux.yml` (los manifiestos que usa electron-updater para saber que
hay algo nuevo). No hace falta ninguna clave propia: usa el `GITHUB_TOKEN`
que las Actions traen incluido. También se puede lanzar a mano desde la
pestaña *Actions* del repositorio, sin publicar, solo para comprobar que
compila.

## Qué hay en el repositorio

```
index.html            La aplicación entera: estilos, motor, interfaz y catálogo
manifest.webmanifest  Nombre, iconos y accesos directos de la aplicación
sw.js                 Service worker: guarda la aplicación para usarla sin conexión
paged.polyfill.min.js Paginador de Publicaciones (libro/revista/periódico); sin
                      este archivo, todo lo demás sigue funcionando igual
iconos/               Icono en SVG y en PNG (normal, maskable, favicon, Apple)
favicon.ico           Icono para las pestañas antiguas
plantillas/           Las 118 plantillas en .md e indice.json que las describe
herramientas/         empaquetar.py: mete el catálogo dentro de index.html
CNAME                 md.crgm.app
.nojekyll             Para que GitHub Pages sirva los archivos tal cual
```

## Publicarlo en GitHub Pages

1. Sube esta carpeta a un repositorio, por ejemplo `md_crgm_app`.
2. En *Settings → Pages*, en **Source** elige `Deploy from a branch` y la rama
   `main` con la carpeta `/ (root)`.
3. En **Custom domain** escribe `md.crgm.app` y marca *Enforce HTTPS* cuando
   GitHub termine de emitir el certificado.
4. En el DNS del dominio `crgm.app` añade un registro **CNAME**:

   | Tipo | Nombre | Valor |
   | --- | --- | --- |
   | CNAME | `md` | `<tu-usuario>.github.io.` |

   Si usas Cloudflare, deja la nube **gris** (solo DNS) mientras GitHub emite el
   certificado; después ya puedes ponerla naranja si quieres.
5. Espera unos minutos y entra en <https://md.crgm.app>.

El archivo `CNAME` ya está en el repositorio, así que el paso 3 se rellena solo.

## Añadir o cambiar plantillas

1. Escribe el documento en `plantillas/mi-plantilla.md`. Si es un archivo de
   Claude Code, el *front matter* va lo primero de todo y la ruta de destino
   debajo, en un comentario.
2. Añádela a `plantillas/indice.json` dentro de su categoría:

   ```json
   {
     "id": "mi-plantilla",
     "cat": "documentos",
     "archivo": "mi-plantilla.md",
     "nombre": "mi-plantilla.md",
     "titulo": "Nombre que se ve en la tarjeta",
     "destino": "—",
     "desc": "Una línea explicando para qué sirve."
   }
   ```
3. Ejecuta el empaquetador:

   ```bash
   python3 herramientas/empaquetar.py
   ```

   Mete el catálogo entero dentro de `index.html` (por eso la galería funciona
   también a doble clic, sin servidor), rehace la lista de plantillas del
   precache de `sw.js` y sube el número de `VERSION`. Sin ese último paso, quien
   ya tenga la aplicación instalada seguiría viendo la versión vieja.

   Con `--sin-subir` empaqueta sin tocar la versión, mientras pruebas.

Lo mismo vale para cualquier cambio en `index.html`: al tocarlo, sube la versión
del service worker. Quien tenga la aplicación abierta verá el aviso
«Hay una versión nueva» con su botón de **Actualizar**.

## Probarlo en local

```bash
python3 -m http.server 8777
```

Y abre <http://127.0.0.1:8777>. Con servidor funciona todo. Si abres `index.html`
a doble clic (`file://`), sigues teniendo el editor, la impresión y el catálogo de
plantillas —que viaja dentro del archivo—, pero no el service worker ni el
guardado automático en el navegador, que necesitan un origen de verdad.

## Licencia

MDx es software libre, bajo la **Licencia Pública General de GNU, versión 3**.
El texto completo está en [LICENSE](LICENSE).

```
Copyright (C) 2026 Robin Gregorio

Este programa es software libre: puedes redistribuirlo y modificarlo bajo los
términos de la Licencia Pública General de GNU, versión 3, tal como la publica
la Free Software Foundation.

Se distribuye con la esperanza de que sea útil, pero SIN NINGUNA GARANTÍA; ni
siquiera la garantía implícita de COMERCIALIZACIÓN o de IDONEIDAD PARA UN FIN
DETERMINADO. Consulta la Licencia Pública General de GNU para más detalles.
```

En la práctica, para quien recibe MDx: puede usarlo para lo que quiera, copiarlo
y repartirlo — las plantillas están pensadas justo para eso. Si modifica y
reparte su versión (incluidos los portables de Electron o el `.apk`), tiene que
publicarla también bajo la GPL v3 y dar acceso al código.

**Código fuente:** <https://github.com/robindanilo2218/MDx>

El empaquetado de escritorio (`escritorio/`) usa Electron como motor de
ventana — es MIT, y no entra en conflicto con la GPL v3 del propio MDx: es el
mismo caso que distribuir software GPL sobre un sistema operativo con licencia
permisiva.

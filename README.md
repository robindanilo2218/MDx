# Markdown · crgm

Un editor de Markdown de una sola página: escribes, ves el resultado al lado, lo
imprimes en PDF y te llevas **un único archivo `.html`** que sigue funcionando sin
conexión y sin depender de nada ni de nadie.

Publicado en <https://md.crgm.app>.

## Qué hace

- **Convierte Markdown a HTML** con un motor propio de unas 900 líneas: sin
  librerías, sin CDN y sin peticiones a internet. Todo está dentro de `index.html`.
- **Catálogo de plantillas** (`▤ Plantillas`, o <kbd>Ctrl</kbd>+<kbd>K</kbd>) con 55
  documentos listos para usar, repartidos en ocho categorías: habilidades y
  subagentes de Claude Code, `CLAUDE.md` / `AGENTS.md` y reglas, comandos y hooks,
  roles y prompts, cómo escribir un `.md` para una IA, documentos de trabajo
  (informes, actas, propuestas, ADR, changelog…) y trabajos académicos con la
  norma APA 7. Cada plantilla dice en qué ruta va el archivo y con qué nombre, y
  termina con las referencias de dónde sale su formato.
- **El catálogo viaja dentro del archivo**: la galería funciona igual servida por
  http que abriendo `index.html` a doble clic, sin servidor y sin conexión.
- **Dibuja diagramas** de los bloques `mermaid`: flujo, secuencia, estados y
  tarta. El dibujo es un SVG hecho en casa, sin librerías: se imprime nítido, se
  adapta al tema claro u oscuro y funciona sin conexión.
- **Dibuja fórmulas** escritas en LaTeX (`$E = mc^2$` o un bloque entre `$$`),
  traducidas a MathML y dibujadas por el propio navegador: cero fuentes que
  descargar.
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
- **Tus propias plantillas**: guarda el documento que tengas abierto en
  *Mis plantillas* y reutilízalo cuando quieras.
- **Abre archivos** `.md` de tu equipo, también arrastrándolos sobre la página.
- **Descarga** el texto en `.md` o la página entera en `.html` con tu documento
  dentro; esa copia funciona a doble clic, sin servidor.
- **Imprime limpio**: la barra de botones y el editor no salen en el papel.
- **Aplicación instalable** (PWA): se instala desde el navegador y funciona sin
  conexión gracias al service worker.
- **Sirve en el móvil**: el documento se lee cómodo en una pantalla estrecha y el
  editor se pone arriba con el resultado debajo, en vez de dos columnas
  apretadas.

### Sintaxis que entiende el motor

Títulos ATX y setext con identificador automático o manual (`{#mi-id}`), `[TOC]`,
párrafos y saltos duros, negrita, cursiva, tachado, resaltado, superíndice y
subíndice, listas ordenadas y sin ordenar (anidadas, de tareas, con `start`),
citas y avisos de GitHub (`> [!NOTE]`, `> [!AVISO]`…), bloques de código con
vallas o con sangría, enlaces en línea, de referencia y automáticos, imágenes y
figuras, tablas con alineación, notas al pie con enlace de vuelta, listas de
definiciones, abreviaturas, emojis por su nombre (`:warning:`), HTML crudo,
escapes con barra invertida, diagramas `mermaid`, fórmulas en LaTeX y metadatos
al principio del documento (*front matter*). En los metadatos, `matematicas: no`
apaga las fórmulas por si el documento habla de dólares.

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

## Qué hay en el repositorio

```
index.html            La aplicación entera: estilos, motor, interfaz y catálogo
manifest.webmanifest  Nombre, iconos y accesos directos de la aplicación
sw.js                 Service worker: guarda la aplicación para usarla sin conexión
iconos/               Icono en SVG y en PNG (normal, maskable, favicon, Apple)
favicon.ico           Icono para las pestañas antiguas
plantillas/           Las 55 plantillas en .md e indice.json que las describe
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

[MIT](LICENSE) © 2026 Robin Gregorio. Copia, cambia y publica lo que quieras;
las plantillas están para eso.

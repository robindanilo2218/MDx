# MDx — Especificación v2: Sistema de Bloques Extensibles

> Reemplaza a `gpx-integracion-mdcrgm-spec.md` (v1). Consolida el bloque GPX corregido
> (SVG propio, sin Leaflet, sin CDN) y lo generaliza a un sistema de bloques con vallas
> para toda la app: planos, 3D, pizarra, diagramas eléctricos y más.
> Pensado para ser leído por Claude Code antes de tocar código.

---

## 0. Qué cambia respecto a la v1

1. **Bloques con vallas, no divisores.** `--- GPX ---` se descarta: en MDx cada `---`
   ya abre diapositivas, y el mecanismo de extensión establecido son los bloques con
   vallas (` ```mermaid `). Todo lo nuevo usa ` ```tipo `. Bonus: en GitHub o cualquier
   otro visor, un bloque con vallas degrada a un bloque de código legible.
2. **Sin Leaflet, sin CDN, sin teselas.** La v1 contradecía la filosofía de la app
   (sin librerías, sin CDN, sin peticiones a internet). La ruta, colores, waypoints y
   estadísticas son geometría pura → SVG propio, offline. El contexto de mapa se
   obtiene **una sola vez** como datos vectoriales (Overpass) y se incrusta en el
   documento. Nota de política: el servidor de teselas de OSM prohíbe guardar teselas
   para uso sin conexión; los **datos** de OSM sí son libres (con atribución).
3. **Nuevas vistas GPX:** 3D con cortina de elevación, perfil de elevación,
   zoom/paneo/rotación, estadísticas de cuestas.
4. **Fondo por captura del usuario** con calibración de 2 puntos.
5. **Nuevos bloques:** `svg`, `plano`, `iso`, `3d`, `ladder`, `chart`, `qr`, `pizarra`.
6. **Pizarrón global** y **lápiz en modo Presentar**.
7. **Motor 3D compartido** (se escribe una vez, lo usan `gpx`, `iso` y `3d`).

---

## 1. Filosofía y restricciones (innegociables)

- Toda la app vive en `index.html`: motor propio, sin librerías, sin CDN, sin
  peticiones a internet en el uso normal.
- Cada renderer nuevo son **líneas añadidas a index.html** — ese es el presupuesto.
  El motor actual de Markdown ronda las 900 líneas; el total de esta spec añade
  ~1 800–2 200 líneas repartidas en fases (sección 13).
- El documento descargado como `.html` único lleva los renderers dentro: un informe
  de ruta o un plano sigue siendo interactivo dentro de diez años, sin conexión.
- APIs permitidas: solo las nativas del navegador (`DOMParser`, `FileReader`,
  Pointer Events, SVG, canvas, `requestAnimationFrame`).
- Excepción única y explícita a "sin internet": el botón **opcional** de contexto
  OSM (sección 3.7), que hace **una** petición, incrusta el resultado en el
  documento y no vuelve a pedir nada.

---

## 2. Convención general: bloques con vallas + despacho

### 2.1 Sintaxis

````
```gpx vista=3d exageracion=3
<contenido del bloque>
```
````

- La palabra tras las vallas es el **tipo**; lo que sigue en la misma línea son
  **parámetros** `clave=valor` (la "info string", igual que ya se lee `mermaid`).
- Fuera de los bloques, todo es Markdown normal de MDx (imágenes, tablas,
  formularios, fórmulas…) arriba, abajo y entre bloques.

### 2.2 Tabla de despacho interna

```javascript
const BLOQUES = {
  mermaid: dibujarMermaid,          // ya existe
  gpx:     dibujarGpx,
  svg:     dibujarSvgCrudo,
  plano:   dibujarPlano,
  iso:     dibujarIso,
  '3d':    dibujar3d,
  ladder:  dibujarLadder,
  chart:   dibujarChart,
  qr:      dibujarQr,
  pizarra: dibujarPizarra
};
// En el motor: si el lenguaje de la valla está en BLOQUES, se despacha;
// si no, sigue siendo un bloque de código coloreado como hasta ahora.
```

### 2.3 Bloques gestionados (companion)

Algunos bloques necesitan guardar datos que la **app** genera (contexto OSM,
imagen calibrada). Van en un bloque companion inmediatamente después, escrito y
reescrito por la app, que el usuario no edita a mano:

````
```gpx
<gpx>…</gpx>
```
```gpx-datos
{ "contexto": {…}, "imagen": "data:image/png;base64,…", "calibracion": {…} }
```
````

Razón: el GPX queda puro y portable a cualquier otra app; el enriquecimiento vive
aparte; borrar el bloque `gpx-datos` reinicia el estado sin perder la ruta.
(Mismo patrón que ya usa MDx: los formularios guardan lo rellenado dentro del
propio Markdown.)

---

## 3. Bloque ```gpx (v2)

### 3.1 Sintaxis y parámetros

````
```gpx vista=2d exageracion=3 color=velocidad
<?xml version="1.0"?>
<gpx version="1.1">…</gpx>
```
````

| Parámetro | Valores | Default |
|---|---|---|
| `vista` | `2d` \| `3d` \| `perfil` | `2d` |
| `exageracion` | factor vertical del 3D | `3` |
| `color` | `velocidad` \| `pendiente` | `velocidad` |

La vista inicial la fija el parámetro; el usuario alterna con botones 2D / 3D / Perfil
en el bloque renderizado (la elección de sesión no reescribe el documento).

### 3.2 Parser (qué se lee del GPX)

- `<trkpt lat lon>` con `<ele>` y `<time>` → puntos del recorrido real.
- `<rtept>` dentro de `<rte>` → ruta **planificada** (si existe, se dibuja punteada
  gris bajo el track real: comparación plan vs realidad).
- `<wpt lat lon>` → notas y puntos de referencia, con:
  - `<name>`, `<desc>`, `<cmt>` (comentario corto)
  - `<sym>` (símbolo estándar, p. ej. `Gas Station`)
  - `<type>` (categoría libre: `combustible`, `cliente`, `parada`, `incidente`…)
  - `<link href="…">` (URLs — fotos del punto, p. ej. Drive; se muestran en el
    popup y en la lista)
  - `<time>`, `<extensions>` (se conservan tal cual; Garmin guarda ahí dirección
    y teléfono — un negocio completo cabe en un waypoint)
- `<metadata>`: nombre, autor, fecha, bounds (si vienen, se usan para el encuadre).

**Color de waypoint:** por `<type>` contra una tabla (`combustible→#FFD700`,
`incidente→#FF0000`, `cliente→#00AA00`, `parada→#FF8800`, default `#0099FF`);
si no hay `<type>`, fallback por palabra clave en `<name>` (compatibilidad v1).

### 3.3 Estadísticas

Las de la v1 (distancia por aproximación equirectangular, velocidad media/máx/mín,
desnivel positivo, tiempo total, cuartiles de velocidad) **más**:

- **Pendiente media y máxima** (%): `Δele / Δdist_horizontal × 100` por segmento.
- **Comportamiento en cuestas:** velocidad media clasificando cada segmento por
  pendiente — *subida* (> +2 %), *llano* (−2 % a +2 %), *bajada* (< −2 %). Tres
  números que responden "¿cómo maneja en cuesta?".
- Segmentos sin timestamps: sin velocidad calculable → esos segmentos van en gris
  y las estadísticas de velocidad indican "parcial".

### 3.4 Vista 2D — marco limpio (default, cero internet)

- `viewBox` ajustado al bounding box de la ruta + 5 % de margen.
- **Barra de escala** (longitud redonda: 100 m / 500 m / 1 km según extensión),
  **flecha norte**, cuadrícula tenue opcional.
- Polilínea coloreada por cuartil (verde/amarillo/naranja/rojo), marcadores de
  inicio (verde) y fin (rojo), waypoints con su color de `<type>` y popup
  (nombre, desc, hora, miniaturas de `<link>` si son imágenes).
- **Zoom y paneo:** rueda del mouse / pellizco de dos dedos escala el `viewBox`;
  arrastre lo desplaza. ~60 líneas con Pointer Events. Doble clic/tap: reencuadrar.

### 3.5 Vista 3D — cortina de elevación

**Conversión a mundo local** (ejes: `x` = este en metros, `y` = norte en metros,
`z` = altura exagerada):

```javascript
const lat0 = latMin, lon0 = lonMin, k = Math.cos(lat0 * Math.PI / 180);
const x = (lon - lon0) * 111320 * k;
const y = (lat - lat0) * 110574;
const z = (ele - eleMin) * EXAGERACION;   // default 3; el desnivel real es
                                          // diminuto frente a la distancia
```

**Dibujo:** la ruta es la arista superior; bajo cada segmento se pinta un
cuadrilátero semitransparente hasta el suelo (la "cortina") — las cuestas se ven:

```javascript
// un cuadrilátero por segmento (conceptual; R() = rotar+proyectar del motor 3D)
const a  = R(p[i]),            b  = R(p[i+1]);
const a0 = R({...p[i], z: 0}), b0 = R({...p[i+1], z: 0});
poligonos.push({
  d: `M${a0.x} ${a0.y} L${a.x} ${a.y} L${b.x} ${b.y} L${b0.x} ${b0.y} Z`,
  color: colorSegmento(i)   // por velocidad o por pendiente según `color=`
});
```

Además: rectángulo de suelo tenue, la sombra de la ruta proyectada en z=0, y los
waypoints como agujas verticales con su etiqueta.

**Interacción:** arrastrar rota (`yaw += dx·0.01`, `pitch += dy·0.01`, yaw
acotado ±50° y pitch acotado 20°–65° — ver 3.10, casi isométrico); rueda/pellizco
escala; botones 2D / 3D / Perfil alternan vista. Redibujo dentro de
`requestAnimationFrame`.

**Rendimiento:** para la vista 3D interactiva, simplificar el track a ≤ 400 puntos
con Douglas-Peucker (la 2D y las estadísticas usan todos los puntos):

```javascript
function simplificar(pts, tol) {
  if (pts.length < 3) return pts;
  const a = pts[0], b = pts[pts.length - 1];
  let imax = 0, dmax = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = distPuntoSegmento(pts[i], a, b);   // distancia perpendicular estándar
    if (d > dmax) { dmax = d; imax = i; }
  }
  if (dmax > tol) {
    const izq = simplificar(pts.slice(0, imax + 1), tol);
    const der = simplificar(pts.slice(imax), tol);
    return izq.slice(0, -1).concat(der);
  }
  return [a, b];
}
```

### 3.6 Vista Perfil

Gráfica 2D: `x` = distancia acumulada, `y` = elevación, línea coloreada por el
mismo criterio (`velocidad` o `pendiente`). Tocar/pasar el cursor muestra
km recorridos, velocidad y altitud del punto. Los waypoints aparecen como marcas
verticales con su nombre. ~120 líneas.

### 3.7 Contexto OSM incrustado (una sola vez, opcional)

- El bloque renderizado muestra un botón **"Obtener contexto del mapa (una vez)"**
  cuando no hay contexto en `gpx-datos`.
- Al pulsarlo: una consulta a Overpass API con el bbox de la ruta:

```
[out:json][timeout:25][bbox:S,O,N,E];
(
  way[highway~"motorway|trunk|primary|secondary|tertiary|residential|unclassified"];
  way[waterway~"river|stream"];
  node[amenity~"fuel|restaurant|hospital|police"];
);
out geom;
```

  `out geom` devuelve coordenadas inline, listas para dibujar sin resolver
  referencias. Endpoint por defecto: `https://overpass-api.de/api/interpreter`
  (configurable, pregunta abierta 14.6).
- La respuesta se **simplifica** (solo coordenadas + una etiqueta de clase por
  elemento) y se escribe en `gpx-datos.contexto`. Desde entonces el render es
  100 % offline.
- **Dibujo:** calles en gris (grosor por clase), ríos en azul tenue, POIs como
  puntitos con nombre — todo detrás de la ruta, respetando tema claro/oscuro.
- **Atribución obligatoria y visible** en la esquina del dibujo:
  `© OpenStreetMap contributors` (los datos son ODbL; la atribución no es opcional).
- **Botón "añadir a la ruta":** cualquier POI del contexto se convierte en `<wpt>`
  del GPX con `<type>` y `<sym>` — "qué hay alrededor" pasa a ser parte del archivo.

### 3.8 Fondo por captura del usuario (calibración de 2 puntos)

Para quien prefiere su propia captura de pantalla de cualquier mapa:

1. Botón **"Usar captura como fondo"** → `FileReader` → dataURL → se guarda en
   `gpx-datos.imagen`.
2. **Calibración:** la app resalta dos puntos conocidos de la ruta (por defecto
   inicio y fin; el usuario puede elegir dos waypoints) y pide: *"toca en la
   imagen dónde está el inicio… ahora dónde está el fin"*. Dos pares
   (geo → píxel) bastan para resolver escala + rotación + traslación:

```javascript
// Transformación de semejanza a partir de 2 pares (método del número complejo).
// g* en metros locales (sección 3.5), p* en píxeles de la imagen.
function calibrar(g1, p1, g2, p2) {
  const gx = g2.x - g1.x, gy = g2.y - g1.y;
  const px = p2.x - p1.x, py = p2.y - p1.y;
  const d = gx * gx + gy * gy;
  const a = (gx * px + gy * py) / d;      // parte real  (escala·cos θ)
  const b = (gx * py - gy * px) / d;      // parte imag. (escala·sen θ)
  return { a, b, tx: p1.x - (a * g1.x - b * g1.y),
                 ty: p1.y - (b * g1.x + a * g1.y) };
}
function geoAPixel(g, c) {
  return { x: c.a * g.x - c.b * g.y + c.tx,
           y: c.b * g.x + c.a * g.y + c.ty };
}
```

3. La calibración se guarda en `gpx-datos.calibracion`; el render pone
   `<image href="dataURL">` como capa base y la ruta encima en coordenadas de
   imagen. Determinista, offline, para siempre. Ajuste fino opcional: arrastrar /
   escalar la capa de ruta con dos tiradores.
4. **Peso:** avisar si la imagen incrustada supera ~500 KB (el documento crece).
5. **Licencias, en el momento justo:** al **Publicar en Comunidad** un documento
   con captura de fondo, mostrar aviso: capturas de mapas propietarios (Google,
   etc.) no deben republicarse; capturas basadas en OSM requieren la atribución
   `© OpenStreetMap contributors`. Para uso personal no se molesta al usuario.

### 3.9 Importar un archivo `.gpx` real (adelgazado) — hecho 29-ago-2026

Un `.gpx` exportado por un reloj/teléfono/app trae metadatos, un `<wpt>` con
`<desc>` largo y extensiones propias del fabricante en su propio namespace
(p. ej. `geotracker:*` de la app Geo Tracker) que `parseGPX()` **ya ignora**
al dibujar — busca `trkpt`/`rtept`/`wpt` por nombre de etiqueta sin namespace,
así que cualquier prefijo desconocido simplemente no lo encuentra. Pero pegar
el archivo entero tal cual infla el `.md` sin necesidad.

**`+ Insertar` → `Mapas y dibujo técnico` → `Importar archivo .gpx…`** abre
un selector de archivo, lee el `.gpx` y `gpxAdelgazar(xmlTexto)`
(`index.html`) reconstruye un GPX mínimo con solo `trkpt`/`rtept` (lat, lon,
ele, time) y `wpt` (lat, lon, ele, name, desc) — mismo `DOMParser` que
`parseGPX`, así que namespaces y tags desconocidos se descartan solos. El
resultado se inserta como `​```gpx vista=2d` en el cursor, vía `meterTexto`.

Probado con el archivo real de un usuario (Geo Tracker, 415 KB, 3084 trkpt,
1 wpt): 27 % menos de bytes tras adelgazar — la mayoría del peso original ya
eran puntos de ruta genuinos, no metadata; la reducción real está en
descartar `<metadata>`, `<extensions>` y la indentación. Mapa 2D renderiza
igual que con el archivo pegado a mano.

**Nota honesta:** la sección 3.2 de arriba dice que las `<extensions>` de un
`<wpt>` "se conservan tal cual" (p. ej. Garmin guarda ahí dirección y
teléfono) — pero el código actual de `parseGPX()` **no lee `<extensions>`
en ningún lado** (confirmado por grep: cero ocurrencias en `index.html`).
Esa parte de 3.2 describe una ambición no implementada, no el comportamiento
real. `gpxAdelgazar()` descarta `<extensions>` de forma consistente con lo
que el motor realmente usa hoy — si algún día se implementa el "negocio
completo cabe en un waypoint" de 3.2, `gpxAdelgazar()` necesitaría
preservarlas también.

### 3.10 Giro acotado + botón Norte en la vista 3D — hecho 30-ago-2026

Feedback de usuario: con `yaw` totalmente libre (360°) y `pitch` acotado solo
0°–85° (nunca invertía la base, pero sí llegaba casi vertical), giraba tanto
que perdía de vista cuál lado era el piso. Pedido explícito: que se vea
"2.5D o isométrico", girando poco para que la base quede siempre abajo, más
un botón que reoriente.

**`motor3dActivar(el, estado, redibujar, limites)`** (`index.html`) ahora
acepta un cuarto parámetro opcional `{yawMin, yawMax, pitchMin, pitchMax}`.
Sin él, se comporta exactamente igual que antes (yaw libre, pitch 0°–85°) —
así el bloque `​```3d` alámbrico genérico, que sí necesita poder ver un objeto
desde cualquier lado, no cambia. Solo la vista 3D del `​```gpx` pasa límites
angostos:

```javascript
var GPX3D_LIMITES = {
  yawMin: -Math.PI * 50 / 180, yawMax: Math.PI * 50 / 180,
  pitchMin: Math.PI * 20 / 180, pitchMax: Math.PI * 65 / 180
};
```

El ángulo inicial ya elegido (`yaw:-0.6 pitch:0.55` rad, ~-34°/32°) cae cómodo
dentro de ese rango, así que la primera vista no cambió — solo se acotó cuánto
se puede girar desde ahí.

**Botón "▲ N"** (`.gpx-boton-norte3d`, esquina superior derecha del SVG 3D,
mismo estilo que la insignia `.gpx-norte` de la vista 2D): al pulsarlo,
`yaw` vuelve a `0` y `pitch` a `GPX3D_PITCH_DEF` (0.55) — en `yaw:0` los ejes
este/norte no están rotados entre sí, la orientación más cercana a "igual que
el mapa 2D" que permite esta cámara (ver el comentario de `GPX3D_LIMITES` en
`index.html` sobre por qué el eje de giro no es una brújula real: `yaw` gira
el par este/altura y deja el norte fijo, herencia de que la vista es una
"cortina de elevación" y no una cámara orbital clásica). El botón no toca el
zoom (`escala`), solo reorienta. No aparece en la vista 2D ni en impresión/PDF.

Verificado con Puppeteer: un arrastre extremo (900px en diagonal) no logra
sacar la base de la vista ni invertirla; repetir el mismo arrastre extremo no
sigue moviendo la escena (el clamp realmente tope); el botón Norte produce
siempre el mismo resultado sin importar desde qué ángulo se pulse.

---

## 4. Bloque ```svg — vectores crudos

Pasa el SVG del bloque directo al DOM, **saneado**: se eliminan `<script>`,
`<foreignObject>`, atributos `on*` y cualquier `href`/`xlink:href` que empiece
por `javascript:`. Lista blanca simple, ~40 líneas. Poder total para quien sabe
SVG; base de pruebas para todos los demás bloques.

---

## 5. Bloque ```plano — planos 2D con estadísticas

### 5.1 DSL

````
```plano
escala 1m = 40px
muro 0,0 → 10,0 → 10,8 → 0,8 → 0,0
muro 6,0 → 6,8
puerta 2,0 ancho 1
puerta 6,4 ancho 0.9
ventana 10,3 ancho 1.5
texto 3,4 Sala
texto 8,4 Dormitorio
cota 0,0 → 10,0
```
````

- `muro` acepta cadenas de puntos (polilínea) — una casa en pocas líneas.
- `puerta` y `ventana` se colocan **sobre** el muro más cercano al punto dado
  (se proyecta a la pared y se abre el hueco): el usuario no calcula ángulos.
- `cota` dibuja línea de medida acotada con flechas y el valor en metros.

### 5.2 Render y simbología

SVG propio: muros como trazo grueso (0.2 m a escala), puertas como arco de
apertura (simbología arquitectónica), ventanas como línea triple, textos
centrados, cotas con flechas. Tema claro/oscuro. La vista sale por el export PNG
que ya existe.

### 5.3 Estadísticas automáticas (la jugada del GPX aplicada a planos)

- **Área por recinto cerrado** (fórmula del polígono/shoelace sobre los ciclos
  cerrados de muros) y área total.
- **Metros lineales de muro** y conteo de aberturas → base para estimar
  materiales (block, pintura) en una tabla bajo el dibujo.

Presupuesto: ~200–250 líneas.

---

## 6. Bloque ```iso — vista isométrica (2.5D)

````
```iso
caja 0,0,0 4,3,2.5 Sala
caja 4,0,0 3,3,2.5 Cocina
```
````

Cada `caja x,y,z ancho,fondo,alto etiqueta` se proyecta con la isométrica clásica:

```javascript
const iso = (x, y, z) => ({ px: (x - y) * 0.866, py: (x + y) * 0.5 - z });
```

Orden de pintado por profundidad (ordenar cajas por `x + y + z`, algoritmo del
pintor simple), tres caras visibles con tres tonos del mismo color. ~100–150 líneas.

---

## 7. Bloque ```3d — alámbrico rotable

````
```3d
v A 0 0 0
v B 4 0 0
v C 4 3 0
arista A B
arista B C
caja 0,0,0 4,3,2.5
```
````

`v nombre x y z` define vértices, `arista` los une, `caja` es azúcar sintáctico
(8 vértices + 12 aristas). Rotación y zoom idénticos al GPX 3D — mismo motor
(sección 8). **Frontera declarada:** caras sólidas con luces y texturas quedan
fuera (eso es territorio de librerías de 600 kb); el alámbrico es el límite sano
y para planos se lee incluso mejor. ~150 líneas sobre el motor compartido.

---

## 8. Motor 3D compartido (`motor3d`)

Se escribe **una vez** (~120 líneas); lo usan `gpx vista=3d`, `iso` y `3d`.

```javascript
// Estado por instancia: { yaw, pitch, escala, cx, cy }
function rotarY(p, a) { const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c }; }
function rotarX(p, a) { const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c }; }
function proyectar(p, d = 800) { const f = d / (d + p.z);
  return { x: p.x * f, y: -p.y * f }; }   // y invertida para pantalla
```

Gestos (Pointer Events, sirven para mouse, dedo y stylus):
- 1 puntero arrastrando → `yaw += dx·0.01; pitch = clamp(pitch + dy·0.01, 0, 1.48)`
- rueda → `escala *= (deltaY < 0 ? 1.1 : 0.9)`
- 2 punteros → la razón entre distancias entre dedos ajusta `escala` (pellizco)
- redibujo agrupado en `requestAnimationFrame`

---

## 9. Bloque ```ladder — escalera PLC / esquemas eléctricos

Complementa el juego de plantillas de mantenimiento eléctrico industrial que la
app ya trae (LOTO, termografía, causa raíz…): la escalera del PLC o el mando del
motor viven en el mismo documento del permiso de trabajo.

````
```ladder
| [PARO/] [ARRANQUE] ---------------- (M1)  | arranque-paro con sello
| [M1] ----+                                |
| [M1] ------------ [TON T1 5s] ----- (L1)  | piloto retardado
```
````

Sintaxis por peldaño: `[X]` contacto NA, `[X/]` contacto NC, `(Y)` bobina,
`[TON Tn t]` temporizador, `+` derivación (rama en paralelo con el peldaño
anterior). Render: dos rieles verticales, peldaños horizontales, símbolos IEC
dibujados en SVG, etiquetas encima. ~200 líneas.
(Diagrama unifilar: pregunta abierta 14.4.)

---

## 10. Bloque ```chart — gráficas de datos

Complementa la tarta y el Gantt que ya existen vía mermaid, con gráficas de
**datos**:

````
```chart tipo=barras titulo=Producción
Ene 120
Feb 135
Mar 128
```
````

Tipos: `barras`, `lineas`, `dispersion` (esta última con pares `x y` por línea).
Alternativa: `origen=tabla #id` lee una tabla Markdown del documento (que ya
puede tener fórmulas de celda — las gráficas heredan los valores calculados).
Ejes autoescalados, colores del tema. ~150–200 líneas.

---

## 11. Bloque ```qr

Contenido: un texto o URL (uso estrella: el enlace `?p=<id>` de una plantilla
publicada en Comunidad). Implementación propia de QR (modo byte, corrección M):
es el bloque más caro en líneas (~300) por las tablas de Reed-Solomon — por eso
va en la última fase. Cero dependencias, como todo.

---

## 12. Pizarra y anotación

La semilla ya existe: el campo **firma** de los formularios captura trazos.
Este trabajo lo generaliza.

### 12.1 Bloque ```pizarra (permanente, dentro del documento)

Formato de almacenamiento — los trazos son **texto** dentro del bloque, así que
se versionan, se imprimen y viajan en el `.html` exportado:

````
```pizarra
tamaño 800x500
trazo #d33333 3 M12 40 Q18 35 24 38 Q31 42 40 39
trazo #1a73e8 5 M100 80 Q110 70 122 78
```
````

- Al tocar el dibujo aparece la barra: color, grosor, borrador, deshacer,
  limpiar, **Listo**. "Listo" reescribe el bloque en el Markdown (patrón de los
  formularios). Borrador = eliminar el trazo tocado; deshacer = quitar la última
  línea `trazo`.
- Captura con **Pointer Events** (`pointerdown/move/up` + `setPointerCapture`):
  mouse, dedo y stylus con el mismo código; `touch-action: none` en el lienzo.
- Suavizado con curvas cuadráticas por puntos medios:

```javascript
function trazoAPath(pts) {
  if (pts.length < 3) return `M${pts[0].x} ${pts[0].y} L${pts.at(-1).x} ${pts.at(-1).y}`;
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2;
    d += ` Q${pts[i].x} ${pts[i].y} ${mx} ${my}`;
  }
  return d;
}
```

Presupuesto: ~250–300 líneas (incluida la barra).

### 12.2 Modo Pizarrón global

Botón `✎ Pizarrón` junto a `▶ Presentar`: lienzo en blanco a pantalla completa
con la misma barra de dibujo. Al salir, tres opciones: **descartar**, **insertar**
como bloque ` ```pizarra ` al final del documento, o **descargar PNG** (reutiliza
el export PNG existente). El pizarrón *es* el documento visto de otra forma —
misma filosofía que Presentar.

### 12.3 Lápiz en modo Presentar

- Dentro de la presentación: botón de lápiz (y teclas `L` lápiz, `B` borrador,
  `C` limpiar) activa una capa transparente sobre la diapositiva actual. Trazos
  por diapositiva, navegación intacta.
- **Temporal por defecto:** al salir de Presentar se descartan.
- **"Guardar anotaciones":** añade un bloque ` ```pizarra ` al final de la
  sección de esa diapositiva en el Markdown. En vista documento se ve como
  figura; al volver a Presentar se superpone de nuevo.

### 12.4 Miniaturas, Índice, colores del lápiz y Pizarrón desde Presentar

Cuatro mejoras a la barra de Presentar (implementadas 29-ago-2026, sobre la
base de 12.3), todas navegables sin salir de la presentación:

- **Colores del lápiz:** junto a `✎ Lápiz`, cuatro muestras de color
  (`#diaLapizColores`, visibles solo con el lápiz activo). Elegir una cambia
  el color de los trazos siguientes; no activa el lápiz por sí sola.
- **`✎ Pizarrón` dentro de Presentar:** botón que abre el Pizarrón global
  (12.2) sin cerrar la sesión de Presentar — oculta `#diapositivas`, y al
  salir del Pizarrón (descartar/insertar/descargar) vuelve exactamente a la
  misma diapositiva y capa de lápiz, re-entrando a pantalla completa.
- **`⊞ Miniaturas`:** grilla de todas las diapositivas (clones reales del
  contenido, escalados con un solo `transform:scale`) dentro de `#diaCuerpo`;
  click en una salta a esa diapositiva.
- **`☰ Índice`:** lista de títulos del documento (mismo origen que "Esquema"),
  también dentro de `#diaCuerpo`; click en un título salta a su diapositiva.
  Tecla `O` la abre/cierra.

**Por qué ninguna de las dos usa el diálogo chico (`#velo2`):** durante
Presentar, `#diapositivas` está en pantalla completa real (Fullscreen API), y
su "capa superior" pinta por encima de *cualquier* elemento que no sea también
parte de ese mismo elemento fullscreen — sin importar z-index. Un diálogo
`#velo2` (que vive fuera de `#diapositivas`) queda con el DOM perfectamente
correcto pero invisible en pantalla; es el mismo problema que
`intentarSalirPizarron()` ya tenía que esquivar saliendo de pantalla completa
antes de abrir su menú. La solución aquí fue más simple: Miniaturas e Índice
reemplazan el contenido de `#diaCuerpo` (que sí es descendiente del elemento
fullscreen), igual que hace `pintarDiapositiva()` con la diapositiva normal.

Como `pintarDiapositiva()` es el único punto que reescribe `#diaCuerpo`,
abrir cualquier diapositiva nueva cierra Miniaturas/Índice automáticamente
si estaban abiertos, y `teclaDia()` trata `Escape` en capas: primero cierra
la capa transitoria abierta (miniaturas o índice), y solo si ninguna está
abierta, cierra Presentar entero.

### 12.5 Revisión adversarial de 12.4 (7 hallazgos, todos corregidos)

Una revisión adversarial de tres agentes (miniaturas, índice, ida-y-vuelta
Pizarrón↔Presentar) sobre el código de 12.4 encontró 7 fallos reales — 0
descartados — corregidos el mismo día (SW v41→v42):

- **Campos `[[Campo]]` de tipo texto/larga/firma seguían editables dentro de
  clones (Miniaturas y la diapositiva normal).** `campoHtml()` genera esos
  tipos como `<span contenteditable="true">`, no como `<input>`/`<select>`,
  así que el bloqueo anterior (deshabilitar solo `input, select, textarea`)
  no los tocaba. Nuevo helper compartido `diaNeutralizarCampos(c)` — usado por
  `pintarDiapositiva()` y `diaAbrirMiniaturas()` — que además pone
  `contentEditable = "false"` y `tabindex = "-1"` en todo `[contenteditable]`
  del clon. `tabindex="-1"` saca el campo de la navegación por `Tab`;
  `contentEditable="false"` impide escribir aunque algo le dé foco por script.
- **`Escape` durante el viaje a `✎ Pizarrón` desde Presentar cerraba TODA la
  presentación**, no solo el Pizarrón: `diaAbrirPizarron()` deja el listener
  de `teclaDia()` puesto (hace falta para volver luego), y `abrirPizarron()`
  agrega el suyo propio (`teclaPizarron`) — los dos atendían la misma tecla.
  Fix: `teclaDia()` ahora empieza con
  `if($("#diapositivas").hidden) return;`, ya que `diaAbrirPizarron()` es el
  único camino que oculta `#diapositivas` mientras `DIA` sigue vivo.
- **Reentrada a pantalla completa tras el Pizarrón podía resolverse fuera de
  tiempo si se repetía el viaje rápido.** El guardia de identidad
  `DIA !== sesion` no sirve aquí porque `DIA` es el MISMO objeto en cada
  ida-y-vuelta dentro de una sesión de Presentar. Se agregó un contador
  `DIA.vueltaPizarron`, incrementado en cada apertura, capturado como
  `vuelta` junto a `sesion`, y comprobado como
  `DIA.vueltaPizarron !== vuelta` además de la identidad.
- **Un título anidado (p.ej. `## Nota` dentro de una cita `> [!NOTA]`) no
  saltaba a su diapositiva desde el Índice.** `titulosDoc()` encuentra
  encabezados a cualquier profundidad, pero `diaSlideDeTitulo()` comparaba
  con `indexOf` solo contra los nodos de nivel superior de `DIA.grupos`.
  Fix: comparar con `g[j] === h || (g[j].contains && g[j].contains(h))`.
- **Un trazo de lápiz a medio dibujar no se cancelaba al saltar al Pizarrón**,
  dejando un `<path>` temporal huérfano. `diaAbrirPizarron()` ahora quita el
  `.pizarra-trazo-actual` en curso y limpia `DIA.enCurso` antes de ocultar
  `#diapositivas`.
- **`cerrarPresentacion()` no vaciaba `#diaCuerpo` ni quitaba `.activo` de
  `#diaMiniaturas`/`#diaEsquema`** cuando se disparaba desde el camino de
  resincronización de `pintar()` (documento vaciado mientras Miniaturas o
  Índice estaban abiertos) — dejaba nodos DOM huérfanos pero adjuntos. Fix:
  `cerrarPresentacion()` ahora limpia `#diaCuerpo` y ambos botones siempre.

Probado con `probar_dia_revision_fixes.js` (6 casos dirigidos, uno por
escenario de arriba, incluida una segunda vuelta a Pizarrón para ejercitar
`vueltaPizarron`). Regresión completa de 18 scripts en verde.

---

## 13. Presupuesto y orden de implementación

| Fase | Qué entra | Líneas aprox. |
|---|---|---|
| 1 | Despacho de bloques + `gpx` parser, estadísticas (con cuestas) y vista 2D con zoom/paneo | ~350 |
| 2 | `motor3d` + `gpx` vista 3D (cortina) + vista Perfil | ~350 |
| 3 | Contexto Overpass incrustado + captura calibrada + POIs → `<wpt>` | ~300 |
| 4 | ` ```pizarra ` + lápiz en Presentar + Pizarrón global | ~350 |
| 5 | ` ```svg ` (saneado) + ` ```plano ` + ` ```iso ` + ` ```3d ` | ~450 |
| 6 | ` ```ladder ` + ` ```verdad ` + fondos de diapositiva + subcategorías | ~520 (detalle en sección 15) |
| 7 | ` ```qr ` | ~300 |

Total ~2 200 líneas sobre `index.html` (contexto: el motor actual ronda las 900).
Sigue siendo **un solo archivo, cero dependencias, offline**. Cada fase se
entrega funcional por sí sola; tras cada cambio, subir la versión del service
worker con el empaquetador, como ya es costumbre.

---

## 14. Preguntas abiertas

1. **Saneamiento de ` ```svg `:** ¿lista blanca de etiquetas/atributos exacta, o
   basta la lista negra de la sección 4?
2. **Límites de peso de imágenes incrustadas:** ¿aviso a 500 KB y tope duro a
   2 MB, u otros valores?
3. **Flags por documento en el front matter**, al estilo de `matematicas: no`:
   p. ej. `gpx: no` para apagar renderers en un documento concreto.
4. **Unifilar:** decidido por ahora — **bloque propio, no dentro de ` ```ladder `**
   (ver sección 15.1: son familias de diagrama distintas — contactos/lógica de
   mando contra líneas de potencia/distribución — y mezclarlas complicaría el
   parser de las dos sin necesidad). Sin fecha; se retoma si se pide.
5. **Color por defecto del GPX:** ¿`velocidad` siempre, o `pendiente` cuando el
   track no trae timestamps?
6. **Servidor Overpass:** `overpass-api.de` por defecto — ¿configurable en
   ajustes para poder cambiarlo si se satura?
7. **Anotaciones de Presentar:** ¿el bloque guardado lleva un parámetro
   (`sobre=diapositiva`) para distinguirlo de una pizarra normal?

---

## 15. Fase 6 — lógica, electricidad, categorías y fondos (PLAN, sin implementar)

Investigado el 29-ago-2026 a pedido explícito: sin código todavía, para que
se revise el enfoque antes de tocar `index.html`. Cuatro piezas independientes
entre sí — se pueden implementar en cualquier orden o por separado.

### 15.1 ` ```ladder ` — completa lo ya definido en la sección 9, con norma IEC/NEMA — hecho 30-ago-2026

**Corrección importante:** la sintaxis de ` ```ladder ` **ya estaba definida
en la sección 9** de este mismo spec (ASCII-art posicional: `[X]` NA, `[X/]`
NC, `(Y)` bobina, `[TON Tn t]` temporizador, `+` para la derivación que arma
una rama en paralelo, alineando columnas como en el ejemplo de esa sección).
Esta subsección no reemplaza esa sintaxis — la completa con lo que se
investigó ahora a pedido explícito: la diferencia entre "europeo" y
"americano".

**Qué es esa diferencia, y qué no:** IEC 60617 (Europa) y NEMA-NFPA
(Norteamérica) difieren solo en el **dibujo del símbolo**, no en la lógica:
un contacto NA es `─┤ ├─` en IEC y `─] [─` en NEMA; uno NC añade una diagonal
en ambos (`─┤/├─` / `─]/[─`). La sintaxis de entrada `[X]`/`[X/]`/`(Y)` de la
sección 9 ya coincide con el ASCII-art estándar de facto del propio
IEC 61131-3 (el estándar de programación de PLC) — sirve igual para dibujar
cualquiera de las dos normas. Así que el único cambio real es un parámetro
de bloque, mismo patrón que `​```gpx vista=2d/3d/perfil`:

```
​```ladder norma=nema
| [PARO/] [ARRANQUE] ---------------- (M1)  | arranque-paro con sello
| [M1] ----+                                |
| [M1] ------------ [TON T1 5s] ----- (L1)  | piloto retardado
​```
```

- `norma=iec` (por defecto) o `norma=nema` — solo cambia qué símbolo SVG se
  dibuja para contacto/bobina/temporizador, nunca el texto de entrada.
  Cambiar de norma después de escrito el diagrama no rompe nada; son dos
  hojas de símbolos para el mismo `ladderRenderSVG`.
- El parser de la sección 9 es posicional (columna de cada `[...]`/`(...)`
  importa, para saber dónde conecta cada `+` de derivación) — no es un
  parser línea-por-línea de comandos como `plano`/`iso`. Vale la pena
  detallar ese algoritmo exacto (cómo se detecta a qué peldaño anterior
  conecta un `+`) antes de escribir código, para no dejarlo ambiguo.
- Extensión natural, no decidida aún: contador (`[CTU Cn n]` / `[CTD Cn n]`)
  al lado de `[TON Tn t]`, mismo criterio de norma.
- **Fuera de esta fase (ver pregunta abierta #4):** el diagrama **unifilar**
  (líneas de potencia trifásica, transformadores, disyuntores, motores) es
  una familia de diagrama distinta — no contactos/bobinas sino flujo de
  energía — y se deja como bloque propio (` ```unifilar `) para una fase
  futura si se pide, en vez de forzarlo dentro de `​```ladder`.

**Implementado tal cual el plan de arriba**, con el algoritmo de columnas
detallado y verificado (era justo el punto que este plan dejaba pendiente
de precisar antes de programar):

- **El algoritmo de columnas, explicado:** cada símbolo (`[X]`, `[X/]`,
  `[TON Tn t]`, `(Y)`) guarda su **columna** tal cual el índice de carácter
  donde arranca en la línea original (contando desde el `|` de apertura). El
  render pasa esa columna a píxeles con un ancho de carácter fijo
  (`LADDER_CHAR_W = 11`) — **igual para todas las líneas del diagrama**. La
  clave que evita tener que decidir "a qué contacto del peldaño de arriba se
  pega el `+`": el cable de CADA peldaño se dibuja como una línea horizontal
  **continua** de riel a riel (o de riel al propio `+`, si es una
  derivación) — así que el conector vertical de una derivación, dibujado en
  esa misma columna-x, siempre cae sobre cable real del peldaño ancla, sea
  cual sea el contacto más cercano. No hace falta averiguar "el `+` está
  pegado a tal símbolo" — basta con que la x coincida, y coincide porque el
  usuario alineó el texto así.
- **A qué peldaño ancla un `+`:** al peldaño **completo** (con bobina) más
  cercano **hacia arriba** en el mismo bloque — un barrido simple hacia
  atrás desde la línea de la derivación. No se contempló anclar hacia abajo
  ni entre dos derivaciones consecutivas (fuera de alcance de v1; cubre el
  caso de sello del ejemplo de la sección 9 y el patrón típico de contactos
  auxiliares en paralelo).
- **Limitación de v1, deliberada:** un peldaño es o bien "completo" (termina
  en bobina) o bien "derivación" (termina en `+`, sin bobina) — el `+` debe
  ser el último carácter no-espacio/no-guión de la línea. No se soportan
  múltiples `+` en una misma línea ni derivaciones anidadas. Cubre el patrón
  de la sección 9 y los casos reales típicos (sellos, enclavamientos
  simples); ampliar a ramas más complejas queda para si se necesita.
- **Formato de línea:** `| <contenido> | <comentario opcional>` — el primer
  `|` (tolerando espacios en blanco por delante, para permitir indentar todo
  el bloque parejo) abre el peldaño, el segundo `|` (si existe) separa el
  contenido del comentario libre que se muestra a la derecha del riel
  derecho. Símbolos reconocidos dentro del contenido: `[X]` NA, `[X/]` NC,
  `[TON Tn t]` temporizador (acepta segundos con decimales, `s` opcional),
  `(Y)` bobina, `+` derivación; `-` y espacios son relleno visual sin efecto
  semántico. Cualquier otro carácter, o un `[...]`/`(...)` mal formado, o un
  peldaño sin bobina y sin `+`, o con las dos cosas a la vez, es un error
  con el número de línea y columna cuando aplica.
- **Símbolos IEC vs. NEMA — fuentes verificadas antes de dibujar** (dado que
  el destinatario real es un electricista de mantenimiento, no vale la pena
  arriesgar un símbolo mal recordado): IEC 60617 dibuja el contacto NA como
  dos barras verticales paralelas con hueco; NEMA lo dibuja con dos líneas
  **diagonales**; el contacto NC agrega una diagonal/puente cruzando el
  hueco en ambas normas. La diferencia más marcada entre normas es la
  **bobina**: rectángulo en IEC, círculo en NEMA/IEEE. El temporizador
  `TON` se dibuja igual en ambas normas (un rectángulo de bloque de función
  con el nombre y el tiempo adentro) — es una instrucción de PLC, no un
  símbolo de relé clásico, así que no tiene una variante NEMA distinta que
  valga la pena dibujar aparte; se documenta como simplificación deliberada.
  Fuente: búsqueda web verificada el 30-ago-2026 (Industrial Monitor Direct,
  comparación IEC/NEMA; Eaton, comparación de esquemas NEMA e IEC) — no se
  dibujó ningún símbolo de memoria sin contrastar.
- `norma=iec`/`norma=nema` se lee con el mismo `gpxParametros()` genérico ya
  usado por `​```gpx vista=` y `​```svg fondo` (pese al nombre, no es
  específico de GPX); un valor inválido o ausente cae a `iec` sin error —
  no vale la pena una validación estricta para un parámetro puramente
  estético.
- Igual que `​```verdad`, el bloque envuelve todo en try/catch y devuelve
  `<div class="ladder-error">` en vez de reventar el resto del documento
  (a diferencia de `plano`/`iso`/`3d`, que no atrapan sus propios errores —
  la sintaxis de `ladder` tiene bastante más superficie para errores de
  tipeo que esas tres, así que aquí sí vale la pena el blindaje).
- Segunda entrada en el menú **`+ Insertar` → `Lógica y electricidad`**
  (`LOGICA`/`formLogica()`, ver [[md-crgm-fase6-verdad-tabla-logica]]):
  "Escalera PLC" inserta el ejemplo exacto de la sección 9.
- Contador (`CTU`/`CTD`): **no implementado** — queda como extensión futura
  si se pide, tal como decía el plan.
- Probado con `probar_ladder_unidad.js` (unitario puro: elementos y columnas
  de cada tipo de símbolo, TON con tiempo entero y decimal, ancla de la
  derivación al peldaño completo correcto, **la columna exacta del `+`
  verificada contra `indexOf` de la línea original** — el caso que más
  importaba probar del algoritmo posicional —, 9 errores esperados, render
  SVG de humo en iec y nema con diferencias reales entre ambos) y
  `probar_ladder_dom.js` (render en el navegador con el ejemplo completo de
  3 peldaños, captura de pantalla verificada visualmente en ambas normas,
  ruta de error, y el menú Insertar → Lógica y electricidad → Escalera PLC
  de punta a punta). Regresión general sigue en verde. SW v45→v46.

### 15.2 ` ```verdad ` — tabla de verdad con cálculo automático — hecho 30-ago-2026

El motor de fórmulas ya existente (`evaluarFormula`, sección "CALCULOS" de
`index.html`) es aritmético (`+ - * /`, `SUMA`, `PROMEDIO`...) y **no** tiene
operadores lógicos — no es reutilizable tal cual, pero sí su forma: un parser
recursivo descendente propio, sin `eval`, que ya es el patrón establecido del
proyecto para "calcular algo escrito como texto". La propuesta es un
evaluador booleano hermano, `evaluarLogica`, con las mismas garantías.

```
​```verdad
entradas: A, B, C
salida S = (A Y B) O (NO C)
salida T = A O-EXCLUSIVA B
​```
```

- Palabras clave en español, a tono con `SUMA`/`PROMEDIO`/`REDONDEAR` ya
  existentes: `Y` (AND), `O` (OR), `NO` (NOT), `O-EXCLUSIVA` (XOR); `NI`
  (NOR) y `NO-Y` (NAND) como azúcar si hace falta.
  Precedencia `NO` > `Y` > `O`, paréntesis para forzar orden — igual que
  `evaluarFormula` ya hace con `* /` antes de `+ -`.
- El bloque declara las variables de entrada una vez (`entradas:`) y una o
  más filas de `salida NOMBRE = expresión`; el motor genera solo las
  **2ⁿ combinaciones** (n = número de entradas) y calcula cada columna de
  salida para cada fila — no hace falta escribir la tabla a mano.
  Render: una `<table>` normal (mismo CSS de tabla que ya existe), no SVG.
- **No** se integra en `evaluarFormula` ni en celdas de tabla Markdown
  sueltas: mezclar aritmética y booleanos en el mismo evaluador (¿qué es
  `A + 1`, número o booleano?) complica sin necesidad un motor que hoy es
  simple. Un evaluador aparte, un bloque aparte.

**Implementado tal cual el plan de arriba**, con estos detalles concretos:

- `evaluarLogica(expr, valores)` (`index.html`, junto a `verdadParsear`/
  `verdadFilas`/`dibujarVerdad`): parser recursivo descendente de dos niveles
  de precedencia binaria (`expresionO` con `O`/`O-EXCLUSIVA`/`NI`, `expresionY`
  con `Y`/`NO-Y`) más `NO` unario en `primario()` — mismo estilo de cursor
  `i`/`espacios()`/`error()` que `evaluarFormula`. `NI` y `NO-Y` sí se
  implementaron (no quedaron como "azúcar pendiente").
  **Detalle importante de corrección:** cada operador binario evalúa
  **siempre** el operando derecho llamando a `primario()`/`expresionY()` antes
  de combinar valores — nunca con `&&`/`||` de JS directamente sobre la
  llamada, porque el cortocircuito de JS saltearía el avance del cursor sobre
  el operando derecho y desincronizaría el resto del parseo silenciosamente.
- Palabras clave reconocidas sin distinguir mayúsculas/minúsculas, y sin ser
  prefijo de un identificador más largo (`palabra("NI")` no le come la letra
  a una futura variable `NIVEL`); `O-EXCLUSIVA` y `NO-Y` se prueban antes que
  `O`/`Y` en cada nivel por compartir la letra inicial.
- Límite de `VERDAD_ENTRADAS_MAX = 8` (256 filas) con mensaje de error claro
  al pasarse — evita un documento enorme por accidente.
- Render: `<figure class="verdad-viewer">` con `<table class="verdad-tabla">`
  (columnas de entrada normales, columnas de salida con borde izquierdo de
  acento y negrita) y un `<figcaption>` que repite cada `salida NOMBRE =
  expresión` como leyenda, para no perder de vista qué significa cada columna
  corta. Valores mostrados como `V`/`F` (Verdadero/Falso), no `1`/`0`.
- Error de sintaxis → `<div class="verdad-error">` amigable (mismo patrón que
  `.gpx-error`), no una excepción sin capturar que rompa el resto del render.
- Nuevo menú **`+ Insertar` → `Lógica y electricidad` → `Tabla de verdad`**
  (`LOGICA`/`formLogica()`, mismo patrón que `TECNICOS`/`formTecnico()` pero
  aparte — el título "Mapas y dibujo técnico" no encaja para esto). Deja
  espacio para que ` ```ladder ` se agregue ahí mismo como segunda entrada
  cuando se implemente la sección 15.1.
- Probado con `probar_verdad_unidad.js` (unitario puro: Y/O/NO/XOR/NI/NAND,
  precedencia, paréntesis, mayúsculas/minúsculas, variable multi-letra que no
  choca con una palabra clave de un solo carácter, límite de 8 entradas,
  errores esperados) y `probar_verdad_dom.js` (render en el navegador, tabla
  de 3 entradas verificada fila por fila, ruta de error, y el menú Insertar
  completo). SW v44→v45.

### 15.3 Categorías y subcategorías del catálogo — hecho 30-ago-2026

Confirmado en el código: `plantillas/indice.json` tiene hoy **12 categorías
planas**, sin ningún campo de subcategoría — `pintarGaleria()`
(`index.html`) pinta una sola fila de botones de categoría y filtra con
`p.cat === catActual`, nada más. La categoría `electrico` que ya existe es
sobre **mantenimiento** eléctrico industrial (LOTO, termografía, plan
maestro...), no sobre diagramas o lógica — así que las plantillas de
`​```ladder`/`​```verdad` necesitan hogar propio, no encajan ahí sin confundir.

Propuesta mínima, retrocompatible:

- Nuevo campo opcional `"sub"` en cada entrada de `indice.json` (una
  plantilla sin ese campo se sigue viendo siempre dentro de su categoría,
  sin filtrar por subcategoría — cero migración necesaria).
- Cada categoría del bloque `categorias` puede declarar opcionalmente
  `"subcategorias":[{"id":"...", "nombre":"..."}]`.
- En `pintarGaleria()`: si `catActual` tiene `subcategorias`, pintar una
  segunda fila de chips bajo la de categorías (mismo patrón visual, un botón
  "Todas" primero) y añadir `&& (!subActual || p.sub === subActual)` al
  filtro existente. Sin subcategorías declaradas, la categoría se ve exacto
  igual que hoy.
- Categoría nueva candidata para alojar lo de esta fase: **"Matemáticas y
  lógica"** (`math`), con subcategorías `logica` (tablas de verdad, álgebra
  booleana) y `electricidad` (ladder, y unifilar el día que exista) — a
  confirmar el nombre/reparto exacto contigo antes de tocar `indice.json`.

**Decisión tomada, distinta de la propuesta original (documentada por si se
cuestiona):** categoría nueva `logica`, nombre **"Lógica y electricidad"**
— el mismo nombre que ya tenía el menú `+ Insertar` de la sección 15.2/15.1
(`LOGICA`/`formLogica()`), en vez del "Matemáticas y lógica" que proponía
este plan. Motivo: para cuando llegó el momento de tocar `indice.json` el
menú Insertar ya existía con ese nombre y ya agrupaba ambas plantillas sin
problema — usar un nombre distinto en la galería de plantillas que en el
menú de inserción, para la misma pareja de bloques, confundiría más de lo
que aclararía. **Sin subcategorías**: con solo 2 plantillas por ahora
(`logica-tabla-verdad`, `logica-escalera-plc`), separar `logica` de
`electricidad` como subcategorías de un padre común habría sido la
abstracción de dos niveles que este plan proponía, sin nada real que
justifique el segundo nivel todavía — la categoría única y plana ya
resuelve el problema original (que `​```ladder`/`​```verdad` no encajan en
`electrico`, que es de mantenimiento). El campo `"sub"` que este plan
proponía sigue disponible sin usar, para el día que la categoría crezca lo
suficiente como para partirla.

- Icono `⊕` (o-exclusiva/XOR, ligado a la función que motivó la categoría),
  para no repetir ninguno de los 12 iconos ya usados.
- Dos plantillas nuevas creadas desde cero (no existían plantillas previas
  para `ladder`/`verdad`): `plantillas/logica-tabla-verdad.md` y
  `plantillas/logica-escalera-plc.md`, con el mismo formato de referencia
  que ya usaba `calc-como-se-hace.md` (ejemplo en vivo primero, tabla de
  sintaxis, aviso `[!NOTA]`, sección "Lo que no hace", "Esqueleto para
  empezar" al final) — son las primeras plantillas de referencia de este
  estilo fuera de cálculos.
- **Cero cambios de código en `pintarGaleria()`**: al no usar subcategorías,
  la categoría nueva es puramente datos — el mismo `p.cat === catActual` que
  ya filtraba las otras 12 categorías la filtra a esta también.
- Solo se tocó `plantillas/indice.json` (la fuente canónica que empaqueta
  `herramientas/empaquetar.py`); las copias de `escritorio/app/`,
  `movil/app/` y `movil/android/.../assets/public/` son artefactos de
  build gitignorados, no fuentes — se regeneran al empaquetar cada
  plataforma, no se editan a mano.
- Probado con `probar_categoria_logica.js` (navegador: la categoría aparece
  en la galería con sus 2 plantillas, cada una carga su bloque y lo
  renderiza sin error). Regresión general sigue en verde. SW v46→v47.

### 15.4 Fondos y estilos de diapositiva

La más chica de las cuatro. Dos mecanismos, complementarios:

- **Color/degradado por diapositiva:** una directiva de línea al principio
  de la diapositiva, `!fondo: #1a2b3c` o `!fondo: degradado(#1a2b3c, #2ecc71)`,
  leída por `pintarDiapositiva()` igual que ya lee la línea `---` como
  separador — se aplica como `background` inline solo a esa diapositiva, no
  al documento.
- **SVG como fondo:** un bloque `​```svg fondo` (parámetro nuevo, mismo
  saneamiento de `dibujarSvgCrudo`) posicionado en una capa detrás del texto
  de la diapositiva (`position:absolute`, `z-index` bajo el contenido) en vez
  de en el flujo normal — para dibujos de fondo hechos a mano en vez de un
  color plano.
- Ninguno de los dos toca el documento fuera de Presentar: en la vista normal
  del documento, `!fondo:` se ignora y `​```svg fondo` se ve como un SVG
  cualquiera en el flujo (igual que hoy).

### Orden sugerido

Por costo/aislamiento, no por lo pedido primero: **15.4 (fondos) → 15.2
(tablas de verdad) → 15.1 (ladder) → 15.3 (categorías)** — cada una se
prueba y se cierra sola, igual que las fases anteriores de este spec. Queda
a decidir contigo si prefieres otro orden, o ir directo a una sola pieza.

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
- La consulta real (`gpxConsultaOverpass`, `index.html`) ya creció más allá del
  ejemplo de arriba: también trae `waterway=canal`, `natural=water` (lagos) y
  `tourism=viewpoint|camp_site`, y desde 3.14 también lee la etiqueta `bridge`
  de las vías que ya trae. El ejemplo de esta sección quedó como ilustración
  simplificada de la idea, no como el texto literal de la consulta.

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

### 3.11 Cámaras fijas + "Libre" y calzada ancha — hecho 30-ago-2026

Pedido del usuario tras ver un visualizador 3D ajeno (Plotly/WebGL, descartado
por romper la regla "sin CDN" de la sección 1): quería esa sensación de vista
libre + botones de cámara fija, y que la vista 2D "diera la impresión de ir
en la ruta" con una calzada más ancha en vez de una línea fina.

**Cámaras.** `GPX3D_CAMARAS` (`index.html`) da `yaw`/`pitch` de arranque para
`frontal` (casi de perfil, mirando la altura), `superior` (casi cenital, para
ver el orden del recorrido) y `lateral` (90°, para ver el desnivel de lado);
las tres además activan `libre:true`. Un cuarto botón, "Libre", alterna un
segundo juego de límites angostos (`GPX3D_LIMITES_LIBRE`: yaw ±180°, pitch
3°–89°) copiado POR VALOR (`gpxCopiarLimites`) encima de `limites3d` de la
figura — nunca se muta `GPX3D_LIMITES` en sí, así que abrir/cerrar Libre no
afecta a otras figuras `​```gpx` de la misma página. El botón "▲ N" (3.10)
sigue existiendo y vuelve a copiar el rango angosto original, desactivando
Libre.

**Calzada ancha (solo vista 2D).** Antes de los tramos coloreados por
velocidad (3.4) se dibuja el mismo trazado completo dos veces más, debajo:
una franja gruesa (`.gpx-ruta-asfalto`, `stroke-width:9`, color del borde del
tema) como "pavimento", y encima una línea central punteada blanca
(`.gpx-ruta-linea-central`) — igual que una carretera dibujada, sin agregar
ninguna dependencia. La vista 3D no tiene una "calzada" equivalente: el
terreno ya es la cortina de elevación (cortes verticales), no una superficie
sobre la que trazar un camino ancho.

### 3.12 Carrito animado y "Simular ruta" — hecho 30-ago-2026

`gpxPosEnProgreso(puntos, t)` interpola linealmente sobre `distAcumM` (la
distancia acumulada ya calculada en `gpxEstadisticas`, no el tiempo real del
GPX, que puede faltar o venir incompleto) para dar lat/lon/altura/rumbo en
cualquier fracción `t` de la ruta. Un control nuevo bajo la figura
(`.gpx-sim`, botón ▶/❚❚ + barra + texto "x / y km") maneja un estado por
figura `{activo, jugando, progreso, ultimoTs, ultimoRedibujo}`:

- **▶ Simular ruta** dispara un bucle de `requestAnimationFrame` que avanza
  `progreso` a ritmo constante (`GPX_SIM_DURACION_S = 18` segundos para toda
  la ruta, sin importar su distancia real) pero solo pide un redibujo completo
  (`mostrarVista`) cada ~80ms — redibujar el SVG entero en cada frame de 60fps
  sería carísimo, sobre todo en 2D, donde a diferencia de la vista 3D
  (`gpxSimplificarA(...,400)`, ver 3.5) el trazado no tiene tope de puntos.
- Arrastrar la **barra** mueve `progreso` a mano (pausa la reproducción) para
  "sentir" un punto exacto de la ruta sin esperar la animación.
- El carrito se dibuja como un triángulo (`.gpx-carrito-cuerpo` en 2D,
  `.gpx-carrito3d-cuerpo` + asta en 3D) rotado según el `rumbo` calculado,
  reconstruido en cada redibujo junto con el resto de la figura — no es una
  capa aparte que haya que sincronizar por separado.

Verificado con Puppeteer (ver `probar_gpx_ruta_viva_rapido.js`): las cuatro
cámaras y Libre existen y cambian el dibujo; Libre se activa solo al elegir
una cámara fija y se desactiva al volver a "▲ N"; Simular avanza la barra y
hace aparecer el carrito, Pausar detiene el avance, arrastrar la barra a mano
mueve el carrito sin reproducir sola.

### 3.13 Puntos de tamaño fijo, zoom persistente y velMax fiable — hecho 30-ago-2026

Tres arreglos pedidos por el usuario tras usar la ruta viva de 3.11/3.12:

- **Puntos de tamaño fijo en 2D**: los círculos de inicio/fin/waypoints
  (`circulo()` y el bucle de waypoints en `gpxSvg2D`) llevan ahora también
  la clase `gpx-punto-fijo`. Como el zoom 2D se hace mutando el `viewBox`
  del SVG (no con `transform:scale`), un `<circle r="...">` escala su
  tamaño visual con el zoom igual que cualquier otra geometría —
  `vector-effect="non-scaling-stroke"` solo protege el grosor del trazo,
  nunca `r`. `gpxActivarInteraccion` ahora captura el radio base de cada
  `.gpx-punto-fijo` y una escala de referencia (metros por píxel) al
  activarse, y en cada `aplicar()` (zoom/pan) recalcula `r` para que el
  tamaño en pantalla se mantenga constante.
- **Zoom/pan 2D persistente durante Simular ruta**: `mostrarVista` hace un
  reemplazo destructivo completo del SVG (`innerHTML = gpxRenderizarVista(...)`)
  en cada redibujo — algo que "Simular ruta" dispara unas 12 veces por
  segundo (ver 3.12). Antes, `gpxActivarInteraccion(fig)` recalculaba el
  `viewBox` inicial desde cero en cada llamada, así que cualquier zoom/pan
  que el usuario hubiera hecho a mano se perdía apenas arrancaba la
  simulación (un bug propio, no reportado por el usuario, encontrado al
  implementar el punto anterior). Arreglo: un estado `estado2d = {caja:null}`
  creado una sola vez en `gpxActivarFigura` (igual que ya existía `estado3d`
  para la vista 3D) que se pasa a `gpxActivarInteraccion(fig, estado2d)` y
  se lee/escribe en cada `aplicar()`.
- **"Vel. máxima" dejaba de ser fiable con un solo salto de GPS**: la
  velocidad instantánea punto-a-punto (`gpxEstadisticas`) es sensible a un
  único salto de posición GPS entre dos puntos consecutivos — una sola
  muestra así puede duplicar o triplicar la velocidad real y quedar de por
  vida como "velocidad máxima". La distinción clave no es estadística sino
  posicional: un cambio de velocidad real (una bajada, un sprint) se
  sostiene en varios segmentos seguidos; un salto de GPS es un pico
  aislado. Por eso el filtro no usa un percentil fijo (que en tracks
  cortos puede coincidir con el propio pico, ver más abajo) sino
  corroboración por vecindad: un segmento por encima del umbral
  (mediana + 6×MAD efectivo, con piso para que MAD=0 no rompa el filtro)
  solo cuenta para `velMax` si al menos un segmento inmediato vecino
  también está elevado (por encima de mediana + 3×MAD). Un primer intento
  con percentil 95 se descartó tras comprobar con una prueba unitaria que,
  en un track de ~20 puntos con un solo pico, el percentil 95 cae
  exactamente sobre el pico mismo (n pequeño), dejándolo sin filtrar.

Verificado: prueba unitaria de `gpxEstadisticas` aislada (ruido GPS aislado
→ vuelve a la velocidad real; sprint sostenido de varios segmentos → NO se
filtra; track corto n=8 con un salto → también se filtra) + verificación en
el DOM real de la app (`probar_gpx_velmax_dom.js`) + regresión completa
(`probar_regresion_general.js`, `probar_gpx_3d_limites.js`,
`probar_gpx_ruta_viva_rapido.js`, `probar_gpx_puntos_fijos_zoom.js`) en
verde. SW v55→v56.

### 3.14 Puentes, puntos seleccionables/descartables y "Dividir ruta en tramos" — hecho 30-ago-2026

Tres pedidos del usuario sobre 3.7, investigados primero con dos lecturas de
código en paralelo (workflow) antes de tocar nada: ríos y lagos YA estaban en
la consulta Overpass (`waterway`, `natural=water`) y ya se dibujaban con un
color distinto (`gpx-contexto-rio` vs. `gpx-contexto-via`) — lo que de verdad
faltaba era puentes, y que CUALQUIER elemento del contexto fuera clickeable
(antes solo existía la lista de botones "Agregar a la ruta" debajo del mapa,
nada en el propio dibujo).

- **Puentes**: no hacía falta una cláusula nueva en Overpass — `bridge` viaja
  como etiqueta de una vía que YA se estaba pidiendo (`highway`/`waterway`).
  `gpxSimplificarContexto`/`gpxValidarContexto` ahora leen `tags.bridge` y
  guardan `puente:true` + un `nombre`/`ref` en el objeto de la vía; el SVG
  (`gpxContextoSvgPartes`) agrega la clase `gpx-contexto-puente` (línea
  discontinua) ENCIMA de `-via`/`-rio`, no en reemplazo — un puente sobre un
  río sigue siendo azul, sobre una calle sigue gris, pero discontinuo.
- **Puntos seleccionables**: los círculos grises de POIs (`.gpx-contexto-poi`,
  ya existían, ya se dibujaban) ahora llevan `data-ctx-poi` + la clase
  `gpx-punto-fijo` (mismo mecanismo de 3.13, tamaño constante en pantalla) y
  un click los resalta contra su fila en la lista de abajo — mismo patrón
  exacto que ya usaba `.gpx-wpt` con `.gpx-nota` (buscar por índice
  compartido, sacar `.resaltada` de las demás, `scrollIntoView`). Las vías
  (calles/ríos) NO se hicieron clickeables — solo tooltip por `<title>` — el
  pedido del usuario decía "puntos", no líneas.
- **Descartar un punto sugerido**: nuevo botón "Descartar" junto a "Agregar a
  la ruta" (`gpxDescartarPoi`), saca el POI de `contexto.pois` y lo persiste
  en el `​```gpx-datos` compañero (si no, reaparecería al recargar). De paso
  se corrigió que "Agregar a la ruta" (`gpxAgregarPoi`) tampoco persistía el
  encogimiento de `contexto.pois` — un punto ya agregado como waypoint podía
  reaparecer como "sugerido" tras recargar; ahora ambos flujos persisten.
- **"Dividir ruta en tramos"** (`gpxDividirRuta`): usa los waypoints YA
  puestos por el usuario como cortes (sin UI nueva de "tocar el mapa para
  marcar un punto") — cada waypoint se ubica sobre el track con
  `gpxPuntoCercano` (ya existía, se usaba para Perfil/3D) y su `distAcumM` es
  el punto de corte. Se descartan cortes pegados al inicio/fin o muy juntos
  entre sí (menos del 3 % de la distancia total o 30 m, lo que sea mayor) —
  si no queda ninguno, avisa en vez de dividir en tramos degenerados. Cada
  tramo se inserta como un bloque ```gpx nuevo justo después del original
  (que nunca se toca) con encabezado `## Tramo N: A → B`, mismo patrón que
  `## Pizarrón hoja N` (12.7) que el usuario ya había pedido — entra solo al
  Índice/Esquema. Los puntos frontera quedan incluidos en AMBOS tramos
  vecinos (empalman en el punto de corte, no hay salto).

Verificado con Puppeteer: contexto simulado (Overpass mockeado vía
interceptación CDP con cabecera CORS) con un puente, un río y un POI —
clases y `<title>` correctos, clic en el círculo resalta su fila, Descartar
lo borra del DOM y del documento persistido; división en tramos con un
waypoint interior — dos bloques nuevos con el título correcto, el original
intacto, el texto que ya seguía en el documento se conserva después de los
tramos nuevos, las 3 figuras (original + 2 tramos) renderizan bien; y el
guardarraíl de "sin cortes válidos" (waypoint pegado al inicio) no modifica
el documento y avisa. Regresión completa en verde. SW v56→v57.

### 3.15 "Descargar como imagen" no funcionaba en iPhone/iPad — hecho 30-ago-2026

Reporte del usuario de que "descargar como imagen no funciona", investigado
sin poder reproducirlo en Chrome de escritorio (donde sí funciona). La causa
más probable, dado que el propio usuario reportó por separado varios bugs de
Pizarrón "en mobiles" el mismo día, es una limitación conocida de
iOS/WebKit: Safari (incluso instalado como PWA) no respeta el atributo
`download` de un `<a>` que apunta a una URL `blob:` — no hay forma de
detectar esto por feature-detection (la propiedad `download` existe, solo
que WebKit la ignora), así que hace falta distinguir la plataforma.

`descargarBlob` (el helper compartido por los tres botones de descarga:
texto .md/.html, "documento como imagen" y PNG del Pizarrón) ahora prueba
primero, solo en iOS, la Web Share API:

- `esIOS()`: `/iP(hone|ad|od)/` contra `navigator.userAgent`, más
  `navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1` para
  iPadOS, que desde iOS 13 se identifica como "MacIntel" en el UA.
- Si `esIOS()` y el navegador soporta `navigator.canShare` con archivos, se
  arma un `File` a partir del blob y se llama a `navigator.share({files:[...]})`
  — esto abre la hoja nativa de compartir/guardar, que es donde en iOS
  termina un archivo generado por la propia página (no hay un "Descargas"
  accesible desde Safari para un blob).
- Fuera de iOS (o si `share`/`canShare` fallan o el usuario no los tiene) se
  sigue con el `<a download>` + `URL.createObjectURL` de siempre, sin ningún
  cambio de comportamiento.

Verificado con Puppeteer en dos corridas — Chrome normal y Chrome con
`navigator.userAgent` suplantado a iPhone (con `navigator.share`/`canShare`
reemplazados por versiones que registran la llamada, ya que Chrome de
escritorio no tiene Web Share API para archivos): en la corrida "desktop" se
descarga un `.png` real y `share` nunca se llama; en la corrida "iOS" se
llama a `share` con el archivo correcto y NO se descarga nada por la vía
`<a download>`. Regresión general también en verde. SW v57→v58.

**Límite honesto**: Puppeteer/Chrome headless no puede emular el
comportamiento real de Safari en un iPhone de verdad — esto confirma que la
rama de código nueva se activa y le pasa el archivo correcto a
`navigator.share`, pero no puede confirmar al 100% que eso resuelve el
síntoma exacto que vio el usuario sin que lo pruebe en su propio dispositivo.

### 3.16 Guía de ```plano más clara y ```verdad/```ladder en la guía general — hecho 30-ago-2026

Dos huecos de documentación pendientes de antes en esta sesión ([[md-crgm-plano-guia-pendiente]],
hallazgo relacionado en [[md-crgm-insertar-bloque-codigo]]):

- **`​```plano`**: la sección "Plano 2D" de `plantillas/guia-markdown.md` (26)
  ya tenía la sintaxis básica, pero no explicaba lo que de verdad confundía
  al usuario al escribirlo — releída la implementación
  (`planoParsear`/`planoSegmentoMasCercano`/`planoCortes`) para documentar el
  comportamiento real en vez de solo repetir la tabla de instrucciones. Se
  agregó un aviso `[!NOTE]` aclarando: (a) las coordenadas están en metros,
  `escala` solo cambia el tamaño en pantalla; (b) `puerta`/`ventana` se
  **enganchan solas** al tramo de muro recto más cercano al punto dado (se
  proyectan y el hueco se centra ahí, recortado si no cabe) — no son una
  posición libre como `texto`/`cota`, y con muros próximos pueden engancharse
  al que no se esperaba; (c) un `muro` con varios `→` son tramos rectos
  independientes entre sí, una puerta cerca de una esquina se pega al tramo
  más cercano, no "a la esquina"; (d) `cota` con más de dos puntos solo usa
  el primero y el último. No se tocó el DSL en sí — la otra mitad del pedido
  original ("evaluar si el formato podría ser más intuitivo de escribir") se
  dejó para si el usuario lo pide después de ver si la documentación ya
  alcanza.
- **`​```verdad`/`​```ladder` en la guía general**: `guia-markdown.md` no los
  mencionaba en ningún lado (viven solo en sus plantillas de referencia
  dedicadas, `logica-tabla-verdad.md`/`logica-escalera-plc.md`, y en el menú
  `+ Insertar`). Nueva sección **29. Lógica y electricidad**, mismo formato
  que el resto de la guía (bloque de código + `<div class="demo">` con el
  resultado calculado/dibujado de verdad al lado), resumiendo la sintaxis de
  ambos bloques y señalando la categoría del catálogo para el detalle
  completo. `plantillas/indice.json` (`desc` de `guia-markdown`) actualizado
  de "25 apartados" a "29 apartados".

Ambos archivos son plantillas empaquetadas dentro de `index.html`
(`herramientas/empaquetar.py` lee `plantillas/*.md` + `indice.json` y las
incrusta en `<script id="catalogo">`) — hubo que re-empaquetar para que el
cambio se viera en la app, no alcanza con editar los `.md` sueltos.

Verificado con Puppeteer abriendo la plantilla "Guía completa de Markdown"
por el flujo real (➕ Plantillas → buscar → clic en la tarjeta, no accediendo
a `fuenteActual`/`pintar` directo, que están fuera del alcance de
`page.evaluate` por vivir dentro del cierre de la IIFE principal): la nueva
sección 29 aparece en el índice de encabezados, y dentro de ella el bloque
`​```verdad` renderiza una tabla `<table>` con celdas calculadas de verdad y
el `​```ladder` un `<svg>` real — no solo el texto crudo. Regresión general
en verde. SW v58→v59.

**Corrección sobre el inventario de pendientes reportado antes en esta
sesión**: la tercera pieza que se había listado como "pendiente" (categorías
y subcategorías del catálogo, plan original de
[[md-crgm-fase6-plan-ladder-verdad-categorias]]) en realidad **ya estaba
hecha**, con un diseño distinto y deliberado al del plan — ver
[[md-crgm-fase6-categoria-logica-electricidad]] (SW v47, "Fase 6 completa"):
se decidió una categoría plana `logica` ("Lógica y electricidad", sin
subcategorías) en vez de "Matemáticas y lógica" con subcategorías
`logica`/`electricidad`. El resumen de pendientes de esa conversación se
basó en una lectura desactualizada de la memoria — no hay nada que
implementar aquí.

### 3.17 Pizarrón: rotación de pantalla en móvil — hecho 30-ago-2026

Reporte del usuario ([[md-crgm-pizarra-mobile-rotacion-menus-pendiente]]):
al girar el teléfono con el Pizarrón abierto, el dibujo se quedaba angosto
"como si siguiera vertical", y los botones de la barra no se veían bien en
ninguna de las dos orientaciones.

**Causa real, confirmada leyendo el código antes de tocar nada:** cada hoja
del Pizarrón fija su `ancho`/`alto` (el `viewBox` del SVG) una sola vez, al
abrirse (`abrirPizarron`) — no había ningún listener de `resize` ni
`orientationchange`. Al rotar, el contenedor cambiaba de tamaño pero el
`viewBox` no, y como el `<svg>` usa `preserveAspectRatio` por defecto
("meet"), el dibujo quedaba centrado y con barras vacías a los lados —
letterbox, no un dibujo roto. Peor: `pizarraPuntoDesde` seguía calculando la
posición del puntero contra ese `viewBox` viejo, así que un trazo nuevo tras
rotar habría caído en el lugar equivocado.

**Arreglo:** `pizarronProgramarAjuste()` (debounced 250ms, igual de espíritu
que el remedido de `abrirPizarron` tras resolver fullscreen) escucha
`resize`/`orientationchange`; `pizarronAjustarTamano()` mide el `lienzo` de
nuevo y llama a `pizarraReescalarDatos()` sobre TODAS las hojas (no solo la
actual, para que sigan consistentes entre sí) — que reescala cada trazo
existente con `pizarraReescalarD()`, multiplicando cada número del `d` por
`sx`/`sy` alternando (todo `d` de esta app es solo M/L/Q/Z, siempre pares
x,y — no hace falta parsear por comando), además del grosor por la media
geométrica de ambas escalas. El resultado: el dibujo ya hecho se estira para
ocupar el nuevo tamaño completo (sin recortar nada), y el viewBox nuevo
vuelve a coincidir con el rect real, así que el mapeo de puntero sigue
siendo correcto para trazos nuevos.

**Barra de herramientas:** tenía `display:flex` sin `flex-wrap`, así que con
~10 controles se desbordaba silenciosamente en cualquier pantalla angosta.
Se agregó `flex-wrap:wrap` a la regla base (el lienzo, con `flex:1`, absorbe
el alto que le quite una segunda fila — no hace falta nada más ahí) y, en
el breakpoint móvil ya existente (`@media max-width:820px`), los controles
quedan centrados con "Salir" en su propia fila de ancho completo abajo; en
el breakpoint de apaisado bajo ya existente, la barra se hace más compacta
(padding, gap y el `<input range>` más chicos) para no comerse tanto alto
en una pantalla de ~390px.

**Límite aceptado a propósito:** el reescalado es solo local — no se
transmite a otras pestañas con el mismo documento por `canalPestanas`
(BroadcastChannel). Si dos pestañas tienen el mismo Pizarrón abierto y una
rota, la otra queda con las dimensiones viejas hasta el próximo sync
completo — un caso raro (mismo documento, dos pestañas, rotando durante
uso simultáneo) que no justificaba extender el protocolo de sync por ahora.

Verificado con Puppeteer: viewBox portrait 390×682 → tras simular rotación
a 844×390, viewBox pasa a 844×295 (coincide con el rect real, sin
letterbox); el trazo dibujado en portrait cambia sus números (reescalado);
un trazo nuevo dibujado cerca de la esquina inferior derecha tras "rotar"
cae en esa misma esquina del viewBox nuevo (mapeo de puntero correcto); la
barra no tiene ningún control fuera de pantalla ni desborda horizontalmente
en 390×844 NI en 844×390. Regresión general en verde. SW v59→v60.

### 3.18 Visor GPX: tamaño fijo → responsivo + botones de reiniciar vista y pantalla completa — hecho 30-ago-2026

Reporte del usuario: la ventana del mapa (2D/3D/Perfil) se sentía chica y
no se ajustaba a la pantalla.

**Causa:** `.gpx-svg`/`.gpx-svg3d`/`.gpx-svg-perfil` tenían alturas fijas en
píxeles (`400px`/`220px` en escritorio, `300px`/`180px` en el breakpoint
móvil) que nunca escalaban con el alto real de la ventana. A diferencia del
Pizarrón, estos SVG ya usan `viewBox` + `preserveAspectRatio` (o `none` en
Perfil) correctamente proporcionado, así que agrandar el contenedor por CSS
es suficiente — no hace falta reescalar ningún dato guardado.

**Arreglo:**
- Alturas pasaron a `height:min(64vh, 620px)` (2D/3D) y `min(46vh, 380px)`
  (Perfil) en escritorio; `min(56vh, 480px)` y `min(36vh, 300px)` en el
  breakpoint móvil (`max-width:820px`). Al depender de `vh`, también se
  achica solo en apaisado bajo sin necesitar un breakpoint nuevo.
- Nuevo botón **↔ Restablecer vista** (`.gpx-boton-resetvista`, junto a las
  pestañas 2D/3D/Perfil): pone `estado2d.caja = null` (para que la próxima
  vez que se active la interacción 2D recalcule el `viewBox` de cero, igual
  que ya hacía el doble-clic, pero ahora también accesible en móvil) y
  reinicia yaw/pitch/escala/libre de la vista 3D a sus valores por defecto
  — esto último es un caso que ni "Norte" cubría del todo: los botones de
  cámara (Norte/Frontal/Superior/Lateral/Libre) nunca tocaban `escala`, así
  que un usuario que hiciera zoom y después cambiara de cámara seguía con
  el zoom viejo.
- Nuevo botón **⛶ Pantalla completa** (`.gpx-boton-pantalla`): llama
  `fig.requestFullscreen()` sobre el propio `<figure class="gpx-viewer">`
  (con el mismo patrón `requestFullscreen || webkitRequestFullscreen` que
  ya usan Pizarrón/Presentar). En `:fullscreen` el CSS oculta las secciones
  secundarias (estadísticas, notas, POIs, leyenda, contexto) y deja
  vistas+reiniciar+pantalla arriba, el mapa ocupando el resto (`flex:1`,
  `height:100%`) y los controles de "Simular ruta" abajo — sienta la base
  para la vista de cámara tipo "Mario Kart" pendiente (ver
  [[md-crgm-gpx-camara-fija-simulador-pendiente]]).

**Límite aceptado:** en iOS Safari, `requestFullscreen()` sobre un elemento
arbitrario (no `<video>`) tiene soporte históricamente inconsistente — el
mismo límite que ya acepta el resto de la app para Pizarrón/Presentar. El
botón no rompe nada si el navegador lo ignora: sin pantalla completa nativa,
el visor sigue viéndose al tamaño responsivo normal.

Verificado con Puppeteer: alto del SVG pasó de 400px fijo a 576px en
escritorio 1400×900 (2D y 3D) y de 300px fijo a ~473px en móvil 390×844;
botón Restablecer vista presente y no rompe la vista activa al hacer clic;
botón Pantalla completa presente y clicleable sin lanzar errores. Regresión
general en verde. SW v60→v61.

### 3.19 Letras de referencia, impresión limpia y miniaturas al pasar el mouse — hecho 30-ago-2026

Pedido del usuario, en dos partes: al imprimir aparecía también el contexto
consultado a OpenStreetMap (calles/ríos/POIs sugeridos), y los waypoints
reales no tenían ninguna referencia para correlacionar mapa ↔ lista impresa.
Además esperaba ver una miniatura de la foto enlazada al pasar el mouse por
un punto del mapa (el clic → bajar a la nota con la imagen ya existía).

- **Letras de referencia (A, B, C… Z, AA, AB…)**: `gpxWaypointsLetras(datos)`
  asigna letra a cada waypoint **por orden real sobre la ruta** (distancia
  acumulada del punto más cercano del track, vía `gpxPuntoCercano`), no por
  orden de aparición en el archivo — un GPX puede listar los `<wpt>` en
  cualquier orden. La letra aparece en las 3 vistas (2D sobre el círculo,
  3D en la etiqueta `letra — nombre`, Perfil sobre el marcador) y en la
  lista de notas de abajo (`letra — nombre`), así el papel se lee solo.
- Las letras del 2D son `<text class="gpx-wpt-letra gpx-punto-fijo">`: el
  mecanismo de tamaño constante en pantalla durante el zoom se extendió a
  textos (reescribe `font-size` en vez de `r`). Con halo `paint-order:stroke`
  para que se lean sobre la línea de la ruta, y `pointer-events:none` para
  que el clic/hover siga llegando al círculo de abajo.
- **Impresión**: `@media print` ahora oculta también los elementos dibujados
  del contexto (`.gpx-contexto-via/-rio/-puente/-poi`), no solo sus botones
  — se imprime la ruta con SOLO los waypoints reales y sus letras.
- **Miniatura al pasar el mouse**: una sola `<img class="gpx-previa-img">`
  por figura (posicionada absoluta sobre el visor); `pointerover` sobre un
  `.gpx-wpt` cuyo `enlace` parece imagen (jpg/png/gif/webp/avif) la muestra
  junto al cursor, `pointermove` la sigue, `pointerout` la esconde. Se
  oculta al imprimir.
- De paso: `.gpx-suelo3d` bajó de `fill-opacity:.35` a `.12` — el relleno
  bajo la cortina 3D tapaba la ruta (queja directa del usuario).

Verificado con Puppeteer (waypoints deliberadamente desordenados en el
archivo → letras correctas por ruta; miniatura aparece/desaparece; wpt
reales visibles bajo `emulateMediaType("print")`) + regresión en verde.
SW v61→v62.

### 3.20 Crear waypoints a mano y automáticos — hecho 30-ago-2026

Hueco señalado por el usuario: "Dividir ruta en tramos" exige waypoints,
pero no había NINGUNA forma de crearlos dentro de MDx (solo los que traía
el archivo o el "Agregar a la ruta" del contexto OSM). Dos botones nuevos
bajo el mapa (`gpxAgregarPuntosHTML`, visibles si hay track):

- **+ Agregar punto** (toggle): activa el modo con cursor de cruz; un clic
  limpio en el mapa 2D (tap < 6px de movimiento, no sobre un punto ya
  existente) pregunta nombre y enlace opcional con `window.prompt` y crea
  el `<wpt>` ahí. La conversión pantalla→lat/lon usa `gpx2dProyeccion`,
  la MISMA proyección equirectangular extraída de `gpxSvg2D` (con inversa
  `invertir(x,y)` nueva) — factorizada para que clic y dibujo no puedan
  divergir jamás. Un solo disparo por clic: el modo se apaga solo.
- **Puntos cada N km**: pregunta el intervalo (acepta coma decimal) y
  genera waypoints "Km 10", "Km 20"… (o "Km 0.4" si el intervalo es
  sub-kilométrico) interpolando con `gpxPosEnProgreso` — la misma
  interpolación del carrito del simulador. Ignora el último tramo corto
  (margen 2% o 20 m) para no crear un punto pegado a la meta.
- **`gpxWaypointXML` ahora serializa `<desc>`, `<cmt>` y `<link href>`**
  (antes solo `<name>`/`<type>`, aunque `parseGPX` los leía todos): sin
  esto, el enlace de imagen de un punto creado a mano se perdía en el
  round-trip texto→render→texto. El `href` se escapa con
  `escUI(hrefSeguro(...))` (escapa comillas), no con `X()`.
- La detección tap-vs-arrastre vive en el `pointerup` de
  `gpxActivarInteraccion` (firma extendida con `datos, alAgregarPunto`):
  paneo y pellizco siguen intactos, solo el clic limpio en modo agregar
  crea punto.

Verificado con Puppeteer: clic crea el punto con lat/lon dentro de la caja
de la ruta y lo persiste en `fuenteActual` (round-trip con `<link>` ok),
arrastre NO crea nada, generador con "0.4" crea Km 0.4/0.8/1.2. Ojo del
banco de pruebas: la sincronización inversa `fuenteActual→#ed` solo ocurre
con el editor abierto (`abierto=true`), hay que clicar `#btnEditar` antes
de medir. Regresión en verde. SW v62→v63.

### 3.21 Hoja de ruta imprimible y modo "puntos a mano" — hecho 30-ago-2026

Dos recomendaciones de la investigación de mercado
(`rutasmarkdowninvestigacion.md`, §4.4 y §4.5), elegidas por ser las más
baratas que profundizan la esquina propia de MDx ("es un documento" +
"offline para siempre"):

- **Hoja de ruta (cue sheet)**: botón "Hoja de ruta" junto a "Dividir ruta
  en tramos" (visible si hay waypoints). `gpxHojaDeRuta` inserta después
  del bloque un `## Hoja de ruta` con una **tabla Markdown real** — no HTML
  del render — columnas Ref/Km/(Hora)/Punto/Nota: la Ref es la MISMA letra
  de las vistas (`gpxWaypointsLetras`, orden de ruta), la Hora solo aparece
  si el track trae `<time>`, la Nota sale de `desc`/`cmt` (con `|`
  escapado como `\|`). Filas `·` de Inicio y Fin siempre. Al ser Markdown
  se edita, se imprime y viaja en el `.html` exportado gratis. Reusa el
  mecanismo de inserción de `gpxDividirRuta` (loc verificado por firma).
- **Modo lista sin XML** (idea de mapdown): si el contenido del bloque NO
  empieza con `<`, `gpxDesdeLista` lo interpreta como líneas
  `- lat, lon Nombre | tipo=parada | enlace=https://… | nota=…`
  (viñeta opcional, `#` comenta, separador `,` o `;`, extras en cualquier
  orden). Cada línea válida se vuelve `trkpt` (la polilínea que las une en
  orden) y, si tiene nombre, también `<wpt>` — la conversión pasa por el
  MISMO `parseGPX`, así stats, letras, contexto OSM, dividir, hoja de ruta
  y simulador funcionan idénticos. Menos de 2 líneas válidas → error
  legible. La `firma` se calcula sobre el texto ORIGINAL del bloque (no el
  XML convertido), así la verificación contra `fuenteActual` sigue válida.
- **Escritura de vuelta coherente**: `gpxEscribirWaypoint` detecta que el
  bloque no tiene `</gpx>` y, si tampoco parece XML, agrega una **línea de
  lista** (`gpxLineaLista`) al final del bloque en vez de un `<wpt>` XML —
  "+ Agregar punto", "Puntos cada N km" y "Agregar a la ruta" del contexto
  funcionan igual sobre bloques lista, manteniendo el formato que el
  usuario eligió.

Verificado con Puppeteer: tabla insertada con letras/horas correctas y
render como `<table>`; lista de 4 líneas → 4 trkpt + 3 wpt con
tipo/nota/enlace parseados y letras A-C; agregar punto sobre bloque lista
escribe `- lat, lon Nombre` (cero XML en la fuente); lista de 1 punto da
error legible. Regresión en verde. SW v63→v64.

### 3.22 Categoría "Rutas y viajes" en el catálogo — hecho 30-ago-2026

Tercera recomendación de la investigación (§4.1, "costo casi cero, hazlo
primero"): el catálogo tenía 103 plantillas y ninguna de rutas, y la única
documentación viva del bloque ```gpx estaba en las specs del repo. Nueva
categoría **rutas** (icono ➤) con 4 plantillas que usan el modo lista de
3.21 como ejemplo que renderiza al instante (y enseñan de paso la sintaxis):

- `ruta-bitacora-reparto.md` — conductor/vehículo/horarios rellenables,
  recorrido, entregas con letra de referencia, gastos, incidentes, firmas.
- `ruta-trip-report.md` — el formato canónico de trip report: condiciones,
  agua, peligros, tiempos por tramo, "qué haría distinto".
- `ruta-ficha.md` — una ruta repetida documentada para que otro la siga:
  hoja de giros, combustible, contactos, historial de cambios.
- `ruta-inspeccion-geo.md` — activos en el terreno como puntos del mapa,
  formulario de revisión por punto (misma letra en mapa y papel).

La guía (`guia-markdown.md` §27) ganó dos secciones: el modo "puntos a
mano" y los cuatro botones bajo el mapa (agregar punto, cada N km, hoja de
ruta, dividir). Empaquetado con `herramientas/empaquetar.py` (el campo del
contenido en el catálogo incrustado se llama `cuerpo`, no `contenido`).
Verificado con Puppeteer: categoría y 4 plantillas presentes en el
catálogo incrustado, las 4 renderizan con figura gpx, campos rellenables y
botón Hoja de ruta, sin errores. Regresión en verde. SW v64→v65.

### 3.23 Imprimir/exportar con paleta clara aunque el tema sea oscuro — hecho 31-ago-2026

Defecto de toda la app, encontrado al revisar el GPX: con el tema oscuro
activo, imprimir o exportar PNG sacaba texto casi blanco sobre papel blanco.
Dos causas y dos arreglos:

- Los bloques `@media print` definían la paleta clara solo sobre `:root`
  (especificidad 0-1-0), y el tema oscuro la pisaba con
  `:root[data-tema="oscuro"]` y `:root:not([data-tema="claro"])` (0-2-0).
  Ambos bloques de print usan ahora la MISMA lista de selectores — al ir
  después en el fuente, el empate lo ganan ellos.
- `exportarPng` lee colores computados con `getComputedStyle`, que en oscuro
  devuelve la paleta oscura. Nueva `conTemaClaro(fn)`: fija
  `data-tema="claro"` en `documentElement`, corre `fn` (los estilos
  computados cambian de forma síncrona, sin repintado visible dentro de la
  misma tarea JS) y restaura el atributo en `finally`.

Verificado: emulación de print en oscuro devuelve la paleta clara, el píxel
de fondo del PNG exportado es `[255,255,255]` y al terminar el documento
sigue en oscuro (`--papel #12171f`).

### 3.24 Color por altitud — hecho 31-ago-2026

Cuarto modo de color de la línea (investigación de mercado): rampa de 5
bandas iguales verde→marrón (`GPX_COLORES_ALTITUD`) entre `eleMin` y
`eleMax` (nuevos en `gpxEstadisticas`, con `sinElevacion` cuando el rango
es < 1 m). Todo el color pasa ahora por un único despacho
`gpxColorDePunto(p, modoColor, stats)` que usan la 2D, la cortina 3D y el
Perfil — un modo nuevo se agrega en un solo lugar. `gpxModosColor(stats,
datos)` decide qué modos tienen sentido para ESTE archivo (altitud pide
`<ele>`, velocidad pide `<time>`, ruta pide varios `<trk>`) y el botón
**Color: <modo>** bajo el mapa cicla entre ellos; la leyenda muestra los
rangos en metros. Parámetro `color=altitud` aceptado en la valla.

### 3.25 Varias rutas por mapa (multi-track) — hecho 31-ago-2026

Cada `<trk>` del archivo es una ruta APARTE (spec 4.3 de la investigación):
`parseGPX` llena `datos.tracks = [{nombre, desde, hasta}]` y marca cada
punto con `p.track`. Los puntos siguen todos en `datos.puntos` —
estadísticas, perfil, simulador y hoja de ruta no cambiaron — pero TODO
dibujo corta el trazo donde `a.track !== b.track` (la 2D inserta ` M`,
`gpxTrazoColoreado` cierra el tramo, la 3D no dibuja cortina), y
`gpxEstadisticas` salta los segmentos frontera (sin distancia, velocidad ni
pendiente inventadas entre el fin de una ruta y el inicio de otra). Modo de
color `ruta` (paleta `GPX_COLORES_TRACK` de 7) por defecto cuando hay más
de un track, con leyenda `nombre — X.X km` por ruta. `gpxAdelgazar` (la
importación) conserva la estructura: un `<trk>` con su `<name>` por cada
`<trk>` de origen, en vez de fusionarlos.

### 3.26 Vista 2D+Perfil sincronizada — hecho 31-ago-2026

Quinta vista, `vista=2d+perfil` (spec 4.6): el mapa y el perfil apilados.
Recorrer el perfil con el dedo/mouse marca el punto correspondiente en el
mapa de arriba (`gpxMarcaEnMapa`, un círculo `.gpx-marca-sonda`
pre-renderizado en el SVG 2D) y al salir se esconde. `gpxActivarPerfil`
ganó callbacks `(alSondear, alSalir)`. El simulador funciona en la vista
combinada (carrito en el mapa Y punto en el perfil a la vez).

**Gotcha del sanitizador que esta vista destapó**: `estiloSeguro()` elimina
todo `style=` en línea que no sea color/alineación — un
`style="display:none"` generado se PIERDE. Regla desde ahora: ocultar por
CSS de clase (`.gpx-marca-sonda{display:none}`) y mostrar vía DOM
(`el.style.display = "inline"`), que no pasa por el sanitizador. El punto
del perfil (`.gpx-perfil-punto`) tenía este defecto desde su origen
(visible en (0,0)); quedó arreglado igual.

### 3.27 Foto → waypoint por EXIF — hecho 31-ago-2026

Botón **📷 Punto desde foto** junto a "+ Agregar punto" (spec 4.2): elegís
una o varias fotos y cada una se vuelve un `<wpt>` donde fue tomada.
Lector EXIF a mano (~100 líneas ES5, `gpxLeerExif`/`gpxLeerTiffExif`):
recorre los marcadores JPEG hasta el APP1 `Exif\0\0` (o TIFF pelado),
soporta little/big endian, valores en línea y por puntero, y solo le
interesan `DateTimeOriginal` (0x9003, con 0x9004 y 0x0132 de respaldo) y
el IFD GPS (lat/lon en 3 racionales + refs N/S/E/W + altitud). Todo entre
`try/catch` → `null` ante cualquier anomalía.

Prioridad de ubicación: **GPS del EXIF** si lo trae (descartando el 0,0
exacto, casi siempre basura); si no, **hora casada** contra los `<time>`
del track (`gpxPuntoPorHora`, punto más cercano en tiempo) con un desfase
en minutos que se pregunta UNA vez por tanda (cámara adelantada/atrasada o
en otra zona horaria; la hora EXIF no trae zona y se asume la local del
aparato). A más de 6 h de la ruta se descarta con aviso. El waypoint lleva
`<time>` (nuevo en `gpxWaypointXML`, aparece en la hoja de ruta) y
`<desc>Foto de las HH:MM</desc>`.

Solo se leen los primeros 512 KB del archivo (`f.slice`) — el EXIF va al
frente y la foto en sí JAMÁS entra al documento (regla de imágenes por
enlace). Escritura por el mismo camino que "+ Agregar punto"
(`gpxEscribirWaypoint` + payload + `refrescarTodo`). Verificado con dos
JPEG sintéticos (uno con GPS+altitud, otro solo con hora): coordenadas,
`<ele>1234.0</ele>`, descs y times correctos, desfase preguntado una vez.

### 3.28 Simulador completo: ritmo real, ×N, velocímetro, Perfil y cámara Persecución — hecho 31-ago-2026

Los 5 pedidos del 30-ago sobre "Simular ruta", de una vez:

- **Ritmo real (~3 min)**: `gpxPlanSim(puntos)` construye la línea de
  tiempo real del recorrido (`ts[i]` segundos acumulados / `ds[i]` metros
  acumulados) desde los `<time>` (pausas reales incluidas, acotadas a 10
  min por segmento) o desde la velocidad de cada punto; los huecos se
  rellenan al ritmo medio. Con plan, `simPaso` avanza `tReal` y saca el
  progreso con `gpxProgresoEnTiempo` (búsqueda binaria + interpolación):
  el carrito acelera, frena y SE DETIENE donde el recorrido real lo hizo,
  comprimido a `GPX_SIM_DURACION_REAL_S = 180` s. Sin datos de tiempo, se
  mantiene el avance uniforme de 18 s de siempre. La barra sincroniza
  `tReal` al arrastrarla (`gpxTiempoEnProgreso`, la inversa).
- **Control de velocidad**: botón **×1** junto a play, cicla
  `GPX_SIM_VELOCIDADES = [1, 2, 4, 8, 0.5]`.
- **Velocímetro circular**: `gpxVelocimetroHTML` (aguja −120°..+120°,
  tope = velMax redondeada a la decena) superpuesto en la esquina de la
  vista durante la simulación, con la velocidad instantánea interpolada
  (`gpxVelEnProgreso`); solo aparece si el tramo trae velocidad real.
- **Vista Perfil**: `gpxVistaSimulable(v)` centraliza qué vistas simulan
  (2d, 3d, perfil, 2d+perfil) — controles, redibujo de `simPaso`, barra y
  pausa lo usan. El perfil dibuja su propio carrito (`.gpx-carrito-perfil`)
  con la elevación interpolada (`gpxPerfilDatos` exporta `xDe`/`yDe` para
  no duplicar la proyección).
- **Cámara Persecución (flecha fija)**: botón nuevo en la vista 3D. El
  origen del mundo pasa a ser el carrito y todo se rota para que el rumbo
  apunte hacia arriba: la flecha queda CLAVADA al centro-abajo
  (`LADO/2, LADO·0.72`) y es el mapa el que corre, gira y se inclina
  debajo, siguiendo también la elevación. `motor3dRotarZ` nuevo (giro por
  rumbo) + `motor3dRotarY` reusado como peralte (inclinación en curvas,
  ±18°, desde el cambio de rumbo suavizado `estadoSim.rumboSuave` con
  envoltura ±180°) + `motor3dRotarX` con `GPX_CHASE_PITCH = 1.05`. Zoom
  fijo en metros (`GPX_CHASE_ZOOM_M = 300`, el pellizco multiplica encima)
  y divisor de proyección acotado (`max(D + z, 60)`) para que lo que queda
  detrás de la cámara no se dispare al infinito. Las cámaras fijas, Libre
  y Reiniciar vista apagan el modo.

Verificado con Puppeteer: a ×1 con plan la barra va en 7‰ tras 1 s (≈180 s
totales) y el velocímetro marca los 6 km/h exactos del primer tramo; ×8
avanza ~8 veces más rápido; el carrito del perfil cae en cx=500 con la
barra al 50%; Persecución deja la flecha fija en `translate(320 460.8)`
mientras el fondo cambia, sin NaN; la ruta sin `<time>` conserva los 18 s
uniformes y no muestra velocímetro.

### 3.29 GeoJSON de cortesía — hecho 31-ago-2026

El bloque ` ```gpx ` acepta también GeoJSON pegado tal cual (spec 4.7):
`dibujarGPX` despacha por el primer carácter (`<` XML, `{`/`[` JSON, si no
modo lista) y `gpxDesdeGeojson` convierte a GPX de TEXTO que sigue el
camino de siempre por `parseGPX` — un solo parser de rutas, no dos.
`FeatureCollection`/`Feature`/geometría pelada; `LineString` → `<trk>` (con
`<time>` desde `coordTimes`/`coordinateProperties.times` si vienen),
`MultiLineString` → varios tracks, `Point`/`MultiPoint` → `<wpt>` con
name/description, `GeometryCollection` recursiva, `Polygon` y demás se
ignoran sin drama. Si SOLO hay puntos, además se enlazan en orden como
ruta (la misma semántica del modo lista). Todo texto pasa por `X()`.

Guarda nueva en `gpxEscribirWaypoint`: contenido que empiece con `{`/`[`
se niega a recibir escrituras (antes le habría pegado una línea de lista
al final, rompiendo el JSON). "Dividir en tramos" y "Hoja de ruta" siguen
funcionando: insertan DESPUÉS del bloque, no dentro.

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

### 9.1 Combinar varias ramas en paralelo (aclaración, no es bug)

Un `+` solo puede ir como el primer carácter de un peldaño (deriva de arriba)
o como el último (deriva hacia abajo) — nunca los dos dentro de la misma fila
con más elementos alrededor. Esto significa que **una sola fila no puede
tener dos pares de "+" independientes** (por ejemplo, dos ramas que se unen
antes de una bobina, todo en una línea). El parser lo rechaza con
`el "+" solo puede ir al principio o al final del peldaño`.

Para combinar dos o más ramas en paralelo (p. ej. un sellado con
arranque+mantenimiento, o tres condiciones cualquiera que activan la misma
salida) se escribe **una fila por rama**, todas con su propio `+...+`; el
buscador de ancla (`buscarAncla`) ya salta las filas que no son peldaños
"completos" (las que tienen su propio `+` pendiente) y sigue subiendo hasta
encontrar el peldaño completo más cercano — así que dos, tres o más filas de
rama seguidas anclan todas al mismo peldaño de arriba sin que haga falta
anidar nada:

```
| [start] ---- (R1) |
| +--[sensor1/]--+  |
| +----[boton2]--+  |
```

Las tres condiciones (contacto directo, sensor1, boton2) quedan en paralelo
alimentando la misma bobina R1.

### 9.2 Errores parciales: se sigue dibujando y se marca en rojo — hecho 30-ago-2026

Antes, una sola fila mal escrita (un símbolo mal formado, un "+" mal puesto,
una derivación sin ancla arriba…) tiraba **todo** el diagrama: solo se veía
el mensaje de error, sin nada dibujado. A pedido del usuario ("que se
mantenga lo ya dibujado... o que marque en rojo lo que no va"), ahora:

- `ladderParsear` ya no aborta en la primera fila mala: la guarda como una
  fila con `{error: mensaje}` y sigue con las demás. Solo seguir sin dibujar
  nada si literalmente no hay ningún peldaño (bloque vacío/en blanco) — ese
  es el único caso que sigue mostrando el `.ladder-error` fatal de siempre.
- Una fila con `error` se dibuja como una línea roja punteada en su lugar
  (`.ladder-error-fila`) con "⚠ línea N" — el resto de filas buenas
  mantienen su posición y sus conexiones intactas.
- Una derivación `+` que no encuentra ningún peldaño completo arriba
  (`errorAncla`) ya no aborta esa fila entera: sus propios elementos se
  dibujan igual, y el cable que no pudo conectarse se marca como un cablecito
  rojo suelto (`ladderRamaRota`, clase `.ladder-error-rama`) en vez de una
  línea normal.
- Todos los mensajes (los de siempre, con línea y a veces columna) se juntan
  en un panel `.ladder-avisos` debajo del diagrama — mismo texto que antes,
  ahora informativo en vez de bloqueante.

Probado en `probar_ladder_error_parcial.js` (unitaria, 18 aserciones) y en
`probar_ladder_v2.js`/`probar_ladder_dom.js` (extremo a extremo en el
navegador, casos que antes eran "error fatal" ahora son "parcial": figura +
avisos + marcas rojas). SW v52 → v54.

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

### 12.6 Herramientas de dibujo: línea y sellos de figura — hecho 30-ago-2026

Pedido explícito: además del trazo libre de siempre, poder trazar una línea
recta y "estampar" figuras cerradas (círculo, cuadrado, triángulo, pentágono,
rombo) en vez de tener que dibujarlas a mano libre. Cubre tanto el bloque
` ```pizarra ` embebido (`pizarraActivarFigura`) como el Pizarrón global
(`PIZARRON`) — ambos comparten el mismo motor de datos, así que el cambio se
hizo una sola vez en las funciones compartidas y se conectó por separado en
cada uno de los dos manejadores de puntero.

- **Formato de dato sin cambios:** una figura o una línea recta es, igual que
  un trazo de lápiz, un objeto `{color, grosor, d}` — no hizo falta tocar
  `pizarraParsear`/`pizarraSerializar`. Alcanza con que el `d` resultante
  cumpla `PIZARRA_RE_PATH` (ya permitía `Z` y las demás letras de comando
  SVG, no solo `M`/`L`/`Q`) y quepa bajo `PIZARRA_D_MAX`.
- **`pizarraFormaAPath(herramienta, x0, y0, x1, y1)`** (función nueva,
  compartida): `(x0,y0)` es la esquina donde arrancó el arrastre, `(x1,y1)`
  donde está el puntero ahora o donde soltó. Para `"linea"` devuelve
  directo `"M x0 y0 L x1 y1"`. Para las figuras cerradas, arma la caja
  delimitadora (`xMin/xMax/yMin/yMax`) de esas dos esquinas y devuelve un
  polígono inscrito en ella: cuadrado y rombo con las 4 esquinas/vértices
  obvios, triángulo isósceles con el ápice arriba centrado, y pentágono/
  círculo vía `pizarraPoligonoRegular(cx, cy, rx, ry, lados)` — un polígono
  regular de 5 y 32 lados respectivamente (un círculo real con `A` de arco
  se descartó a propósito: dos arcos de 180° para cerrar una elipse tienen
  casos de borde de `large-arc-flag`/`sweep-flag`; un 32-gono es
  visualmente indistinguible de un círculo al grosor de trazo normal y
  usa el mismo vocabulario `M`/`L`/`Z` que el resto).
- **Un toque sin arrastrar también deja algo visible:** si la caja
  delimitadora queda por debajo de `PIZARRA_FORMA_MIN` (24 unidades) de
  ancho o alto, se expande al mínimo centrada en el punto del toque — mismo
  espíritu que el punto redondo que deja un toque con el lápiz
  (`pizarraTrazoAPath` con menos de 3 puntos).
- **Selector de herramienta** (`<select>`, no botones sueltos — son 7
  opciones): agregado junto al color y el grosor en las dos barras
  (`pizarraHerramientasOpciones()` genera las `<option>` para la barra del
  bloque embebido, regenerada en cada `entrarDibujo()` para reflejar el
  `estado.herramienta` persistido; la barra del Pizarrón global usa las
  mismas 7 opciones escritas directo en el HTML estático, ya que esa sesión
  siempre arranca en `"lapiz"`).
- **Enganche en pointerdown/pointermove, sin tocar pointerup:** en
  `pointerdown`, si la herramienta no es `"lapiz"`, el `d` inicial sale de
  `pizarraFormaAPath` (con `x0=x1,y0=y1`, ya cubierto por el mínimo de
  arriba) en vez de `pizarraTrazoAPath([pt])`. En `pointermove`, si la
  herramienta no es `"lapiz"`, se recalcula el `d` completo desde el punto
  de arranque guardado (`enCurso.x0/y0`) hasta el punto actual — no hay
  suavizado incremental que mantener, a diferencia del lápiz. `pointerup`
  no cambió en ninguno de los dos lugares: ya leía el `d` vigente del
  propio `<path>`, que para una figura ya es el final correcto.
- **Sincronización entre pestañas y exportación PNG:** ninguna de las dos
  necesitó cambios — `emitirPizarronTrazoVivo`/`Final` reenvían el `d` que
  sea, y `pizarronDescargarPng`/`pizarraTrazosHTML` ya dibujan cualquier
  `<path>` de `datos.trazos` sin distinguir su origen.
- Documentado en `plantillas/guia-markdown.md` (sección 28) y en la
  plantilla en vivo `logica-escalera-plc.md` no aplica aquí (es de
  `​```ladder`, no de pizarra).
- Probado con `probar_pizarra_formas_unidad.js` (unitario puro: geometría
  exacta de cada figura vía caja delimitadora y conteo de vértices, la
  expansión al mínimo en un toque sin arrastre, y que las 7 opciones del
  selector se generan bien) y `probar_pizarra_formas_dom.js` (Puppeteer,
  arrastre real con `page.mouse` sobre AMBOS editores — el bloque embebido
  y el Pizarrón global —, retrocompatibilidad del lápiz de siempre, cierre
  en `Z` para las figuras y no-cierre para la línea, round-trip completo
  texto→trazos→texto en el bloque embebido, y que el borrador sigue
  borrando una figura igual que un trazo de lápiz). Regresión general
  (incluida la de `​```ladder` v2) sigue en verde. SW v50→v51.

### 12.7 Dos bugs reales encontrados a partir de reportes de usuario — 30-ago-2026

**El lápiz de Presentar (12.3) no dibujaba.** El overlay `#diaLapizSvg` tenía
`pointer-events:auto` correctamente al activar el lápiz (`.dia-lapiz-activo`),
pero `document.elementFromPoint` sobre el propio SVG devolvía el `<div>` de
contenido de la diapositiva, no el SVG: `pintarDiapositiva()` (sección 15.4,
fondos) le pone `z-index:1` a ESE div, siempre, tenga o no fondo la
diapositiva, para que no quede tapado por `.dia-fondo-capa` (`z-index:0`).
Como `.dia-lapiz-svg` no tenía z-index explícito (`auto`), ese div —
más nuevo en la cascada de fases pero sin relación con el lápiz — terminó
tapando el lienzo del lápiz y comiéndose sus clics. El lápiz quedaba
"activado" (el botón, el cursor, el aria-pressed, todo bien) pero nunca
recibía el trazo. Arreglo de una línea: `.dia-lapiz-svg{ z-index:2 }`.
Confirmado con Puppeteer comparando `elementFromPoint` antes/después y
verificando que un arrastre real deja un `<path class="pizarra-trazo">`.

**"Insertar en el documento" desde el Pizarrón global (12.2) no perdía nada,
pero no daba ninguna señal.** El bloque SÍ llegaba a `fuenteActual`, se
renderizaba y se persistía bien (confirmado recargando la página) — el
único problema real es que `sincronizarEditor()` no toca `#ed` si el editor
no está abierto (`if(!abierto) return`, ver la sección "pegamento"), así que
si el usuario dibujó desde Presentar o desde la vista de solo lectura, el
textarea no se veía cambiar; y, más importante, no había ningún `aviso()` de
confirmación (a diferencia de `diaGuardarAnotaciones`, 12.3), y el bloque
caía sin título al final de un documento que puede ser largo. Sumado, esto
se sentía como "no hizo nada" o "se quedó pegado". Arreglado agregando, por
pedido del usuario, un título `## Pizarrón hoja N` antes de cada hoja no
vacía que se inserta (con su número real de hoja, saltando las vacías) —
así el Índice/Esquema de siempre alcanza para encontrarlo sin desplazarse a
mano — y un `aviso("Pizarrón agregado al documento...")` al terminar.
Verificado con Puppeteer: aparece en el documento renderizado, en el Índice
(`<h2>`), en el editor al abrirlo, y sobrevive a recargar la página.

SW v54→v55.

### 12.8 Herramienta "Seleccionar": mover y redimensionar trazos — hecho 30-ago-2026

Hueco confirmado en 12.7: un trazo ya dibujado solo se podía borrar entero o
deshacer, nunca mover ni cambiar de tamaño. Nueva herramienta **⬚
Seleccionar** en el mismo selector de ambos editores (bloque ```pizarra y
Pizarrón global; el lápiz de Presentar NO la tiene — no usa el selector
compartido y sigue siendo solo lápiz).

Comportamiento: un toque sobre un trazo lo selecciona (caja punteada + 4
asas en las esquinas); arrastrar desde el trazo lo **mueve** (con umbral de
~2 unidades: un tap tembloroso en táctil no desplaza nada); arrastrar un
asa lo **escala** respecto a la esquina opuesta (ejes independientes,
mínimo 5%, máximo ×40); un toque en zona vacía deselecciona. El grosor SÍ
escala al redimensionar (√(ex·ey), acotado 1..60, siempre desde el grosor
inicial del gesto — mismo espíritu que `pizarraReescalarDatos`; revisión
adversarial: sin esto un boceto encogido al 5% quedaba como una mancha).

La caja punteada es transparente y está encima de todo, así que su rama de
hit-test mira **qué hay debajo** con `elementsFromPoint`: el trazo
seleccionado → mover; otro trazo → seleccionarlo; nada → deseleccionar.
(Revisión adversarial: sin esto, la caja de un trazo grande secuestraba
todos los clics de su interior — imposible seleccionar trazos solapados o
deseleccionar.) Un trazo-punto (tap de lápiz) cuya caja es menor que las
asas se MUEVE al arrastrar cualquier asa: con fijo==móvil el escalado sería
identidad y quedaría congelado. Al mover, al menos 10 unidades de la caja
del trazo se mantienen dentro del lienzo (no puede quedar invisible fuera).

Motor compartido (junto a `pizarraFormaAPath`): `pizarraTransformarD(d, fx,
fy)` **tokeniza** el `d` (`PIZARRA_RE_TOKEN`, que sí reconoce `.5`/`-.5`) y
lo RECONSTRUYE con espacios explícitos, alternando x,y. Nunca reemplaza in
situ: en un `d` compacto escrito a mano (`M10-20`) el `-` hace de
separador, y si la y transformada deja de ser negativa el reemplazo in situ
fusionaría los dos números (`M105`) — corrupción silenciosa e irreversible,
reproducida por la revisión adversarial. `pizarraReescalarD` delega en el
mismo motor (tenía el defecto latente) y deja intacto cualquier `d` que no
pase el guard. `PIZARRA_RE_PARES` es ahora estricto **sin /i**: las
minúsculas m/l/q/z son comandos RELATIVOS y la matemática absoluta los
rompería; con H/V/C/A o relativas la herramienta avisa y no toca el trazo.
`pizarraCajaDeD` usa el mismo tokenizador (con Q sobreestima un pelo: usa
también los puntos de control; suficiente para una caja de selección).

Detalles finos:
- `pizarraSeleccionMover` crea un **objeto trazo nuevo** en vez de mutar
  `t.d`: la copia `previo` de "Cancelar" en el bloque es `trazos.slice()`
  (superficial, comparte objetos), y así conserva el `d` original.
- El overlay `.pizarra-seleccion` vive solo en el DOM: `pizarraSerializar`,
  la descarga PNG y los mensajes entre pestañas parten de `datos.trazos`,
  nunca del DOM, así que no se filtra a nada.
- Toda acción estructural (borrador, deshacer, limpiar, cambio de hoja o de
  herramienta, redibujo, rotación) limpia la selección — los índices no
  pueden quedar apuntando a un trazo que ya no está.
- Pizarrón global: mensaje nuevo entre pestañas `pizarron-trazo-cambiar`
  {i, idx, trazo} al soltar — SOLO si el gesto de verdad cambió algo (un tap
  sin mover no manda nada: el mensaje redibuja en la otra pestaña y le
  mataría la selección). El receptor valida TODO lo que llega:
  `pizarraIndiceValido` (entero, en rango — sin esto `m.idx="__proto__"`
  reemplazaba el prototipo del arreglo y todo push posterior tronaba, y
  `"length"` tiraba RangeError) y `pizarraTrazoValido` (forma completa del
  trazo: color #hex, grosor 1..60, `d` que pasa `PIZARRA_RE_PATH` y ≤20k).
  Los receptores `-fin` y `-borrar` usan los mismos validadores.
- **"Deshacer" deshace el último movimiento/escalado**: al primer cambio
  real de un gesto se guarda `sel.previoGesto = {idx, trazo}` (el objeto de
  ANTES, que sigue intacto porque mover crea objetos nuevos); el botón lo
  restaura y solo si no hay gesto pendiente cae al pop() clásico. En el
  Pizarrón la restauración se emite como `-cambiar` para la otra pestaña.
  `previoGesto` se limpia donde los índices se corren (borrador, limpiar,
  pop, cambio de hoja, salir) — nunca puede restaurar sobre el trazo
  equivocado.
- Limitación conocida (revisión adversarial, gravedad baja): encoger cerca
  del mínimo 5% y soltar cuantiza a la grilla de 0.1; re-agrandar deja
  escalones de ~2 px. Mitigado porque "Deshacer" ahora revierte el gesto.
- Cursores: asas nw/se `nwse-resize`, ne/sw `nesw-resize`.

Verificado con Puppeteer (9 comprobaciones originales + 11 de la revisión
adversarial de 3 lentes): mover/escalar exactos; Deshacer restaura el
movimiento sin borrar trazos (bloque y Pizarrón); trazo tapado por la caja
se selecciona; vacío dentro de la caja deselecciona; temblor de 1px no
mueve; `M110-20 L130 40` movido dy+25 da `M 110 5 L 130 65` (geometría
correcta); trazo relativo `m.. l..` avisado e intacto; grosor 4→2 al
encoger a la mitad; punto suelto se mueve vía asa; clamp mantiene el trazo
alcanzable; receptor rechaza `__proto__`/índices fuera de rango y aplica
los válidos. 22 casos unitarios del tokenizador en Node. Regresión general
en verde. SW v65→v66 (herramienta), v66→v67 (correcciones de la revisión).

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
  **Superada por la extensión de v2 más abajo, el mismo día.**

**Extensión v2, pedida y hecha el mismo día (30-ago-2026): ramas reales y
salidas múltiples.** La limitación de arriba resultó demasiado estrecha en
la práctica: se probó `+---[M2]---+` (un puente en U) y `+---(M3) |` (una
segunda bobina real en paralelo) y ninguno de los dos funcionaba — ambos
daban error. Se generalizó el `+` de un solo extremo (siempre al final) a
**dos extremos independientes por peldaño**, cada uno opcional:

- `+` al **principio** del peldaño (campo `derivacionInicio`): este extremo
  no arranca en el riel izquierdo, sino conectado arriba — mismo criterio de
  ancla que ya existía (peldaño completo más cercano hacia arriba).
- `+` al **final** (campo `derivacionFin`, antes llamado solo `derivacion`):
  sin cambios de comportamiento, retrocompatible con todo v1.
- Los dos a la vez, sin bobina propia: un **puente en U** — el peldaño entra
  y sale del mismo peldaño ancla (o de dos anclas distintas, si cada extremo
  cae en una columna que resuelve a un peldaño completo diferente) sin tocar
  ningún riel.
- Solo el inicial, con bobina propia: una **salida más en paralelo**, con su
  propio conductor — a diferencia de escribir dos `(...)` sueltos en la
  misma línea, que sigue dibujando las bobinas en serie sobre un único cable
  (se deja tal cual, no rompe nada y a veces es lo que se quiere).
- Reglas de validez añadidas: bobina propia + cualquier `+` sigue siendo
  error; los dos extremos con `+` Y bobina propia es error nuevo (puentear
  dos puntos del mismo riel con una bobina no representa nada eléctrico);
  `+` inicial sin `+` final y sin bobina es error nuevo (cable colgando); más
  de un `+` en el mismo extremo sigue siendo error. Un `+` que no está ni al
  principio ni al final de la línea sigue siendo error, igual que antes.
- **Sigue sin haber anidamiento real, pero de forma emergente más permisiva
  de lo que sonaba en v1:** `buscarAncla()` siempre salta los peldaños que no
  son completos y sigue subiendo — así que tres o más derivaciones seguidas
  (`+---(M2)` y `+---(M3)` una tras otra) anclan igual, las tres, al mismo
  peldaño completo de arriba, sin que las de en medio necesiten serlo. Esto
  da salidas múltiples de verdad para N salidas, no solo dos, sin código
  adicional — se descubrió al escribir la prueba, no se diseñó a propósito.
- `ladderRenderSVG` quedó simétrico: `xIni`/`xFin` (antes el cable arrancaba
  siempre en `railIzq`), con un conector vertical propio por cada extremo
  que lleve `+`.
- Documentado en `plantillas/logica-escalera-plc.md` (segundo ejemplo en
  vivo con las tres variantes; tabla de sintaxis con dos filas de `+`; NOTA
  y "Lo que no hace" reescritas).
- Probado extendiendo `probar_ladder_v2.js` (Puppeteer, en el navegador real
  vía `window.plantilla.convertir`): retrocompatibilidad del sello clásico,
  salidas múltiples reales, puente en U con captura de pantalla verificada
  visualmente (`ladder_v2_ramas.png`), los errores de v1 que debían seguir
  siéndolo, los errores nuevos de la matriz de validez, el caso sin ancla, y
  el caso de tres salidas saltando ramas intermedias (el hallazgo emergente
  de arriba). `probar_ladder_unidad.js` actualizado a los nombres de campo
  nuevos (`derivacionFin`/`anclaFin` en vez de `derivacion`/`ancla`) y sigue
  en verde. Regresión general y el resto de pruebas de Fase 6 (categoría
  lógica, Insertar → código) vueltas a correr, todo en verde. SW v49→v50.
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
  de punta a punta). Regresión general sigue en verde. SW v45→v46. Ver
  extensión de v2 (ramas y salidas múltiples) más arriba — pruebas ampliadas
  en `probar_ladder_v2.js`, `probar_ladder_unidad.js` actualizado a los
  nombres de campo nuevos, SW v49→v50.

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

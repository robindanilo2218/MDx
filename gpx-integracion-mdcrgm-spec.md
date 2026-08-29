# Especificación Técnica: Integración de GPX en md.crgm.app

> Documento de referencia para implementación. Consolida todas las decisiones tomadas en la fase de diseño. Pensado para ser leído por Claude Code antes de tocar código.

---

## Resumen Ejecutivo

md.crgm.app (visor/editor de Markdown, **sin frameworks, renderización propia en HTML/CSS/JS puro**) va a soportar bloques de rutas GPX embebidos directamente en el Markdown, delimitados por `--- GPX ---`. Cada bloque se renderiza como un mapa Leaflet interactivo con:

- La ruta trazada y **coloreada por velocidad** (cuartiles: verde/amarillo/naranja/rojo)
- **Estadísticas automáticas**: distancia, velocidad media/máx/mín, desnivel, tiempo total
- **Notas geolocalizadas** (waypoints GPX) como marcadores en el mapa + lista debajo
- Markdown normal (texto, imágenes, tablas) arriba y abajo de cada bloque, sin interferencia

Única dependencia externa: **Leaflet.js vía CDN**. Todo lo demás es JavaScript vanilla nativo del navegador.

---

## Tabla de Contenidos

1. [Contexto y Objetivo](#1-contexto-y-objetivo)
2. [Restricciones Técnicas (CRÍTICO)](#2-restricciones-técnicas-crítico)
3. [Decisión de Formato: GPX vs KML/KMZ](#3-decisión-de-formato-gpx-vs-kmlkmz)
4. [Sintaxis: Bloques `--- GPX ---` en Markdown](#4-sintaxis-bloques---gpx---en-markdown)
5. [Arquitectura General](#5-arquitectura-general)
6. [Archivo: gpx-parser.js](#6-archivo-gpx-parserjs)
7. [Archivo: gpx-renderer.js](#7-archivo-gpx-rendererjs)
8. [Archivo: gpx-viewer.css](#8-archivo-gpx-viewercss)
9. [Integración con el Pipeline de Markdown Existente](#9-integración-con-el-pipeline-de-markdown-existente)
10. [UI: Botón "Insertar GPX"](#10-ui-botón-insertar-gpx)
11. [Notas / Waypoints Geolocalizados](#11-notas--waypoints-geolocalizados)
12. [Imágenes en Markdown (fuera del bloque GPX)](#12-imágenes-en-markdown-fuera-del-bloque-gpx)
13. [Dependencias Externas](#13-dependencias-externas)
14. [Ejemplo Completo de Documento](#14-ejemplo-completo-de-documento)
15. [Casos Borde y Manejo de Errores](#15-casos-borde-y-manejo-de-errores)
16. [Preguntas Abiertas para la Implementación](#16-preguntas-abiertas-para-la-implementación)

---

## 1. Contexto y Objetivo

**App:** md.crgm.app — visor y editor de Markdown, con soporte para diapositivas y otros formatos de salida. En desarrollo activo.

**Objetivo de esta feature:** permitir insertar datos de ruta GPX dentro de un documento Markdown de forma que:

- Se pueda escribir Markdown normal arriba y abajo del bloque GPX (texto, imágenes, tablas, headers, etc.)
- El bloque se renderice como mapa interactivo 2D con la ruta trazada
- La ruta se coloree por velocidad (cuartiles)
- Se calculen estadísticas automáticamente
- Se puedan anotar puntos específicos de la ruta con notas (waypoints)

## 2. Restricciones Técnicas (CRÍTICO)

⚠️ md.crgm.app es una app **liviana, sin frameworks, de renderización propia**. Esto descarta explícitamente:

| ❌ NO usar | ✅ Usar en su lugar |
|---|---|
| React / JSX | HTML generado como strings + `innerHTML` / DOM API |
| Hooks (`useState`, `useEffect`, etc.) | Variables JS + funciones + event listeners |
| Módulos ES6 `import`/`export` (sin bundler) | Scripts planos cargados con `<script>`, funciones en scope global (o envueltas en IIFE si se quiere evitar contaminar el global scope) |
| Librerías de UI pesadas | CSS + JS vanilla puro |

**Única dependencia externa permitida:** Leaflet.js vía CDN (~150kb). Todo el parsing GPX, cálculo de estadísticas y generación de HTML se hace con APIs nativas del navegador (`DOMParser`, `FileReader`, template strings, `querySelectorAll`).

Todo el código de este documento respeta esta restricción — es JS vanilla puro, listo para copiar en `<script>` tags.

## 3. Decisión de Formato: GPX vs KML/KMZ

Se evaluaron los tres formatos y se eligió **GPX** como formato de origen:

| Formato | Fortaleza | Por qué no se usa como base |
|---|---|---|
| GPX | Datos GPS nativos (lat/lon/ele/time por punto), ligero, ideal para estadísticas, soporta waypoints nativamente | — (elegido) |
| KML | Estilos visuales, iconos, polígonos — pensado para Google Earth/Maps | El estilo visual lo resuelve Leaflet directamente; no aporta ventaja aquí |
| KMZ | KML comprimido, útil para empaquetar con imágenes | Mismo contenido que KML; no es prioridad |

**Conclusión:** GPX es el único formato que necesita soportar `md.crgm.app`. Los elementos GPX relevantes a parsear son `<trkpt>` (puntos de ruta) y `<wpt>` (notas/waypoints).

## 4. Sintaxis: Bloques `--- GPX ---` en Markdown

```markdown
Texto markdown normal arriba...

--- GPX ---
<?xml version="1.0"?>
<gpx version="1.1">
  ... contenido GPX completo (incluye <trk> y opcionalmente <wpt>) ...
</gpx>
--- GPX ---

Texto markdown normal abajo...
```

**Reglas:**
- El divisor es exactamente la línea `--- GPX ---`
- Todo el contenido entre ambos divisores es XML GPX válido, se pasa tal cual al parser
- Puede haber **múltiples bloques GPX** en un mismo documento (cada uno se procesa de forma independiente)
- Fuera de los bloques, el contenido es Markdown estándar sin ninguna restricción (ver sección 12 para imágenes)

## 5. Arquitectura General

```
┌────────────────────────────────────────────┐
│ editor (textarea) → markdown crudo          │
└───────────────────┬──────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────────┐
│ processMarkdown(markdown)                    │
│  - detecta bloques --- GPX --- (regex)      │
│  - renderiza el resto con el motor Markdown  │
│    existente de la app                       │
│  - inserta <div class="gpx-block"            │
│    data-gpx="...(encodeURIComponent)...">     │
│    como placeholder de cada bloque            │
└───────────────────┬──────────────────────────┘
                    │ (HTML insertado en el DOM)
                    ▼
┌────────────────────────────────────────────┐
│ activarBloquesGPX(root) — por cada .gpx-block:│
│  renderGPXBlock(gpxContent, container)        │
│  1. parseGPXContent()      (gpx-parser.js)   │
│  2. calcularEstadisticas() (gpx-parser.js)   │
│  3. genera HTML (stats, notas, leyenda)       │
│  4. initMap() — Leaflet: polyline coloreada,  │
│     markers inicio/fin, markers de waypoints  │
└────────────────────────────────────────────┘
```

**Archivos a crear:**
- `gpx-parser.js` — parsing XML + cálculo de estadísticas (cero dependencias)
- `gpx-renderer.js` — generación de HTML + inicialización de Leaflet (depende de `L` global)
- `gpx-viewer.css` — estilos del bloque renderizado
- Un punto de enganche en el pipeline de renderizado Markdown existente (ver sección 9 — la ubicación exacta depende de cómo esté estructurada la app hoy, ver sección 16)

## 6. Archivo: gpx-parser.js

```javascript
// gpx-parser.js
// Sin dependencias externas. Funciones en scope global (envolver en IIFE si se
// quiere evitar colisiones de nombres con el resto de la app).

function parseGPXContent(gpxString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(gpxString, 'text/xml');

  if (doc.getElementsByTagName('parsererror').length > 0) {
    throw new Error('GPX inválido: el XML no se pudo parsear');
  }

  // Puntos de la ruta (track points)
  const puntos = [];
  const trackPoints = doc.getElementsByTagName('trkpt');
  for (const pt of trackPoints) {
    puntos.push({
      lat: parseFloat(pt.getAttribute('lat')),
      lon: parseFloat(pt.getAttribute('lon')),
      ele: parseFloat(pt.getElementsByTagName('ele')[0]?.textContent || 0),
      time: pt.getElementsByTagName('time')[0]?.textContent || null,
      speed: 0
    });
  }

  if (puntos.length === 0) {
    throw new Error('No se encontraron puntos GPS (trkpt) en el GPX');
  }

  // Waypoints (notas geolocalizadas)
  const waypoints = [];
  const wpts = doc.getElementsByTagName('wpt');
  for (const wpt of wpts) {
    waypoints.push({
      lat: parseFloat(wpt.getAttribute('lat')),
      lon: parseFloat(wpt.getAttribute('lon')),
      name: wpt.getElementsByTagName('name')[0]?.textContent || 'Nota',
      desc: wpt.getElementsByTagName('desc')[0]?.textContent || '',
      time: wpt.getElementsByTagName('time')[0]?.textContent || null
    });
  }

  return { puntos, waypoints };
}

function calcularEstadisticas(puntos) {
  let distancia = 0;
  let desnivel = 0;
  let eleAnterior = puntos[0]?.ele || 0;
  const velocidades = [];
  let tiempoTotal = 0;

  for (let i = 1; i < puntos.length; i++) {
    // Distancia aproximada (equirectangular, suficiente para tramos cortos/medios)
    const dx = (puntos[i].lon - puntos[i - 1].lon) * 111.32 * Math.cos((puntos[i].lat * Math.PI) / 180);
    const dy = (puntos[i].lat - puntos[i - 1].lat) * 110.574;
    const segmento = Math.sqrt(dx * dx + dy * dy); // km
    distancia += segmento;

    // Desnivel acumulado (solo subidas)
    const eleDiff = puntos[i].ele - eleAnterior;
    if (eleDiff > 0) desnivel += eleDiff;
    eleAnterior = puntos[i].ele;

    // Velocidad entre puntos consecutivos (requiere timestamps)
    if (puntos[i].time && puntos[i - 1].time) {
      const tiempoMs = new Date(puntos[i].time) - new Date(puntos[i - 1].time);
      if (tiempoMs > 0) {
        const vel = segmento / (tiempoMs / 3600000); // km/h
        velocidades.push(vel);
        puntos[i].speed = vel;
      }
      tiempoTotal += tiempoMs;
    }
  }

  const sorted = [...velocidades].sort((a, b) => a - b);
  const cuartil = (p) => sorted[Math.floor(sorted.length * p)] || 0;

  return {
    distancia: distancia.toFixed(2),
    velocidadMedia: (velocidades.reduce((a, b) => a + b, 0) / (velocidades.length || 1)).toFixed(2),
    velocidadMax: Math.max(...velocidades, 0).toFixed(2),
    velocidadMin: Math.min(...velocidades, 0).toFixed(2),
    desnivel: Math.round(desnivel),
    tiempo: formatTime(tiempoTotal),
    cuartiles: { q1: cuartil(0.25), q2: cuartil(0.50), q3: cuartil(0.75) }
  };
}

function formatTime(ms) {
  const horas = Math.floor(ms / 3600000);
  const minutos = Math.floor((ms % 3600000) / 60000);
  return `${horas}h ${minutos}m`;
}

function getWaypointColor(name) {
  // Heurística simple por palabra clave en el nombre — dejar fácilmente
  // configurable/extensible (ver sección 16).
  const tipos = {
    'Accidente': '#FF0000',
    'Parada': '#FF8800',
    'Entrega': '#00AA00',
    'Carga': '#0066FF',
    'Combustible': '#FFD700',
    'Revisión': '#FF00FF'
  };
  for (const [tipo, color] of Object.entries(tipos)) {
    if (name.includes(tipo)) return color;
  }
  return '#0099FF'; // color por defecto
}
```

## 7. Archivo: gpx-renderer.js

```javascript
// gpx-renderer.js
// Requiere: Leaflet cargado globalmente como `L` (vía CDN) y gpx-parser.js
// cargado antes que este archivo.

function renderGPXBlock(gpxContent, container) {
  try {
    const { puntos, waypoints } = parseGPXContent(gpxContent);
    const stats = calcularEstadisticas(puntos);
    const mapId = `gpx-map-${Math.random().toString(36).slice(2, 9)}`;

    container.innerHTML = `
      <div class="gpx-viewer">
        <div id="${mapId}" class="gpx-map"></div>
        <div class="gpx-stats">
          ${statBoxHTML('📍', 'Distancia', `${stats.distancia} km`)}
          ${statBoxHTML('📊', 'Vel. Media', `${stats.velocidadMedia} km/h`)}
          ${statBoxHTML('⚡', 'Vel. Máxima', `${stats.velocidadMax} km/h`)}
          ${statBoxHTML('📈', 'Desnivel', `${stats.desnivel} m`)}
          ${statBoxHTML('⏱️', 'Tiempo', stats.tiempo)}
        </div>
        ${waypoints.length > 0 ? waypointsListHTML(waypoints) : ''}
        ${legendHTML(stats.cuartiles)}
      </div>
    `;

    initMap(mapId, puntos, waypoints, stats.cuartiles);
  } catch (err) {
    container.innerHTML = `<div class="gpx-error">❌ Error al procesar GPX: ${err.message}</div>`;
  }
}

function statBoxHTML(icon, label, value) {
  return `
    <div class="gpx-stat-box">
      <div class="gpx-stat-icon">${icon}</div>
      <div class="gpx-stat-label">${label}</div>
      <div class="gpx-stat-value">${value}</div>
    </div>`;
}

function waypointsListHTML(waypoints) {
  const items = waypoints.map((wpt) => `
    <div class="gpx-waypoint-item" style="border-left-color:${getWaypointColor(wpt.name)}">
      <div class="gpx-waypoint-name" style="color:${getWaypointColor(wpt.name)}">${wpt.name}</div>
      <p class="gpx-waypoint-desc">${wpt.desc}</p>
      ${wpt.time ? `<small class="gpx-waypoint-time">${new Date(wpt.time).toLocaleTimeString('es-GT')}</small>` : ''}
    </div>`).join('');

  return `<div class="gpx-waypoints"><h4>📝 Notas en la Ruta</h4>${items}</div>`;
}

function legendHTML(q) {
  return `
    <div class="gpx-legend">
      <strong>📊 Leyenda de velocidades:</strong>
      <div class="gpx-legend-items">
        <span>🟢 &lt; ${q.q1.toFixed(1)} km/h</span>
        <span>🟡 ${q.q1.toFixed(1)}–${q.q2.toFixed(1)} km/h</span>
        <span>🟠 ${q.q2.toFixed(1)}–${q.q3.toFixed(1)} km/h</span>
        <span>🔴 &gt; ${q.q3.toFixed(1)} km/h</span>
      </div>
    </div>`;
}

function initMap(mapId, puntos, waypoints, cuartiles) {
  const mapa = L.map(mapId).setView([puntos[0].lat, puntos[0].lon], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(mapa);

  // Ruta coloreada por cuartil de velocidad
  for (let i = 0; i < puntos.length - 1; i++) {
    const vel = puntos[i].speed || 0;
    let color = '#00CC00';
    if (vel >= cuartiles.q3) color = '#FF0000';
    else if (vel >= cuartiles.q2) color = '#FF8800';
    else if (vel >= cuartiles.q1) color = '#FFFF00';

    L.polyline(
      [[puntos[i].lat, puntos[i].lon], [puntos[i + 1].lat, puntos[i + 1].lon]],
      { color, weight: 3, opacity: 0.8 }
    ).addTo(mapa);
  }

  // Marcadores inicio / fin
  L.circleMarker([puntos[0].lat, puntos[0].lon], { color: '#00AA00', radius: 8, weight: 2, fillOpacity: 0.9 })
    .bindPopup('🟢 Inicio').addTo(mapa);
  L.circleMarker([puntos[puntos.length - 1].lat, puntos[puntos.length - 1].lon], { color: '#AA0000', radius: 8, weight: 2, fillOpacity: 0.9 })
    .bindPopup('🔴 Fin').addTo(mapa);

  // Marcadores de waypoints / notas
  waypoints.forEach((wpt) => {
    L.circleMarker([wpt.lat, wpt.lon], { color: getWaypointColor(wpt.name), radius: 10, weight: 2, fillOpacity: 0.8 })
      .bindPopup(`<strong>${wpt.name}</strong><p>${wpt.desc}</p>`)
      .addTo(mapa);
  });
}
```

## 8. Archivo: gpx-viewer.css

```css
/* gpx-viewer.css */
.gpx-viewer { margin: 1.5rem 0; padding: 1rem; border: 2px solid #e0e0e0; border-radius: 8px; background: #f9f9f9; }
.gpx-map { width: 100%; height: 400px; border-radius: 6px; margin-bottom: 1rem; background: #e0e0e0; }
.gpx-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 1rem; }
.gpx-stat-box { padding: 1rem; background: white; border: 1px solid #e0e0e0; border-radius: 6px; text-align: center; }
.gpx-stat-icon { font-size: 1.5em; margin-bottom: 0.25rem; }
.gpx-stat-label { font-size: 0.85em; color: #999; margin-bottom: 0.25rem; }
.gpx-stat-value { font-weight: bold; font-size: 1.15em; }
.gpx-waypoints { padding: 1rem; background: #f5f5f5; border-radius: 6px; border: 1px solid #ddd; margin-bottom: 1rem; }
.gpx-waypoint-item { padding: 0.75rem; margin-bottom: 0.75rem; background: white; border-left: 4px solid; border-radius: 4px; }
.gpx-waypoint-name { font-weight: bold; }
.gpx-waypoint-desc { margin: 0.5rem 0 0 0; font-size: 0.9em; color: #666; }
.gpx-waypoint-time { color: #999; }
.gpx-legend { padding: 1rem; background: white; border: 1px solid #ddd; border-radius: 6px; font-size: 0.9em; }
.gpx-legend-items { display: flex; gap: 1rem; margin-top: 0.5rem; flex-wrap: wrap; }
.gpx-error { color: #c62828; padding: 1rem; background: #ffebee; border-radius: 4px; }
```

## 9. Integración con el Pipeline de Markdown Existente

```javascript
function processMarkdown(markdown) {
  const gpxRegex = /--- GPX ---\n([\s\S]*?)\n--- GPX ---/g;
  let html = '';
  let lastIndex = 0;
  let match;

  while ((match = gpxRegex.exec(markdown)) !== null) {
    // Todo lo anterior al bloque se procesa con el motor Markdown YA EXISTENTE de la app
    html += renderMarkdownToHTML(markdown.slice(lastIndex, match.index));
    // Placeholder del bloque GPX — se activa después de insertar en el DOM
    html += `<div class="gpx-block" data-gpx="${encodeURIComponent(match[1])}"></div>`;
    lastIndex = match.index + match[0].length;
  }
  html += renderMarkdownToHTML(markdown.slice(lastIndex));

  return html;
}

// Llamar DESPUÉS de insertar el HTML resultante en el DOM real:
function activarBloquesGPX(rootEl) {
  rootEl.querySelectorAll('.gpx-block').forEach((container) => {
    const gpxContent = decodeURIComponent(container.getAttribute('data-gpx'));
    renderGPXBlock(gpxContent, container);
  });
}
```

> **Nota:** se usa `encodeURIComponent`/`decodeURIComponent` (no `btoa`/`atob`) porque los `<desc>` de los waypoints suelen contener texto en español con tildes/ñ, y `btoa` falla con caracteres fuera de Latin1.

`renderMarkdownToHTML()` es el motor de renderizado Markdown → HTML que ya usa la app hoy — este documento no lo reemplaza, solo lo rodea.

## 10. UI: Botón "Insertar GPX"

```javascript
function setupGPXUploadButton(buttonId, textareaId) {
  document.getElementById(buttonId).addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.gpx';

    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();

      reader.onload = (event) => {
        const gpxContent = event.target.result;
        const textarea = document.getElementById(textareaId);
        const cursorPos = textarea.selectionStart;
        const text = textarea.value;

        textarea.value =
          text.slice(0, cursorPos) +
          `\n\n--- GPX ---\n${gpxContent}\n--- GPX ---\n\n` +
          text.slice(cursorPos);

        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      };

      reader.readAsText(file);
    };

    fileInput.click();
  });
}
```

Flujo: usuario hace click en el botón → selecciona `.gpx` → el contenido se inserta en la posición del cursor, envuelto en los divisores → el `input` event dispara el re-render normal del editor (que ya llama a `processMarkdown` + `activarBloquesGPX`).

## 11. Notas / Waypoints Geolocalizados

Formato dentro del bloque GPX (elemento `<wpt>`, estándar GPX 1.1):

```xml
<wpt lat="15.4290" lon="-88.7900">
  <name>Parada técnica</name>
  <desc>Presión baja en neumático trasero. Reinflado completado.</desc>
  <time>2024-08-15T10:55:00Z</time>
</wpt>
```

**Comportamiento:**
- Cada `<wpt>` se dibuja como marcador circular en el mapa, coloreado según palabra clave en `<name>` (tabla en `getWaypointColor()`, sección 6)
- Click en el marcador → popup con nombre y descripción
- Debajo del mapa, lista de todas las notas en orden de aparición en el archivo, con hora (si existe) y color consistente con el marcador

## 12. Imágenes en Markdown (fuera del bloque GPX)

No requiere desarrollo nuevo — es sintaxis Markdown estándar, ya soportada por el motor `renderMarkdownToHTML()` existente:

```markdown
![Descripción](https://url-de-la-imagen.jpg)
```

**Notas prácticas para el usuario final (no requieren código):**
- **Google Drive:** compartir con "Cualquiera con el enlace" → convertir el link de `drive.google.com/file/d/[ID]/view` a una URL de imagen directa tipo `lh3.googleusercontent.com/d/[ID]`
- **Google Fotos:** clic derecho sobre la foto → "Copiar dirección de imagen" (da directamente una URL `googleusercontent.com` utilizable)
- Para agrupar varias imágenes junto a una nota, usar tablas Markdown estándar

El bloque GPX no necesita saber nada sobre imágenes — viven completamente en el flujo Markdown normal, arriba/abajo/entre bloques GPX.

## 13. Dependencias Externas

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

Única dependencia externa (~150kb). Tiles de mapa: OpenStreetMap (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`), gratuito, requiere atribución (ya incluida en `initMap()`).

Orden de carga en el HTML: Leaflet CSS/JS → `gpx-parser.js` → `gpx-renderer.js` → `gpx-viewer.css` → script de integración (sección 9-10).

## 14. Ejemplo Completo de Documento

```markdown
# Viaje Corrugadora → Puerto Barrios — 15 Ago 2024

Salí de Corrugadora a las 10:30 AM en óptimas condiciones.

--- GPX ---
<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="md.crgm.app">
  <trk>
    <name>Corrugadora → Puerto Barrios</name>
    <trkseg>
      <trkpt lat="15.4251" lon="-88.7948">
        <ele>120.5</ele>
        <time>2024-08-15T10:30:00Z</time>
      </trkpt>
      <trkpt lat="15.4260" lon="-88.7940">
        <ele>125.3</ele>
        <time>2024-08-15T10:31:15Z</time>
      </trkpt>
    </trkseg>
  </trk>
  <wpt lat="15.4290" lon="-88.7900">
    <name>Parada técnica</name>
    <desc>Presión baja en neumático trasero. Reinflado completado.</desc>
    <time>2024-08-15T10:55:00Z</time>
  </wpt>
</gpx>
--- GPX ---

## Documentación fotográfica

![Camión cargado antes de salir](https://lh3.googleusercontent.com/d/EJEMPLO_ID/view)

Llegué sin más incidentes. Entrega completada a las 12:30.
```

## 15. Casos Borde y Manejo de Errores

Ya contemplados en el código de las secciones 6-7:

- **GPX inválido (XML mal formado):** `parseGPXContent` lanza error → `renderGPXBlock` lo captura y muestra `.gpx-error` en vez de romper el resto del documento
- **GPX sin `trkpt`:** error explícito ("No se encontraron puntos GPS")
- **Track sin timestamps:** no se puede calcular velocidad → `velocidades` queda vacío → medias/máx/mín caen a `0` por los defaults en `Math.max(...velocidades, 0)`; la ruta se dibuja igual pero toda en verde (cuartiles en 0)
- **Track sin `<wpt>`:** la sección de notas simplemente no se renderiza (`waypoints.length > 0 ? ... : ''`)
- **Múltiples bloques GPX en un documento:** cada uno genera su propio `mapId` aleatorio, así que no colisionan entre sí
- **Texto con tildes/ñ en `<desc>`:** cubierto por usar `encodeURIComponent` en vez de `btoa` (ver nota en sección 9)

**Pendiente de decidir (no bloqueante, pero vale la pena definirlo):** qué pasa si el usuario edita manualmente el bloque GPX y rompe la sintaxis de los divisores (p. ej. borra uno de los dos `--- GPX ---`). Recomendación: tratar el bloque abierto como Markdown normal hasta que se cierre correctamente, en vez de intentar renderizar un mapa a medias.

## 16. Preguntas Abiertas para la Implementación

Antes de implementar, conviene confirmar con Robin:

1. **Estructura HTML actual del editor** — ¿dónde vive el `<textarea>` del editor y dónde el contenedor del preview?
2. **Motor Markdown → HTML actual** — ¿qué usa hoy `md.crgm.app` para convertir Markdown a HTML? (parser propio, librería ligera, etc.) Necesario para saber exactamente dónde engancha `processMarkdown()` de la sección 9.
3. **Presupuesto de peso JS** aceptable además de Leaflet (~150kb) — ¿hay un límite duro?
4. **Ubicación del botón "Insertar GPX"** — ¿va en una barra de herramientas ya existente, o hay que crear una?
5. **Tabla de colores de waypoints** (`getWaypointColor`) — ¿se deja como heurística fija por palabra clave, o se hace configurable por el usuario (p. ej. un pequeño selector de color al crear la nota)?

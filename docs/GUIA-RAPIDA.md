# MDx — guía rápida (Windows / Linux)

Cómo abrir las versiones de escritorio, cuál elegir y qué hacer cuando algo
no arranca. Sin jerga.

---

## 0. ¿Instalador o portable?

En Windows hay dos versiones — **usa el instalador si puedes elegir**:

| | Instalador (`MDx-Instalador-Windows.exe`) | Portable (`MDx-Portable-Windows.exe`) |
|---|---|---|
| Abre... | rápido, como cualquier programa instalado | lento en un equipo nuevo la primera vez (se descomprime entero a una carpeta temporal en cada arranque) |
| Actualizaciones | solas, en segundo plano | no — cada copia se queda tal cual se descargó |
| Administrador | no hace falta (se instala solo para tu usuario) | no hace falta |
| Para qué sirve | uso normal, del día a día | llevarlo en un USB, un equipo donde no quieres dejar nada instalado |

Linux solo tiene una versión: el `.AppImage` (también se actualiza solo).

## 1. Abrirlo

| | |
|---|---|
| **Windows, instalador** | doble clic en `MDx-Instalador-Windows.exe`, elige carpeta y listo — queda un acceso directo |
| **Windows, portable** | doble clic en `MDx-Portable-Windows.exe` |
| **Linux** | `chmod +x MDx-Linux.AppImage` y luego doble clic (o `./MDx-Linux.AppImage`) |

Ninguno pide ser administrador ni toca el registro más allá de lo que tú
apruebes (ver el punto 3, "que abra los .md con doble clic").

### Windows te va a dar un susto

Puede salir una pantalla azul que dice **«Windows protegió tu PC»** — con el
instalador y con el portable, es el mismo aviso.

Pulsa **«Más información»** y luego **«Ejecutar de todas formas»**.

Sale porque el programa no está firmado digitalmente, que cuesta dinero. No
es que tenga nada malo. Con el instalador, este aviso baja de frecuencia con
el tiempo a medida que más gente lo descarga (SmartScreen aprende la
reputación del archivo); con el portable sale siempre, en cada equipo nuevo.

## 1½. ¿Cómo sé si hay una versión nueva?

No hay que revisar nada a mano: el instalador y el AppImage la buscan solos
al abrir MDx, la descargan en segundo plano y avisan cuando ya está lista
—puedes reiniciar en ese momento o seguir trabajando, se instala sola al
cerrar la app—. Para comprobarlo tú mismo hay un botón en el menú: **MDx →
Buscar actualizaciones…**.

El portable no hace nada de esto: si quieres la versión más nueva, hay que
volver a descargarlo.

### Linux: si el `.AppImage` no hace nada

En Debian 12/13 y en Ubuntu 22.04 en adelante, **FUSE ya no viene instalado
por defecto**, y un AppImage lo necesita para arrancar. Sin él, el doble
clic no hace absolutamente nada, sin ningún aviso.

Arreglo:

```bash
sudo apt install libfuse2
# si dice que el paquete no existe (Debian 13/trixie):
sudo apt install libfuse2t64
```

O, si no quieres instalar nada, ejecútalo así — evita FUSE por completo:

```bash
./MDx-Linux.AppImage --appimage-extract-and-run
```

Para ver el error real en vez de "no pasa nada", ábrelo desde una terminal
(`./MDx-Linux.AppImage`) en lugar de con doble clic.

---

## 2. ¿Descarga algo del sitio al abrirse?

No. El `.exe` y el `.AppImage` llevan la aplicación entera empaquetada
dentro — el mismo `index.html`, sus plantillas y sus iconos — y la cargan
desde el propio archivo, no desde `mdx.crgm.app`. Se puede usar sin
conexión desde la primera vez que se abre.

---

## 3. Que abra los .md con doble clic

En el menú de la propia app (arriba de la ventana) hay **MDx → Usar MDx para
abrir archivos .md**. Hace la parte tediosa sola: en Linux te deja como
predeterminado directamente; en Windows no puede hacerlo por completo —
Windows protege esa asociación desde hace años y solo el propio usuario
puede fijarla desde su cuadro nativo — así que registra MDx con su nombre e
icono correctos (para que deje de verse "en blanco") y abre ese cuadro por
ti; solo falta que elijas MDx ahí y marques «Usar siempre esta aplicación».

## 4. ¿Es solo para abrir `.md` por defecto, o es la app completa?

Es la app completa: se abre sola, sin ningún archivo, y funciona exactamente
igual que la versión web — editor, plantillas, formularios, todo. Además
acepta un archivo como argumento al abrirse, y eso es lo que permite usarla
como aplicación predeterminada del sistema para `.md`.

Lo más simple es el botón del punto 3. A mano, sin el botón:

**Windows:** clic derecho sobre un `.md` → *Abrir con* → *Elegir otra
aplicación* → busca **MDx** (si lo instalaste) o el archivo
`MDx-Portable-Windows.exe` (si usas el portable) → marca *Usar siempre esta
aplicación*. Sin pasar antes por el botón del punto 3, es probable que
aparezca con un icono genérico — el botón es lo que le pone su nombre e
icono correctos antes de que lo elijas.

**Linux:** aquí a mano es más difícil. Un `.AppImage` suelto normalmente
**no aparece** en el diálogo "Abrir con" de la mayoría de gestores de
archivos, porque esos diálogos solo listan aplicaciones con un archivo
`.desktop` registrado — el botón del punto 3 crea ese `.desktop` por ti. Sin
el botón, la alternativa es crearlo a mano, o usar
[AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher), que
integra cualquier AppImage automáticamente la primera vez que lo abres.

---

## 5. No aparece en el menú de aplicaciones

Es normal: un `.AppImage` suelto no se "instala", así que no se registra en
el menú de aplicaciones del sistema por sí solo. El botón del punto 3
soluciona esto de paso (crea el `.desktop` que hace falta); si prefieres no
usarlo, AppImageLauncher (ver arriba) también lo integra.

---

MDx es software libre bajo licencia GPL v3.
Copyright (C) 2026 Robin Gregorio · <https://md.crgm.app>

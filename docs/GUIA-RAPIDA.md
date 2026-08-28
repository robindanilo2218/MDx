# MDx — guía rápida (Windows / Linux)

Cómo abrir los portables de escritorio, qué son en realidad y qué hacer
cuando algo no arranca. Sin jerga.

---

## 1. Abrirlo

| | |
|---|---|
| **Windows** | doble clic en `mdx-windows-portable.exe` |
| **Linux** | `chmod +x mdx-linux.AppImage` y luego doble clic (o `./mdx-linux.AppImage`) |

No hay instalador. No hace falta ser administrador ni tocar el registro.

### Windows te va a dar un susto

Puede salir una pantalla azul que dice **«Windows protegió tu PC»**.

Pulsa **«Más información»** y luego **«Ejecutar de todas formas»**.

Sale porque el programa no está firmado digitalmente, que cuesta dinero. No
es que tenga nada malo.

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
./mdx-linux.AppImage --appimage-extract-and-run
```

Para ver el error real en vez de "no pasa nada", ábrelo desde una terminal
(`./mdx-linux.AppImage`) en lugar de con doble clic.

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
aplicación* → busca `mdx-windows-portable.exe` → marca *Usar siempre esta
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

MDx es software libre bajo licencia MIT.
Copyright (C) 2026 Robin Gregorio · <https://md.crgm.app>

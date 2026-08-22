#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Empaqueta el catalogo de plantillas dentro de index.html.

Por que: la galeria de plantillas se alimenta de 45 archivos sueltos de la
carpeta plantillas/. Un navegador que abre index.html a doble clic (file://)
no puede leerlos, asi que sin esto el boton "Plantillas" no aparece. Metiendo
el catalogo dentro del propio index.html, la galeria funciona igual servida
por http que abriendo el archivo directamente.

Que hace, en orden:
  1. Lee plantillas/indice.json y el .md de cada plantilla.
  2. Escribe todo junto dentro de <script id="catalogo"> de index.html.
  3. Rehace la lista de plantillas del precache de sw.js.
  4. Sube el numero de VERSION del service worker (v3 -> v4).

Uso:
    python3 herramientas/empaquetar.py            # empaqueta y sube la version
    python3 herramientas/empaquetar.py --sin-subir  # sin tocar la version
"""
import io, json, os, re, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(RAIZ, "index.html")
SW = os.path.join(RAIZ, "sw.js")
PLANTILLAS = os.path.join(RAIZ, "plantillas")

INI = '<script type="application/json" id="catalogo">'
FIN = "</script>"


def lee(ruta):
    return io.open(ruta, encoding="utf-8").read()


def escribe(ruta, texto):
    io.open(ruta, "w", encoding="utf-8", newline="\n").write(texto)


def main():
    subir = "--sin-subir" not in sys.argv

    indice = json.loads(lee(os.path.join(PLANTILLAS, "indice.json")))
    faltan = []
    for p in indice["plantillas"]:
        ruta = os.path.join(PLANTILLAS, p["archivo"])
        if not os.path.exists(ruta):
            faltan.append(p["archivo"])
            continue
        p["cuerpo"] = lee(ruta)
    if faltan:
        print("ERROR: en indice.json hay plantillas sin archivo:", ", ".join(faltan))
        return 1

    sueltos = sorted(f for f in os.listdir(PLANTILLAS)
                     if f.endswith(".md") and f not in [p["archivo"] for p in indice["plantillas"]])
    if sueltos:
        print("AVISO: hay .md en la carpeta que no estan en indice.json:", ", ".join(sueltos))

    # </script> dentro del texto de una plantilla cerraria la etiqueta antes de tiempo.
    # \/ es un escape valido de JSON y al leerlo vuelve a ser /.
    blob = json.dumps(indice, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")

    html = lee(INDEX)
    a = html.find(INI)
    if a < 0:
        print("ERROR: index.html no tiene el hueco <script id=\"catalogo\">.")
        return 1
    b = html.find(FIN, a)
    html = html[:a + len(INI)] + blob + html[b:]
    escribe(INDEX, html)

    # --- precache del service worker
    sw = lee(SW)
    lista = ['  "plantillas/indice.json",']
    lista += ['  "plantillas/%s",' % p["archivo"] for p in indice["plantillas"]]
    lineas = sw.split("\n")
    donde = [i for i, l in enumerate(lineas) if l.strip().startswith('"plantillas/')]
    if not donde:
        print("AVISO: sw.js no tiene ninguna entrada de plantillas; revisalo a mano.")
    else:
        primera = donde[0]
        sobran = set(donde)
        lineas = ([l for i, l in enumerate(lineas) if i < primera] + lista +
                  [l for i, l in enumerate(lineas) if i > primera and i not in sobran])
        sw = "\n".join(lineas)

    version = re.search(r'var VERSION = "v(\d+)";', sw)
    if subir and version:
        siguiente = int(version.group(1)) + 1
        sw = sw.replace(version.group(0), 'var VERSION = "v%d";' % siguiente, 1)
        print("service worker: v%s -> v%d" % (version.group(1), siguiente))
    escribe(SW, sw)

    kb = len(blob) / 1024.0
    print("catalogo incrustado: %d plantillas, %d categorias, %.0f KB" % (
        len(indice["plantillas"]), len(indice["categorias"]), kb))
    print("index.html: %.0f KB" % (os.path.getsize(INDEX) / 1024.0))
    return 0


if __name__ == "__main__":
    sys.exit(main())

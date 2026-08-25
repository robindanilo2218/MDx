---
titulo: Cómo se hace una diapositiva
subtitulo: el mismo documento, mostrado a pantalla completa
fecha: 
---

Una presentación aquí no es un archivo aparte: es el mismo documento en Markdown, mostrado
diapositiva a diapositiva en vez de de corrido. Lo escribes, lo revisas como texto normal, y
cuando toca exponerlo pulsas **▶ Presentar**.

## La regla: una raya, una diapositiva nueva

Cada vez que escribes una línea con tres guiones solos, empieza una diapositiva nueva:

```md
## Primera diapositiva

Lo que va aquí.

---

## Segunda diapositiva

Lo que va aquí.
```

La raya en sí no aparece: es solo el corte. Todo lo que hay entre dos rayas —título, texto,
listas, una tabla, una imagen— es una diapositiva.

Si el documento no tiene ninguna raya, no pasa nada: cada título de primer nivel (`# Así`) abre su
propia diapositiva. Sirve para presentar sobre la marcha un documento que no se pensó como
presentación, aunque queda mejor si se piensa desde el principio.

## Qué hace el botón Presentar

Pone el documento en pantalla completa del navegador y muestra una diapositiva a la vez, con letra
grande. Se navega así:

| Tecla o gesto | Hace |
| --- | --- |
| **→ · Espacio · clic en la diapositiva** | Siguiente |
| **←** | Anterior |
| **Esc** | Salir |

También hay flechas y un contador abajo, para presentar con el ratón o desde el móvil.

## Qué se ve bien en una diapositiva

- **Poco texto, letra grande.** Si hace falta leer en voz baja para caber, sobra texto: pásalo a
  las notas del documento (fuera de la diapositiva) o repártelo en dos diapositivas.
- **Una idea por diapositiva.** Es más fácil recordar seis diapositivas de una idea que tres de
  dos ideas cada una.
- **Tablas cortas.** Una tabla de tres o cuatro filas se lee de un vistazo. Una de veinte, no —
  eso va en el documento que se reparte después, no en lo que se proyecta.
- **La portada cuenta como diapositiva.** El título, subtítulo y fecha de la cabecera del
  documento salen solos como el principio de la primera diapositiva.

## Cómo se guarda y se comparte

Como cualquier documento de esta aplicación: se guarda solo en **Recientes**, se descarga en
`.md` o en `.html`, y se puede **Imprimir** — sale una diapositiva por página, para repartir en
papel. El modo Presentar no es un archivo distinto: es una forma de mirar el mismo texto.

> [!TIP]
> Para probar el modo Presentar de verdad, abre cualquiera de las plantillas de la categoría
> **Diapositivas** y pulsa el botón. Esta guía se explica mejor leída de corrido que proyectada.

## Esqueleto para empezar

Borra todo lo de arriba y quédate con esto:

```md
---
titulo: [Título de la charla]
subtitulo: [Quién la da y para quién]
fecha: 
---

# [Título de la charla]

[Tu nombre] · [fecha o evento]

---

## De qué se trata

- [Punto uno]
- [Punto dos]
- [Punto tres]

---

## [Título del primer punto]

[Una idea, dicha en pocas palabras]

---

## Gracias

[Cómo te contactan: correo, usuario, lo que corresponda]
```

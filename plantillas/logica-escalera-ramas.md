---
titulo: Escalera PLC: varias ramas en una misma línea
subtitulo: rama a la izquierda, a la derecha y al centro, combinadas en un solo peldaño
fecha: 
---

En `escalera-plc.md` cada línea era, casi siempre, un solo tramo: todo el peldaño de riel a riel, o
una sola rama con `+`. Esta plantilla es solo eso: cómo poner **más de una rama en la misma fila**.

Un ejemplo real — arranque-paro con sello, una salida auxiliar que depende de dos sensores en
paralelo, y una segunda salida — con las tres formas de rama juntas en una sola línea:

```ladder
| [PARO/]--[ARRANQUE]-------------(K1)      | arranque-paro con sello
|        +---[K1]---+     +--------(R1)     | K1 en paralelo con ARRANQUE (rama al centro); R1: rama a la izquierda, salida nueva
| [SENSOR1/]---[R1]------(K2)                | otro peldaño completo: nueva ancla para lo de abajo
| [SENSOR2]---+   +--[SENSOR3/]--+  +----(R2) | tres tramos en una fila: derecha, centro e izquierda
```

## Fila por fila

### Fila 2 — rama al centro + rama a la izquierda

`|        +---[K1]---+     +--------(R1)     |` tiene **dos** tramos:

- `+---[K1]---+` entra y sale con `+` en los dos extremos: una rama al **centro**, un puente que no
  toca ningún riel, en paralelo con `[ARRANQUE]` de la fila de arriba. El contacto auxiliar `K1` del
  propio relé sella el arranque — el clásico "self-hold".
- `+--------(R1)` entra con `+` (rama a la **izquierda**) y termina en su propia bobina `R1`: una
  salida nueva, alimentada por la misma condición de arriba, sin agregar otro peldaño completo.

### Fila 4 — las tres ramas en una sola línea

`| [SENSOR2]---+   +--[SENSOR3/]--+  +----(R2) |` tiene **tres** tramos:

- `[SENSOR2]---+` arranca del riel izquierdo (no lleva `+` al principio) y sale por la **derecha**.
- `+--[SENSOR3/]--+` es una rama al **centro**: entra y sale sin tocar ningún riel.
- `+----(R2)` entra por la **izquierda** y termina en su propia bobina `R2`.

Los tres tramos anclan al peldaño completo más cercano hacia arriba — la fila 3
(`[SENSOR1/]---[R1]------(K2)`), no la fila 1: cada `+` sube hasta el primer peldaño **completo**
que encuentra, saltándose los que ya tienen sus propias ramas.

## La regla, en una frase

Un `+` **abre** un tramo si el tramo en curso está vacío, y lo **cierra** si ya tiene algo adentro —
así que con tantos `+` como hagan falta, una misma fila arma tantos tramos como haga falta, cada uno
con su propia rama: izquierda, derecha, las dos (un puente al centro), o ninguna si es el primer o
el único tramo de la fila.

> [!NOTA]
> Solo el primer tramo de la fila puede arrancar sin `+` (del riel izquierdo), y solo el último
> puede terminar sin `+` (del riel derecho, con o sin bobina propia). Cualquier tramo del medio
> necesita su propio `+` en los dos extremos — por eso una bobina "suelta", sin `+` que la siga,
> solo puede estar en el último tramo de la fila. Para dos o más salidas nuevas en la misma
> condición se sigue usando una fila por rama (ver el segundo ejemplo de `escalera-plc.md`).

## Esqueleto para empezar

```ladder
| [ANCLA] ------------- (K1)         |
| [X] --------+   +--[Y]--+   +--(Z) |
```

Cambiá `[ANCLA]`/`(K1)` por tu propia condición y peldaño ancla, y `[X]`, `[Y]`, `[Z]` por tus
contactos y salida.

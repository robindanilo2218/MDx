---
titulo: Escalera PLC (IEC/NEMA)
subtitulo: contactos, bobina y derivación en paralelo, en dos normas de dibujo
fecha: 
---

Un bloque ` ```ladder ` dibuja un diagrama de escalera de PLC o de mando de motor: contactos,
bobina, temporizador y ramas en paralelo, con el símbolo europeo (IEC) o americano (NEMA), a
elección.

Pruébalo aquí mismo — es el clásico arranque-paro con sello, con un piloto que se enciende 5
segundos después:

```ladder
| [PARO/] [ARRANQUE] ---------------- (M1)  | arranque-paro con sello
| [M1] ----+                                |
| [M1] ------------ [TON T1 5s] ----- (L1)  | piloto retardado
```

Cambia `norma=nema` en la primera línea del bloque de arriba y verás los mismos contactos con el
símbolo americano en vez del europeo — el texto no cambia, solo el dibujo.

También se puede tener más de una salida real desde la misma condición, o un puente que sortea un
tramo del peldaño de arriba — con un `+` al PRINCIPIO del peldaño en vez de (o además de) al final:

```ladder
| [A] [B] ---------------- (M1)  | salida 1
| +------------------------ (M2) | salida 2, en paralelo con M1 (no en serie)
| +-----[C]----------------+     | puente en U: entra y sale del mismo peldaño de arriba
```

## Cómo se escribe

```md
​```ladder norma=nema
| [PARO/] [ARRANQUE] ---------------- (M1)  | comentario del peldaño
​```
```

Cada línea es un peldaño: `| <contenido> | <comentario opcional>`.

| Se escribe | Es |
| --- | --- |
| `[X]` | contacto normalmente abierto (NA) |
| `[X/]` | contacto normalmente cerrado (NC) |
| `(Y)` | bobina |
| `[TON Tn t]` | temporizador a la conexión, `t` en segundos (`[TON T1 5s]` o `[TON T1 1.5s]`) |
| `+` al final del peldaño | este extremo no llega al riel derecho: se conecta arriba (salida) |
| `+` al principio del peldaño | este extremo no arranca en el riel izquierdo: se conecta arriba (entrada) |
| `-` y los espacios | solo relleno visual del cable, no hacen nada |

- `norma=iec` (por defecto) o `norma=nema` — parámetro del bloque, solo cambia el símbolo
  dibujado, nunca el texto de entrada.
- **La columna importa.** Un `+` se conecta hacia arriba al peldaño completo más cercano, justo en
  la posición donde quede escrito — por eso, en el primer ejemplo, el `[M1]` de la segunda línea
  queda en paralelo con `[ARRANQUE]`, no con `[PARO/]`: alinea el `+` bajo el punto del cable de
  arriba donde quieres que se conecte. Cuando un peldaño tiene `+` en ambos extremos (el puente en
  U), cada uno busca su propia columna de forma independiente — pueden caer sobre el mismo peldaño
  ancla o sobre columnas distintas.

> [!NOTA]
> Un peldaño completo (con bobina) no lleva ningún `+`. Con `+` solo al final: rama de sello, sin
> bobina propia (como el `[M1]` del primer ejemplo). Con `+` solo al principio: una salida más en
> paralelo, con su propia bobina (segundo ejemplo). Con `+` en los dos extremos: un puente, sin
> bobina propia — no representaría nada tener una bobina puenteando dos puntos del mismo cable.

## Lo que no hace

- No hay contador (`CTU`/`CTD`) todavía, solo temporizador `TON`.
- No dibuja diagramas unifilares (líneas de potencia, transformadores, disyuntores) — es otra
  familia de diagrama, pensada para contactos y bobinas de control.
- Una rama (cualquier peldaño con `+`) no puede servir de ancla para otra: si el peldaño
  inmediatamente arriba tampoco es completo, la búsqueda sigue subiendo hasta encontrar uno que sí
  lo sea — no hace falta que la rama de arriba sea completa a propósito.

## Esqueleto para empezar

Borra todo lo de arriba y quédate con esto:

```ladder
| [X] ----------- (Y)  |
```

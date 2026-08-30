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
| `+` al final del peldaño | derivación: una rama en paralelo, sin bobina propia |
| `-` y los espacios | solo relleno visual del cable, no hacen nada |

- `norma=iec` (por defecto) o `norma=nema` — parámetro del bloque, solo cambia el símbolo
  dibujado, nunca el texto de entrada.
- **La columna importa.** Un `+` se conecta hacia arriba al peldaño con bobina más cercano, justo
  en la posición donde quede escrito — por eso, en el ejemplo, el `[M1]` de la segunda línea queda
  en paralelo con `[ARRANQUE]`, no con `[PARO/]`: alinea el `+` bajo el punto del cable de arriba
  donde quieres que se conecte.

> [!NOTA]
> Un peldaño es o bien completo (termina en una bobina `(Y)`) o bien una derivación (termina en
> `+`) — nunca las dos cosas, y el `+` va siempre al final.

## Lo que no hace

- No hay contador (`CTU`/`CTD`) todavía, solo temporizador `TON`.
- No dibuja diagramas unifilares (líneas de potencia, transformadores, disyuntores) — es otra
  familia de diagrama, pensada para contactos y bobinas de control.
- Una derivación no puede tener, a su vez, otra derivación colgando de ella.

## Esqueleto para empezar

Borra todo lo de arriba y quédate con esto:

```ladder
| [X] ----------- (Y)  |
```

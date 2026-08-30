---
titulo: Tabla de verdad automática
subtitulo: declara las entradas y una expresión booleana, la tabla se calcula sola
fecha: 
---

Un bloque ` ```verdad ` calcula solo todas las combinaciones posibles de unas entradas y el
resultado de una o más salidas booleanas — no hace falta escribir la tabla a mano ni contarlas.

Pruébalo aquí mismo, cambiando la fórmula de alguna salida:

```verdad
entradas: A, B
salida S = A Y B
salida T = A O-EXCLUSIVA B
```

## Cómo se escribe

```md
​```verdad
entradas: A, B, C
salida S = (A Y B) O (NO C)
salida T = A O-EXCLUSIVA B
​```
```

- `entradas:` se escribe **una sola vez**, con los nombres separados por comas.
- Cada `salida NOMBRE = expresión` agrega una columna calculada. Puede haber varias.
- El motor genera solo las 2ⁿ combinaciones (n = número de entradas) y calcula cada salida en
  cada fila.

## Operadores, en español

| Se escribe | Significa | Se lee |
| --- | --- | --- |
| `Y` | AND | «y» |
| `O` | OR | «o» |
| `NO` | NOT | «no» |
| `O-EXCLUSIVA` | XOR | «o exclusiva» |
| `NI` | NOR | «ni» |
| `NO-Y` | NAND | «no-y» |

No distinguen mayúsculas de minúsculas. La precedencia es `NO` > `Y` > `O` (igual que en las
fórmulas de las hojas de cálculo con `* /` antes de `+ -`) — usa paréntesis para forzar otro
orden, como en `(A O B) Y NO C`.

> [!NOTA]
> Un nombre de entrada puede tener más de una letra (`NIVEL`, `PARO`) sin chocar con las palabras
> clave: `NO-Y` y `NIVEL` no se confunden porque las palabras clave no pueden ser el prefijo de
> un nombre más largo.

## Lo que no hace

- No hay más de 8 entradas (256 filas) — pasado ese límite, el bloque avisa en vez de generar un
  documento enorme por accidente.
- No mezcla aritmética y lógica: `A + 1` no es válido aquí — para cuentas con números, usa
  `=formula` en una tabla normal.
- Si una variable de la expresión no está declarada en `entradas:`, o la sintaxis no se entiende,
  el bloque muestra un aviso de error en vez de una tabla a medias.

## Esqueleto para empezar

Borra todo lo de arriba y quédate con esto:

```verdad
entradas: A, B
salida S = A Y B
```

---
titulo: Cómo se hace una hoja de cálculo
subtitulo: celdas que se calculan solas, como en una tabla de Excel
fecha: 
---

Una tabla normal de Markdown solo tiene texto. Aquí puede tener, además, celdas que **se calculan
solas** a partir de otras celdas de la misma tabla — igual que en una hoja de cálculo, con
direcciones de celda tipo `A1`, `B2`, y funciones como `SUMA` o `PROMEDIO`.

Pruébalo aquí mismo. Escribe un número en las dos primeras celdas y mira la tercera:

| A | B | C |
| --- | :-: | :-: |
| Precio | [[ =numero::12]] | |
| Cantidad | [[ =numero::3]] | |
| **Total** | | [[Total =formula::B2*B3]] |

## La idea

Cada tabla que tenga al menos una celda con `=formula` se convierte en su propia hoja de cálculo.
Las columnas se cuentan como letras (A, B, C…) y las filas como números (1, 2, 3…), de izquierda a
derecha y de arriba abajo, **contando también la fila de cabecera** como la fila 1. Así, en la
tabla de arriba, la cabecera («A», «B», «C») es la fila 1, «12» está en `B2` y «3» está en `B3`.

## Cómo se escribe una celda con fórmula

```md
[[Total =formula::B2*B3]]
```

- Lo que va **antes** de `=formula` es solo una etiqueta para el cursor (opcional, se puede dejar
  vacía escribiendo `[[ =formula::...]]`).
- `=formula` es lo que marca la celda como calculada en vez de como un dato.
- Lo que va **después** de `::` es la fórmula en sí: se lee y se calcula, no se rellena a mano.

La celda calculada sale en negrita y no se puede tocar con el ratón — para cambiar el resultado,
cambia los números de los que depende.

## Qué se puede escribir en una fórmula

| Se escribe | Significa |
| --- | --- |
| `B1*B2` | multiplicar el contenido de dos celdas |
| `B1+B2-B3` | sumar y restar celdas |
| `(B1+B2)*1.19` | paréntesis, para el IVA y cuentas parecidas |
| `SUMA(B2:B6)` | sumar un rango de celdas, de la fila 2 a la 6 |
| `PROMEDIO(B2:B6)` | el promedio del mismo rango |
| `MAX(B2:B6)` / `MIN(B2:B6)` | el mayor o el menor valor del rango |
| `CONTAR(B2:B6)` | cuántas celdas tiene el rango |
| `REDONDEAR(B1/B2, 2)` | el resultado con dos decimales |

Un rango como `B2:B6` funciona en columna, en fila (`B2:E2`) o en bloque (`B2:D6`). Los operadores
`+ - * /` y las funciones se pueden combinar y anidar: `SUMA(B2:B6)*1.19` es válido.

## Qué puede referenciar una celda

Cualquier celda de la **misma tabla**: un dato escrito a mano, un campo `[[ =numero]]` que alguien
va a rellenar, o incluso otra celda con fórmula. Una hoja de cálculo no puede leer celdas de otra
tabla ni de otro documento — cada tabla es su propio mundo.

> [!TIP]
> Escribe las fórmulas **después**, en el orden de lectura, de las celdas que usan: primero los
> datos, luego los subtotales, y al final el total que suma los subtotales. Si una fórmula
> referencia a otra que está más abajo en la misma tabla, el resultado se retrasa un cálculo —
> se corrige solo en cuanto algo más se vuelve a escribir, pero es más simple evitarlo desde el
> principio.

## Cuándo se recalcula

Al momento: cada vez que escribes en un campo numérico de la tabla, las celdas con fórmula se
vuelven a calcular sin que hagas nada más. No hace falta pulsar ningún botón ni guardar.

## Lo que no hace

Esto no es una hoja de cálculo completa — es lo justo para que un presupuesto, una factura o un
control de horas no obliguen a abrir otra aplicación:

- No hay celdas que se «arrastren» para copiar una fórmula a las de abajo: se escribe una por una.
- No hay referencias entre tablas ni entre documentos.
- Si una fórmula no se puede leer (una celda vacía cuenta como 0, pero una letra donde se espera
  un número no), la celda muestra `?` en vez de un número.

## Esqueleto para empezar

Borra todo lo de arriba y quédate con esto — una tabla de gastos con el total ya calculado:

| Concepto | Monto |
| --- | ---: |
| [[Concepto]] | [[ =numero]] |
| [[Concepto]] | [[ =numero]] |
| [[Concepto]] | [[ =numero]] |
| **Total** | [[Total =formula::SUMA(B2:B4)]] |

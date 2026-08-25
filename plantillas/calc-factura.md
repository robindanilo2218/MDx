---
titulo: Factura
subtitulo: [Nombre de tu negocio]
fecha: 
---

**De:** [[Tu negocio]] — **Para:** [[Cliente]]
**Factura n.º** [[Número =numero]] · **Fecha** [[Fecha =fecha]]

Líneas de producto o servicio. Escribe la cantidad y el precio unitario de cada una: el subtotal
de la fila, el subtotal general, el IVA y el total se calculan solos — cambia cualquier número y
todo se actualiza al momento.

| Descripción | Cantidad | Precio unitario | Subtotal |
| --- | :-: | ---: | ---: |
| [[Descripción]] | [[ =numero]] | [[ =numero]] | [[Subtotal =formula::B2*C2]] |
| [[Descripción]] | [[ =numero]] | [[ =numero]] | [[Subtotal =formula::B3*C3]] |
| [[Descripción]] | [[ =numero]] | [[ =numero]] | [[Subtotal =formula::B4*C4]] |
| **Subtotal** | | | [[Subtotal general =formula::SUMA(D2:D4)]] |
| **IVA (19%)** | | | [[IVA =formula::D5*0.19]] |
| **Total** | | | [[Total =formula::D5+D6]] |

## Cómo ajustarlo

- Añade o borra filas de producto según haga falta; solo ten en cuenta que el subtotal general
  apunta a un rango de filas (`SUMA(D2:D4)`) — si cambias el número de líneas, ajusta el rango
  para que siga cubriendo todas las filas de producto, sin llegar a la fila del propio subtotal.
- Cambia el `0.19` de la fórmula del IVA por la tasa que corresponda en tu país (`0.16`, `0.21`,
  la que sea), o bórrala entera —y ajusta el Total para que sume solo el subtotal general— si lo
  que facturas no lleva impuesto.
- Una fila sin cantidad o sin precio cuenta como 0 y no rompe ninguna fórmula, pero tampoco suma
  nada: revisa que no quede ninguna línea a medio llenar en la factura que mandes.

> [!TIP]
> Descarga la factura como `.md` o como `.html` antes de enviarla — queda un registro de lo que
> se cobró, con las cuentas ya hechas, sin depender de que quien la reciba abra una hoja de
> cálculo aparte.

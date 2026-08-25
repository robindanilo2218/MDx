---
titulo: Presupuesto personal
subtitulo: [mes y año]
fecha: 
---

Ingresos y gastos del mes, en una sola tabla. Escribe los montos y el total, el gasto y el
balance se calculan solos — cambia cualquier número y todo lo demás se actualiza al momento.

| Concepto | Tipo | Monto |
| --- | --- | ---: |
| [[Concepto::Salario]] | Ingreso | [[ =numero]] |
| [[Concepto::Otros ingresos]] | Ingreso | [[ =numero]] |
| [[Concepto::Vivienda (renta o hipoteca)]] | Gasto | [[ =numero]] |
| [[Concepto::Alimentación]] | Gasto | [[ =numero]] |
| [[Concepto::Transporte]] | Gasto | [[ =numero]] |
| [[Concepto::Servicios (luz, agua, internet)]] | Gasto | [[ =numero]] |
| [[Concepto::Otros gastos]] | Gasto | [[ =numero]] |
| **Total ingresos** | | [[Total ingresos =formula::SUMA(C2:C3)]] |
| **Total gastos** | | [[Total gastos =formula::SUMA(C4:C8)]] |
| **Balance del mes** | | [[Balance =formula::C9-C10]] |
| **% del ingreso que ahorras** | | [[% ahorro =formula::REDONDEAR(C11/C9*100,1)]] |

## Cómo ajustarlo

- Añade o borra filas de «Ingreso» o «Gasto» según tu caso; solo ten en cuenta que las dos fórmulas
  de total apuntan a un rango de filas (`SUMA(C2:C3)`, `SUMA(C4:C8)`) — si mueves filas, ajusta el
  rango para que siga cubriendo las filas correctas.
- Si un mes no aplica una fila (por ejemplo, sin «Otros ingresos»), déjala en blanco: una celda
  vacía cuenta como 0 y no rompe ninguna fórmula.
- El balance negativo no es un error de la hoja: es la hoja diciendo que ese mes se gastó más de
  lo que entró.

> [!TIP]
> Guarda una copia de este documento cada mes (Descargar → .md) antes de vaciarlo para el
> siguiente. Doce copias son tu historial del año, sin depender de ninguna cuenta ni servicio.

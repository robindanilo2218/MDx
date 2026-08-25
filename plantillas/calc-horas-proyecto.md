---
titulo: Control de horas
subtitulo: [Nombre del proyecto o cliente]
fecha: 
---

**Proyecto:** [[Proyecto]] — **Cliente:** [[Cliente]]
**Periodo:** [[Periodo]]

Horas por tarea, con su tarifa. El costo de cada fila, el total de horas y el total de costo del
proyecto se calculan solos — cambia cualquier número y todo se actualiza al momento.

| Tarea | Horas | Tarifa por hora | Costo |
| --- | ---: | ---: | ---: |
| [[Tarea]] | [[ =numero]] | [[ =numero]] | [[Costo =formula::B2*C2]] |
| [[Tarea]] | [[ =numero]] | [[ =numero]] | [[Costo =formula::B3*C3]] |
| [[Tarea]] | [[ =numero]] | [[ =numero]] | [[Costo =formula::B4*C4]] |
| **Total horas** | [[Total horas =formula::SUMA(B2:B4)]] | | |
| **Total costo** | | | [[Total costo =formula::SUMA(D2:D4)]] |

## Cómo ajustarlo

- Añade o borra filas de tarea según haga falta; solo ten en cuenta que los dos totales apuntan a
  un rango de filas (`B2:B4`, `D2:D4`) — si cambias el número de tareas, ajusta ambos rangos para
  que sigan cubriendo todas las filas.
- Cada tarea puede tener su propia tarifa: no hace falta que todo el proyecto se cobre igual, la
  fórmula de la fila (`B2*C2`) usa la tarifa que escribas en esa fila.
- Si trabajas por fracciones de hora, escribe el decimal (`1.5`, `0.25`) — la tabla no distingue
  entre horas enteras y fracciones, solo multiplica lo que encuentra.

> [!TIP]
> Guarda una copia (Descargar → .md) al cerrar cada periodo de facturación, antes de vaciar la
> tabla para el siguiente proyecto o el siguiente mes del mismo cliente.

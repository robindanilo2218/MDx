---
titulo: Gestor de proyectos
subtitulo: tablero de tareas con responsable, estado y avance calculado solo
fecha: 
---

**Proyecto:** [[Proyecto]] — **Responsable general:** [[Responsable]]
**Inicio:** [[ =fecha]] — **Entrega:** [[ =fecha]]

Una tabla en vez de un tablero de columnas: cada tarea lleva su responsable, su estado y una
casilla de **Hecho** con `0` o `1` — el avance del proyecto de abajo se calcula solo a partir de
esa columna, sin tocar nada más.

| Tarea | Responsable | Fecha límite | Prioridad | Hecho (0/1) |
| --- | --- | --- | --- | :-: |
| [[Tarea]] | [[Responsable]] | [[ =fecha]] | [[Prioridad =Alta/Media/Baja]] | [[ =numero::0]] |
| [[Tarea]] | [[Responsable]] | [[ =fecha]] | [[Prioridad =Alta/Media/Baja]] | [[ =numero::0]] |
| [[Tarea]] | [[Responsable]] | [[ =fecha]] | [[Prioridad =Alta/Media/Baja]] | [[ =numero::0]] |
| [[Tarea]] | [[Responsable]] | [[ =fecha]] | [[Prioridad =Alta/Media/Baja]] | [[ =numero::0]] |
| [[Tarea]] | [[Responsable]] | [[ =fecha]] | [[Prioridad =Alta/Media/Baja]] | [[ =numero::0]] |
| **Avance del proyecto** | | | | [[Avance =formula::REDONDEAR(SUMA(E2:E6)/CONTAR(E2:E6)*100,0)]] % |

## Cómo se calcula el avance

`SUMA(E2:E6)` cuenta cuántas tareas tienen un `1` en Hecho; `CONTAR(E2:E6)` cuenta cuántas filas
hay en total (da igual lo que tengan escrito); la división entre ambas, en porcentaje, es el
avance. Al marcar una tarea como terminada — cambiar su `0` por `1` — el porcentaje se
recalcula solo.

> [!TIP]
> Si añades o quitas filas de tarea, ajusta el rango `E2:E6` de la fórmula para que siga cubriendo
> exactamente las filas de la tabla — ni una de menos, ni una vacía de más.

## Bandeja de bloqueos

Lo que frena una tarea y no depende de quien la tiene asignada:

- [ ] [[Bloqueo]] — afecta a: [[Tarea afectada]]
- [ ] [[Bloqueo]] — afecta a: [[Tarea afectada]]

## Próxima reunión de seguimiento

**Fecha:** [[ =fecha]] · **Hora:** [[ =hora]]

Temas: [[Temas]]

---

Para el orden de las tareas en el tiempo — qué va antes de qué, y cuánto dura cada una — usa junto
con esta tabla la plantilla **Cronograma de proyecto (Gantt)** del mismo apartado.

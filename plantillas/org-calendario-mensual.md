---
titulo: Calendario mensual
subtitulo: cuadrícula del mes para imprimir o rellenar en pantalla
fecha: 
---

Un mes en forma de cuadrícula, como los calendarios de pared que se compran impresos — solo que
este es tuyo, se rellena a mano o a máquina, y se guarda dentro del mismo `.md`. Cada casillero
tiene un campo `[[ ]]` para anotar el evento del día.

> [!TIP]
> MDx todavía no tiene un bloque ` ```calendario ` que dibuje el mes solo a partir de una lista de
> fechas y pase de mes con flechas ◀ ▶ — está en la lista de pendientes del motor. Mientras tanto,
> esta cuadrícula (una tabla normal de Markdown) y la agenda de abajo (campos de fecha) cubren el
> mismo trabajo a mano.

## Septiembre 2026

| Lun | Mar | Mié | Jue | Vie | Sáb | Dom |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|  | **1**<br>[[ ]] | **2**<br>[[ ]] | **3**<br>[[ ]] | **4**<br>[[ ]] | **5**<br>[[ ]] | **6**<br>[[ ]] |
| **7**<br>[[ ]] | **8**<br>[[ ]] | **9**<br>[[ ]] | **10**<br>[[ ]] | **11**<br>[[ ]] | **12**<br>[[ ]] | **13**<br>[[ ]] |
| **14**<br>[[ ]] | **15**<br>[[ ]] | **16**<br>[[ ]] | **17**<br>[[ ]] | **18**<br>[[ ]] | **19**<br>[[ ]] | **20**<br>[[ ]] |
| **21**<br>[[ ]] | **22**<br>[[ ]] | **23**<br>[[ ]] | **24**<br>[[ ]] | **25**<br>[[ ]] | **26**<br>[[ ]] | **27**<br>[[ ]] |
| **28**<br>[[ ]] | **29**<br>[[ ]] | **30**<br>[[ ]] |  |  |  |  |

## Cómo adaptarla a otro mes

1. Busca en qué día de la semana cae el 1 del mes que quieres y déjalo en su columna (Lun a Dom);
   las casillas de antes se quedan vacías, sin número.
2. Sigue contando hacia adelante hasta el último día del mes; las que sobren al final también
   quedan vacías.
3. Borra los campos `[[ ]]` de un mes ya pasado antes de reusar la tabla, o guarda una copia
   (Descargar → .md) por cada mes que quieras conservar.

## Agenda de eventos

Para lo que no cabe en una casilla chica — la fecha exacta, quién, dónde — una lista aparte, en
orden:

| Fecha | Evento | Nota |
| --- | --- | --- |
| [[ =fecha]] | [[Evento]] | [[Nota]] |
| [[ =fecha]] | [[Evento]] | [[Nota]] |
| [[ =fecha]] | [[Evento]] | [[Nota]] |

Los cumpleaños y aniversarios que se repiten cada año se anotan igual, con el año que quieras de
referencia — cópialos a la agenda del año siguiente cuando toque.

## Interoperabilidad

Nada de "conectar con Google Calendar": eso abre la puerta a cuentas, tokens y conexión
obligatoria. Si algún día hace falta, la idea es importar y exportar `.ics` con un botón — texto
plano de un lado a otro, igual que un archivo GPX. Mientras ese botón no exista, copia a mano lo
que necesites entre esta agenda y tu calendario de teléfono.

---
titulo: Justificación de inversión eléctrica (reemplazo o mejora) de [planta o área]
subtitulo: [periodo o equipo]
autor: [nombre y cargo]
fecha: 
---

## Lo que se pide

Dos líneas. Si dirección solo lee esto, tiene que poder decidir.

- Se pide [qué se compra o se reemplaza: transformador, tablero, monitoreo en línea o banco de capacitores, con capacidad y ubicación] antes de [fecha límite y por qué esa fecha].
- Costo total [monto y moneda]: [monto] de equipo, [monto] de montaje, [monto] de ingeniería y pruebas. Beneficio anual [monto]. Se recupera en [meses].

## El problema, con evidencia

Una fila por prueba, con fecha y con quién la firmó. Sin eso, esto es una opinión.

| Evidencia | Qué muestra | Fecha | Quién la levantó | Respaldo |
| --- | --- | --- | --- | --- |
| Historial de fallas | [n disparos y h de paro en 24 meses] | [fecha] | [nombre] | [orden de trabajo n] |
| Termografía | [delta T del punto caliente contra su referencia; severidad según la tabla de la norma de termografía que apliques] | [fecha] | [nombre] | [informe n] |
| Pruebas eléctricas | [aislamiento, índice de polarización, resistencia de contactos, contra la medición anterior] | [fecha] | [nombre] | [protocolo n] |
| Aceite y gases disueltos | [valores y tendencia, interpretados con la guía de DGA vigente] | [fecha] | [laboratorio] | [informe n] |
| Edad y repuestos | [años en servicio contra la vida esperada del fabricante; parte descontinuada y semanas de entrega] | [fecha] | [proveedor] | [carta del fabricante] |
| Carga | [carga medida contra la placa y kW nuevos que suma el proyecto de ampliación] | [fecha] | [nombre] | [registro del analizador] |
| Calidad de la energía | [factor de potencia y distorsión medidos en el punto de acople común, contra los límites de la edición vigente de IEEE 519] | [fecha] | [nombre] | [estudio n] |

Lo que convence no es un valor feo, es la tendencia: pon la medición de hoy junto a la de [año anterior] y deja que la pendiente hable.

## Qué pasa si no se hace

Probabilidad por consecuencia. Di de dónde sale cada número, aunque sea una estimación del equipo.

| Escenario | Probabilidad al año | Horas de paro | Costo estimado | De dónde sale |
| --- | :---: | ---: | ---: | --- |
| Falla del equipo con paro no programado | [%] | [h] | [monto] | [historial propio o dato del fabricante] |
| Falla con daño a personas | [%] | [h] | [no se monetiza] | [hallazgo de seguridad n] |
| Penalización por factor de potencia | [%] | — | [monto al año] | [facturas de los últimos 12 meses] |
| Hallazgo de auditoría o del seguro | [%] | — | [monto] | [informe de inspección] |

> [!WARNING]
> El riesgo a las personas no se negocia con un periodo de recuperación. Si el equipo no permite desenergizar, maniobrar sin exponer al personal o cumplir la norma que te aplica, saca ese punto del cálculo financiero: deja de ser una inversión opcional y pasa a ser la corrección de un hallazgo de seguridad.

## El costo de la hora de paro

Calcúlalo por las dos rutas. Si dan distinto, usa el menor: es más fácil de defender.

- Ruta de producción: costo de la hora de paro = unidades que se dejan de producir en una hora × margen de contribución por unidad.
- Ruta de contabilidad: costo de la hora de paro = (costos fijos del área en el mes ÷ horas productivas del mes) + margen de contribución perdido por hora.
- Súmale aparte lo que solo aparece cuando hay paro: [producto en proceso que se tira], [arranque y estabilización], [horas extra], [flete urgente], [penalización por entrega tardía].
- Cifra que usa este documento: [monto por hora], calculada por la ruta de [producción o contabilidad] con datos de [mes o periodo].

Firma esa cifra con [nombre de finanzas o de producción]. A partir de ahí el número deja de ser tuyo y es de la casa.

## Opciones consideradas

Todas se cotizan igual, incluida la de no hacer nada. Si una opción no se estudió, no la pongas.

| # | Opción | Inversión | Costo anual de operar | Riesgo que queda | Listo en |
| :---: | --- | ---: | ---: | --- | --- |
| 0 | No hacer nada, mantener y esperar | 0 | [monto] | [qué queda expuesto] | — |
| 1 | Reparar o reacondicionar | [monto] | [monto] | [qué queda expuesto] | [semanas] |
| 2 | Reemplazo equivalente | [monto] | [monto] | [qué queda expuesto] | [semanas] |
| 3 | Reemplazo con mejora [capacidad, monitoreo, protecciones] | [monto] | [monto] | [qué queda expuesto] | [semanas] |

## Las cuentas

Fórmulas a la vista y supuestos aparte, para que finanzas pueda cambiarlos sin rehacer el documento.

- Pérdida evitada al año = probabilidad anual de falla × horas de paro por falla × costo de la hora de paro.
- Ahorro de energía al año = kWh que se dejan de perder al año × precio del kWh.
- Pérdidas del transformador al año = ((pérdidas en vacío en kW × 8760 h) + (pérdidas con carga en kW × factor de carga al cuadrado × horas con carga)) × precio del kWh.
- Ahorro por factor de potencia al año = penalización facturada al mes × 12. Copia la fórmula y el factor mínimo de tu tarifa; no supongas el umbral.
- Beneficio anual = ahorro de energía + penalizaciones que se evitan + pérdida evitada + correctivo que se deja de gastar.
- Periodo de recuperación en años = inversión ÷ beneficio anual.
- Costo del ciclo de vida = inversión + suma anual de (operación + mantenimiento + energía perdida + paros esperados) traída a valor presente + retiro − valor residual.

| Concepto | Opción 0 | Opción 1 | Opción 2 | Opción 3 |
| --- | ---: | ---: | ---: | ---: |
| Inversión | 0 | [monto] | [monto] | [monto] |
| Beneficio anual | 0 | [monto] | [monto] | [monto] |
| Periodo de recuperación | — | [años] | [años] | [años] |
| Costo del ciclo de vida a [n] años | [monto] | [monto] | [monto] | [monto] |

| Supuesto | Valor usado | Quién lo da | Qué pasa si cambia |
| --- | ---: | --- | --- |
| Tasa de descuento | [%] | Finanzas | [efecto en la recuperación] |
| Horizonte de análisis | [años] | Finanzas | [efecto en el ciclo de vida] |
| Precio del kWh | [monto] | [factura o contrato] | [efecto en el ahorro] |
| Costo de la hora de paro | [monto] | [producción y finanzas] | [efecto en la pérdida evitada] |

La tasa, el horizonte y el tipo de cambio los pone finanzas, no mantenimiento. Tú respondes por las horas, los kWh y las probabilidades.

> [!CAUTION]
> Si lo que pides es un banco de capacitores, mide antes la distorsión armónica en el punto de acople común y revisa la resonancia con el transformador y con los variadores. Un banco montado sobre una red con armónicos amplifica corrientes, quema fusibles y capacitores, y cuesta más que la penalización que ibas a evitar. Compara contra los límites de la edición vigente de IEEE 519, no contra un valor de memoria.

## Plan de ejecución y ventana de paro

Fechas, responsables y la maniobra escrita antes de tocar nada.

| # | Hito | Duración | Depende de | Responsable |
| :---: | --- | --- | --- | --- |
| 1 | Orden de compra, fabricación y pruebas de fábrica con testigo | [semanas] | Aprobación | [nombre] |
| 2 | Obra civil, ductos y puesta a tierra | [semanas] | 1 | [nombre] |
| 3 | Ventana de paro y maniobra | [h] | 1 y 2 | [nombre] |
| 4 | Pruebas de puesta en servicio | [días] | 3 | [nombre] |
| 5 | Entrega, planos actualizados y capacitación | [días] | 4 | [nombre] |

- [ ] Ventana pactada por escrito con producción: [fecha, hora de inicio, hora de entrega]
- [ ] Plan de maniobras y unifilar actualizado, firmados por [responsable eléctrico], con la maniobra asignada por nombre a personal calificado
- [ ] Las cinco reglas de oro en la orden de trabajo: cortar, bloquear, verificar ausencia de tensión con un detector probado antes y después, poner a tierra y en cortocircuito, señalizar y delimitar la zona
- [ ] Bloqueo y etiquetado con candado y tarjeta propios por cada persona que interviene
- [ ] EPP y distancias según [la tabla correspondiente de la NFPA 70E vigente o de la norma local que te obligue]; si no hay estudio de arco eléctrico actualizado, entra en el alcance del proyecto
- [ ] Plan de retorno escrito: qué se hace si a la hora [X] el equipo no arranca
- [ ] Protocolo de pruebas firmado antes de energizar: [ANSI/NETA ATS vigente si el equipo es nuevo, MTS si ya estaba en servicio, o el protocolo del fabricante]

> [!WARNING]
> Desenergizar es la regla. Trabajar con tensión es la excepción y exige justificación escrita, análisis de riesgo y permiso firmado antes de empezar. Una prisa de producción no es justificación.

## Normas que aplican

Cita el artículo, no la impresión. Un incumplimiento con número de cláusula pesa más que tres párrafos.

Sustituye la norma por la que te aplique: NFPA 70E y NEC (NFPA 70) en buena parte de América, IEC 60364 en el ámbito internacional, y la local que te obligue: NOM-001-SEDE (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina).

- [ ] Requisito que hoy no se cumple: [norma, artículo] — [qué falta] — [qué pasa si viene el inspector o el ajustador del seguro]

No escribas de memoria fronteras de aproximación, categorías de EPP, energía incidente, límites de distorsión ni pares de apriete: cópialos de la edición vigente que te aplica y anota el número de tabla.

## Qué se deja de hacer si se aprueba

El dinero y las horas salen de algún lado. Dilo tú antes de que lo pregunten.

| Trabajo que se pospone | Presupuesto u horas que libera | Riesgo de posponerlo | Hasta cuándo aguanta |
| --- | ---: | --- | --- |
| [trabajo] | [monto o h] | [qué se expone] | [fecha] |

## Recomendación

Una opción, no tres. Di también qué se pierde al elegirla.

- Recomiendo la opción [n]: [nombre].
- Gana por riesgo: [qué deja de estar expuesto]. Gana por dinero: [beneficio anual y ciclo de vida contra la opción 0].
- Qué no resuelve: [lo que queda pendiente y cuándo habrá que volver a pedirlo].
- Qué pasa si se aprueba tarde: después de [fecha] cambia [el precio, la ventana de paro o el riesgo].

## Aprobaciones

Cada firma responde por una cosa distinta. Que quede escrito cuál.

| Papel | Nombre | Qué firma | Fecha |
| --- | --- | --- | --- |
| Mantenimiento eléctrico | [nombre] | Evidencia técnica y alcance | [fecha] |
| Producción | [nombre] | Ventana de paro y costo de la hora | [fecha] |
| Seguridad | [nombre] | Riesgo a personas y permisos | [fecha] |
| Finanzas | [nombre] | Tasa, horizonte y supuestos | [fecha] |
| Dirección | [nombre] | Autorización del gasto | [fecha] |

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [IEC 60300-3-3:2017, Life cycle costing](https://webstore.iec.ch/en/publication/31206) — la guía de aplicación del costo de ciclo de vida y su relación con la confiabilidad.
- [OSHA 29 CFR 1910.333](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333) — desenergizar antes de trabajar y las únicas excepciones admitidas.
- [ANSI/NETA, normas de prueba](https://www.netaworld.org/standards) — el catálogo vigente: ATS-2025 para pruebas de aceptación y MTS-2023 para las de mantenimiento.
- [IEEE 519-2022, Harmonic Control in Electric Power Systems](https://standards.ieee.org/ieee/519/10677/) — límites de distorsión en el punto de acople común, antes de instalar capacitores.
- [NOM-001-SEDE-2012, Instalaciones eléctricas (utilización)](https://dof.gob.mx/nota_detalle.php?codigo=5280607&fecha=29/11/2012) — ejemplo de norma local obligatoria y de cómo citar su artículo.
- [DOE, Motor Systems](https://www.energy.gov/cmei/ito/motor-systems) — hojas técnicas y casos para estimar el ahorro de energía en motores y accionamientos.

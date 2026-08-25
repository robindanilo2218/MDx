---
titulo: Informe mensual de mantenimiento eléctrico a dirección de [planta o área]
subtitulo: [mes y año del informe]
autor: [nombre y cargo]
fecha: 
---

## Resumen ejecutivo

Tres frases: qué pasó, qué queda en riesgo y qué decisión pides. Quien solo lea esto tiene que poder firmar.

- **Qué pasó.** [disponibilidad eléctrica del mes y el evento que más pesó, en una frase]
- **Qué está en riesgo.** [equipo o proceso, y cuánto cuesta una hora de paro ahí]
- **Qué pido.** [decisión o monto] antes del [fecha], porque [qué ocurre si no se decide]

## Seguridad primero

Va primero aunque el mes haya salido limpio. Un cero también es información.

| Concepto | Mes | Acumulado del año | Meta |
| --- | ---: | ---: | ---: |
| Lesiones registrables, con y sin tiempo perdido | [n] | [n] | 0 |
| Contactos eléctricos o eventos de arco | [n] | [n] | 0 |
| Casi-accidentes reportados | [n] | [n] | [meta de reporte, no de cero] |
| Permisos de trabajo con tensión emitidos | [n] | [n] | [a la baja; cada uno justificado] |
| Auditorías de bloqueo y etiquetado en campo | [n] | [n] | [n al mes] |
| Horas de formación por técnico | [h] | [h] | [h al año] |

Que suban los casi-accidentes reportados es buena señal: la cuadrilla está hablando. Un cero de lesiones sin reportes que suban no dice nada.

> [!CAUTION]
> Desenergizar es la regla. Trabajar con tensión es la excepción y exige justificación escrita, análisis de riesgo, permiso autorizado y personal calificado antes de tocar el equipo. En campo se aplican siempre las cinco reglas de oro: cortar, bloquear, verificar la ausencia de tensión con instrumento comprobado antes y después en una fuente conocida, poner a tierra y en cortocircuito, y señalizar y delimitar la zona.

**Trabajos con tensión del periodo.** Uno por línea, con el porqué. Si no hubo, escribe "ninguno".

| Fecha | Equipo | Por qué no se pudo desenergizar | Permiso y análisis de riesgo | Quién autorizó |
| --- | --- | --- | --- | --- |
|  |  |  | [n.º de permiso] |  |

Sustituye la norma por la que te aplique: NFPA 70E y NEC (NFPA 70) en buena parte de América, NFPA 70B para el programa de mantenimiento, IEC 60364 en el ámbito internacional, y la local que te obligue: NOM-001-SEDE (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina).

## Indicadores del mes

Pocos y siempre los mismos. Cambiar la lista cada mes es la forma más rápida de que dirección deje de mirarla.

| Indicador | Mes | Mes anterior | Meta | Variación |
| --- | ---: | ---: | ---: | ---: |
| Disponibilidad eléctrica | [%] | [%] | [%] | [puntos] |
| Horas de paro por causa eléctrica | [h] | [h] | [h] | [h] |
| MTBF de equipos críticos | [h] | [h] | [h] | [%] |
| MTTR eléctrico | [h] | [h] | [h] | [%] |
| Cumplimiento del preventivo | [%] | [%] | [%] | [puntos] |
| Trabajo planificado sobre el total | [%] | [%] | [meta pactada, referencia 80 %][^1] | [puntos] |
| Backlog | [semanas-cuadrilla] | [semanas-cuadrilla] | [rango pactado] | [semanas] |
| Costo de mantenimiento eléctrico | [moneda] | [moneda] | [presupuesto del mes] | [%] |

> Datos extraídos de [CMMS o fuente] el [fecha de extracción]. Horas programadas contadas según [criterio de turnos].

**Cómo se calculan.** La misma fórmula que tu tablero de indicadores, palabra por palabra. Si un número no cuadra con esa hoja, el que está mal es este informe.

- Disponibilidad = (horas programadas − horas de paro por causa eléctrica) ÷ horas programadas × 100
- MTBF = horas en operación ÷ número de fallas, y MTTR = horas de reparación ÷ número de reparaciones
- Cumplimiento del preventivo = órdenes preventivas cerradas dentro de la ventana ÷ órdenes preventivas programadas × 100
- Backlog = horas de trabajo pendiente ÷ horas disponibles de la cuadrilla en una semana

## Eventos relevantes

Paros, fallas y maniobras que dirección debe conocer, traducidos a dinero: producción perdida, materiales, horas extra y servicio externo. Si la causa no está confirmada, escribe "en análisis" y la fecha en que tendrás la conclusión.

| Fecha | Equipo | Qué pasó | Causa | Paro (h) | Costo estimado | Acción para que no vuelva |
| --- | --- | --- | --- | ---: | ---: | --- |
|  |  |  |  |  |  |  |

## Estado del plan

Avance del preventivo, backlog y lo que se aplazó. Lo aplazado es la parte que interesa.

| Concepto | Programado | Ejecutado | % | Comentario |
| --- | ---: | ---: | ---: | --- |
| Órdenes preventivas | [n] | [n] | [%] | [ausencias, falta de ventana de paro, préstamo de gente] |
| Órdenes correctivas | [n] | [n] | [%] |  |

**Trabajos aplazados.** Cada línea es un riesgo que alguien está aceptando por escrito.

| Orden | Equipo | Por qué se aplazó | Riesgo si sigue aplazado | Nueva fecha | Quién lo acepta |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

> [!WARNING]
> Un preventivo aplazado por falta de ventana de paro no desaparece: se convierte en riesgo aceptado. Que quede aquí y con nombre, no en una conversación de pasillo.

## Predictivo

Termografía, análisis de motores y calidad de energía. Un hallazgo sin orden de trabajo asociada no cuenta como hallazgo.

| Técnica | Equipos revisados | Hallazgos | Corregidos | Abiertos | Qué significa en riesgo o dinero |
| --- | ---: | ---: | ---: | ---: | --- |
| Termografía | [n] | [n] | [n] | [n] |  |
| Análisis de motores | [n] | [n] | [n] | [n] |  |
| Calidad de energía | [n] | [n] | [n] | [n] |  |

- **Termografía.** [n] tableros, [n] centros de control de motores y [n] subestaciones. Mide en carga, en el pico o con al menos el 40 % — cifra que Fluke atribuye a la NFPA 70B, confírmala en tu edición — porque el calor de una conexión floja crece con el cuadrado de la carga. Anota la carga de cada medición y clasifica la severidad con [el criterio de severidad térmica de tu procedimiento escrito o de la ANSI/NETA MTS vigente].
- **Análisis de motores.** [n] motores con resistencia de aislamiento, índice de polarización o análisis de firma de corriente. Compara contra el histórico del mismo motor y contra [el mínimo de aislamiento e índice de polarización de la norma de ensayo que apliques y de la ficha del motor], nunca contra un valor de tabla suelto. Tensión de prueba y tiempo de ensayo, los del procedimiento del fabricante.
- **Calidad de energía.** [n] mediciones en [puntos de medición], con fecha y duración. Distorsión armónica de tensión y corriente, factor de potencia, desbalance y huecos, contrastados contra [el límite que te aplique en el punto de acoplamiento común: IEEE 519 vigente o la norma del operador de red local].

## Consumo y costo de energía

Dirección lee esta sección aunque no lea ninguna otra. Que los números cuadren con la factura.

| Concepto | Mes | Mes anterior | Mismo mes del año pasado | Comentario |
| --- | ---: | ---: | ---: | --- |
| Energía activa (kWh) | [kWh] | [kWh] | [kWh] |  |
| Demanda máxima (kW) | [kW] | [kW] | [kW] | [fecha y hora del pico] |
| Factor de potencia | [valor] | [valor] | [valor] | [estado del banco de capacitores] |
| Penalizaciones facturadas | [moneda] | [moneda] | [moneda] | [concepto] |
| Costo total de energía | [moneda] | [moneda] | [moneda] |  |
| Consumo por unidad producida | [kWh/unidad] | [kWh/unidad] | [kWh/unidad] |  |

El kWh por unidad producida es lo único que separa "gastamos más" de "produjimos más". Si la tarifa cambió en el periodo, dilo aquí. Si no, el ahorro de la cuadrilla se lo come el ajuste tarifario y nadie lo nota.

## Obras y proyectos

Lo que está en ejecución y lo que espera aprobación. Semáforo honesto: si va tarde, va tarde.

| Proyecto | Avance | Presupuesto | Gastado | Fecha comprometida | Estado |
| --- | ---: | ---: | ---: | --- | --- |
|  | [%] | [moneda] | [moneda] | [fecha] | [en plazo / en riesgo / detenido] |

## Riesgos abiertos

Ordenados por severidad, no por antigüedad. El primero de la lista es del que vas a hablar en la reunión.

| # | Riesgo | Qué pasa si ocurre | Probabilidad | Impacto en dinero | Mitigación actual | Dueño |
| :---: | --- | --- | :---: | ---: | --- | --- |
| 1 |  |  | [alta/media/baja] | [moneda] |  |  |
| 2 |  |  |  |  |  |  |

Escribe el impacto en horas de paro y en moneda, no en amperios ni en grados. "El interruptor principal de la subestación 2 no tiene repuesto y su plazo de entrega es de [semanas]" se entiende mejor que cualquier dato de placa.

## Qué necesito de dirección

Cada línea con costo y fecha límite. Si no lleva monto y fecha, no es una petición, es una queja.

| # | Qué pido | Para qué | Costo | Fecha límite | Qué pasa si no se aprueba |
| :---: | --- | --- | ---: | --- | --- |
| 1 |  |  | [moneda] | [fecha] |  |

## Anexos

Lo que respalda el informe. Aquí van los amperios, no arriba.

- [ ] Reporte de termografía con imágenes y carga de medición — [archivo o carpeta]
- [ ] Protocolos de ensayo y registro de permisos de trabajo con tensión — [archivo]
- [ ] Extracción del CMMS con las órdenes del periodo y facturas de energía — [archivo]
- [ ] Estudio de arco eléctrico y diagrama unifilar, con su fecha de vigencia — [archivo]

[^1]: Reliabilityweb fija en 80 % o más el objetivo de trabajo planificado sobre el total, y señala que los programas de referencia generan en promedio la mitad de su trabajo a partir de inspecciones predictivas y de las correcciones que salen de ellas. Ajusta la meta a lo que tu planta pueda sostener y déjala fija todo el año.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [29 CFR 1910.333, Selection and use of work practices](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333) — desenergizar es la regla: bloqueo, verificación de ausencia de tensión, descarga de capacitores y puesta a tierra.
- [Guide to Assessing Risk: Energized Electrical Work Permits (Fluke)](https://www.fluke.com/en-us/learn/blog/safety/energized-electrical-work-permits) — qué lleva un permiso de trabajo con tensión; el artículo que cita es de la NFPA 70E de 2018, compruébalo en tu edición.
- [IEEE Std 519-2022, Harmonic Control in Electric Power Systems](https://standards.ieee.org/ieee/519/10677/) — los límites de distorsión se aplican en el punto de acoplamiento común; las cifras están dentro de la norma, no en esa página.
- [Thermal Imaging Cameras for Electrical Inspections (Fluke)](https://www.fluke.com/en-us/learn/blog/thermal-imaging/electrical-systems) — de dónde sale el 40 % de carga mínima y contra qué se compara un punto caliente.
- [ANSI/NETA Standards Update (NETA World Journal)](https://netaworldjournal.org/2026/05/taniabrammer/specifications-standards/ansi-neta-standards-update-30/) — qué edición de MTS, ATS y ECS está vigente antes de citar una frecuencia de ensayo.
- [What to Measure, 11 Key PdM Metrics (Reliabilityweb)](https://reliabilityweb.com/tips/article/what_to_measure_-11_key_pdm_metrics) — las métricas de predictivo que aguantan una reunión de dirección.

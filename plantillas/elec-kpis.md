---
titulo: Tablero de indicadores del mantenimiento eléctrico de [planta o área]
subtitulo: [periodo o equipo]
autor: [nombre y cargo]
fecha: 
---

## Cómo se usa este tablero

Se cierra una vez al mes, con los datos extraídos el mismo día y siempre de la misma fuente. Rellenas la ficha, la tabla del mes, las tres frases de lectura y las decisiones. Lo demás son definiciones: se pactan una vez, se firman y no se tocan durante el año. Esta hoja manda sobre cualquier informe: si un número aparece en otro documento, sale de aquí y con esta fórmula.

Sustituye la norma por la que te aplique: NFPA 70E y NEC (NFPA 70) en buena parte de América, IEC 60364 en el ámbito internacional, y la local que te obligue: NOM-001-SEDE (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina).

## Ficha del periodo

| Campo | Valor |
| --- | --- |
| Planta o área | [sitio y alcance eléctrico que cubre este tablero] |
| Periodo | [del dd/mm al dd/mm] |
| Horas calendario | [24 × días del mes] |
| Horas de producción programadas | [horas en que producción pidió energía y equipo] |
| Activos en el alcance | [subestaciones, tableros, motores, variadores, bancos de capacitores] |
| Fuente de datos | [GMAO/CMMS, medidor de la subestación, parte de paros de producción] |
| Extracción y cierre | [dd/mm hh:mm, misma hora todos los meses] — [quién cerró] |

## El tablero del mes

Una hoja, sin adjuntos. Si un número no cabe aquí, no es un indicador de dirección. La tendencia se compara con el mes anterior, no con la meta: marca [plano] si la variación cabe dentro del error de tus datos.

| Indicador | Valor | Meta | Mes anterior | Tendencia |
| --- | ---: | ---: | ---: | :---: |
| Disponibilidad eléctrica (%) | [ ] | [ ] | [ ] | [sube / baja / plano] |
| MTBF del activo crítico [nombre] (h) | [ ] | [ ] | [ ] | [ ] |
| MTTR (h) | [ ] | [ ] | [ ] | [ ] |
| Cumplimiento del plan preventivo (%) | [ ] | [ ] | [ ] | [ ] |
| Backlog (semanas de cuadrilla) | [ ] | [ ] | [ ] | [ ] |
| Trabajo planificado / de emergencia (%) | [ ] / [ ] | [ ] / [ ] | [ ] / [ ] | [ ] |
| Correctivas en activos críticos (n.º) | [ ] | [ ] | [ ] | [ ] |
| Horas de paro por causa eléctrica (h) | [ ] | [ ] | [ ] | [ ] |
| Costo de mantenimiento eléctrico ([moneda]) | [ ] | [ ] | [ ] | [ ] |
| Paro evitado, valorado ([moneda]) | [ ] | [ ] | [ ] | [ ] |
| Hallazgos termográficos abiertos (n.º) | [ ] | [ ] | [ ] | [ ] |
| Consumo (kWh) / kWh por unidad producida | [ ] / [ ] | [ ] / [ ] | [ ] / [ ] | [ ] |
| Factor de potencia | [ ] | [ ] | [ ] | [ ] |
| Trabajos con tensión: ejecutados (n.º) / con permiso firmado (%) | [ ] / [ ] | [a la baja] / 100 | [ ] / [ ] | [ ] |
| Incidentes eléctricos (n.º) | [ ] | 0 | [ ] | [ ] |
| Horas de formación por técnico (h) | [ ] | [ ] | [ ] | [ ] |

## Disponibilidad, fallas y paro

Cuatro números para una sola pregunta: cuánto tiempo tuvo producción la energía y el equipo que pidió.

| Indicador | Qué mide | Fórmula | De dónde sale | Meta |
| --- | --- | --- | --- | --- |
| Disponibilidad | Tiempo en servicio sobre el tiempo pedido | Disponibilidad = (horas programadas − horas de paro por causa eléctrica) ÷ horas programadas × 100 | Parte de paros de producción cruzado con órdenes cerradas | [la que pacte dirección] |
| MTBF | Cuánto aguanta un activo entre falla y falla | MTBF = horas en operación ÷ número de fallas | Horas de marcha del activo y órdenes correctivas por falla | [por activo, nunca de planta entera] |
| MTTR | Cuánto tardas en devolverlo a servicio | MTTR = horas de reparación ÷ número de reparaciones | Sellos de hora de la orden: aviso, inicio, entrega a producción | [por familia de activo] |
| Horas de paro | El daño en tiempo, sin porcentajes que lo suavicen | Suma de horas de paro cuya causa se clasificó como eléctrica | Registro de paros firmado por producción y mantenimiento | [tope mensual pactado] |

Trampas:

- **Disponibilidad.** Sube sola cuando producción recorta las horas programadas. Publica siempre las horas programadas al lado del porcentaje.
- **MTBF.** Si mezclas activos distintos en un solo número, el promedio no describe a ninguno. Sepáralo por activo crítico.
- **MTTR.** Si el reloj arranca cuando llega el técnico y no cuando paró la máquina, estás midiendo otra cosa. Define el instante cero por escrito.
- **Horas de paro.** Quien clasifica la causa decide tu indicador. Pacta la clasificación por escrito y lleva los casos dudosos a acta, no a discusión de pasillo.

> [!WARNING]
> La disponibilidad sola no describe nada. Un porcentaje alto puede esconder una única falla larga en el activo que más factura, y uno bajo puede ser polvo de paros cortos que no duelen. Va siempre acompañada de horas de paro, MTBF del activo crítico y trabajo de emergencia.

> [!WARNING]
> El MTBF con pocas fallas es aritmética frágil, no señal: si el mes cerró con dos fallas, una tercera te baja el indicador un tercio sin que nada haya cambiado en la planta. Fija tu umbral mínimo de fallas por periodo, escríbelo aquí — [número mínimo de fallas para publicar el MTBF] — y por debajo de él publica el conteo de fallas y amplía la ventana móvil hasta juntar fallas suficientes: [meses de ventana móvil que uses].

## Trabajo de la cuadrilla

Aquí se ve si el equipo trabaja según un plan o según el radio.

| Indicador | Qué mide | Fórmula | De dónde sale | Meta |
| --- | --- | --- | --- | --- |
| Cumplimiento del plan | Si el preventivo se hace cuando toca | Cumplimiento = órdenes preventivas cerradas dentro de fecha ÷ órdenes preventivas programadas × 100 | Plan del GMAO y fecha real de cierre | [pactada; valores de referencia en las SMRP Best Practices] |
| Backlog | Cuánta cola tienes en semanas de tu propia cuadrilla | Backlog = horas-hombre pendientes y aprobadas ÷ horas-hombre disponibles de la cuadrilla en una semana | Órdenes abiertas con estimación de horas y plantilla real | [rango pactado, con piso y techo] |
| Planificado y emergencia | La proporción entre trabajo pensado y trabajo apagando fuego | Planificado = horas en órdenes planificadas ÷ horas totales trabajadas × 100. Emergencia = horas en órdenes de emergencia ÷ horas totales trabajadas × 100 | Partes de horas de la cuadrilla, no conteo de órdenes | [pactada] |
| Correctivas por activo crítico | Qué equipo se está comiendo a la cuadrilla | Conteo y horas de órdenes correctivas cerradas en el mes, activo por activo | Órdenes correctivas con activo bien codificado | [tope por activo] |

Trampas:

- **Cumplimiento del plan.** Cerrar la orden no es hacer la tarea. Audita [cuántas órdenes cerradas revisas al azar cada mes] y compara el registro con lo que dice el técnico.
- **Backlog.** Un backlog en cero no es un logro: es un plan mal cargado o una lista de espera que vive fuera del sistema. Mide también la antigüedad de la orden más vieja.
- **Planificado y emergencia.** Si "planificado" es cualquier orden con fecha, todo saldrá planificado. Planificado significa con materiales, permiso, procedimiento y ventana acordados antes de empezar.
- **Correctivas por activo.** El conteo sin horas engaña: diez ajustes de diez minutos no son lo mismo que una falla de turno completo. Publica conteo y horas juntos.

## Dinero

Dos cifras, y la segunda solo se publica si está firmada.

| Indicador | Qué mide | Fórmula | De dónde sale | Meta |
| --- | --- | --- | --- | --- |
| Costo de mantenimiento eléctrico | Lo que cuesta sostener el sistema eléctrico | Costo = mano de obra propia + contratos + repuestos + servicios de terceros. Publícalo también por unidad producida | Contabilidad de costos por centro, no el estimado del GMAO | [presupuesto del año dividido entre doce] |
| Paro evitado, valorado | Cuánto vale lo que no pasó | Costo de una hora de paro = margen perdido por hora + mano de obra detenida por hora; el arranque se suma aparte, una vez por evento. Paro evitado = horas de paro evitadas × costo de una hora de paro | Criterio de horas evitadas firmado por producción y finanzas[^1] | [sin meta: es argumento de presupuesto, no objetivo] |

Trampas:

- **Costo de mantenimiento.** Sin el costo del paro al lado, cualquier recorte parece un ahorro. Preséntalos siempre en la misma diapositiva.
- **Paro evitado.** Es una estimación y se nota. No lo publiques sin decir cuántas horas evitadas cuentas y por qué. Un indicador que solo puede subir deja de ser un indicador.

## Condición y energía

Lo que anuncia la falla antes de que ocurra, y lo que la factura eléctrica ya está diciendo.

| Indicador | Qué mide | Fórmula | De dónde sale | Meta |
| --- | --- | --- | --- | --- |
| Hallazgos termográficos abiertos | Defectos vistos y todavía sin corregir | Conteo de hallazgos con acción pendiente al cierre del mes, más la antigüedad del más viejo | Informe de la ruta termográfica con foto, carga y referencia | [cero abiertos en la clase más severa de tu informe termográfico] |
| Consumo | Energía usada y energía por producto | kWh del mes y kWh ÷ unidades producidas | Medidor de la subestación y parte de producción | [contra el kWh/unidad del último año] |
| Factor de potencia | Cuánta corriente mueves sin cobrarla como trabajo | Factor de potencia = kW ÷ kVA, o el valor que factura la empresa eléctrica | Analizador de red o factura del suministro | [el mínimo que te exige tu tarifa: míralo en el contrato de suministro, no lo supongas] |

Trampas:

- **Termografía.** Una inspección con la máquina en vacío no ve nada: la guía de Fluke pide al menos un 40 % de carga para que el defecto caliente. Programa la ruta con carga representativa, guarda la imagen de referencia de cada equipo crítico y asóciale su temperatura de alarma. Los umbrales de acción por aumento de temperatura no los pones tú: sácalos de la especificación que sigas — [ANSI/NETA MTS vigente, criterio del fabricante o el que fije tu procedimiento] — y anota contra qué comparas: [ambiente, componente gemelo con la misma carga o máximo del fabricante]. No inventes el umbral y no lo copies de un blog.
- **Consumo.** Sin normalizar por producción, el consumo baja cuando la planta produce menos, y eso no es un logro tuyo.
- **Factor de potencia.** El promedio del mes esconde las horas malas: mira el perfil horario y las horas penalizadas. Antes de agrandar un banco de capacitores, mide la distorsión armónica: un banco puede entrar en resonancia con los armónicos de los variadores. El límite aplicable es [el que fije la IEEE 519 vigente para tu nivel de tensión y tu relación de cortocircuito en el punto de acople común].

## Seguridad

Estos tres no se negocian y no se compensan con los demás. Van en la misma hoja que la disponibilidad, no en un anexo. Publica también cuántos trabajos con tensión hubo: lo que tiene que bajar es ese conteo, no solo el papeleo.

| Indicador | Qué mide | Fórmula | De dónde sale | Meta |
| --- | --- | --- | --- | --- |
| Trabajos con tensión con permiso | Si la excepción está justificada, autorizada por escrito y ejecutada por personal calificado | Permisos firmados ÷ trabajos con tensión ejecutados × 100. Publica al lado el conteo de trabajos con tensión | Libro de permisos y órdenes de trabajo | 100 %, sin excepción |
| Incidentes eléctricos | Contacto, arco, quemadura y casi-accidente reportados | Conteo del mes, separando incidente y casi-accidente | Reporte de seguridad e investigación de causa | 0 incidentes; los casi-accidentes se esperan y se investigan |
| Formación | Horas de formación eléctrica por técnico | Horas de formación ÷ número de técnicos de la cuadrilla | Registro de capacitación con firma y evaluación | [horas por técnico al año ÷ 12] |

> [!CAUTION]
> Desenergizar es la regla; trabajar con tensión es la excepción y exige justificación escrita, análisis de riesgo, permiso autorizado y personal calificado antes de empezar. En cada trabajo de campo se aplican las cinco reglas de oro: cortar, bloquear, verificar ausencia de tensión con instrumento comprobado antes y después en una fuente conocida, poner a tierra y en cortocircuito, y señalizar y delimitar la zona. Un indicador de seguridad que mejora porque la gente dejó de reportar es la peor lectura de todo este tablero: revisa la tendencia de casi-accidentes antes de celebrar un cero.

## Lectura del mes

Tres frases: qué se miró, qué se encontró y qué hay que decidir. Sin adjetivos y sin culpables.

1. [Qué periodo y qué activos entran en estos números.]
2. [El hallazgo del mes: qué indicador se movió y qué lo movió, con el dato que lo respalda.]
3. [Qué hay que decidir este mes y qué pasa si no se decide.]

## Decisiones que pide este tablero

Una decisión por fila. Si un número no pide nada, sobra del tablero.

| Decisión | Qué número la pide | Quién decide | Fecha |
| --- | --- | --- | --- |
| [p. ej. parar el motor 4 en la ventana del 12] | [el hallazgo termográfico que lleva más tiempo abierto] | [nombre] | [dd/mm] |
| [p. ej. contratar horas extra para bajar el backlog] | [las semanas de backlog que disparan la decisión] | [nombre] | [dd/mm] |

## Antes de publicar

- [ ] Los datos salen del mismo sistema y a la misma hora que el mes pasado.
- [ ] Las horas de paro cuadran con el parte de producción firmado y auditaste al azar las preventivas cerradas.
- [ ] Ningún porcentaje va solo: lleva al lado el número absoluto del que salió.
- [ ] Las definiciones y metas siguen siendo las del inicio del año; si cambió alguna, está anotada con fecha y motivo.

[^1]: El costo de una hora de paro lo fija producción y lo valida finanzas, no mantenimiento. Sin esa firma, la cifra de paro evitado no se presenta a dirección.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [SMRP Best Practices](https://smrp.org/Body-of-Knowledge/Best-Practices) — más de 70 métricas con definición, fórmula, ejemplo de cálculo, valores de referencia y advertencias.
- [IEEE 493-2007, sistemas eléctricos industriales y comerciales fiables](https://standards.ieee.org/ieee/493/3402/) — datos de fiabilidad de equipo y costo de la interrupción; IEEE la marca inactiva desde 2021, úsala como dato, no como norma.
- [NFPA 70E, Standard for Electrical Safety in the Workplace](https://www.nfpa.org/product/nfpa-70e-standard/p0070ecode) — ficha oficial: confirma el título de la norma; la edición vigente y los valores están en el articulado, no en la página.
- [OSHA 1910.333](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333) — desenergizar antes de trabajar es la regla, y solo persona calificada toca partes no desenergizadas.
- [IEEE 519, Harmonic Control in Electric Power Systems](https://standards.ieee.org/ieee/519/10677/) — edición 2022: los límites de distorsión de tensión y corriente se aplican en el punto de acople común.
- [Thermal imaging in preventive maintenance programs](https://www.fluke.com/en/learn/blog/thermal-imaging/preventive-maintenance) — Fluke: imagen de referencia, alarma de temperatura y mínimo de 40 % de carga para que el defecto se vea.

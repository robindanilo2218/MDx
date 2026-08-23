---
titulo: Plan maestro de mantenimiento eléctrico de [planta o área]
subtitulo: [periodo o equipo]
autor: [nombre y cargo]
fecha: 
---

## Alcance

Qué instalaciones cubre este plan y cuáles no. Lo que queda fuera se pacta hoy, no cuando falle.

- Cubre: [subestación 13.8 kV, CCM-1 a CCM-4, planta de emergencia, alumbrado de patio].
- No cubre: [red del proveedor aguas arriba del medidor, equipo de proceso en garantía].
- Límite de responsabilidad aguas arriba: [punto de acoplamiento común, celda de medida].

## Marco normativo

Sustituye la norma por la que te aplique: NFPA 70E y NEC (NFPA 70) en buena parte de América, IEC 60364 en el ámbito internacional, y la local que te obligue: NOM-001-SEDE (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina).

| Documento | Edición que aplicas | Para qué lo usas aquí |
| --- | --- | --- |
| NFPA 70B | [edición vigente] | Estructura del programa y frecuencia de mantenimiento |
| NFPA 70E | [edición vigente] | Estado eléctricamente seguro, EPP, permiso de trabajo energizado |
| ANSI/NETA MTS | [edición vigente] | Qué prueba lleva cada equipo y con qué criterio de aceptación |
| [norma local obligatoria] | [resolución y año] | Cumplimiento legal e inspección |
| Manual del fabricante | [equipo y revisión] | Pares de apriete, tiempos y valores propios del equipo |

> [!WARNING]
> No copies cifras de esta plantilla ni de una edición anterior: fronteras de aproximación, categorías de EPP, energía incidente, valores de aislamiento, pares de apriete y límites de armónicos cambian de edición y de país. Cada número que escribas sale de la tabla correspondiente de la norma vigente que te aplica, y tienes que poder señalarla.

## Inventario de activos eléctricos

Una fila por familia. La clase A, B o C la copias del análisis de criticidad, no la decides aquí: en esta tabla solo le asignas estrategia.

| Familia | Cantidad | Identificación o tag | Tensión | Criticidad | Estrategia |
| --- | ---: | --- | ---: | :---: | --- |
| Subestación y acometida | [n] | [SE-01] | [13.8 kV] | [A] | [predictivo] |
| Transformadores de potencia y distribución | [n] | [TR-01…TR-0n] | [13.8/0.48 kV] | [A] | [predictivo] |
| Celdas de media tensión | [n] | [CM-01] | [13.8 kV] | [A] | [preventivo] |
| Tableros generales y de distribución en baja tensión | [n] | [TG-01, TD-0n] | [480/220 V] | [B] | [predictivo] |
| Motores y arrancadores | [n] | [M-0n] | [480 V] | [A/B/C] | [mixto] |
| Variadores de velocidad | [n] | [VFD-0n] | [480 V] | [B] | [preventivo] |
| Bancos de capacitores | [n] | [BC-01] | [480 V] | [B] | [preventivo] |
| Puesta a tierra y pararrayos | [n mallas] | [SPT-01] | — | [A] | [preventivo] |
| UPS y bancos de baterías | [n] | [UPS-01] | [220 V] | [A] | [predictivo] |
| Plantas de emergencia | [n] | [GE-01] | [480 V] | [A] | [preventivo] |
| Iluminación interior, exterior y de emergencia | [n luminarias] | [zonas] | [220 V] | [C] | [correctivo] |
| Canalizaciones, bandejas y acometidas internas | [m lineales] | [tramos] | — | [C] | [preventivo] |

## Estrategia y por qué esa y no otra

La estrategia se defiende con historial de fallas y costo de paro, no con costumbre. Escribe el porqué que vas a repetir delante de dirección.

| Estrategia | Familias | Por qué esa |
| --- | --- | --- |
| Predictivo por condición | [subestación, transformadores, celdas MT, tableros BT, motores críticos, UPS] | [la variable medible avisa con meses; el paro para intervenir es caro y se programa] |
| Preventivo por tiempo u horas | [variadores, capacitores, SPT, plantas de emergencia, canalizaciones] | [el deterioro va con el tiempo y el calor, y la norma o el fabricante fijan la rutina] |
| Correctivo planificado | [motores no críticos, iluminación] | [cambiar sale más barato que inspeccionar y hay repuesto en almacén] |
| Rediseño o reemplazo | [activos con fallas repetidas] | [si reincide tras dos intervenciones correctas, el problema es el diseño] |

## Calendario anual

La frecuencia sale de la criticidad, de la condición encontrada y del entorno del equipo, no del calendario del año pasado.

| Mes | Rutina | Familia | Frecuencia | Quién | Paro |
| :---: | --- | --- | --- | --- | :---: |
| Ene | [termografía de tableros y CCM a carga normal] | [tableros BT] | [semestral] | [propio] | [no] |
| Feb | [aislamiento y análisis de corriente de motores críticos] | [motores] | [anual] | [propio] | [parcial] |
| Mar | [resistencia de puesta a tierra en época seca] | [SPT] | [anual] | [contratista] | [no] |
| Abr | [mantenimiento mayor de subestación y celdas de MT] | [subestación] | [anual] | [contratista] | [sí] |
| May | [análisis de aceite y relación de transformación] | [transformadores] | [anual] | [contratista] | [parcial] |
| Jun | [limpieza de variadores, filtros y ventiladores] | [variadores] | [semestral] | [propio] | [parcial] |
| Jul | [descarga de UPS e impedancia de baterías] | [UPS] | [semestral] | [contratista] | [no] |
| Ago | [prueba con carga real de planta de emergencia] | [plantas] | [la de tu norma de plantas de emergencia (NFPA 110 u otra) y la del fabricante] | [propio] | [no] |
| Sep | [medición de red y revisión de bancos de capacitores] | [capacitores] | [anual] | [propio] | [parcial] |
| Oct | [termografía de repaso y cierre de hallazgos abiertos] | [todas] | [semestral] | [propio] | [no] |
| Nov | [inspección de canalizaciones y campaña de iluminación] | [canalizaciones] | [anual] | [propio] | [no] |
| Dic | [cierre del plan, inventario y estudio de arco eléctrico] | [todas] | [anual] | [contratista] | [no] |

## Paros necesarios

Lo que solo se hace con la instalación fuera de servicio. Se negocia con producción en enero, no la semana antes.

- [Paro mayor de subestación] — [semana del …], [16 h] — [limpieza, reapriete y pruebas de celdas]. Si no se hace: [falla sin aviso con daño a la celda].
- [Paro parcial CCM-2] — [semana del …], [8 h] — [reapriete y limpieza de barras]. Si no se hace: [punto caliente que acaba en incendio].

## Seguridad del trabajo de campo

Desenergizar es la regla. Trabajar con tensión es la excepción y exige justificación escrita, análisis de riesgo y permiso firmado antes de tocar nada. Las cinco reglas de oro, en este orden y sin saltarse ninguna:

- [ ] Cortar todas las fuentes de tensión, incluidas las de respaldo y las de retorno.
- [ ] Bloquear los medios de desconexión y etiquetarlos con candado propio de cada persona.
- [ ] Verificar ausencia de tensión con instrumento probado antes y después sobre fuente conocida.
- [ ] Poner a tierra y en cortocircuito del lado del trabajo.
- [ ] Señalizar y delimitar la zona, y no retirar la delimitación hasta cerrar el permiso.

> [!CAUTION]
> Un solo candado en el punto de corte no basta: va candado y etiqueta en cada medio de desconexión, cada persona expuesta pone el suyo y solo esa persona lo retira. Las fronteras de aproximación, la energía incidente y la categoría de EPP salen de la tabla correspondiente de la NFPA 70E vigente y del estudio de arco eléctrico de esta planta, nunca de una plantilla ni de otra instalación.

## Recursos e instrumentos

Personal propio: [n] técnicos electricistas y [n] certificados para media tensión. Contratistas: [empresa de pruebas eléctricas] con contrato marco anual. Un plan sin instrumento calibrado es una lista de deseos.

| Instrumento | Estado | Última calibración | Próxima |
| --- | :---: | --- | --- |
| Cámara termográfica | [operativa] | [fecha] | [fecha] |
| Megóhmetro | [operativo] | [fecha] | [fecha] |
| Analizador de redes y calidad de energía | [operativo] | [fecha] | [fecha] |
| Telurómetro para resistencia de puesta a tierra | [operativo] | [fecha] | [fecha] |
| TTR para relación de transformación | [alquilado] | [fecha] | [fecha] |

La ruta termográfica se planifica en bloques de equipo de dos a tres horas, con imagen de referencia por activo y con el sistema a por lo menos el 40 % de carga: por debajo de eso el calor no aparece y la inspección no sirve. Se hace con el equipo energizado: es trabajo con tensión y lleva análisis de riesgo, permiso y el EPP que fije el estudio de arco de la planta. Donde haya ventanas infrarrojas, se inspecciona sin abrir puertas.

## Presupuesto

Por partidas y con la cifra de la que respondes. Si te recortan una, aquí se ve qué rutina cae.

| Partida | Monto anual | Qué cubre | Si se recorta, cae |
| --- | ---: | --- | --- |
| Mano de obra propia | [monto] | [horas de cuadrilla asignadas al plan] | [las rutinas mensuales] |
| Contratistas especializados | [monto] | [pruebas de MT, aceite, arco eléctrico] | [el paro mayor de subestación] |
| Repuestos, consumibles y calibración | [monto] | [contactores, fusibles, baterías, filtros, calibración anual] | [sube el tiempo de reparación y las mediciones pierden validez] |
| Formación y certificación | [monto] | [NFPA 70E, termografía, trabajos en MT] | [personal no calificado y riesgo legal] |
| EPP y herramienta aislada | [monto] | [ropa para arco, guantes por clase, pértigas] | [no se interviene nada] |
| Reserva para correctivo | [monto] | [fallas no previstas] | [el preventivo paga el correctivo] |
| Total | [monto] | — | — |

## Indicadores

Cinco, no quince. Cada uno con su meta y su fuente, medidos igual todo el año.

| Indicador | Fórmula | Hoy | Meta | Fuente |
| --- | --- | ---: | ---: | --- |
| Cumplimiento del plan | rutinas cerradas a tiempo ÷ rutinas programadas × 100 | [%] | [%] | [orden de trabajo] |
| MTBF eléctrico | horas en operación ÷ número de fallas eléctricas | [h] | [h] | [registro de paros] |
| MTTR eléctrico | horas de reparación ÷ número de correctivos | [h] | [h] | [orden de trabajo] |
| Disponibilidad eléctrica | MTBF ÷ (MTBF + MTTR) × 100 | [%] | [%] | [calculado] |
| Hallazgos críticos abiertos | hallazgos críticos sin cerrar al fin de mes | [n] | [n] | [informe termográfico] |

## Riesgos del plan

Lo que puede impedir que este plan se cumpla, y qué harías.

| Riesgo | Probabilidad | Impacto | Qué haríamos |
| --- | :---: | :---: | --- |
| [Producción no libera el paro mayor] | [alta] | [alto] | [escalar con el costo del riesgo y fijar fecha firme] |
| [Contratista de MT sin disponibilidad] | [media] | [alto] | [segundo proveedor precalificado desde enero] |
| [Recorte de presupuesto a mitad de año] | [media] | [alto] | [tabla de qué rutina cae, firmada por dirección] |

## Revisión del plan

Cuándo se toca este documento y con qué evidencia se justifica cada cambio.

- Mensual: cumplimiento y hallazgos abiertos. Evidencia: [órdenes cerradas, informe termográfico].
- Semestral: frecuencias por familia según condición encontrada. Evidencia: [resultados de pruebas, historial de fallas].
- Anual: inventario, criticidad, presupuesto y estrategia. Evidencia: [MTBF por familia, costo del correctivo del año].
- Fuera de calendario: tras falla mayor, cambio de instalación o edición nueva de la norma que te aplica.
- [ ] Aprobado por mantenimiento, producción, seguridad industrial y dirección — [fecha].

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [NFPA 70B, Standard for Electrical Equipment Maintenance](https://www.nfpa.org/product/nfpa-70b-standard-for-electrical-equipment-maintenance/p0070bcode) — ficha oficial de la norma: ahí compruebas cuál es la edición vigente antes de citarla.
- [OSHA 1910.333, Selection and use of work practices](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333) — desenergizar antes de trabajar, candado y etiqueta en cada medio de desconexión y ausencia de tensión verificada por persona calificada.
- [OSHA, Establishing Boundaries Around Arc Flash Hazards](https://www.osha.gov/sites/default/files/publications/OSHA4474.pdf) — las tres fronteras, quién puede cruzar cada una y por qué cambian con la tensión y el equipo.
- [ANSI/NETA MTS, Maintenance Testing Specifications](https://www.netaworld.org/standards/ansi-neta-mts) — qué ensayo de campo lleva cada equipo y con qué tolerancia se acepta.
- [Frequency of Maintenance, NETA](https://www.netaworld.org/standards/frequency-maintenance) — el programa ideal se basa en confiabilidad y es propio de cada planta y cada equipo.
- [Fluke, Thermal Imaging in Preventive Maintenance Programs](https://www.fluke.com/en-us/learn/blog/thermal-imaging/preventive-maintenance) — bloques de dos a tres horas, imagen de referencia por activo y el mínimo del 40 % de carga.

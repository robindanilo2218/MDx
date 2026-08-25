---
titulo: Ficha e historial de un activo eléctrico de [planta o área]
subtitulo: [TAG del activo, ubicación y fecha de la última actualización]
autor: [nombre y cargo]
fecha:
---

## Identificación y criticidad

Una ficha por activo, y manda sobre sus datos: el procedimiento dice cómo se interviene, esta hoja dice qué es y qué le ha pasado. Si el TAG de la etiqueta, el del unifilar y el del CMMS no son el mismo, arregla eso antes de llenar nada más.

| Campo | Dato |
| --- | --- |
| TAG y nombre común | [TRF-02, el mismo en etiqueta, unifilar y CMMS] y [como lo llama la cuadrilla] |
| Familia | [transformador / celda de media tensión / interruptor / motor / variador / banco de capacitores / UPS / tablero] |
| Ubicación funcional | [subestación 3, celda 5, nivel y coordenada de planta] |
| Fabricante, modelo, serie y año | [marca], [modelo], [S/N], fabricado en [aaaa], en servicio desde [dd/mm/aaaa] |
| Qué alimenta, qué cuesta pararlo y qué respaldo hay | [línea 2 de envasado: escribe qué se detiene cuando este equipo se detiene]; [USD/h, dato de producción]; [transferencia automática / segundo equipo al [%] de carga / ninguno] |
| Responsable, centro de costo y estado | [quién responde por el activo], [área], [en servicio / de reserva / fuera de servicio desde dd/mm/aaaa] |
| Criticidad y de dónde sale | clase [A / B / C], frecuencia [F] × consecuencia [C] = [producto, con la escala de tu análisis de criticidad], manda [seguridad / producción / ambiental / costo]; acta del [dd/mm/aaaa] firmada por [nombres]; se repunta el [dd/mm/aaaa] o antes si falla o cambia la carga |

## Datos de placa

Copia la placa, no el catálogo. Llena solo la subtabla de tu equipo, fotografía la placa y guarda la foto junto a la ficha: cuando se borre, esa foto es el único dato que queda.

> [!CAUTION]
> Leer una placa no autoriza a abrir nada energizado. Desenergizar es la regla; trabajar con tensión es la excepción y exige justificación escrita, análisis de riesgo, permiso firmado por alguien distinto de quien ejecuta y personal calificado para ese equipo. Antes de entrar: cortar todas las fuentes, incluidas respaldo, control y auxiliares; bloquear y señalizar; verificar ausencia de tensión fase a fase y fase a tierra con instrumento probado antes y después; poner a tierra y en cortocircuito; y delimitar la zona. El EPP y las fronteras de aproximación salen de la etiqueta de arco del equipo y de las tablas de la NFPA 70E vigente o de la norma local que te aplique, nunca de esta ficha.

**Transformador**

| Dato | Valor |
| --- | --- |
| Potencia, tensiones y tomas | [kVA, y la segunda potencia si tiene ventilación forzada]; [AT kV / BT kV]; [tomas del conmutador y en cuál quedó] |
| Grupo de conexión, impedancia y aislamiento | [Dyn11]; [% de la placa, a la potencia base que ella indique]; [nivel de aislamiento de la placa] |
| Refrigeración, elevación, año y neutro | [ONAN / ONAF; AN o AF si es seco]; [°C de la placa]; [aaaa]; [neutro rígido / por resistencia de [Ω] / aislado] |
| Dieléctrico y accesorios | [aceite mineral / vegetal / seco encapsulado], [L] y [kg]; [conmutador, Buchholz, termómetro, nivel, silicagel, válvula de sobrepresión] |

**Motor**

| Dato | Valor |
| --- | --- |
| Potencia, tensión y corriente | [kW o HP] a [V], conexión [estrella / delta]; [A a plena carga, y a factor de servicio si la placa lo trae]; [letra de código] |
| Factor de servicio, régimen y velocidad | [solo el que venga marcado en la placa; si no lo trae, confírmalo en el manual]; [continuo o el que indique]; [rpm a plena carga] y [número de polos] |
| Carcasa, protección, aislamiento y ambiente | [tamaño de carcasa]; [IP o tipo de encerramiento de la placa]; [clase A / B / F / H]; [elevación y ambiente máximo en °C] |
| Rodamientos, lubricación y acople | [lado acople y lado ventilador, códigos]; [grasa y cantidad del manual]; [directo / banda / reductor] a [bomba, ventilador, compresor] |

**Interruptor y celda**

| Dato | Valor |
| --- | --- |
| Tensión, corriente y aislamiento | [kV o V]; [A del interruptor] y [A de la barra de la celda]; [nivel de aislamiento de la placa] |
| Capacidad de interrupción y maniobras | [kA y duración de la placa; comprueba que cubra el cortocircuito del estudio vigente]; [contador mecánico y bajo carga, al dd/mm/aaaa] |
| Tipo, medio, mecanismo y enclavamientos | [fijo / extraíble]; [vacío / SF6 / aire]; [resorte / motor]; [mecánicos, eléctricos, llave cautiva] |
| Relé y ajustes vigentes | [marca, modelo, firmware y serie]; [de la hoja de ajustes del estudio del dd/mm/aaaa, nunca de memoria] |

**Variador y UPS**

| Dato | Valor |
| --- | --- |
| Variador: modelo, corriente y tensiones | [marca y modelo]; [A de salida y kW], servicio [normal o pesado]; [entrada V / salida V]; [resistencia de frenado o ninguna] |
| Variador: firmware, filtros y cable | versión [x.y], respaldo del [dd/mm/aaaa] en [ruta]; [dU/dt, senoidal, reactor de línea]; [longitud y tipo del cable al motor] |
| UPS: modelo, potencia, autonomía y by-pass | [marca y modelo], [kVA/kW], [doble conversión / interactivo], firmware [x.y] con respaldo en [ruta]; [minutos al % de carga]; [qué alimenta, sin excepción]; by-pass [manual / automático / externo], operado por [quién] |
| Baterías: banco y fechas | [tipo, número de celdas, Ah, tensión de flotación de la ficha del fabricante]; fabricación [mm/aaaa], instalación [mm/aaaa], reemplazo previsto [mm/aaaa] por vida útil y prueba de capacidad, con el criterio del fabricante |

## Alimentación y protecciones aguas arriba

De dónde le llega la energía, desde la barra de origen [TAG] del unifilar rev. [n.º], y qué tiene que disparar antes que él. Los ajustes se copian del estudio de coordinación vigente, con su fecha.

| Nivel | TAG | Equipo | Ajuste vigente | Fuente |
| --- | --- | --- | --- | --- |
| Protección aguas arriba | [TAG] | [interruptor, relé, fusible] | [curva, arranque, dial, instantáneo] | [estudio del dd/mm/aaaa] |
| Protección propia y cable | [TAG] | [relé o guardamotor]; [calibre, conductores, longitud] | [valores dejados] | [estudio del dd/mm/aaaa] |
| Puesta a tierra y etiqueta de arco | [TAG] | [malla, electrodo, conductor] | [Ω medidos el dd/mm/aaaa] | [etiqueta puesta el dd/mm/aaaa; sin etiqueta vigente el equipo no se abre] |

## Documentación asociada y repuestos propios

Cada papel con su revisión y su ubicación. Si la ubicación dice "en algún lado", el documento no existe; y el repuesto que no se encuentra a las dos de la mañana, tampoco.

| Documento | Referencia y revisión | Dónde está | Al día |
| --- | --- | --- | --- |
| Diagrama unifilar | [plano [n.º], rev. y fecha] | [carpeta física y ruta digital] | [sí / no] |
| Manual del fabricante | [título y edición] | [ruta] | [sí / no] |
| Informe de puesta en marcha | [n.º y fecha] | [ruta] | [sí / no] |
| Protocolo de pruebas de recepción | [n.º y fecha] | [ruta] | [sí / no] |
| Garantía y proveedor | [vence dd/mm/aaaa] | [ruta]; [nombre y teléfono] | [sí / no] |

| Repuesto propio | Código | Cantidad | Ubicación exacta | Reposición | Revisado |
| --- | --- | ---: | --- | --- | --- |
| [bobina, tarjeta, contactos, fusibles, ventilador] | [SKU] | [n] | [almacén, estante, casilla] | [semanas del proveedor] | [dd/mm/aaaa] |

## Plan de mantenimiento aplicado

Qué se le hace, cada cuánto y por qué ese intervalo. La periodicidad se justifica con tres entradas: fabricante, condición del equipo e historial.

| Tarea | Modo | Intervalo | De dónde sale el intervalo | Procedimiento |
| --- | --- | --- | --- | --- |
| [inspección y termografía] | [en marcha] | [cada X meses] | [manual, condición, historial] | [código] |
| [limpieza, apriete y pruebas] | [desenergizado] | [cada X meses] | [manual, condición, historial] | [código] |
| [prueba funcional de protecciones] | [desenergizado] | [cada X meses] | [estudio de coordinación] | [código] |

Sustituye la norma por la que te aplique: NFPA 70E y NEC (NFPA 70) en buena parte de América, IEC 60364 en el ámbito internacional, y la local que te obligue: NOM-001-SEDE (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina).

## Historial de intervenciones

Una fila por orden de trabajo cerrada, en orden de fecha. Las horas fuera de servicio son las que cuenta producción, no las que estuvo la cuadrilla en el equipo.

| Fecha | OT | Tipo | Qué se hizo | Fuera de servicio | Costo | Ejecutó |
| --- | --- | --- | --- | ---: | ---: | --- |
| [dd/mm/aaaa] | [n.º] | [preventivo / correctivo / predictivo / modificación] | [hallazgo y acción, en dos líneas] | [h] | [USD] | [nombre o contratista] |

## Historial de pruebas

El valor de hoy dice si pasa; la serie dice hacia dónde va. Mide siempre igual, anota condiciones e instrumento, y corrige a la temperatura de referencia de la norma antes de comparar dos fechas.

| Fecha | Prueba y punto | Valor | Unidad | Condiciones e instrumento | Criterio y fuente | Cumple |
| --- | --- | ---: | :---: | --- | --- | :---: |
| [dd/mm/aaaa] | [aislamiento devanado a tierra] |  | MΩ | [tensión de ensayo, °C, HR, serie del instrumento] | [manual y norma de ensayo] |  |
| [dd/mm/aaaa] | [índice de polarización] |  | — | [misma duración de ensayo] | [manual y norma de ensayo que te aplique, en su edición vigente] |  |
| [dd/mm/aaaa] | [resistencia de contactos, polo por polo] |  | µΩ | [corriente de ensayo e instrumento] | [manual del fabricante] |  |
| [dd/mm/aaaa] | [rigidez dieléctrica del aceite] |  | kV | [método y laboratorio] | [norma del método] |  |
| [dd/mm/aaaa] | [termografía, punto más caliente] |  | °C | [carga %, ambiente, emisividad] | [tu procedimiento termográfico] |  |

## Historial de fallas

Aquí no va "se dañó". Va el modo, que es qué dejó de hacer el equipo, y la causa, que es por qué. Usa siempre las mismas palabras: un catálogo cerrado de modos y causas es lo que permite sumar fallas de varios equipos y compararlas.

| Fecha y hora | Modo de falla | Causa | Cómo se detectó | Parada | Costo | Qué se hizo para que no vuelva |
| --- | --- | --- | --- | ---: | ---: | --- |
| [dd/mm/aaaa hh:mm] | [no arranca / dispara en carga / sobrecalienta / falla a tierra / ruido y vibración] | [confirmada o probable; di cuál de las dos] | [alarma, ronda, operador, prueba] | [h] | [USD] | [OT [n.º], cambio de ajuste, de diseño o de método] |

## Modificaciones y cambios de carga

Lo que hoy es distinto de como se compró. Aquí se descubre por qué un equipo que nunca fallaba empezó a fallar.

| Fecha | Qué cambió | Por qué | Aprobó | Documentos actualizados |
| --- | --- | --- | --- | --- |
| [dd/mm/aaaa] | [la carga pasó de X a Y A, se agregó una línea, se cambió el relé, se movió la toma del conmutador] | [ampliación, corrección, obsolescencia] | [nombre] | [unifilar, ajustes, etiqueta de arco, esta ficha] |

> [!WARNING]
> Cambiar carga, cable, transformador o ajuste altera el cortocircuito disponible y la coordinación. Si escribiste una fila en esta tabla, el estudio y la etiqueta de arco quedan vencidos hasta que alguien los rehaga.

## Estado actual y próxima intervención

Se llena al cerrar cada intervención, con fecha. Es el renglón que se mira antes de mandar a alguien al equipo.

| Campo | Dato |
| --- | --- |
| Condición y restricciones vigentes | [como nuevo / con desviación respecto de la medición anterior / con ciclos vencidos]; [carga máxima, maniobra prohibida, quién autoriza levantarlas] |
| Pendientes abiertos | [OT [n.º], hallazgo, responsable, fecha] |
| Última y próxima intervención | [dd/mm/aaaa, OT [n.º]] y [dd/mm/aaaa, tarea y ventana pedida a operaciones] |
| Horas acumuladas y quién actualizó | [h de servicio y maniobras al dd/mm/aaaa]; [nombre y fecha] |

## Observaciones y cómo se llena esta ficha

Lo que no cabe en las tablas y hay que decirle al siguiente. El valor de esta hoja está en llenarla siempre, no en llenarla bonita.

- [Maña del equipo: la celda no cierra si el enclavamiento de la puerta está flojo, se ajusta antes de maniobrar]; [acceso, herramienta especial o contacto que hace falta, y dónde está].
- Se actualiza al cerrar cada OT, no al final del mes ni la víspera de la auditoría. Lo que no sepas se escribe "sin dato" y se programa quién lo levanta: inventar un valor de placa o una fecha es peor que dejar el hueco.
- Con estas tablas salen los números que pide dirección: disponibilidad = (horas programadas − horas de paro por causa eléctrica) ÷ horas programadas × 100; MTBF = horas en operación ÷ número de fallas; MTTR = horas de reparación ÷ número de reparaciones.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [ISO 14224: Collection and exchange of reliability and maintenance data](https://reliabilityweb.com/articles/entry/iso_14224_collection_and_exchange_of_reliability_and_maintenance_data) — datos de equipo, de falla y de mantenimiento en formato común, con los modos de falla como vocabulario compartido entre plantas, dueños y fabricantes.
- [From Should to Shall: NFPA 70B Becomes a Standard](https://netaworldjournal.org/2023/11/moseramieh/cover-story/from-should-to-shall-nfpa-70b-becomes-a-standard/) — NETA World Journal: la política de documentación y retención de registros dentro del programa, y las condiciones 1, 2 y 3 que fijan el intervalo.
- [Understanding Induction Motor Nameplate Information](https://www.ecmweb.com/maintenance-repair-operations/motors/article/20896372/understanding-induction-motor-nameplate-information) — EC&M: qué datos exige el NEC en la placa de un motor y qué significa cada uno.
- [IEEE C57.12.00, General Requirements for Liquid-Immersed Transformers](https://standards.ieee.org/ieee/C57.12.00/5268/) — requisitos eléctricos y mecánicos de los transformadores sumergidos en líquido con 601 V o más en el devanado de mayor tensión.
- [ANSI/NETA MTS, Maintenance Testing Specifications](https://www.netaworld.org/standards/ansi-neta-mts) — los ensayos de campo confirman que el equipo sigue dentro de la norma y de las tolerancias del fabricante, y apto para seguir en servicio.
- [IEEE 1188, Maintenance, Testing, and Replacement of VRLA Batteries](https://standards.ieee.org/ieee/1188/11656) — programas de prueba y criterio para decidir cuándo se reemplazan las baterías del UPS.

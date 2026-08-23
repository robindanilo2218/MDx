---
titulo: Auditoría de la instalación eléctrica y su cumplimiento de [planta o área]
subtitulo: [periodo, equipo o alcance]
autor: [nombre y cargo]
fecha: 
---

## Cómo se usa esta lista

Se recorre en planta, con el unifilar en la mano. Auditar no es intervenir: para abrir, medir o maniobrar se desenergiza primero — cortar, bloquear, verificar ausencia de tensión, poner a tierra y en cortocircuito, señalizar y delimitar la zona. Trabajar con tensión es la excepción y exige justificación escrita, análisis de riesgo, EPP según el estudio y permiso firmado por quien autoriza, que no ejecuta.

- Una casilla marcada significa "lo vi y cumple". Lo que no viste se queda sin marcar y baja a la tabla de hallazgos como observación, nunca como conforme. Cada línea termina en un hueco: ahí va el dato que encontraste, no un "OK".
- Esta auditoría no sustituye al estudio de cortocircuito, al de coordinación ni al de arco eléctrico: comprueba que existan, que estén vigentes y que se apliquen en campo.
- Sustituye la norma por la que te aplique: NFPA 70E y NEC (NFPA 70) en buena parte de América, IEC 60364 en el ámbito internacional, y la local que te obligue: NOM-001-SEDE y NOM-029-STPS (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina).

## Ficha de la auditoría

Nombres y fechas concretas. Una auditoría sin alcance escrito se discute después, cuando ya no sirve.

| Campo | Dato |
| --- | --- |
| N.º de auditoría | [AUD-2026-03, del libro de auditorías] |
| Alcance | [qué entra: subestación 1, CCM-2 a CCM-5, tableros de distribución; y qué queda fuera] |
| Fecha y condición de la visita | [dd/mm/aaaa, de hh:mm a hh:mm; planta en operación / en paro programado] |
| Auditor responsable y equipo | [nombre y cargo; acompañantes de planta, con nombre] |
| Documento de referencia | [norma y edición contra la que se audita: NFPA 70E 20XX, NEC 20XX, NOM-001-SEDE, RETIE, IEC 60364, la que te obligue] |
| Norma de mantenimiento y de pruebas | [NFPA 70B, ANSI/NETA MTS, procedimiento interno con código y revisión] |
| Auditoría anterior y hallazgos abiertos | [fecha; cuántos siguen sin cerrar y desde cuándo] |

## Cómo se clasifica cada hallazgo

Un hallazgo sin severidad no se prioriza y uno sin fecha no se cierra. Estas cuatro categorías se usan igual en toda la planta.

| Severidad | Qué significa | Qué se hace |
| --- | --- | --- |
| Crítico | Puede matar o incendiar hoy: parte viva accesible, tierra abierta, protección puenteada | Se para el trabajo en ese equipo y se corrige o se aísla antes de seguir |
| Mayor | Incumple la norma de referencia y deja el riesgo sin control, aunque hoy no haya nadie expuesto | Plan con fecha firme — [plazo máximo que fije tu procedimiento] |
| Menor | Desvío que degrada el sistema o dificulta el mantenimiento | Entra en la programación normal |
| Observación | No incumple, pero conviene mejorarlo o falta evidencia para juzgarlo | Se registra y se revisa en la próxima auditoría |

> [!CAUTION]
> Paran el trabajo en el acto, sin discusión y hasta corregir o aislar: parte viva accesible o tablero sin tapa, conductor de puesta a tierra cortado o desconectado, protección puenteada o sustituida por otra de mayor capacidad, enclavamiento anulado, olor a quemado o descarga audible en una celda, agua sobre equipo energizado, y trabajo con tensión sin permiso firmado. El equipo se desenergiza, se bloquea y se señaliza antes de que alguien vuelva a acercarse.

## 1. Documentación

Sin papeles no hay mantenimiento: hay improvisación con suerte. Pide revisión y fecha de cada documento, no el documento a secas.

- [ ] Unifilar actualizado y coincidente con lo que hay en campo; memoria de cálculo de la instalación original y de cada ampliación posterior — [revisión y fecha; diferencias encontradas]
- [ ] Estudio de cortocircuito vigente, con corriente de falla por barra — [fecha; kA en la barra principal]
- [ ] Estudio de coordinación de protecciones, y los ajustes del estudio son los que están cargados en los relés — [fecha; coincide con lo medido en el relé]
- [ ] Estudio de arco eléctrico vigente y etiquetas puestas y legibles en cada equipo. El estudio envejece por dentro: cambia el transformador, un alimentador o un ajuste de protección y la etiqueta impresa deja de ser cierta aunque el equipo se vea igual — [fecha del estudio; contrástala con el intervalo máximo de revisión del artículo de análisis de riesgo de arco eléctrico de la NFPA 70E vigente, o de la norma que te aplique; equipos sin etiqueta]
- [ ] Certificados de la instalación y de las ampliaciones ante la autoridad que te aplique — [número y fecha]
- [ ] Informes de pruebas con valores medidos, no con la palabra "conforme" a secas; manuales, planos de tablero y curvas de protección accesibles también en el turno de noche — [último informe, quién lo hizo y bajo qué norma de pruebas; dónde vive la documentación]

## 2. Subestación y transformadores

Entra acompañado y con la maniobra autorizada. En media tensión no se abre nada para mirar.

- [ ] Acceso restringido, puerta cerrada y llaves bajo control — [quién tiene llave; hay registro o no]
- [ ] Sala limpia, seca y ventilada, sin almacenaje ajeno, sin filtraciones, sin vegetación pegada ni nidos — [qué encontraste]
- [ ] Transformador sin fugas, con nivel de aceite, sílica gel y termómetro en orden, y temperatura dentro de lo que marca la placa — [°C leídos, máximo del último mes y estado del aceite]
- [ ] Pruebas al día: aislamiento, relación de transformación y análisis de aceite, comparadas contra el criterio de tu norma de pruebas — [valores y fecha del último informe]
- [ ] Protecciones primaria y secundaria identificadas, con ajuste registrado y última prueba de disparo — [fecha de la última prueba]

## 3. Celdas, tableros y espacio de trabajo

El bloque donde salen más hallazgos críticos. Recórrelo tablero por tablero, sin muestreo.

- [ ] Puertas y tapas completas y cerradas; ninguna parte viva accesible sin herramienta; aberturas sin usar cerradas con la pieza correcta, no con cinta ni cartón — la OSHA lo exige en 1910.303(b)(7)(i) — [TAG de los tableros que incumplen]
- [ ] Cada medio de desconexión identificado de forma durable con el circuito que alimenta, y la identificación es cierta — 1910.303(f)(1) a (f)(3) — [porcentaje correcto; errores encontrados]
- [ ] Señal de riesgo eléctrico y etiqueta de arco visibles y legibles desde fuera — [cuántas faltan o están borradas]
- [ ] Espacio de trabajo libre en todo el frente, hasta la altura exigida y con iluminación suficiente; nada almacenado ahí y salida franca del local — [ancho y fondo medidos; compáralos con la tabla de espacios de trabajo de tu norma de referencia, 1910.303(g)(1) o el artículo equivalente del NEC o de IEC 60364]
- [ ] Interior limpio y seco, sin polvo conductor ni roedores, con barreras internas puestas, y termografía vigente sin puntos calientes abiertos — [fecha de la última limpieza y del último recorrido termográfico]
- [ ] Cada medio de desconexión puede bloquearse en la posición de abierto, como pide 1910.303(f)(4), y hay dispositivos de bloqueo disponibles en el sitio — [cuántos no lo admiten]

## 4. Conductores, canalizaciones, motores y variadores

Mira arriba y mira detrás. Lo que se ve desde el pasillo ya lo arregló alguien.

- [ ] Canalizaciones completas y fijadas, con tapas de canaleta y de registro puestas, bandejas sin sobrecarga y con separación entre fuerza y control — [dónde falta]
- [ ] Sin empalmes fuera de caja, sin cinta como aislamiento definitivo, sin cable por el suelo y sin conductores prensados por puertas o tapas — [ubicaciones]
- [ ] Identificación por función y código de colores coherente en toda la planta; prensaestopas y sellos acordes al ambiente y a la clasificación del área — [criterio; dónde se rompe]
- [ ] Última medición de resistencia de aislamiento de los circuitos críticos — [MΩ, fecha y criterio de aceptación de tu norma de pruebas]
- [ ] Motores con placa legible, bornera cerrada, prensaestopa firme y conexión de tierra visible y apretada — [cuántos motores incumplen]
- [ ] Temperatura de carcasa, vibración y resistencia de aislamiento del devanado dentro de lo esperado, y relé térmico ajustado según la corriente de placa y el criterio del fabricante, no al gusto del operador — [°C, mm/s, MΩ con su temperatura; In de placa, ajuste actual y criterio aplicado]
- [ ] Variadores: filtros y ventilación limpios, registro de fallas descargado, parámetros respaldados fuera del equipo y tiempo de descarga del bus de CC respetado en el procedimiento — [fecha del último respaldo; tiempo que indica la placa o el manual]

## 5. Puesta a tierra, equipotencialidad y protección contra rayos

La tierra es lo que nadie mira hasta que alguien la necesita. Pide la medición, no la opinión.

- [ ] Conductor de tierra presente y apretado en cada tablero, motor, celda y estructura; ninguno cortado ni provisional — [equipos sin tierra]
- [ ] Uniones equipotenciales entre estructuras, tuberías, bandejas y tableros, sin pintura ni óxido en el punto de contacto — [dónde falla]
- [ ] Barra de tierra principal accesible, identificada y con sus conexiones a la vista — [estado]
- [ ] Última medición de resistencia de puesta a tierra, con método, instrumento y fecha — [ohmios, método empleado, instrumento y fecha; compara con el valor máximo que exija tu norma local]
- [ ] Protección contra rayos íntegra: puntas, bajantes, uniones y tomas de tierra sin corrosión ni desconexiones; descargadores de sobretensión con indicador de estado sano — [fecha de la última inspección, según la norma de pararrayos que te aplique; descargadores agotados]

## 6. Salidas, iluminación de emergencia y equipos de respaldo

Se prueba con corte real. El botón de prueba solo demuestra que el botón funciona.

- [ ] Rutas de salida libres en todo su recorrido y señales de salida visibles, iluminadas y legibles desde cualquier punto — 1910.37(a)(3) y 1910.37(b) — [dónde hay obstrucción; señales faltantes o apagadas]
- [ ] Iluminación de emergencia probada con corte real, con la autonomía cronometrada — [fecha y minutos que aguantó]
- [ ] Planta de emergencia probada con carga, con registro de la prueba y del combustible, y transferencia automática probada en los dos sentidos con su enclavamiento verificado — [fecha, duración y carga; usa la frecuencia que fije tu norma de sistemas de emergencia]
- [ ] UPS y banco de baterías con prueba de autonomía, bornes limpios, sala ventilada y reemplazo previsto — [fecha de la última descarga]
- [ ] Paros de emergencia identificados, accesibles y probados uno por uno — [cuántos probados; fallos]

## 7. EPP, herramienta aislada y señalización

Se revisa el equipo real de la cuadrilla, no el que está guardado en la vitrina para las visitas.

- [ ] Guantes aislantes de la clase que corresponde a la tensión, con protector de cuero, inspección diaria y prueba de aire — [clases disponibles]
- [ ] Prueba dieléctrica vigente: la OSHA exige reensayar guantes cada 6 meses y mangas y mantas cada 12 en 1910.137(c)(2)(viii); confirma el intervalo que te obligue tu norma local — [fecha del último ensayo de cada juego]
- [ ] Ropa y careta de arco acordes a la energía incidente de la etiqueta del equipo — [qué hay; contra qué cal/cm² se eligió]
- [ ] Herramienta aislada certificada para la tensión de trabajo, sin cortes ni aislamiento despegado, e instrumentos con la categoría de medición adecuada al punto de medida y calibración vigente — [juegos retirados; modelos y fecha de calibración]
- [ ] Pértigas, mantas y juegos de puesta a tierra temporal limpios, secos y sin fisuras; señalización de riesgo completa en salas, celdas y tableros, y barreras no conductoras disponibles — [estado; qué falta]

## 8. Permisos, bloqueo y competencias durante la visita

Esto no se audita en la oficina: se mira el trabajo que está pasando mientras caminas la planta.

- [ ] Todo trabajo en curso tiene permiso vigente, en el sitio y firmado antes de empezar — [trabajos revisados; cuántos sin permiso]
- [ ] Los puntos de bloqueo del permiso coinciden con los candados puestos en campo, hay un candado por persona y ninguna llave maestra en el bolsillo de nadie — [diferencias encontradas]
- [ ] Ausencia de tensión verificada por quien va a trabajar, fase por fase y contra tierra, con el detector probado en fuente conocida antes y después de la medida — [a quién preguntaste y qué respondió]
- [ ] Si hay trabajo con tensión: justificación escrita, análisis de riesgo, EPP según el estudio y firma de quien autoriza, que no es quien ejecuta; zona delimitada y señalizada antes de abrir el equipo — [permisos energizados abiertos]
- [ ] Cada ejecutante autorizado por escrito para ese equipo y esa tensión, con formación vigente, y los contratistas con la misma exigencia que el personal propio — [nombres sin autorización o con formación vencida; empresa y qué le falta]

## 9. Gestión del mantenimiento

Aquí se ve si todo lo anterior es un sistema o una casualidad.

- [ ] Plan de mantenimiento eléctrico escrito, con tareas, frecuencias y responsable por equipo, y frecuencias justificadas por condición, criticidad y ambiente, no por costumbre — [cobertura sobre el total de equipos; criterio usado]
- [ ] Órdenes de trabajo cerradas con lo que se hizo, lo que se midió y lo que quedó pendiente; historial por equipo accesible con fallas, pruebas y cambios de componentes — [porcentaje cerrado con datos; hasta qué año llega el historial]
- [ ] Repuestos críticos definidos y existencia real contrastada contra el inventario del sistema — [faltantes encontrados]
- [ ] Indicadores calculados y revisados con dirección: MTBF = horas en operación ÷ número de fallas; disponibilidad = horas disponibles ÷ horas requeridas × 100; cumplimiento del plan = tareas hechas a tiempo ÷ tareas programadas × 100 — [valores del último periodo]
- [ ] Auditoría del programa de seguridad eléctrica al día: la NFPA 70E pide auditar el programa cada tres años como máximo y el trabajo en campo cada año, y dejar constancia escrita de cada auditoría — [fecha de la última; hallazgos cerrados]

## Hallazgos

Una fila por hallazgo, con evidencia y con dueño. Un hallazgo sin nombre y sin fecha se queda abierto para siempre.

| # | Bloque | Hallazgo y evidencia | Severidad | Riesgo asociado | Acción | Responsable | Fecha |
| :---: | --- | --- | :---: | --- | --- | --- | :---: |
| 1 | [3. Tableros] | [CCM-4 celda 7 sin tapa frontal, barras accesibles — foto 12] | [crítico] | [choque y arco a quien pase] | [bloquear la celda y reponer la tapa] | [nombre] | [dd/mm] |
| 2 |  |  |  |  |  |  |  |

## Conclusión y calificación

Tres frases: qué se miró, qué se encontró y qué hay que decidir. Después, el recuento y la firma.

| Concepto | Dato |
| --- | --- |
| Bloques auditados sobre los del alcance | [9 de 9] |
| Críticos / mayores / menores / observaciones | [0 / 0 / 0 / 0] |
| Equipos parados o aislados por hallazgo crítico | [TAG y hora del bloqueo] |
| Calificación y revisión de cierre | [conforme / conforme con observaciones / no conforme] — [dd/mm/aaaa] |

Con un solo hallazgo crítico abierto, la instalación no se califica como conforme, por buena que sea la nota del resto. Auditor: [nombre y firma]. Recibe por la planta: [nombre y firma]. Se entrega a [dirección de planta, seguridad y operación] el [fecha].

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [OSHA 1910.303 — General requirements](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.303) — identificación durable de los medios de desconexión y su bloqueo en abierto, espacio de trabajo y acceso, resguardo de partes vivas y cierre de aberturas sin usar.
- [OSHA 1910.137 — Electrical protective equipment](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.137) — inspección diaria con prueba de aire y los intervalos de reensayo: 6 meses en guantes, 12 en mangas y mantas.
- [OSHA 1910.37 — Maintenance, safeguards, and operational features for exit routes](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.37) — rutas de salida libres, señalización de salida visible e iluminación del recorrido.
- [ESFI — NFPA 70B: Standard for Electrical Equipment Maintenance](https://www.esfi.org/nfpa-70b/) — el programa de mantenimiento eléctrico documentado, su coordinador, los registros y el personal calificado.
- [ANSI/NETA Standards Update — NETA World Journal](https://netaworldjournal.org/2025/08/netaworldstaff/fall-2025-specifications-standards/ansi-neta-standards-update-27/) — qué cubre cada norma NETA: MTS para pruebas de mantenimiento, ATS para aceptación y ECS para puesta en servicio.
- [NFPA 70E: Electrical job safety program audit — EC&M](https://www.ecmweb.com/safety/article/21252369/nfpa-70e-electrical-job-safety-program-audit) — auditoría del programa cada tres años como máximo, del trabajo en campo cada año, y cada auditoría documentada.

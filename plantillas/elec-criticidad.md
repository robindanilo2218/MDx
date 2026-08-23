---
titulo: Análisis de criticidad de activos eléctricos de [planta o área]
subtitulo: [periodo o equipo]
autor: [nombre y cargo]
fecha: 
---

## Para qué sirve este análisis

Cierra el alcance antes de puntuar: qué se clasifica, qué decisión de dinero depende del resultado y quién la firma.

- Alcance: [subestación, área o proceso; di también qué queda fuera].
- Activos incluidos: [transformadores, tableros, motores, variadores, bancos de capacitores, UPS, planta de emergencia].
- Decisión que sale de aquí: [presupuesto anual, lista de repuestos críticos, alcance del paro mayor].
- Método: gestión de activos (familia ISO 55000) y RCM. La criticidad ordena el gasto; no sustituye el análisis de modos de falla ni el estudio de arco eléctrico.

## Quién participa

Sin producción y sin almacén la puntuación sale sesgada. Cierra los nombres antes de la primera reunión.

| Papel | Quién | Qué aporta |
| --- | --- | --- |
| Facilitador | [nombre] | Método, escalas y actas |
| Mantenimiento eléctrico | [nombre] | Historial de fallas y tiempo real de reparación |
| Producción u operación | [nombre] | Costo de la parada y respaldo que de verdad existe |
| Almacén y compras | [nombre] | Existencia y tiempo de reposición del repuesto |
| Seguridad y ambiente | [nombre] | Exposición de personas, derrames, permisos |
| Dirección | [nombre] | Aprueba los cortes de clase y el presupuesto |

## Qué hay que tener antes de puntuar

Si falta más de un renglón, para el ejercicio y recoge el dato: puntuar sin datos es el error que más caro sale.

- [ ] Registro de activos con TAG único y ubicación funcional
- [ ] Historial de fallas de los últimos [3 a 5 años], con fecha, causa y horas fuera de servicio
- [ ] Costo de parada por hora de cada línea o área — [USD/h, dato de producción]
- [ ] Diagrama unifilar actualizado, con las transferencias y los enlaces de respaldo marcados
- [ ] Lista de repuestos por activo, con existencia y tiempo de reposición del proveedor
- [ ] Requisitos legales o de cliente que apliquen al activo — [permiso ambiental, auditoría, contrato]

## Seguridad al levantar los datos en campo

Recoger TAG, placas y estado no justifica abrir nada energizado. Al tablero solo entra personal calificado y acompañado; quien únicamente levanta datos se queda fuera de la zona delimitada. Lo que no se lee con el tablero cerrado se lee en el paro, con el equipo desenergizado y verificado. Esta sección se firma antes de bajar a planta.

> [!WARNING]
> Desenergizar es la regla. Trabajar con tensión es la excepción y exige justificación escrita, análisis de riesgo, permiso autorizado y personal calificado; nunca por prisa ni por comodidad del levantamiento. Antes de tocar cualquier parte, aplica las cinco reglas de oro: cortar todas las fuentes, bloquear y señalizar el medio de corte, verificar ausencia de tensión con instrumento probado antes y después, poner a tierra y en cortocircuito, y delimitar la zona de trabajo. El EPP y las distancias las fija la NFPA 70E vigente o la norma local que te aplique; toma los valores de sus tablas, no de esta plantilla.

## Escala de consecuencia (1 a 5)

Puntúa cada activo en los seis criterios. Los umbrales entre corchetes los fijas tú antes de la primera reunión y no se tocan a mitad del ejercicio.

| Criterio | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| Seguridad de las personas | Sin exposición | Lesión leve sin baja | Lesión con atención médica | Lesión incapacitante | Muerte o quemadura grave por arco |
| Parada de producción | No detiene nada | Baja el ritmo, se recupera en el turno | Detiene una línea hasta [X horas] | Detiene el área de [X] a [Y horas] | Detiene la planta más de [Y horas] |
| Daño ambiental | Ninguno | Contenido dentro del equipo | Derrame contenido en sitio, sin reporte | Evento reportable a [autoridad] | Evento reportable con sanción o suspensión |
| Costo de reparación | Menos de [monto A] | De [monto A] a [monto B] | De [monto B] a [monto C] | De [monto C] a [monto D] | Más de [monto D] |
| Efecto en calidad | Ninguno | Desviación que se corrige en línea | Reproceso de [lote o turno] | Producto no conforme que se desecha | Lote perdido o reclamo formal del cliente |
| Respaldo disponible | Redundancia con transferencia automática | Respaldo manual en minutos | Respaldo parcial, opera al [% de carga] | Sin respaldo, repuesto en almacén | Sin respaldo y repuesto a [semanas] de reposición |

El tiempo de reposición del repuesto se puntúa aquí y en ningún otro lado. Un activo sin respaldo cuyo repuesto tarda meses no puede quedar en la parte baja de la escala.

## Escala de frecuencia de falla (1 a 5)

Puntúa con historial, no con memoria. Los periodos entre corchetes los ajustas al historial que de verdad tengas. Si no hay historial, escribe "sin dato", deja por escrito la marca provisional que acuerde el equipo y programa la recolección antes de la siguiente revisión.

| Puntaje | Frecuencia observada | De dónde sale el dato |
| :---: | --- | --- |
| 1 | Sin fallas en los últimos [5 años] | Historial del CMMS y bitácora de turno |
| 2 | Una falla cada [3 a 5 años] | Historial y órdenes correctivas |
| 3 | Una falla al año, aproximadamente | Historial; o dato del fabricante si el activo es nuevo |
| 4 | Varias fallas al año | Órdenes correctivas del último año |
| 5 | Falla cada [mes o menos] | Órdenes correctivas y reportes de operación |

Si necesitas respaldar la frecuencia con un número: MTBF = horas en operación ÷ número de fallas.

## Cómo se calcula la criticidad

Dos operaciones, nada más. Escríbelas en el acta para que nadie las cambie después.

- Consecuencia (C) = el valor más alto de los seis criterios, no la suma ni el promedio[^1].
- Criticidad = Frecuencia × Consecuencia. El resultado va de 1 a 25.

## Matriz de criticidad

Busca la fila por frecuencia y la columna por consecuencia. La celda te da el puntaje y la clase.

| F / C | 1 | 2 | 3 | 4 | 5 |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **5** | 5 C | 10 B | 15 A | 20 A | 25 A |
| **4** | 4 C | 8 B | 12 B | 16 A | 20 A |
| **3** | 3 C | 6 C | 9 B | 12 B | 15 A |
| **2** | 2 C | 4 C | 6 C | 8 B | 10 B |
| **1** | 1 C | 2 C | 3 C | 4 C | 5 C |

Corte usado en esta plantilla: A de 15 a 25, B de 8 a 14, C de 1 a 7. Si tu planta usa otro corte, cámbialo aquí y en la tabla de activos.

- **Clase A, rojo.** Se le dedica dinero sin discutirlo: monitoreo de condición, repuesto propio y plan de contingencia escrito. Si algo se cae del presupuesto, no es esto.
- **Clase B, ámbar.** Preventivo programado y repuesto compartido. Es la clase que se revisa cuando sube la frecuencia de falla o cambia el proceso.
- **Clase C, verde.** Correctivo planificado o funcionamiento hasta la falla, con reposición rápida. No lleva repuesto dedicado ni ronda especial.

> [!CAUTION]
> Regla de veto: si la consecuencia de seguridad de las personas o la ambiental puntúa 5, el activo es clase A aunque la multiplicación dé bajo. Un equipo que falla una vez cada diez años y mata a alguien no es un activo verde.

## Tabla de activos

Una fila por activo. Seg, Prod, Amb, Costo, Cal y Resp son los seis criterios de consecuencia; C es el mayor de esos seis.

| Activo | TAG | F | Seg | Prod | Amb | Costo | Cal | Resp | C | F × C | Clase |
| --- | --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [Transformador principal, tensión y potencia] | [TR-01] |  |  |  |  |  |  |  |  |  |  |
| [Tablero general, tensión de barra] | [TD-02] |  |  |  |  |  |  |  |  |  |  |
| [Motor de bomba de proceso, kW] | [M-114] |  |  |  |  |  |  |  |  |  |  |
| [Banco de capacitores, kvar] | [BC-01] |  |  |  |  |  |  |  |  |  |  |

> Puntuado el [fecha], por [nombres de los que firman], con el historial hasta [mes y año de corte].

## Qué estrategia le toca a cada clase

Ajusta la lista a tus equipos. Los intervalos no se inventan en esta reunión: salen del fabricante y de la norma.

| Clase | Estrategia | Ejemplos en instalación eléctrica | Repuesto | Se repuntúa |
| --- | --- | --- | --- | --- |
| A | Condición y predictivo, con redundancia donde se pueda | Termografía, descargas parciales, análisis de aceite, firma de corriente del motor, registro de calidad de energía | Propio, en sitio, con rotación | [cada 6 meses] |
| B | Preventivo programado más inspección | Apriete al par del fabricante y limpieza en paro, prueba de aislamiento, prueba funcional de protecciones | Compartido por familia de equipos | [cada 12 meses] |
| C | Correctivo planificado o hasta la falla | Inspección visual en la ronda | Sin repuesto dedicado | [cada 24 meses] |

Los intervalos y alcances de mantenimiento sácalos del manual del fabricante, del capítulo de intervalos de la NFPA 70B vigente y de la ANSI/NETA MTS vigente para los ensayos de campo. Ahí el intervalo y el regreso a servicio se deciden con juicio de ingeniería: recomendación del fabricante, condición del equipo, datos históricos y criticidad del sistema. No con el calendario del año pasado. Sustituye la norma por la que te aplique: NFPA 70E y NEC (NFPA 70) en buena parte de América, IEC 60364 en el ámbito internacional, y la local que te obligue: NOM-001-SEDE (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina).

## Cuándo se vuelve a revisar la clasificación

La cadencia la fijaste en la columna "Se repuntúa" de la tabla anterior; respétala aunque no haya pasado nada. Además, cualquiera de estos disparadores obliga a repuntuar el activo en la siguiente reunión, sin esperar a la fecha.

- [ ] Falla con parada de planta, lesión o evento ambiental
- [ ] Cambio de proceso, de carga o de horario de operación
- [ ] Ampliación eléctrica, nueva línea o cambio en el unifilar
- [ ] Se pierde o se recupera un respaldo o una transferencia
- [ ] Cambia el tiempo de reposición del repuesto o el proveedor
- [ ] Resultado nuevo del estudio de cortocircuito, coordinación o arco eléctrico

## Errores típicos

Los cinco que arruinan el ejercicio. Léelos en voz alta antes de empezar a puntuar.

1. **Poner todo en A.** Si más del [tope que fijes, en % de activos] queda en A, el análisis no priorizó nada: sube el corte o revisa la escala de consecuencia.
2. **Puntuar sin datos.** "Ese siempre falla" no es una frecuencia. Sin historial, se marca "sin dato" y se recoge.
3. **Olvidar el tiempo de reposición del repuesto.** Un activo con respaldo, pero con el repuesto a meses de distancia, se queda sin respaldo en cuanto falla el primero.
4. **Confundir criticidad con condición o con precio.** Un equipo viejo y sucio no es crítico por eso, y una bobina de contactor barata puede parar la línea entera.
5. **Hacerlo una vez y archivarlo.** Una clasificación que no se revisa deja de describir la planta en un año.

## Próximos pasos

- [ ] Cerrar escalas y umbrales — [responsable] — [fecha]
- [ ] Reunión de puntuación de [área] — [responsable] — [fecha]
- [ ] Cargar la clase A/B/C por TAG en el CMMS y ajustar rutas y planes — [responsable] — [fecha]
- [ ] Lista de repuestos críticos de clase A a compras — [responsable] — [fecha]

[^1]: Se usa el mayor de los seis criterios porque sumar o promediar diluye la seguridad: un activo que mata pero no para la producción quedaría en mitad de la tabla. Si tu planta prefiere ponderar, usa pesos que sumen 1, deja el mayor peso en seguridad y anota los pesos en el acta.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [What is asset management — The IAM](https://theiam.org/what-is-asset-management/) — cita la definición de ISO 55000: equilibrar costo, oportunidad y riesgo contra el desempeño para obtener valor de los activos.
- [7 Steps to Criticality Analysis](https://reliabilityweb.com/en/articles/7-steps-to-criticality-analysis) — los pasos que sigue este documento: alcance, equipo, criterios, puntuación, reuniones periódicas y actualización del registro.
- [Understanding Criticality: Myths and Pitfalls to Avoid](https://reliabilityweb.com/en/articles/criticality-analysis) — de ahí salen los errores típicos: precio no es criticidad, condición no es criticidad y el análisis no se hace una sola vez.
- [SAE JA1011 — Evaluation Criteria for RCM Processes](https://saemobilus.sae.org/standards/ja1011_200908-evaluation-criteria-reliability-centered-maintenance-rcm-processes) — los criterios de evaluación que debe cumplir un proceso para llamarse RCM.
- [Equipment Deficiencies and Return to Service under NFPA 70B](https://netaworldjournal.org/2026/05/matthewrobinson/summer-2026-training-talk/equipment-deficiencies-and-return-to-service-under-nfpa-70b/) — NETA World Journal: condición del equipo, datos históricos y criticidad del sistema deciden el intervalo y el regreso a servicio.
- [OSHA 29 CFR 1910.333](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333) — desenergizar antes de trabajar es la regla; las excepciones son riesgo adicional o inviabilidad demostrada por diseño u operación.

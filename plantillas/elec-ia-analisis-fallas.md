# Encargo a una IA: analizar el historial de fallas

<!-- Guardar como analisis-fallas.md y pasárselo a la IA junto con el archivo de datos. -->

## Objetivo

Una frase que empiece por un verbo y diga qué tiene que existir cuando la IA termine. Si no cabe en una frase, son dos encargos.

Ordena las fallas eléctricas de [planta o área] entre [dd/mm/aaaa] y [dd/mm/aaaa] por horas de paro, y dime qué [3] activos justifican cambiar su estrategia de mantenimiento.

## Contexto mínimo de la planta

Solo lo que hace falta para leer este archivo. Lo que sobra compite con lo que importa.

- **Alcance eléctrico:** [subestaciones, CCM, tableros, motores, variadores y bancos de capacitores que aparecen en el archivo]
- **Régimen de operación:** [24 h × 7 días, o las horas de marcha reales por semana] — el archivo no lo dice y sin esto el MTBF sale mal.
- **Paros programados del periodo:** [fechas del paro de planta y del mantenimiento mayor] — esas horas no son falla.
- **Origen de los datos:** [CMMS o GMAO, quién cierra las órdenes y desde qué fecha se codifica el modo de falla]
- **Para qué se usa la salida:** [presupuesto del año, defensa del plan preventivo ante dirección, priorizar el paro de [mes]]
- **Lo demás:** está en [`contexto-planta.md`]; léelo antes de responder. Si un dato no aparece ni aquí ni allí, no lo supongas: va a la lista de datos que faltan

## Entradas

Qué le das, en qué formato y qué puede venir sucio. Un campo que a veces viene vacío se declara aquí, no se descubre a mitad del análisis.

- **Archivo de datos:** [`historial-fallas.csv`], exportado del CMMS el [dd/mm/aaaa]
- **Formato:** [CSV con cabecera, separador coma, UTF-8, fechas dd/mm/aaaa, decimales con punto]
- **Filas:** [número de filas sin contar la cabecera] — cuéntalas tú también y avísame si no coincide.

| Columna | Tipo | Ejemplo | Qué significa | Puede faltar |
| --- | --- | --- | --- | :---: |
| `fecha` | fecha | [12/03/2026] | Fecha del aviso, no la de la reparación | no |
| `ot` | texto | [OT-2026-0881] | Número de orden; identifica la fila y no se repite | no |
| `tag` | texto | [MTR-2103] | Código del activo en el CMMS; manda sobre el nombre | no |
| `equipo` | texto | [Motor de la bomba de alimentación 3] | Nombre corriente del activo; puede venir mal escrito | sí |
| `familia` | lista | [Motor de baja tensión] | Agrupación para comparar: [motores, variadores, tableros, protecciones, capacitores] | sí |
| `tipo_trabajo` | lista | [Correctivo] | [Correctivo, preventivo, predictivo, mejora] | no |
| `descripcion` | texto libre | [No arranca, disparo por sobrecarga] | Lo que escribió el técnico, con sus abreviaturas | sí |
| `modo_falla` | lista | [Aislamiento degradado] | Cómo se manifestó la falla | sí |
| `causa` | lista | [Humedad en la caja de bornes] | Por qué ocurrió, según el cierre de la orden | sí |
| `horas_paro` | número | [6.5] | Horas que el proceso estuvo detenido por esta falla | sí |
| `horas_mo` | número | [9.0] | Horas-hombre que gastó la cuadrilla en esta orden | sí |
| `repuestos` | texto | [Rodamiento 6312, 2 unidades] | Material consumido, tal como se cargó | sí |
| `costo` | número | [4820] | Costo total de la orden en [moneda], con mano de obra | sí |

### Qué haces con los registros incompletos

No rellenas nada. Clasificas, cuentas y sigues con lo que queda.

| Caso | Qué haces |
| --- | --- |
| Falta `horas_paro` | La fila cuenta para el número de fallas y no para las horas. Al pie de la tabla: [n] filas sin horas |
| Falta `modo_falla` o `causa` | Van al grupo "sin clasificar", que aparece en el Pareto como una barra más |
| Falta `tag` | Fuera del análisis por activo; las cuentas aparte y dices cuántas son |
| `fecha` fuera del periodo pedido | Fuera del análisis, y lo dices |
| Dos filas con la misma `ot` | Te quedas con la última y lo anotas |
| `costo` en cero o vacío | Cero no es gratis: trátalo como dato ausente |
| Texto sucio en `equipo` | Agrupas por `tag`, nunca por el nombre |

> [!WARNING]
> No completes un hueco con el promedio de la columna, ni con lo que insinúe la descripción, ni con lo que parezca razonable. Un dato inventado en `horas_paro` mueve el Pareto, y el Pareto decide dónde se gasta el presupuesto del año.

## Preguntas que tienes que responder

Una por una, en este orden y con su número. Si el archivo no permite responder alguna, dilo y pasa a la siguiente.

1. **Los que más paro causan.** Los [10] activos con más horas de paro del periodo, con horas, número de fallas y costo.
2. **Pareto.** Ordena los activos por horas de paro acumuladas y marca dónde se alcanza el 80 % del total; di también cuántos activos hay hasta ese punto y qué porcentaje del parque son. Repite el Pareto por modo de falla dentro de esos activos, no sobre el parque entero.
3. **MTBF por activo.** Solo para los del punto 1. MTBF = horas en operación ÷ número de fallas, con las horas de operación del contexto y descontando los paros programados. Si un activo tiene menos de [número mínimo de fallas que aceptas] fallas, no publiques el MTBF: publica el conteo.
4. **Fallas repetidas.** Activos con [3] o más fallas del mismo modo. Marca cuáles apuntan a una causa no resuelta: misma causa en el cierre, o intervalo entre fallas que se acorta.
5. **Estacionalidad.** Fallas por mes y por familia. Antes de llamarlo estacionalidad, comprueba si coincide con los paros programados, con la época de lluvias o con un cambio de turno; si no puedes comprobarlo con el archivo, dilo.
6. **Backlog y correctivos.** Compara mes a mes las horas de correctivo con [las horas de preventivo pendientes al cierre del mes anterior]. Describe la relación y escribe de forma explícita que es correlación.
7. **Costo por familia.** Costo y horas de paro por familia, con el costo medio por falla y el número de fallas del que sale ese promedio.
8. **Qué activo justifica cambiar de estrategia.** Como mucho [3] activos, con la razón en una línea y las órdenes del archivo que la sostienen.

## Salida esperada

Formato exacto y ejemplo, no esquema. Es la sección que más errores evita.

- **Formato y orden:** Markdown en la respuesta, sin archivos adjuntos; las ocho respuestas numeradas, luego el resumen, luego los supuestos y los datos que faltan.
- **Cifras:** [un decimal] en horas, [sin decimales] en dinero, y el número absoluto al lado de cada porcentaje. Español neutro, frases cortas, sin adjetivos de valoración.

La tabla principal lleva estas columnas exactas, sin añadir ni quitar ninguna:

| TAG | Equipo | Familia | Fallas | Horas de paro | Horas de MO | Costo | Modo de falla dominante | OT de referencia |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| MTR-2103 | Motor de la bomba de alimentación 3 | Motor de baja tensión | 4 | 21.5 | 33.0 | 18420 | Aislamiento degradado | OT-2026-0881 |

Debajo de las tablas, y siempre en este orden:

- **Resumen de diez líneas.** Diez líneas numeradas, una idea por línea, para leerlas delante de dirección. Sin ideas nuevas: solo lo que dicen las tablas.
- **Supuestos.** Todo lo que decidiste tú y no estaba escrito: cómo agrupaste las familias, qué hiciste con los duplicados, qué tomaste como horas de operación.
- **Datos que faltan.** Columnas y filas incompletas, con cuántas filas afecta cada hueco y qué pregunta queda coja por eso.

## Criterios de aceptación

Se comprueban mirando el resultado, sin discutir.

- [ ] Cada cifra se puede rastrear hasta filas concretas del archivo: la columna `OT de referencia` lleva a la orden.
- [ ] Los totales de horas y de costo cuadran con la suma del archivo, descontadas las filas que declaraste incompletas.
- [ ] Ningún promedio ni MTBF sale de menos de [número mínimo de fallas que aceptas] casos sin decirlo en la misma línea.
- [ ] Cada porcentaje va acompañado del número absoluto del que sale.
- [ ] Donde hay relación entre dos series, la respuesta dice "correlación", no "causa", y nombra qué haría falta para demostrar la causa.
- [ ] Las ocho preguntas están respondidas, o marcadas como no respondibles con su motivo.
- [ ] La lista de supuestos y la de datos que faltan existen, aunque queden vacías.

## Restricciones y prohibiciones

Esto no se negocia por prisa ni porque la respuesta quede más corta. Si una regla te impide responder, dilo y para.

- **No** completes datos ausentes por tu cuenta: ni promedios, ni interpolación, ni deducciones del texto libre.
- **No** cambies el `tag` ni unifiques activos con códigos distintos, aunque el nombre se parezca.
- **No** cites normas, límites ni valores de referencia que no estén en el contexto que te di. Si necesitas un umbral, pídemelo.
- **No** des una recomendación de intervención sin escribir al lado que hay que validarla en campo antes de ejecutarla.
- **No** propongas trabajar con tensión, ni pruebas, mediciones o inspecciones con el equipo energizado.
- **No** nombres técnicos ni cuadrillas: esto analiza equipos, no personas.
- Máximo [400] líneas de respuesta. Si no cabe, recorta detalle y dime qué recortaste.

> [!CAUTION]
> Ninguna conclusión de este análisis autoriza una intervención. Desenergizar es la regla; trabajar con tensión es la excepción y exige justificación escrita, análisis de riesgo, permiso autorizado y personal calificado. En campo se aplican las cinco reglas de oro: cortar, bloquear, verificar ausencia de tensión con instrumento comprobado antes y después en una fuente conocida, poner a tierra y en cortocircuito, y señalizar y delimitar la zona. Sustituye la norma por la que te aplique: NFPA 70E y NEC (NFPA 70) en buena parte de América, IEC 60364 en el ámbito internacional, y la local que te obligue: NOM-001-SEDE (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina).

## Si falta información

Distingue los dos casos, porque no se resuelven igual:

1. **Falta algo que cambia el resultado** (las horas de operación, el periodo, qué cuenta como paro eléctrico): **pregunta** y no sigas. Una pregunta concreta, no tres. «No lo sé» y «con este archivo no se puede» son respuestas válidas; una plausible e inventada, no.
2. **Falta un detalle menor** (el nombre de una familia, el formato de una fecha): **supón** lo más conservador, sigue y déjalo escrito en la lista de supuestos.

## Ejemplo de respuesta buena

````md
**2. Pareto por horas de paro.** El 80 % de las 412.0 h de paro se acumula en 6 de los 47 activos (13 %
del parque). Encabeza MTR-2103, con 21.5 h en 4 fallas (OT-2026-0881, 0912, 1044 y 1170); tres de las
cuatro con modo "Aislamiento degradado". 9 filas sin `horas_paro` quedaron fuera y se listan aparte.
````

Por qué está bien: el porcentaje va con el número absoluto, nombra las órdenes de las que sale y declara lo que dejó fuera.

## Ejemplo de respuesta mala

````md
El motor MTR-2103 es el peor actor de la planta y su MTBF cayó bastante este año. Recomiendo cambiar
el rodamiento y revisar el aislamiento con el equipo en marcha, para no perder producción. La
resistencia de aislamiento debe superar el mínimo que exige la norma.
````

Por qué está mal: "bastante" no es una cifra, no dice de qué filas sale, recomienda una intervención sin pedir validación en campo, propone trabajar con el equipo energizado y cita una norma que nadie le pasó.

## Cómo compruebas tú el resultado antes de creértelo

Media hora tuya. Si falla cualquiera de estas seis, el informe entero vuelve.

- [ ] Eliges una fila de la tabla principal y recalculas a mano sus fallas, sus horas y su costo con el archivo abierto delante.
- [ ] Contrastas dos cifras contra el CMMS, no contra el CSV: las horas de paro del mes [mes] y las correctivas del activo [TAG].
- [ ] Sigues tres números hasta su OT y compruebas que la orden existe y dice lo que la tabla afirma.
- [ ] Cuentas las filas del archivo y comparas con la suma de filas usadas, incompletas y descartadas.
- [ ] Buscas el activo que tú ya sabes que da guerra: si no aparece, el problema está en los datos, no en la IA.
- [ ] Lees los supuestos antes que las conclusiones y descartas las que se apoyen en un supuesto falso.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [IEC 60300-3-2:2004, Collection of dependability data from the field](https://webstore.iec.ch/en/publication/1301) — guía para recoger datos de campo de fiabilidad, mantenibilidad y soporte, y para analizarlos y presentarlos.
- [Without Accurate Failure Data All You Have Is a Work Order Ticket System (Reliabilityweb)](https://reliabilityweb.com/articles/entry/without-accurate-failure-data-all-you-have-is-a-work-order-ticket-system) — el modo de falla son campos validados, no texto libre: contra el texto no se puede analizar.
- [Bad Actor Program (Reliabilityweb)](https://reliabilityweb.com/articles/entry/bad-actor-program) — el Pareto en dos niveles: primero los activos por costo y paro, después los modos de falla dentro del 20 % peor.
- [SMRP Best Practices](https://smrp.org/Body-of-Knowledge/Best-Practices) — más de 70 métricas con definición, fórmula, cálculo de ejemplo y advertencias de uso.
- [Reduce hallucinations (documentación de Claude)](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) — dejarle decir "no lo sé", exigir cita textual por afirmación y prohibirle usar conocimiento ajeno a los documentos dados.
- [OSHA 1910.333](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333) — desenergizar antes de trabajar es la regla, y solo personal calificado toca partes no desenergizadas.

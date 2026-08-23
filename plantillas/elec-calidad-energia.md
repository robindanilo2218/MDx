---
titulo: Estudio de calidad de energía de [planta o área]
subtitulo: [periodo, equipo o alcance]
autor: [nombre y cargo]
fecha: 
---

## Motivo y síntomas observados

Tres frases: qué está fallando, desde cuándo y qué se decide con este estudio. Sin un síntoma concreto no hay estudio, hay una semana de datos que nadie lee.

| Campo | Dato |
| --- | --- |
| Qué disparó el estudio, desde cuándo y cada cuánto | [disparos sin causa aparente en el CCM-4 / motores calientes / penalización por reactivos; desde dd/mm, unas [n] veces por semana, entre las [hh] y las [hh]] |
| Qué cambió antes de que empezara | [entraron [n] variadores, se amplió la línea [x], cambió el banco de capacitores o la acometida] |
| Qué cuesta hoy y qué se decide con el resultado | [horas de paro al mes, piezas quemadas, [moneda] de penalización, producto perdido] — [invertir en filtro / reclamar a la distribuidora / rediseñar la alimentación de [carga]] |

Síntomas contados por quien opera, no por quien mide. Anótalos aunque suenen raros: la hora a la que ocurren vale tanto como el número.

- [ ] Protecciones que disparan sin sobrecarga visible: [equipo, protección y hora habitual]
- [ ] Motores o transformadores calientes, ruidosos o con vibración nueva: [equipo y temperatura medida]
- [ ] Variadores que fallan por sobretensión, baja tensión o falla de bus de CD: [equipo y código]
- [ ] Capacitores, fusibles o contactores del banco que fallan seguido: [cuántos y desde cuándo]
- [ ] Parpadeo de luminarias, o PLC, básculas e instrumentos que se reinician solos: [equipo y hora]
- [ ] Cargo por bajo factor de potencia o por energía reactiva en la factura: [monto y meses]

## Datos de la red

Sin esto el estudio no se puede juzgar contra ninguna norma: el límite de corriente armónica depende de qué tan fuerte es tu acometida frente a tu demanda.

| Campo | Dato |
| --- | --- |
| Punto de conexión común con la distribuidora | [dónde está el límite de propiedad: medidor, celda de llegada, primario del transformador] |
| Tensión nominal, frecuencia y transformador principal | [V entre fases en cada nivel; 50 o 60 Hz; kVA, relación, impedancia en % de la placa] |
| Cortocircuito disponible y demanda máxima | [kA del estudio de cortocircuito; A o kVA de demanda máxima] — relación Isc/IL: [ ][^1] |
| Cargas no lineales y compensación de reactivos | [kW de variadores, rectificadores, hornos, soldadoras, UPS, LED] — [kVAr instalados, fijos o automáticos, con o sin reactancia de desintonía, y dónde] |
| Contrato con la distribuidora | [tarifa, factor de potencia mínimo facturable y qué dice sobre calidad del suministro] |

Sustituye la norma por la que te aplique: IEEE 519 para armónicos en el punto de conexión común, IEC 61000-4-30 para el método de medición, EN 50160 o la regulación local para la calidad del suministro que entrega la distribuidora, y la que te obligue en tu país: NOM-001-SEDE (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina). Por encima de todas, el contrato que firmaste.

## Puntos de medición y por qué esos

Se mide donde se puede decidir algo. Un punto sin pregunta detrás es un cable más dentro de un tablero.

| # | Punto | Qué pregunta responde | Qué se espera ver |
| :---: | --- | --- | --- |
| P1 | [acometida, punto de conexión común] | Si el problema entra de la red o lo genera la planta, y si cumples con la distribuidora | Huecos de origen externo y la corriente armónica que exportas |
| P2 | [secundario del transformador] | Cuánto distorsiona la planta entera y cómo carga al transformador | THD de tensión aguas abajo, corriente eficaz real frente a la placa |
| P3 | [tablero de variadores o CCM-x] | Quién inyecta los armónicos y de qué orden | 5.º, 7.º, 11.º y 13.º de corriente; factor de potencia total bajo con desplazamiento alto |
| P4 | [tablero de PLC, básculas, control] | Qué llega de verdad a la carga que se reinicia | Huecos, transitorios de maniobra, desbalance |
| P5 | [banco de capacitores] | Si el banco compensa o está absorbiendo armónicos | Corriente sobre la nominal, calentamiento, fusibles abiertos |

## Qué se registra, con qué instrumento y durante cuánto

El instrumento decide si el número se puede defender delante de la distribuidora. Un multímetro con función de THD no sirve para esto.

| Campo | Dato |
| --- | --- |
| Analizador, serie y calibración | [marca, modelo, número de serie, fecha y número del certificado] |
| Clase de medición, categoría y pinzas | [clase A o clase S según IEC 61000-4-30; la clase A es la que sostiene un reclamo contractual] — [CAT del equipo y de las puntas, apropiada al punto; pinzas con el rango y la clase que corresponda] |
| Agregación y umbrales de evento | [10/12 ciclos, 3 s, 10 min y 2 h según IEC 61000-4-30; el reporte contra norma se arma con los valores de 10 min] — [% de hueco, sobretensión, interrupción y transitorio: anótalos, cambian el conteo] |
| Periodo de registro y bitácora | [del dd/mm hh:mm al dd/mm hh:mm, siete días completos] — [paro programado, línea detenida, prueba de la planta de emergencia, cambio de turno; sin esta bitácora las gráficas no se interpretan] |

Siete días seguidos, ni uno menos. Una semana completa contiene el ciclo real de la planta: los tres turnos, el arranque del lunes, el fin de semana con carga baja y el día que más se produce. Con dos días mides una anécdota. Si el síntoma aparece solo al operar una máquina concreta, deja además un registro dirigido de esa maniobra, con captura de forma de onda.

Se registra todo lo siguiente, en los mismos puntos y a la vez. Medir armónicos sin medir tensión ni eventos deja el informe sin causa.

- Tensión eficaz con sus variaciones, huecos, interrupciones y sobretensiones temporales: motores calientes por tensión baja sostenida, aislamiento castigado por tensión alta, reinicio de PLC, caída de contactores y variadores que disparan por baja tensión.
- Desbalance de tensión, y corriente por el neutro y por tierra: sobrecalentamiento y pérdida de par en motores trifásicos; un desbalance pequeño de tensión produce un desbalance de corriente mucho mayor. Los armónicos triples (3.º, 9.º, 15.º) de las cargas monofásicas no se cancelan entre fases: se suman en el neutro y lo pueden sobrecargar aunque las fases estén equilibradas.
- Armónicos de tensión y de corriente, THD o TDD y cada orden individual: calientan transformadores y motores, disparan protecciones electrónicas y señalan al culpable. Los órdenes característicos de un rectificador salen de 6k ± 1: en uno de seis pulsos, el 5.º, el 7.º, el 11.º y el 13.º.
- Flicker de corta y de larga duración, transitorios con forma de onda y frecuencia: parpadeo por cargas fluctuantes, maniobra de capacitores, rebote de contactores, entrada de la planta de emergencia.
- Potencias activa, reactiva y aparente, con factor de potencia total y factor de desplazamiento: la factura por un lado y los armónicos por otro.

## Seguridad al instalar y retirar el analizador

Instalar un analizador es trabajo eléctrico, no una lectura. El tablero se desenergiza para conectar y para desconectar; trabajar con tensión es la excepción y exige análisis de riesgo, permiso escrito y quien lo autorice.

- [ ] 1. Cortar todas las fuentes de tensión del tablero, incluidas las de control y las de respaldo.
- [ ] 2. Bloquear los dispositivos de corte y señalizar: un candado por cada persona que entra.
- [ ] 3. Verificar ausencia de tensión, fase a fase y fase a tierra, con el método probado-comprobado-probado. La hace persona calificada, con el EPP puesto y en el punto exacto donde vas a conectar.
- [ ] 4. Poner a tierra y en cortocircuito donde el procedimiento lo exija.
- [ ] 5. Señalizar y delimitar la zona antes de abrir el tablero.
- [ ] Cables fuera de partes vivas, puerta que cierra sin pellizcar, equipo sujeto y no colgando de las puntas. El retiro se hace con el mismo procedimiento que la instalación: nadie lo saca de un jalón el viernes.

> [!WARNING]
> Ningún estudio de calidad de energía justifica por sí solo conectar con tensión. Solo se admite si desenergizar crea un peligro mayor o es inviable por diseño, y con permiso de trabajo energizado firmado, análisis de riesgo, EPP de arco según la etiqueta del equipo o el estudio de arco de la planta, y persona calificada. No tener ventana de paro no es justificación: el registro se reprograma. "Son solo dos pinzas" ha matado a gente.

## Factor de potencia y factor de desplazamiento

Aquí se toman las decisiones caras. Con armónicos, los dos números dejan de ser el mismo y el analizador reporta ambos. Anota cuál usa tu distribuidora para facturar: [total / de desplazamiento, según el contrato].

- Factor de desplazamiento = coseno del ángulo entre la tensión y la corriente fundamentales. Solo mira los 50 o 60 Hz; los armónicos no le afectan.
- Factor de potencia total = potencia activa (kW) ÷ potencia aparente (kVA). Cuenta toda la corriente que circula, distorsionada o no: la corriente armónica sube los kVA sin subir los kW, así que baja el total y deja quieto el de desplazamiento.

| Lo que ves en el punto medido | Qué significa | Qué lo corrige de verdad |
| --- | --- | --- |
| Desplazamiento bajo y total parecido | Reactivos de motores y transformadores, sin distorsión relevante | Compensación de reactivos, dimensionada con el factor de desplazamiento |
| Desplazamiento alto y total mucho más bajo | El problema es distorsión, no reactivos | Tratar los armónicos; poner capacitores aquí empeora las cosas |
| Los dos bajos | Reactivos y distorsión a la vez | Compensación con reactancia de desintonía o filtro, nunca capacitores desnudos |

## Resultados por punto

El valor medido no dice nada hasta que enfrente hay un límite con norma y edición. Deja escrito el criterio, percentil 95 de los valores de 10 min o máximo del periodo, y que sea el mismo en todos los puntos. Los límites de la IEEE 519 se verifican en el punto de conexión común, no dentro de la planta: un THD alto en el tablero de variadores no es un incumplimiento, es el dato que explica el síntoma.

| Parámetro y criterio | P1 | P2 | P3 | P4 | Límite aplicable y de dónde sale |
| --- | ---: | ---: | ---: | ---: | --- |
| Tensión eficaz, percentil 95 de 10 min (%) | [ ] | [ ] | [ ] | [ ] | [rango de la regulación local o de la EN 50160 vigente] |
| Huecos e interrupciones (n.º, profundidad, duración) | [ ] | [ ] | [ ] | [ ] | [lo que fije el contrato o el indicador de continuidad de tu regulador] |
| Desbalance de tensión (%) | [ ] | [ ] | [ ] | [ ] | [límite de la norma que rija; anota si tu equipo lo calcula por secuencia negativa o por desviación respecto al promedio, porque no dan lo mismo] |
| THD de tensión y armónico individual mayor (%) | [ ] | [ ] | [ ] | [ ] | [según la tabla de límites de tensión de la IEEE 519 vigente para ese nivel de tensión] |
| TDD o THD de corriente y armónicos 5.º / 7.º / 11.º / 13.º (%) | [ ] | — | [ ] | — | [de la tabla de la IEEE 519 vigente para tu relación Isc/IL: el total y el de cada orden] |
| Flicker de larga duración, y frecuencia (Hz) | [ ] | [ ] | [ ] | [ ] | [de la norma de suministro y de la regulación local] |
| Factor de potencia total / de desplazamiento | [ ] | [ ] | [ ] | [ ] | [el que exija el contrato, y di cuál de los dos] |
| Transitorios (n.º y pico) y corriente por el neutro (A) | [ ] | [ ] | [ ] | [ ] | [los transitorios se juzgan contra lo que aguanta el equipo afectado; el neutro, contra la capacidad del conductor instalado] |

## Hallazgos, causa probable e impacto

Ordenados por lo que cuestan, no por lo llamativa que sea la gráfica. Si no puedes escribir qué descartaría la causa, todavía es una sospecha.

| # | Hallazgo y punto | Carga afectada y costo | Causa probable | Qué la descartaría |
| :---: | --- | --- | --- | --- |
| 1 | [TDD de corriente sobre el límite, P1] | [toda la planta; riesgo contractual y [monto] al mes] | [rectificadores de seis pulsos sin reactancia] | [que el 5.º siga igual con la línea detenida] |
| 2 | [[n] huecos de tensión en la semana, P1] | [línea [x]: se cae y tarda [min] en reponerse] | [fallas en la red de la distribuidora] | [que el hueco nazca dentro, al arrancar [equipo]] |
| 3 | [desbalance sostenido, P2] | [motores de [área]; el MTR-2103 corre a [°C]] | [carga monofásica mal repartida entre fases] | [que el desbalance siga con la planta parada] |

## Acciones posibles y su contra

Ninguna es gratis y ninguna sirve para todo. Escribe la contra antes que el beneficio: es lo que dirección va a preguntar.

| Acción | Qué corrige | Su contra | Cuándo tiene sentido |
| --- | --- | --- | --- |
| Reactancia de línea o choke en el bus de CD del variador | Baja la distorsión de corriente en el origen y protege al variador de transitorios | Caída de tensión que puede provocar disparo por baja tensión; por sí sola no deja el THD en valores bajos | Varios variadores medianos y un incumplimiento moderado |
| Filtro pasivo sintonizado | Corrige barato el orden dominante, casi siempre el 5.º | Puede resonar si cambia la impedancia de la red o la carga, y absorbe distorsión de los vecinos; exige estudio previo | Carga estable y un solo orden dominante |
| Filtro activo, o variador con rectificador activo | Sigue la carga, corrige varios órdenes y compensa reactivos | Costo alto, electrónica que mantener y espacio en el tablero; el rectificador activo solo aplica al equipo que compres nuevo | Carga variable o varios generadores de armónicos |
| Transformador con factor K | Aguanta la corriente armónica sin sobrecalentarse | No reduce la distorsión, solo la tolera: medirás el mismo THD | Transformador que se calienta y hay que reemplazar de todos modos |
| Corrección del factor de potencia con reactancia de desintonía | Sube el factor de desplazamiento sin crear resonancia | Cuesta más que un banco simple y ocupa más espacio | Siempre que haya cargas no lineales, que hoy es casi siempre |
| Alimentador dedicado para las cargas sensibles | Aísla PLC e instrumentos del ruido del tablero de fuerza | Obra eléctrica, canalización y un paro para ejecutarla | Control colgado hoy del mismo tablero que la fuerza |
| UPS o acondicionador en la carga sensible | Cubre huecos e interrupciones cortas donde de verdad duelen | No arregla la causa, hay baterías que mantener y algunas fuentes ensucian más la red | Control, servidores e instrumentos que no pueden reiniciarse |

> [!CAUTION]
> Un banco de capacitores instalado sin estudiar los armónicos puede formar una resonancia paralela con la impedancia de la red y amplificar el orden que ya tienes, casi siempre el 5.º, el 7.º o el 11.º. El resultado son fusibles abiertos, capacitores hinchados o reventados y un THD peor que antes. Antes de instalar o ampliar un banco, calcula la frecuencia de resonancia con la impedancia del transformador y los kVAr previstos, paso por paso del automático.

## Comprobación posterior y anexos

Sin medición después no sabes si pagaste una solución o una caja. Se mide igual: mismos puntos, mismo instrumento, misma clase, mismos umbrales y una semana completa.

- [ ] Repetir el registro en [P1 y P3] entre [dd/mm] y [dd/mm], al menos [n] semanas después de la puesta en marcha, y comparar contra los mismos criterios: [TDD, THD de tensión, desbalance, factor de potencia total].
- [ ] Confirmar con el dato de operación que el síntoma se fue: [disparos por mes, temperatura del MTR-2103, reinicios del PLC], y hacer termografía del transformador, del banco y del tablero intervenido con la planta a carga alta.
- [ ] Revisar [n] facturas seguidas para ver si cayó el cargo por reactivos o por bajo factor de potencia.
- [ ] Cerrar el hallazgo en el sistema de mantenimiento, o dejar escrito por qué sigue abierto y qué falta.

Los anexos van al final y numerados. En el cuerpo se cita el anexo, no se pega la gráfica.

- Anexo A — Tendencia de tensión y frecuencia por punto, semana completa, y lista de eventos con fecha, hora, profundidad y duración: [archivo]
- Anexo B — Espectro de armónicos de tensión y de corriente por punto, y formas de onda de los transitorios más severos: [archivo]
- Anexo C — Potencia, factor de potencia y factor de desplazamiento, con la bitácora de la semana: [archivo]
- Anexo D — Fotos de la instalación, configuración del analizador y certificado de calibración: [archivo]

[^1]: La relación Isc/IL compara la corriente de cortocircuito disponible en el punto de conexión común con tu demanda máxima. Cuanto más fuerte es la red frente a tu planta, más corriente armónica se te permite inyectar, porque distorsiona menos la tensión de los demás. Por eso el mismo TDD puede cumplir en una acometida y no cumplir en otra: busca tu fila en la tabla de la IEEE 519 vigente antes de declarar un incumplimiento.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [IEEE 519-2022, Standard for Harmonic Control in Electric Power Systems](https://standards.ieee.org/ieee/519/10677/) — dónde se aplican los límites de armónicos: en el punto de conexión común y en régimen permanente.
- [IEC 61000-4-30:2015+AMD1:2021, Power quality measurement methods](https://webstore.iec.ch/en/publication/68642) — el método de medición y la diferencia entre clase A y clase S.
- [What does the IEC 61000-4-30 Class A standard mean to me? (Fluke)](https://www.fluke.com/en-gb/learn/blog/power-quality/what-does-the-iec-61000-4-30-class-a-standard-mean-to-me) — los cuatro intervalos de agregación (10/12 ciclos, 3 s, 10 min y 2 h) y por qué la clase A es la que sostiene un reclamo.
- [EN 50160 Report, Power Quality Explained (NEO Messtechnik)](https://www.neo-messtechnik.com/en/power-quality-explained-chapter5-en-50160-report-standard) — la semana de registro, los valores medios de 10 min y el criterio del 95 %.
- [Power Factor vs. Displacement Power Factor (EC&M)](https://www.ecmweb.com/power-quality-reliability/article/20902781/power-factor-vs-displacement-power-factor) — por qué con armónicos los dos números se separan y cuál se usa para dimensionar capacitores.
- [Power Factor Correction and Harmonic Resonance: A Volatile Mix (EC&M)](https://www.ecmweb.com/archive/article/20893204/power-factor-correction-and-harmonic-resonance-a-volatile-mix) — cómo un banco de capacitores resuena con la red y qué se rompe cuando lo hace.

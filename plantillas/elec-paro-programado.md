---
titulo: Plan de paro programado y maniobras de [planta o área]
subtitulo: [periodo o equipo]
autor: [nombre y cargo]
fecha: 
---

## Objetivo del paro

Tres frases: qué se interviene, cómo queda la instalación al terminar y qué decisión habilita. Quien solo lea esto tiene que poder autorizar el paro.

- Objetivo: [dejar SE-01 y CCM-2 en condición de operar [12] meses sin intervención mayor], a un costo de [unidades no producidas u horas de indisponibilidad].
- Se hace solo con paro: [limpieza y reapriete de barras, pruebas de aislamiento, ajuste de protecciones, cambio de celda, mantenimiento del transformador]. Nada de esto se puede hacer con la instalación energizada.
- No entra: [lo que se puede hacer con la planta operando; se queda en su OT y en su ventana].
- Alcance congelado el [fecha, entre 4 y 12 semanas antes]: lo que aparezca después entra solo con firma de [gerente de mantenimiento y jefe de producción] y con hora asignada en la secuencia.

## Ventana, hora de no retorno y vuelta atrás

Se firma con producción y no se mueve de palabra. La hora de no retorno es el último momento en que todavía devuelves el equipo dentro de la ventana.

| Hito | Fecha y hora | Quién lo confirma |
| --- | --- | --- |
| Instalación entregada a mantenimiento | [dd/mm hh:mm] | [operaciones] |
| Hora de no retorno | [dd/mm hh:mm] | [gerente de mantenimiento] |
| Fin de trabajos y pruebas | [dd/mm hh:mm] | [jefe de trabajo] |
| Equipo devuelto a operaciones | [dd/mm hh:mm] | [operaciones] |

> [!WARNING]
> Pasada la hora de no retorno ya no se reprograma sin costo: cada hora extra la paga producción. Lo que no haya empezado a esa hora se cancela y pasa a la tabla de abajo, no se mete a la fuerza.

En esa hora se decide con el avance real contra la ruta crítica, no con optimismo. Escribe hoy quién decide cada escenario.

| Escenario | Señal | Qué se hace | Quién decide |
| --- | --- | --- | --- |
| [Repuesto equivocado o dañado] | [al desmontar] | [remontar lo original, probar y reenergizar] | [gerente de mantenimiento] |
| [Prueba fuera de criterio] | [aislamiento o relé no pasa] | [no reenergizar ese circuito; operar con el respaldo] | [jefe de trabajo] |
| [Atraso de más de [2] h] | [ruta crítica excedida] | [cancelar lo no crítico y pasarlo a nueva OT, o pedir extensión con la cifra de producción perdida] | [coordinador, y dirección si hay extensión] |

## Regla de seguridad y marco normativo

Desenergizar es la regla; trabajar con tensión es la excepción y exige justificación escrita, análisis de riesgo y permiso firmado, y que el paro vaya retrasado no es justificación. Con varias cuadrillas bajo el mismo corte, un candado no protege a nadie: cada persona expuesta pone el suyo en la caja de bloqueo grupal, solo esa persona lo retira, y el jefe de trabajo lleva la lista de quién está dentro y la actualiza en cada relevo. Sustituye la norma por la que te aplique: NFPA 70E y NEC (NFPA 70) en buena parte de América, IEC 60364 en el ámbito internacional, y la local que te obligue: NOM-001-SEDE y NOM-029-STPS (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina). Fronteras de aproximación, energía incidente y categoría de EPP salen de la tabla correspondiente de la NFPA 70E vigente y del estudio de arco de esta planta.

- [ ] 1. Cortar todas las fuentes de tensión, incluidas respaldo, retorno y circuitos de control.
- [ ] 2. Bloquear los medios de corte y señalizarlos con candado y tarjeta.
- [ ] 3. Verificar ausencia de tensión con instrumento probado antes y después en fuente conocida.
- [ ] 4. Poner a tierra y en cortocircuito del lado del trabajo.
- [ ] 5. Señalizar y delimitar la zona, y no retirar la delimitación hasta cerrar el permiso.

## Alcance por equipo, OT y contratistas

Una fila por equipo: sin número de OT no hay horas, ni repuesto, ni historial. Nadie entra sin inducción registrada, el contratista se sienta en la planificación semanas antes, y los repuestos e instrumentos calibrados están en sitio antes de abrir el primer corte.

| Equipo y TAG | Trabajo | OT | Duración | Quién ejecuta | Inducción |
| --- | --- | --- | ---: | --- | --- |
| [SE-01 celda de llegada] | [limpieza, reapriete y pruebas de MT] | [OT-0000] | [6 h] | [contratista MT] | [dd/mm] |
| [TR-01 13.8/0.48 kV] | [aceite, relación de transformación, bornes] | [OT-0000] | [4 h] | [contratista] | [dd/mm] |
| [Relés 50/51 y 87] | [ajuste y prueba de protecciones] | [OT-0000] | [3 h] | [contratista] | [dd/mm] |

## Secuencia de maniobras

Hora a hora, de la transferencia de carga al bloqueo. Ninguna maniobra se ejecuta sin orden del coordinador, que es el único que la da y el único que registra la hora real; quien ejecuta repite la orden antes de operar y confirma al terminar. Si algo no responde como dice la tabla, se detiene todo y se vuelve a reunir al equipo que aprobó el plan.

| Hora | Maniobra | Equipo y TAG | Ejecuta | Verifica | Confirmado |
| :---: | --- | --- | --- | --- | --- |
| [-00:30] | Charla previa, reparto de tareas y repaso de este plan | — | [jefe de trabajo] | [seguridad] |  |
| [00:00] | Aviso de inicio a producción y a la distribuidora | — | [coordinador] | [operaciones] |  |
| [00:10] | Transferencia de carga y confirmación de que el proceso quedó sin alimentar | [52-02] | [operador MT] | [operaciones] |  |
| [00:30] | Apertura del interruptor principal y comprobación de posición | [52-01] | [operador MT] | [coordinador] |  |
| [00:45] | Apertura del seccionador, comprobación visual de cuchillas y extracción del interruptor | [89-01, 52-01] | [operador MT] | [jefe de trabajo] |  |
| [01:00] | Ausencia de tensión, fase a fase y fase a tierra | [barra MT] | [electricista MT] | [jefe de trabajo] |  |
| [01:10] | Puesta a tierra y en cortocircuito del lado del trabajo | [barra MT] | [electricista MT] | [jefe de trabajo] |  |
| [01:25] | Bloqueo, tarjetas, llaves a la caja grupal, delimitación y entrega del permiso a cada cuadrilla | [todos los cortes] | [jefe de trabajo] | [seguridad] |  |

## Ruta crítica y trabajos en paralelo

La cadena de trabajos dependientes fija la hora de reenergización: se protege con el mejor personal y con el repuesto ya en sitio. Lo demás se acomoda alrededor sin estorbar.

| # | Actividad de la ruta crítica | Duración | Depende de | Holgura |
| :---: | --- | ---: | :---: | ---: |
| 1 | [Maniobras, bloqueo y puesta a tierra] | [1.5 h] | — | [0] |
| 2 | [Limpieza y reapriete de celdas de MT] | [4 h] | 1 | [0] |
| 3 | [Pruebas de aislamiento y de protecciones] | [3 h] | 2 | [0] |
| 4 | [Verificación final, retiro de tierras y reenergización] | [2.5 h] | 3 | [0] |

Si la ruta crítica no cabe en la ventana solo hay tres salidas, y se eligen antes del paro: sumar gente a la actividad que manda, sacar trabajo fuera de la ventana o negociar más ventana. Dos cuadrillas sobre el mismo circuito, o una probando mientras otra tiene las manos dentro, es como se mata gente en un paro. No pueden coincidir:

- [Limpieza y reapriete de CCM-2] con [inyección primaria en esa misma barra]: la prueba mete tensión donde hay manos.
- [Análisis de aceite del TR-01] con [prueba de los relés que operan ese interruptor]: maniobra remota con gente dentro del equipo. Tampoco obra civil ni limpieza de piso durante pruebas dieléctricas: mete personal no calificado en la zona delimitada.

## Pruebas y verificación antes de reenergizar

Ninguna se firma de memoria: el valor medido queda escrito con su instrumento. Los criterios salen de tu procedimiento, del manual del fabricante y de la norma de ensayo que uses, nunca de esta plantilla.

| Prueba | Alcance | Valor medido | Criterio | Firma |
| --- | --- | ---: | --- | --- |
| [Resistencia de aislamiento] | [barras, cables, devanados] |  | [el de tu procedimiento o el del fabricante] |  |
| [Continuidad, puesta a tierra y resistencia de contactos] | [malla, carcasas, interruptores y seccionadores] |  | [el de tu procedimiento y el del fabricante] |  |
| [Ajuste y prueba de protecciones] | [relés 50/51, 87, 27/59] |  | [lista de ajustes vigente y firmada] |  |
| [Par de apriete y limpieza] | [bornes, barras y aisladores] |  | [el par que indique el fabricante para ese borne] |  |

- [ ] Herramientas, puentes, trapos y sobrantes retirados y contados contra la lista de entrada; tapas, barreras y señalización de vuelta en su sitio.
- [ ] Puestas a tierra y cortocircuitos retirados y contados uno a uno contra la lista.
- [ ] Recuento nominal de personal: cada quien confirmado por nombre y fuera de la zona.
- [ ] Candados retirados uno a uno, cada uno por la persona que lo puso.

> [!CAUTION]
> No se da tensión mientras quede un candado, una tierra o una persona sin contar. El recuento se hace por nombre y en voz alta, nunca por la sensación de que ya salieron todos: el que quedó dentro es siempre el que nadie vio entrar. Antes de energizar, aviso general y comprobación visual de que la zona está libre.

## Reenergización, primeras horas y aceptación

En orden inverso al de apertura, con la gente fuera de la zona de riesgo de arco y tomando carga por bloques, no de golpe.

| Hora | Maniobra | Equipo y TAG | Ejecuta | Verifica | Confirmado |
| :---: | --- | --- | --- | --- | --- |
| [10:00] | Cierre del permiso y aviso de que el equipo deja de estar seguro | — | [jefe de trabajo] | [coordinador] |  |
| [10:15] | Inserción del interruptor, cierre del seccionador y energización de barra | [89-01, 52-01] | [operador MT] | [coordinador] |  |
| [10:25] | Verificar tensión y secuencia de fases antes de tomar carga | [barra MT] | [electricista MT] | [jefe de trabajo] |  |
| [10:30] | Energizar transformador en vacío y observar [minutos] | [TR-01] | [operador MT] | [coordinador] |  |
| [10:45] | Cerrar el interruptor de baja y tomar carga por bloques | [TG-01] | [operador MT] | [operaciones] |  |
| [11:00] | Arranque escalonado de motores en el orden de proceso | [M-0n] | [operaciones] | [mantenimiento] |  |

Mantenimiento se queda en planta mientras el equipo toma carga, vigilando lo que se intervino:

| Qué se vigila | Cada cuánto | Referencia | Quién |
| --- | :---: | --- | --- |
| [Temperatura de conexiones intervenidas, con termografía] | [1 h, 4 h y 8 h] | [ΔT contra fase de referencia] | [propio] |
| [Corriente, desbalance, ruido, vibración, alarmas y disparos de relés] | [continuo 24 h] | [In de placa, estado previo al paro y cero eventos] | [operaciones] |

El equipo vuelve a operaciones cuando se cumplen todos los criterios, no cuando ya está girando:

- [ ] Todas las pruebas con valor escrito y dentro de criterio, y protecciones ajustadas según la lista vigente, probadas y firmadas por quien las ajustó.
- [ ] Sin alarmas ni disparos en las primeras [4] horas con carga, y termografía posterior sin puntos calientes nuevos.
- [ ] Planos, listas de ajustes y etiquetas actualizados si algo cambió, y acta de entrega firmada por mantenimiento, seguridad y operaciones.

## Comunicación

Un solo canal para las maniobras y un solo responsable de hablar hacia afuera.

| Momento | Quién avisa | A quién | Medio |
| --- | --- | --- | --- |
| [72 h antes] | [planificador] | [producción, contratistas, seguridad] | [correo con este plan adjunto] |
| [Inicio y cada maniobra] | [coordinador] | [operaciones, distribuidora, quien ejecuta] | [radio, orden repetida y hora registrada] |
| [Avance cada [2] h y en la hora de no retorno] | [jefe de trabajo y gerente] | [gerencia, dirección y producción] | [mensaje con hora y avance; llamada en el punto de decisión] |
| [Antes de reenergizar] | [jefe de trabajo] | [todo el personal en zona] | [aviso general en sitio] |
| [Emergencia] | [quien la detecte] | [coordinador y seguridad] | [radio, canal libre] |

## Cierre y lecciones aprendidas

Se llena en los [5] días siguientes, con el equipo todavía acordándose. Sin esto, el paro del año que viene repite los mismos errores.

| Concepto | Planificado | Real | Qué cambiamos el próximo paro |
| --- | ---: | ---: | --- |
| [Duración del paro] | [h] | [h] |  |
| [Horas hombre, costo y trabajos completados] | [h, monto y n] | [h, monto y n] |  |

- [ ] OT del paro cerradas con horas, repuestos y mediciones reales, y hallazgos de seguridad e incidentes registrados, con daño o sin él.
- [ ] Trabajo pendiente convertido en OT con número y fecha, no en una lista suelta.
- [ ] Este plan actualizado y guardado como base del próximo paro.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [OSHA 1910.333, Selection and use of work practices](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333) — desenergizar es la regla, y antes de reenergizar: retirar herramientas, avisar, que cada quien saque su candado y comprobar visualmente que no queda nadie.
- [OSHA 1910.147, The control of hazardous energy](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147) — bloqueo de grupo con un responsable que lleva la lista de expuestos, e inspección del área antes de liberar.
- [OSHA eTool, Deenergizing lines and equipment for employee protection](https://www.osha.gov/etools/electric-power/hazardous-energy-control/deenergizing-lines-equipment-employee-protection) — la secuencia de apertura, bloqueo, prueba de ausencia de tensión y puesta a tierra, y cómo se libera el permiso.
- [Yale Facilities, Electrical Switching Associated With High Voltage Gear](https://facilities.yale.edu/sites/default/files/files/Electrical%20Switching.pdf) — la orden de maniobra escrita: paso a paso con tiempos y responsables, un solo coordinador que autoriza y registra, y prohibido desviarse sin volver a reunir al equipo.
- [ANSI/NETA ATS, Acceptance Testing Specifications](https://www.netaworld.org/standards/ansi-neta-ats) — qué ensayo de campo lleva cada equipo antes de energizarlo y con qué criterio se acepta.
- [Reliabilityweb, Shutdowns and turnarounds from the contractor's perspective](https://reliabilityweb.com/articles/entry/shutdowns_turnarounds_from_the_contractors_perspective) — meter al contratista en la planificación, darle alcance con detalle e integrarlo al programa maestro y a la ruta crítica.

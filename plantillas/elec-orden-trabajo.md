---
titulo: Orden de trabajo eléctrico de [planta o área]
subtitulo: [activo, TAG y n.º de OT]
autor: [nombre y cargo]
fecha: 
---

## Cabecera

Se llena antes de que la OT salga de la oficina: son los campos que después buscas en el CMMS.

| Campo | Dato |
| --- | --- |
| OT N.º y fecha | [OT-2026-0417 — dd/mm/aaaa] |
| Tipo | [preventivo / correctivo / predictivo / mejora / emergencia] |
| Prioridad | [la escala de tu CMMS: emergencia, alta o normal, con el tiempo de respuesta que fije tu política] |
| Activo, TAG y ubicación | [motor bomba de alimentación — MTR-2103, CCM-4 celda 7] |
| Solicitante | [nombre y área que pide el trabajo] |
| Responsable de ejecución | [técnico líder o cuadrilla] |
| Ventana acordada | [inicio dd/mm hh:mm — fin dd/mm hh:mm, pactada con producción] |
| Estado | [emitida / planificada / en ejecución / en espera de repuesto / cerrada] |

## Seguridad antes de la tarea

Esto se firma antes de abrir el primer tablero. Si un renglón queda en blanco, el trabajo no empieza.

| Punto | Respuesta |
| --- | --- |
| Desenergizado | [sí / no; y tensión nominal del punto de trabajo en V de placa] |
| Permiso y bloqueo | [n.º del permiso LOTO y candados puestos; el detalle de puntos y llaves vive en ese permiso, no aquí] |
| Riesgos identificados | [choque, arco, altura, espacio confinado, arranque remoto, energía almacenada en capacitores] |
| EPP requerido y fronteras | [según la tabla de EPP de la NFPA 70E vigente y la etiqueta de arco del equipo; no lo estimes de memoria] |
| Bloqueo del arranque remoto | [DCS o PLC, permisivo retirado, quién lo confirma] |

Sustituye la norma por la que te aplique: NFPA 70E y NEC (NFPA 70) en buena parte de América, IEC 60364 en el ámbito internacional, y la local que te obligue: NOM-001-SEDE y NOM-029-STPS (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina).

Cinco reglas de oro, en orden y sin saltarse ninguna:

- [ ] 1. Cortar todas las fuentes de tensión, incluidas las de respaldo y las de control, y descargar o confinar la energía almacenada: capacitores, bus de CD del variador, resortes y aire.
- [ ] 2. Bloquear los dispositivos de corte y señalizar: un candado por cada persona que entra.
- [ ] 3. Verificar ausencia de tensión en el punto de trabajo, fase a fase y fase a tierra.
- [ ] 4. Poner a tierra y en cortocircuito donde el procedimiento lo exija.
- [ ] 5. Señalizar y delimitar la zona, y separar las partes con tensión que queden cerca.

> [!CAUTION]
> Sin verificación de ausencia de tensión no se empieza. Se prueba el instrumento en una fuente con tensión conocida o en un comprobador, se mide el punto de trabajo y se vuelve a probar el instrumento: uno averiado marca cero en un circuito vivo. El circuito se trata como energizado hasta que la medición demuestre lo contrario.

## Trabajo con tensión, solo si no hay otra salida

Desenergizar es la regla. Trabajar con tensión es la excepción y se justifica por escrito, nunca de palabra. La justificación completa, las fronteras y el EPP van en el permiso energizado; en la OT solo queda el número y quién firmó.

| Punto | Respuesta |
| --- | --- |
| Motivo, permiso y análisis | [desenergizar crea un peligro mayor o es inviable por diseño del equipo o del proceso; n.º del permiso energizado y del análisis de choque y de arco] |
| Quién autoriza | [nombre, cargo y firma; no puede ser quien ejecuta] |
| Personal calificado y charla previa | [nombres, su acreditación, fecha y hora de la charla] |

> [!WARNING]
> "Se acaba rápido" no es justificación. Sin permiso firmado y sin análisis de riesgo, la tarea se reprograma con paro, aunque cueste producción.

## Descripción del trabajo y alcance

Tres frases: qué se interviene, hasta dónde llega esta OT y qué queda fuera para que nadie lo dé por hecho.

- **Trabajo:** [descripción concreta, con el modo de operación en que se hace]
- **Fuera de alcance:** [lo que no se toca en esta salida]

## Materiales, repuestos e instrumentos

Sin código no hay costo ni historial del activo. El instrumento con calibración vencida no entra a campo: su medición no sirve para decidir nada.

| Código | Repuesto o material | Cantidad pedida | Cantidad usada | Devuelto |
| --- | --- | ---: | ---: | :---: |
| [SKU-00000] | [contactor 3P — corriente y tensión de bobina, de la placa] | [2] |  |  |

| Instrumento o herramienta | Serie | Certificado | Vence | Categoría de medición |
| --- | --- | --- | --- | :---: |
| [multímetro / pinza / megóhmetro / cámara termográfica] | [S/N] | [N.º] | [dd/mm/aaaa, según el intervalo del fabricante o de tu norma de ensayo] | [la que exija ese punto de medida; mírala en la etiqueta y en el manual del instrumento] |

## Pasos

Numerados y en el orden real. Quien ejecuta cada paso lo marca al terminarlo.

1. [Coordinar con operaciones y confirmar la ventana y el modo de paro.]
2. [Aplicar bloqueo y verificar ausencia de tensión.]
3. [Paso técnico concreto: desmontaje, limpieza, ajuste, prueba.]
4. [Retirar bloqueo, energizar y probar con operaciones presente.]

## Mediciones tomadas

Los valores crudos, con su unidad y su referencia. Aquí no van conclusiones.

| Punto de medición | Magnitud | Unidad | Valor medido | Valor de referencia | Instrumento |
| --- | --- | :---: | ---: | --- | --- |
| [tensión L1-L2 / L2-L3 / L3-L1] | Tensión | V |  | [placa del equipo, con la tolerancia de tu procedimiento] |  |
| [corriente por fase y desbalance] | Corriente | A |  | [In de placa] |  |
| [aislamiento devanado a tierra y de cables] | Resistencia | MΩ |  | [criterio del procedimiento propio o del fabricante] |  |
| [temperatura de conexiones] | Temperatura | °C |  | [ΔT contra fase de referencia, según tu criterio termográfico] |  |
| [par de apriete de bornes y barras] | Par | N·m |  | [el que indique el fabricante para ese borne] |  |

## Tiempos

Sin horas reales no hay costo, ni disponibilidad, ni indicadores. MTTR = horas de reparación ÷ número de reparaciones.

| Concepto | Inicio | Fin | Total |
| --- | --- | --- | ---: |
| Paro del equipo | [dd/mm hh:mm] | [dd/mm hh:mm] | [h] |
| Trabajo en sitio | [dd/mm hh:mm] | [dd/mm hh:mm] | [h] |

| Técnico | Especialidad | Horas normales | Horas extra |
| --- | --- | ---: | ---: |
| [nombre] | [electricista de fuerza / instrumentista] |  |  |

## Qué se encontró, qué se hizo y por qué falló

Primero el estado real al llegar, después la intervención con los valores de ajuste finales. La tabla de causa solo aplica a correctivos.

- **Se encontró:** [qué estaba flojo, quemado, sucio, fuera de ajuste]
- **Se hizo:** [la intervención y cómo quedó]

| Componente que falló | Modo de falla | Causa | Evidencia |
| --- | --- | --- | --- |
| [bobina del contactor] | [circuito abierto / cortocircuito / desgaste / aflojamiento] | [sobretensión, humedad, vibración, error de operación] | [foto, medición, pieza guardada] |

- [ ] Falla repetida en este activo — [cuántas veces y en cuántos meses]
- [ ] Requiere análisis de causa raíz formal — estudio u OT: [número]

## Trabajo pendiente

Lo que quedó sin hacer no va a un cuaderno: se convierte hoy en otra OT con número.

| Pendiente | Por qué no se hizo | OT generada | Prioridad |
| --- | --- | --- | :---: |
| [cambiar barraje flojo del CCM] | [faltó repuesto] | [OT-2026-0000] | [la de tu escala] |

## Pruebas, entrega y cierre

El equipo vuelve a producción cuando alguien de operaciones firma que lo recibe funcionando.

- [ ] Herramientas, sobrantes y trapos retirados; tapas, resguardos y señalización repuestos.
- [ ] Bloqueos retirados uno a uno, cada candado por la persona que lo colocó.
- [ ] Energización con operaciones presente y personal fuera de la zona de riesgo.
- [ ] Pruebas funcionales en vacío y con carga, y ajustes de protección verificados: [qué se probó, relé, curva y valores dejados].
- [ ] Planos, listas de ajustes y etiquetas actualizados si algo cambió.
- [ ] Sobrantes devueltos al almacén con su vale, y códigos de falla, causa y remedio cargados en el CMMS.
- [ ] Permiso de trabajo cerrado y devuelto a quien lo emitió, y los pendientes ya convertidos en OT con número.

Mientras falte una firma, la OT sigue abierta aunque el equipo ya esté girando.

| Papel | Nombre | Firma | Fecha y hora |
| --- | --- | --- | --- |
| Ejecutó | [técnico] |  |  |
| Supervisó | [supervisor de mantenimiento] |  |  |
| Verificó seguridad | [jefe de trabajo o responsable de SST] |  |  |
| Recibió | [operaciones] |  |  |

## Por qué importa cerrar bien esta OT

Una OT cerrada con "se revisó y quedó operando" no tiene horas, ni repuesto, ni modo de falla: con eso no se calcula MTBF ni MTTR, no sabes qué activo te cuesta más y la misma falla vuelve porque nadie escribió la causa. Escribe aquí lo que necesitarías leer si te llamaran de madrugada a atender este mismo equipo.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [OSHA 1910.147 — Control of hazardous energy (lockout/tagout)](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147) — exige procedimientos escritos de bloqueo, capacitación y verificación del aislamiento.
- [OSHA 1910.333 — Selection and use of work practices](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333) — desenergizar es la regla; con tensión solo si se documenta que es inviable o más peligroso.
- [NOM-029-STPS-2011, mantenimiento de instalaciones eléctricas (DOF)](https://dof.gob.mx/nota_detalle.php?codigo=5227363&fecha=29/12/2011) — plan de trabajo por actividad, autorización escrita, bloqueo y verificación de ausencia de tensión.
- [Energized electrical work permits (Fluke)](https://www.fluke.com/en-us/learn/blog/safety/energized-electrical-work-permits) — qué lleva el permiso de trabajo energizado: riesgo de choque y de arco, protección de los no calificados y aprobación de la gerencia para reparar.
- [About absence of voltage testing (Fluke)](https://www.fluke.com/en-us/learn/blog/electrical/absence-of-voltage-testing) — el ensayo vivo-muerto-vivo y por qué se prueba el instrumento antes y después.
- [Work order completion (Reliabilityweb)](https://reliabilityweb.com/tips/article/work_order_completion_maintenance_tip) — qué exige cerrar bien una OT: horas por especialidad, códigos de falla, pruebas posteriores y OT de seguimiento.

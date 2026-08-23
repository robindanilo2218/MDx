# Contexto de la planta eléctrica para una IA

<!-- Guardar como contexto-planta.md, o pegarlo al inicio de la conversación con la IA.
     También sirve como CLAUDE.md o AGENTS.md del repositorio donde lleves la
     documentación de mantenimiento. -->

Esto es lo que le das a un asistente de IA para que responda sobre tu instalación y no sobre una planta genérica. Lo escribes una vez, lo fechas y lo pegas al principio de cada conversación. Estado a **[fecha de hoy]**.

> [!WARNING]
> Antes de pegar esto en ninguna herramienta, comprueba que tu empresa la tiene aprobada. Lo que escribes en un servicio público queda en manos del proveedor y puede usarse para mejorar el servicio, verlo un tercero o salir en una filtración. Fuera del archivo: nombres y datos personales de tu gente, credenciales de SCADA o del CMMS, contratos, tarifas negociadas, planos completos y el estudio de arco eléctrico. Con TAG, kVA y tensiones basta para que la IA sea útil.

## Quién soy y qué decido

Dos líneas de cargo y una lista de hasta dónde llega tu firma. Sin esto te van a proponer cosas que no puedes ejecutar.

- **Cargo y sitio:** [gerente de mantenimiento eléctrico, planta de ciudad y país]
- **A cargo de:** [n.º de técnicos electricistas propios] y [n.º de contratistas habituales]
- **Decido solo:** [compras hasta USD monto; programación de la cuadrilla; alcance de un paro ya autorizado]
- **No decido:** [parar una línea, lo autoriza tal cargo; contratar fuera del listado de proveedores homologados]
- **Respondo por:** [disponibilidad de subestaciones y tableros; cero accidentes eléctricos; presupuesto anual en USD]

## La planta en cinco líneas

Giro, ritmo y qué pasa cuando se va la energía. Una recomendación de mantenimiento sin esto no vale nada.

- **Qué se fabrica:** [producto y proceso, en una línea]
- **Régimen:** [n.º de turnos, horas al día, días al año; mes del paro general]
- **Qué cuesta una parada:** [USD/hora, dato de producción, no estimación tuya]
- **Consumo y demanda:** [kWh/mes del último año], [kW de demanda máxima] y [factor de potencia de la factura]
- **Continuidad:** [qué proceso no aguanta ni un microcorte y qué se echa a perder cuando cae: horno, sala de servidores, cámaras de frío]

## La instalación eléctrica

Una fila por elemento. Copia los datos de la placa y del unifilar vigente, no del catálogo ni de memoria.

| Elemento | TAG y ubicación | Datos que la IA necesita |
| --- | --- | --- |
| Acometida | [n.º de servicio y nombre de la distribuidora] | [tensión de suministro en kV], [aérea o subterránea], [radial o anillo], [una sola alimentación o dos] |
| Subestación principal | [SE-1, patio norte] | [tensión primaria/secundaria en kV], [n.º de celdas], [interior o intemperie], [año] |
| Transformador principal | [TRF-01, SE-1] | [kVA], [kV/kV], [conexión Dyn11], [%Z de placa], [refrigeración ONAN/seco], [año], [carga media en %] |
| Otros transformadores | [TRF-02, TRF-03] | [kVA y tensiones de cada uno], [qué alimenta cada uno] |
| Tablero general de baja | [TGBT-1] | [corriente del barraje en A], [interruptor principal], [kA disponibles según el estudio de cortocircuito] |
| Centros de control de motores | [CCM-1 a CCM-n, y dónde está cada uno] | [n.º de arrancadores], [tensión], [año], [con o sin etiqueta de arco] |
| Generación de respaldo | [GE-1] | [kW y kVA], [combustible y autonomía en horas con el tanque lleno], [transferencia automática o manual], [qué carga toma y qué carga no] |
| UPS | [UPS-1, sala de control] | [kVA], [autonomía real en minutos a la carga de hoy], [año de las baterías], [qué alimenta] |
| Compensación reactiva | [BC-1] | [kVAr totales y por paso], [con o sin filtros de armónicos], [dónde está conectado] |
| Cargas grandes | [molino, compresores, hornos] | [kW y tensión de cada una], [arranque directo, suave o con variador], [régimen de trabajo] |

## Activos críticos y por qué

Cinco como mucho. Si todo es crítico, nada lo es y la IA priorizará al azar.

| TAG | Qué se detiene si falla | Respaldo real | Por qué está en esta lista |
| --- | --- | --- | --- |
| [TRF-01] | [toda la planta] | [ninguno; el gemelo ya va al % de carga] | [entrega en n.º de semanas y no hay unidad de alquiler en el país] |
| [CCM-2] | [línea 2 de envasado] | [ninguno] | [USD/h de parada y no hay repuesto de la celda] |
| [UPS-1] | [control y paro seguro del proceso] | [banco de baterías del año aaaa] | [sin él, el paro de emergencia deja de ser seguro] |

## Normas y reglamento que me obligan

Escribe la edición, no solo el número. Una norma sin edición produce respuestas de cualquier año.

| Norma o reglamento | Edición que me aplica | Para qué la uso |
| --- | --- | --- |
| [NFPA 70E] | [edición vigente en mi empresa: aaaa] | [seguridad eléctrica del trabajador, permisos, EPP y fronteras] |
| [NEC / NFPA 70 o IEC 60364] | [aaaa] | [criterios de instalación y protecciones] |
| [norma local: NOM-001-SEDE, RETIE, CNEE, AEA/IRAM] | [aaaa] | [lo que me exige el regulador y la inspección] |
| [reglamento interno de seguridad] | [rev. y fecha] | [permisos, bloqueo y quién autoriza] |

Sustituye la norma por la que te aplique: NFPA 70E y NEC (NFPA 70) en buena parte de América, IEC 60364 en el ámbito internacional, y la local que te obligue: NOM-001-SEDE (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina).

Ninguna cifra normativa se toma de la IA. Fronteras de aproximación, categorías de EPP, energía incidente, límites de distorsión armónica, valores de aislamiento, pares de apriete y tiempos de ensayo salen de la norma vigente, del estudio de arco de tu instalación o del manual del fabricante. Si la IA los suelta sin fuente, están inventados.

## Procedimientos internos que se respetan

Di dónde está cada papel. Un procedimiento que nadie encuentra no se cumple.

| Procedimiento | Quién autoriza | Dónde está el formato |
| --- | --- | --- |
| [Permiso de trabajo eléctrico] | [cargo, distinto de quien ejecuta] | [carpeta, intranet o libro de permisos] |
| [Bloqueo y etiquetado (LOTO)] | [responsable del bloqueo] | [ruta] |
| [Trabajo con tensión, la excepción] | [cargo que firma la justificación escrita] | [ruta] |
| [Entrada a subestación y a espacios confinados] | [cargo] | [ruta] |
| [Alta y cierre de orden de trabajo] | [planificador] | [CMMS: nombre del sistema] |

## Datos que tengo y en qué formato

Nombra las columnas tal como se llaman en tu sistema. La IA no adivina si tu campo de falla se llama `causa`, `motivo` o `obs`.

| Fuente | Formato | Campos que trae | Desde cuándo | Quién lo mantiene |
| --- | --- | --- | --- | --- |
| [Historial de OT del CMMS: nombre del sistema] | [CSV exportado] | [`ot`, `tag`, `fecha_apertura`, `fecha_cierre`, `tipo`, `parte_fallada`, `problema`, `causa`, `horas_hombre`, `costo`] | [aaaa] | [planificador] |
| [Mediciones de calidad de energía] | [informe PDF y CSV del analizador] | [`fecha`, `punto`, `V`, `A`, `THDv`, `THDi`, `fp`, `kW`, `kVAr`] | [aaaa] | [ingeniería] |
| [Facturas de energía] | [PDF mensual] | [kWh, kW de demanda, factor de potencia, penalizaciones] | [aaaa] | [administración] |
| [Informes de termografía] | [PDF con imágenes] | [punto, delta T, criterio, prioridad, fecha] | [aaaa] | [contratista: nombre de la empresa] |
| [Planos] | [DWG y PDF] | [unifilar rev. n.º del dd/mm/aaaa, planos de fuerza y de control] | [aaaa] | [ingeniería] |
| [Ensayos eléctricos] | [protocolos en papel] | [resistencia de aislamiento, relación de transformación, resistencia de contactos, tierras] | [aaaa] | [contratista] |

Si la falla se anota en texto libre, dilo aquí. Contra texto libre no se hace análisis de fallas: para eso hacen falta campos validados que separen la parte que falló, el problema y la causa. Una IA tampoco arregla eso, solo lo ordena.

## Cómo llamamos aquí a las cosas

La mitad de los malentendidos se resuelve con esta tabla. Pon lo que dice la cuadrilla, no lo que dice el manual.

| Como lo decimos aquí | Nombre técnico | Ojo con |
| --- | --- | --- |
| [la casita] | [subestación SE-2] | [en el CMMS aparece como SUB-02] |
| [el tablero viejo] | [TGBT-1, de 1998] | [hay dos tableros viejos; este es el del sótano] |
| [la planta] | [el grupo electrógeno GE-1] | [«la planta» también es la fábrica entera: pregunta cuál] |
| [dar puente] | [puentear un enclavamiento] | [prohibido sin permiso escrito] |

## Restricciones

Lo que no se puede mover. Explica el porqué en media línea: una restricción sin motivo se salta en cuanto estorba.

- **No se para nunca:** [proceso o equipo, y qué se pierde si se para]
- **Ventanas de paro:** [domingo de 06:00 a 14:00] y [paro general en tal mes, n.º de días]
- **Aviso mínimo para un paro:** [n.º de días] y [quién lo firma]
- **Presupuesto:** [USD monto al año]; por encima de [USD monto] hace falta caso de negocio
- **Proveedores:** solo los homologados: [lista corta]. Otro proveedor exige [homologación previa, n.º de semanas]
- **Repuestos:** [lo que hay en bodega y lo que se importa, con el plazo real de entrega]

## Qué espero de ti y en qué formato respondes

Pide el formato exacto o te llega un ensayo cuando querías una tabla.

- **Para qué te uso:** [preparar el plan de mantenimiento, redactar procedimientos, analizar una falla, ordenar datos del CMMS, preparar el informe a dirección]
- **Formato por defecto:** [tabla, o lista de pasos numerados; nunca más de n.º líneas sin que lo pida]
- **Unidades:** [kW, kVA, kVAr, A, kV, °C, mm²]; moneda en [USD o moneda local]; fechas en [dd/mm/aaaa]
- **Marca de dónde sale cada afirmación:** dato de este archivo, norma con edición y apartado, o supuesto tuyo. Los supuestos van señalados uno por uno.
- **Cuando falte un dato que cambie el resultado:** pregúntalo. No lo rellenes con un valor típico ni con un promedio de la industria.

## Límites innegociables

Esta sección no se negocia por prisa, por presión de producción ni porque la respuesta quede más corta.

- **No inventes datos ni normas.** Ni cifras de placa, ni artículos, ni ediciones, ni tablas. Sin fuente comprobable, el hueco se queda vacío y se marca como pendiente.
- **Di cuándo no sabes.** «No tengo ese dato» es una respuesta válida y la prefiero a una plausible. Un texto seguro y falso cuesta un equipo o una persona.
- **No sustituyes a un profesional calificado.** El cálculo de protecciones, el estudio de arco, el ajuste de relés y la firma de un procedimiento los hace una persona calificada, con responsabilidad y con firma.
- **Ninguna maniobra se da por buena sin verificación en campo.** Lo que propongas se contrasta contra el unifilar vigente, la placa del equipo y la medición. El plano de hace tres años miente más de lo que parece.
- **Ninguna respuesta tuya autoriza a trabajar con tensión.** Desenergizar es la regla; trabajar con tensión es la excepción y exige justificación escrita, análisis de riesgo y permiso firmado por alguien distinto de quien ejecuta. Que sea incómodo o que no haya ventana de paro no es inviabilidad.

> [!CAUTION]
> Antes de tocar nada en campo se cumplen las cinco reglas de oro, en este orden: cortar todas las fuentes, incluidas respaldo, control y auxiliares; bloquear y señalizar; verificar ausencia de tensión en el punto que vas a tocar, con instrumento probado antes y después; poner a tierra y en cortocircuito; y delimitar la zona. El EPP, las fronteras de aproximación y la energía incidente salen de la etiqueta del equipo y de la norma vigente, nunca de una conversación con una IA.

## Cómo mantengo este archivo al día

Un contexto sin mantener sigue sonando igual de seguro tres años después, y ya es mentira.

- [ ] Se revisa cada [seis meses, o lo que fije tu procedimiento] aunque no haya cambiado nada, y se actualiza la fecha de arriba
- [ ] Se toca el mismo día que cambia un transformador, un tablero, una carga grande o la topología de la acometida
- [ ] Se toca cuando sale un estudio de arco nuevo, una edición nueva de la norma o una revisión del unifilar
- [ ] Se recorta cuando pasa de las 200 líneas: lo largo se lee peor, lo obedece peor una IA y nadie lo actualiza
- [ ] Se revisa que no haya dos líneas que se contradigan; ante la duda, la IA elige una al azar

| Fecha | Qué cambió | Quién |
| --- | --- | --- |
| [dd/mm/aaaa] | [se cambió TRF-02 y se actualizó el %Z] | [nombre] |
| [dd/mm/aaaa] | [primera versión] | [nombre] |

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [ChatGPT and large language models: what's the risk?](https://www.ncsc.gov.uk/blog-post/chatgpt-and-large-language-models-whats-the-risk) — el NCSC británico: no metas información sensible en una consulta a un modelo público, ni nada que te dolería ver publicado.
- [How Claude remembers your project](https://code.claude.com/docs/en/memory) — por qué el archivo de contexto va corto, concreto y sin reglas que se contradigan, y dónde se guarda.
- [AGENTS.md](https://agents.md/) — el formato abierto de archivo de contexto: va en la raíz del repositorio y gana el más cercano al archivo que se toca.
- [OSHA 1910.333, Selection and use of work practices](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333) — desenergizar antes de trabajar es la regla, con excepciones tasadas, y solo persona calificada trabaja con tensión.
- [Guide to assessing risk: energized electrical work permits](https://www.fluke.com/en-us/learn/blog/safety/energized-electrical-work-permits) — qué lleva un permiso de trabajo con tensión y la diferencia entre inviable e incómodo.
- [Without accurate failure data all you have is a work order ticket system](https://reliabilityweb.com/articles/entry/without-accurate-failure-data-all-you-have-is-a-work-order-ticket-system) — por qué el historial del CMMS solo sirve si separa parte fallada, problema y causa en campos validados.

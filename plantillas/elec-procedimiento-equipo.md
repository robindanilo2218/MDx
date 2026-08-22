---
titulo: Procedimiento de mantenimiento de un equipo eléctrico de [planta o área]
subtitulo: [periodo o equipo]
autor: [nombre y cargo]
fecha: 
---

## Equipo y alcance

Una hoja por familia de equipo. Escribe qué se interviene y hasta dónde llega, para que nadie dé por hecho lo que no está aquí.

| Campo | Dato |
| --- | --- |
| Equipo y familia | [transformador / celda de media tensión / interruptor / motor / variador / banco de capacitores / UPS / tablero] |
| TAG, ubicación y criticidad | [TRF-02, subestación 3, celda 5, criticidad según tu matriz] |
| Placa, fabricante y serie | [tensión, potencia, corriente nominal, capacidad de cortocircuito, marca, modelo, S/N] |
| Manual que manda | [título, edición y sección de mantenimiento; de ahí salen los valores, no de la memoria] |
| Modo, alcance y fuera de alcance | [desenergizado / con by-pass / en marcha, solo predictivo], [qué partes se intervienen] y [lo que no se toca, con el procedimiento al que pertenece] |

## Frecuencia y de dónde sale

La periodicidad se justifica, no se hereda del que estaba antes. Llena las tres entradas y firma el intervalo adoptado.

| Entrada | Qué dice | Intervalo que sugiere |
| --- | --- | --- |
| Recomendación del fabricante | [sección y página del manual] | [cada X meses o Y horas de servicio] |
| Condición del equipo | [carga, ambiente, polvo, humedad, maniobras acumuladas, última termografía] | [intervalo ajustado] |
| Historial del activo | [fallas y hallazgos, y cuántos meses cubre tu registro] | [intervalo ajustado] |

Intervalo adoptado: [cada X meses], decidido por [nombre] el [dd/mm/aaaa], sin pasarse del mínimo que exija la norma de mantenimiento que te aplique. Se revisa cuando cambie la carga, cambie el ambiente o después de una falla.

## Quién lo ejecuta y con qué

Persona calificada no es la que sabe abrir el tablero: es la que conoce este equipo, sus riesgos y este procedimiento, y puede demostrarlo en papel.

- [ ] Persona calificada para la tensión del equipo, acreditación vigente: [nombre y número]
- [ ] Formación en riesgo eléctrico y arco, y en primeros auxilios y RCP: [fecha del último refresco]; entrenada en el bloqueo de esta planta, en este procedimiento y en los ensayos que aquí se piden
- [ ] Charla previa dada y firmada por todos los que entran a la zona

Duración: [h] de trabajo en sitio y [h] de paro, con enfriamiento, descarga y puesta a tierra incluidos. Personal: [1 técnico líder + 1 auxiliar + 1 vigía]. Ventana pedida a operaciones: [turno, día y hora]. Repuestos en sitio antes de empezar: [empaques, silicagel, contactos, fusibles, aceite dieléctrico, terminales, limpiador], código [SKU-00000], cantidad [n]. Herramienta: [aislada para la tensión del punto de trabajo, aspiradora con filtro, puestas a tierra temporales, señalización]. Instrumento con calibración vencida no entra a campo: su medición no sirve ni para aceptar ni para rechazar.

| Instrumento | Serie | Certificado | Vence | Categoría de medición |
| --- | --- | --- | --- | --- |
| [megóhmetro y microhmiómetro] | [S/N] | [N.º] | [dd/mm/aaaa, según el intervalo del fabricante o de tu norma de ensayo] | [la que exija ese punto de medida; mírala en la etiqueta del instrumento] |
| [medidor de relación de transformación, telurómetro, cámara termográfica] |  |  |  |  |
| [inyección secundaria, torquímetro, detector de ausencia de tensión] |  |  |  |  |

## Energías a bloquear, permiso y EPP

Todas las fuentes, no solo la principal. Un equipo con una sola fuente identificada es un equipo mal analizado.

| Energía | Fuente y punto de corte | Cómo se bloquea | Cómo se verifica |
| --- | --- | --- | --- |
| Eléctrica principal | [interruptor o seccionador, TAG] | [candado N.º] | [ausencia de tensión fase a fase y fase a tierra] |
| Respaldo, control y auxiliares | [generador, UPS, segunda acometida, control en continua y en alterna, calefacción de celda] |  |  |
| Energía almacenada | [capacitores, baterías, resortes del mecanismo] | [descargar, poner a tierra, liberar resortes] |  |
| Mecánica y arranque remoto | [accionamiento, aire de maniobra, permisivo del DCS o PLC] | [quién lo confirma] |  |

Permiso [N.º], LOTO [N.º], candados colocados por [nombres]. Desenergizar es la regla. Trabajar con tensión es la excepción: exige justificación escrita de que desenergizar crea un peligro mayor o es inviable, análisis de riesgo de choque y de arco, y permiso firmado por alguien distinto de quien ejecuta. Cinco reglas de oro, en orden y sin saltarse ninguna:

- [ ] 1. Cortar todas las fuentes de tensión, incluidas respaldo, control y auxiliares.
- [ ] 2. Bloquear los dispositivos de corte y señalizar: un candado por cada persona que entra.
- [ ] 3. Verificar ausencia de tensión en el punto de trabajo, fase a fase y fase a tierra.
- [ ] 4. Poner a tierra y en cortocircuito donde el procedimiento lo exija.
- [ ] 5. Señalizar y delimitar la zona y separar las partes con tensión que queden cerca.

> [!CAUTION]
> Prueba el instrumento en una fuente con tensión conocida, mide el punto de trabajo y vuelve a probar el instrumento: uno averiado marca cero en un circuito vivo. Capacitores, cables largos y baterías siguen cargados después del corte, y el mecanismo del interruptor guarda energía en sus resortes: descarga, pon a tierra y libera los resortes antes de meter la mano.

| EPP | Qué se usa aquí |
| --- | --- |
| Energía incidente y fronteras de aproximación | [las de la etiqueta de arco del equipo o del estudio vigente; si el equipo no tiene etiqueta, no se abre] |
| Categoría de EPP | [según la tabla correspondiente de la NFPA 70E vigente, para esta tarea y este equipo] |
| Guantes dieléctricos y resto | [clase según la tensión, con ensayo vigente del [dd/mm/aaaa]; ropa con protección de arco, careta o capucha, casco y calzado dieléctricos de la clase que exija tu norma] |

Sustituye la norma por la que te aplique: NFPA 70E y NEC (NFPA 70) en buena parte de América, IEC 60364 en el ámbito internacional, y la local que te obligue: NOM-001-SEDE y NOM-029-STPS (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina).

## Pasos: preparación e inspección visual

Del 1 al 6. La inspección va antes de limpiar: la suciedad y las marcas cuentan lo que pasó en estos meses.

1. Confirmar ventana y modo de paro con operaciones, avisar a los turnos y reunir manual, planos, hoja de ajustes vigente y el registro de la última intervención.
2. Charla de seguridad: riesgos, secuencia, EPP, ruta de escape y quién hace de vigía.
3. Aplicar el bloqueo de la tabla anterior, verificar ausencia de tensión, poner a tierra y en cortocircuito, descargar capacitores y liberar la energía almacenada.
4. Fotografiar el estado de llegada, con el equipo todavía sucio.
5. Buscar rastros de calentamiento y de arco: decoloración, plástico deformado, olor a quemado, barniz agrietado, carbón, erosión en contactos, polvo blanco en aisladores.
6. Revisar fugas, nivel y color del aceite, silicagel, empaques, ventilación, filtros, enclavamientos y entradas de agua o de plagas. Hallazgo relevante: [descríbelo y fotografíalo antes de tocarlo].

## Pasos: limpieza y apriete

Del 7 al 10. Se limpia con el método que admita el material y se aprieta con torquímetro, nunca a mano firme.

7. Aspirar el polvo con filtro adecuado. No soplar aire comprimido de planta sobre los aislamientos.
8. Limpiar aisladores y barras con [el producto que autorice el fabricante], secar por completo, y lubricar el mecanismo con [el lubricante del manual] sin mezclar grasas de distinto tipo.
9. Verificar el apriete de bornes, barras, zapatas y conexiones de tierra: par [el que indique el manual para ese borne y esa sección], ni más ni menos, porque apretar de sobra deforma la conexión y crea el punto caliente que quieres evitar. Marcar cada conexión con testigo de par.
10. Registrar toda conexión que apareció floja: [ubicación]. Es dato de causa raíz, no un detalle.

## Pasos: pruebas y criterios de aceptación

Del 11 en adelante, solo las que correspondan al equipo. Ningún criterio se escribe de memoria: se consulta en el manual del fabricante y en la norma de ensayo, y ahí se anota de dónde salió.

| # | Prueba | Qué delata | Dónde está el criterio |
| :---: | --- | --- | --- |
| 11 | Resistencia de aislamiento e índice de polarización | Humedad, suciedad y envejecimiento del aislamiento | [tensión de ensayo y valor mínimo según la IEEE 43 vigente y el manual del fabricante] |
| 12 | Resistencia de contactos y conexiones | Contacto erosionado, conexión floja, superficie oxidada | [valor del fabricante para ese polo; compara además las tres fases entre sí] |
| 13 | Relación de transformación | Espiras en corto, conmutador mal posicionado, error de conexión | [desviación admisible según la norma de ensayo de transformadores que apliques] |
| 14 | Rigidez dieléctrica del aceite | Agua, fibras y partículas en el fluido | [método y valor mínimo de la norma que use tu laboratorio para esa clase de tensión] |
| 15 | Resistencia de puesta a tierra | Malla degradada, conexión abierta, terreno seco | [método de caída de potencial de la IEEE 81 y el valor que exijan tu norma local y el diseño de la malla] |
| 16 | Termografía de comprobación | Puntos calientes que quedaron después del apriete | [diferencia contra la fase de referencia, según tu procedimiento termográfico, con carga estable] |
| 17 | Prueba funcional de protecciones | Ajuste corrido, relé sin disparo, cableado de disparo abierto | [hoja de ajustes del estudio de coordinación vigente; anota los valores dejados] |

Índice de polarización = resistencia de aislamiento a los 10 minutos ÷ resistencia al minuto. Relación de absorción dieléctrica = resistencia a los 60 segundos ÷ resistencia a los 30 segundos. Corrige a la temperatura de referencia que fije la norma de ensayo antes de comparar con nada.

## Registro de mediciones

Valores crudos con su unidad, el valor anterior del mismo punto y el criterio con su fuente. Aquí no van conclusiones.

| Punto de medición | Magnitud | Unidad | Valor medido | Valor anterior [dd/mm/aaaa] | Criterio y fuente | Cumple |
| --- | --- | :---: | ---: | ---: | --- | :---: |
| [aislamiento devanado a tierra] | Resistencia | MΩ |  |  | [norma y sección] |  |
| [índice de polarización] | Relación | — |  |  | [norma y sección] |  |
| [contactos polo por polo] | Resistencia | µΩ |  |  | [manual, página] |  |
| [rigidez del aceite] | Tensión de ruptura | kV |  |  | [norma del método] |  |
| [puesta a tierra del equipo] | Resistencia | Ω |  |  | [norma local] |  |

El valor de tabla dice si el equipo pasa hoy; la serie del mismo equipo dice hacia dónde va: un aislamiento que cae a la mitad entre dos mantenimientos sigue estando aprobado y ya te está avisando de humedad o contaminación.
Para que la comparación signifique algo, mide siempre igual y anótalo: mismo punto, mismo instrumento [serie], misma tensión y duración de ensayo, y corrección a la misma temperatura de referencia [ambiente °C, devanado °C, humedad %].

## Si un valor sale fuera de rango

El equipo no se energiza para salir del paso. Sigue la ruta y deja constancia de quién decidió.

- [ ] Medición repetida con instrumento verificado y conexiones limpias.
- [ ] Comparada con el histórico del mismo punto y con los equipos gemelos de la planta.
- [ ] Criterio consultado en el manual del fabricante y en la norma de ensayo.
- [ ] Si compromete seguridad o aislamiento: no se energiza, etiqueta de fuera de servicio y aviso a producción.
- [ ] Si no la compromete: energiza con restricción escrita de carga o de maniobra y fecha de revisión.
- [ ] Decisión, responsable y fecha: [quién, qué y cuándo]. OT correctiva [N.º] con la prioridad de tu escala.

## Residuos, entrega y firmas

Lo que sale del equipo tiene destino y papel: el aceite y las baterías no van al tambo común. El equipo vuelve a producción cuando operaciones firma que lo recibe funcionando, y hasta entonces el procedimiento sigue abierto.

| Residuo | Cantidad | Manejo | Destino y comprobante |
| --- | ---: | --- | --- |
| [aceite dieléctrico usado] | [L] | [envase cerrado y etiquetado; verifica si el equipo puede contener PCB según su año] | [gestor autorizado, N.º de manifiesto] |
| [trapos, absorbentes, silicagel saturado y baterías] | [kg o unidades] | [contenedor de residuo peligroso; baterías sin volcar y con terminales aisladas] | [gestor o devolución al proveedor] |
| [gas SF6 del equipo de maniobra] | [kg] | [recuperar con equipo de reciclado, nunca liberar a la atmósfera] | [registro de recuperación] |

- [ ] Herramientas contadas, sobrantes y puestas a tierra temporales retiradas; tapas, resguardos, enclavamientos y señalización repuestos.
- [ ] Bloqueos retirados uno a uno, cada candado por la persona que lo colocó.
- [ ] Energización con operaciones presente y personal fuera de la zona de riesgo.
- [ ] Prueba funcional en vacío y con carga, y termografía de comprobación con carga estable.
- [ ] Registro en el CMMS con mediciones, fotos y pendientes; planos, hoja de ajustes y etiquetas actualizados si algo cambió.

| Papel | Nombre | Firma | Fecha y hora |
| --- | --- | --- | --- |
| Ejecutó | [técnico líder] |  |  |
| Supervisó | [supervisor de mantenimiento] |  |  |
| Verificó seguridad | [jefe de trabajo o responsable de SST] |  |  |
| Recibió | [operaciones] |  |  |

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [OSHA 1910.147 — Control of hazardous energy (lockout/tagout)](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147) — procedimiento escrito, verificación del aislamiento, energía almacenada y retiro del candado por quien lo puso.
- [ANSI/NETA MTS, Maintenance Testing Specifications](https://www.netaworld.org/standards/ansi-neta-mts) — ensayos de campo para decidir si el equipo sigue apto, dentro de las normas y de las tolerancias del fabricante.
- [IEEE C57.152, Diagnostic Field Testing of Fluid-Filled Power Transformers](https://standards.ieee.org/ieee/C57.152/5242/) — ensayos de campo en transformadores; los criterios del fabricante pueden tener precedencia sobre los de la guía.
- [IEEE 81, Measuring Earth Resistivity, Ground Impedance and Earth Surface Potentials](https://standards.ieee.org/ieee/81/11218/) — métodos de medición de la puesta a tierra y qué distorsiona el resultado.
- [ASTM D1816, Dielectric Breakdown Voltage of Insulating Liquids](https://store.astm.org/d1816-12r19.html) — la rigidez del aceite como medida de agua, fibras y partículas en el fluido.
- [Guide to insulation resistance testing (Fluke)](https://www.fluke.com/en-us/learn/blog/insulation-testers/use-insulation-resistance-testing-data-to-avert-unexpected-downtime) — definición de índice de polarización y de DAR, y por qué el histórico del propio equipo anticipa la degradación.

---
titulo: Informe de inspección termográfica de [planta o área]
subtitulo: [periodo, equipo o alcance]
autor: [nombre y cargo]
fecha: 
---

## Resumen

Tres frases: qué se recorrió, qué se encontró y qué hay que decidir. Quien solo lea esto tiene que poder autorizar el paro.

1. [Qué ruta y qué fecha: tableros, celdas, motores y empalmes que entraron, y con qué carga.]
2. [El hallazgo que manda: dónde está, cuánto delta tiene y qué activo deja fuera si revienta.]
3. [Qué hay que decidir: ventana de paro, repuesto o seguimiento, y qué pasa si no se decide.]

## Datos de la inspección

Sin estos campos el informe no es repetible y la próxima ruta no se puede comparar con esta.

| Campo | Dato |
| --- | --- |
| Fecha y hora | [dd/mm/aaaa, hh:mm de inicio y de fin] |
| Planta, área y ruta | [sitio y nombre de la ruta termográfica] |
| Cámara y número de serie | [marca, modelo, S/N] |
| Resolución del detector y sensibilidad | [píxeles del detector y NETD que declare el fabricante] |
| Calibración del instrumento | [n.º de certificado y fecha de vencimiento, según el intervalo del fabricante] |
| Emisividad asumida | [valor usado y sobre qué superficie: barra pintada, cobre desnudo, plástico del borne; si es brillante, cómo lo resolviste: cinta o pintura de alta emisividad, otro ángulo, o medir un componente contiguo] |
| Temperatura reflejada asumida | [valor en °C y cómo se determinó] |
| Distancia y ángulo de disparo | [m y grados respecto a la perpendicular; los ángulos muy oblicuos falsean la lectura] |
| Ventana de infrarrojo o tapa abierta | [con ventana IR y su transmitancia, o tapa retirada por personal calificado] |
| Carga de la instalación durante la medición | [A por fase y % de la corriente nominal del equipo; de dónde salió la lectura] |
| Condiciones ambientales | [temperatura, humedad, viento, sol directo sobre el equipo, si es intemperie] |
| Inspector y certificación | [nombre, nivel de termografía y n.º de certificado, y su fecha de vigencia] |
| Acompañante calificado | [quién abrió las tapas y midió la carga: es personal eléctrico, no el termógrafo] |
| Inspección anterior | [fecha del informe con el que se compara este, y cada cuánto toca esta ruta según tu programa] |

Sustituye la norma por la que te aplique: NFPA 70E y NEC (NFPA 70) en buena parte de América, IEC 60364 en el ámbito internacional, y la local que te obligue: NOM-001-SEDE y NOM-029-STPS (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina). El criterio de mantenimiento y de severidad sale de la ANSI/NETA MTS vigente o de la NFPA 70B, según cuál hayas adoptado por escrito.

## Por qué la carga y la comparación entre fases mandan

Dos ideas que deciden si este informe sirve o si es papel. Van arriba a propósito.

- **Carga.** La potencia disipada en una conexión resistiva = resistencia × corriente al cuadrado: a un tercio de la corriente el delta cae a una novena parte, así que un defecto que a plena carga sería grave se pierde en el fondo térmico. Una ruta hecha con la planta en vacío devuelve "sin hallazgos", y esa hoja limpia es el peor resultado posible porque deja a todos tranquilos.
- **Entre fases antes que contra un valor absoluto.** Las tres fases del mismo tablero comparten ambiente, emisividad, distancia y ángulo, así que la diferencia entre ellas es señal y no error de medición. El valor absoluto arrastra la emisividad que asumiste y el sol que pegó en la puerta: sobre cobre o aluminio pulidos, que quedan por debajo de 0,10 de emisividad, no te dice nada, y por debajo de 0,5 a 0,6 —según la guía que sigas— calcular una temperatura absoluta deja de tener sentido. Úsalo solo cuando las tres fases están calientes por igual (sobrecarga o desbalance aguas arriba) o cuando el componente tiene un límite del fabricante.

> [!WARNING]
> Si la carga en el momento de la medición no llega al mínimo que fijaste en tu procedimiento, la ruta no se cierra: se reprograma. Anotar "sin hallazgos" a baja carga es firmar un falso negativo, y el siguiente que lea ese informe va a creerle.

## Seguridad de la inspección

Medir es no invasivo; abrir la tapa para medir, no. Esto se acuerda antes de subir a la subestación.

- [ ] Ruta coordinada con operaciones: se necesita el equipo energizado y con carga representativa.
- [ ] Tapas y cubiertas las abre y las cierra personal eléctrico calificado, no el termógrafo.
- [ ] EPP de arco y fronteras de aproximación [según la etiqueta de arco del equipo y las tablas de la NFPA 70E vigente; no lo estimes de memoria].
- [ ] Nadie toca el equipo inspeccionado ni apoya la cámara en él; se mantiene la distancia segura.
- [ ] Donde haya ventana de infrarrojo instalada, se usa: evita abrir la cubierta, pero no borra la frontera de arco ni el EPP que exige la etiqueta.

> [!CAUTION]
> Retirar una cubierta de un equipo energizado expone a choque y a arco: es trabajo con tensión y exige justificación escrita, análisis de riesgo, permiso autorizado y personal calificado, igual que cualquier otra tarea energizada. La cámara no cambia eso.

La corrección del hallazgo es otra cosa: se hace con el equipo desenergizado, con las cinco reglas de oro y sin atajos.

- [ ] 1. Cortar todas las fuentes de tensión, incluidas las de respaldo y las de control.
- [ ] 2. Bloquear los dispositivos de corte y señalizar: un candado por cada persona que entra.
- [ ] 3. Verificar ausencia de tensión en el punto de trabajo, fase a fase y fase a tierra, con instrumento probado antes y después en una fuente conocida.
- [ ] 4. Poner a tierra y en cortocircuito donde el procedimiento lo exija.
- [ ] 5. Señalizar y delimitar la zona, y separar las partes con tensión que queden cerca.

> [!WARNING]
> Un borne caliente no se aprieta con tensión. El punto ya está degradado, el par de apriete lo mueve y ahí es donde nace el arco. Se programa el paro, se limpia, se revisa el conductor y se aprieta al par que indique el fabricante para ese borne.

## Alcance recorrido

Todo lo que estaba en la ruta, se haya visto o no. Lo que no se pudo inspeccionar se anota con su motivo: es un pendiente, no un hueco.

| TAG y equipo | Tipo | Ubicación | Carga en el momento | Visto | Hallazgos o motivo |
| --- | --- | --- | ---: | :---: | --- |
| [TAB-CCM-04] | [tablero de fuerza] | [sala eléctrica 2] | [A y % de In] | [sí] | [2 hallazgos] |
| [CEL-13,8-07] | [celda de media tensión] | [subestación principal] | [A y % de In] | [no] | [sin carga en la ventana; se ve el dd/mm] |
| [MTR-2103] | [motor de la bomba] | [área de proceso] | [A y % de In] | [sí] | [sin hallazgos] |
| [EMP-LT-02] | [empalme de acometida] | [patio de maniobras] | [A y % de In] | [sí] | [1 hallazgo] |

## Ficha por hallazgo

Copia esta ficha una vez por hallazgo y numérala. Sin las dos imágenes y sin la carga medida, el hallazgo no se puede clasificar ni discutir después.

| Campo | Dato |
| --- | --- |
| Hallazgo n.º y TAG | [HAL-01 — TAB-CCM-04] |
| Ubicación exacta | [celda 7, borne superior del contactor, fase L2] |
| Punto caliente | [qué componente es: borne, empalme, cuchilla, fusible, barra, carcasa] |
| Temperatura del punto | [°C] |
| Referencia usada y su temperatura | [fase L1 del mismo borne, misma carga / componente similar / ambiente] — [°C] |
| Delta de temperatura | [°C, restando las dos anteriores] |
| Carga en el momento | [A medidos y % de la corriente nominal del componente] |
| Temperatura ambiente | [°C] |
| Emisividad, temperatura reflejada y distancia | [si difieren de la ficha general, anótalas aquí] |
| Causa probable | [apriete flojo, corrosión u oxidación del contacto, desbalance de fases, sobrecarga, conductor subdimensionado, contacto desgastado, armónicos] |
| Severidad | [clase de la tabla de abajo] |
| Acción recomendada | [qué hacer: reapretar al par del fabricante, limpiar y reponer contacto, redimensionar conductor, repartir carga] |
| Plazo y orden de trabajo | [dd/mm/aaaa — OT-2026-0000] |

Pega las dos imágenes del hallazgo, en este orden: `![Térmica HAL-01](imagenes/hal-01-ir.jpg)` y `![Visible HAL-01](imagenes/hal-01-vis.jpg)`. La térmica sin la visible no prueba nada: la visible es la que identifica el borne exacto que hay que abrir.

## Severidad y plazo de acción

Adopta un criterio, escríbelo aquí una sola vez y no lo cambies de una ruta a otra. Los deltas salen de la edición vigente de la fuente que adoptaste, no de la memoria ni de una tabla copiada en una nota de aplicación: las que circulan por internet suelen venir de ediciones ya sustituidas.

Criterio adoptado: [ANSI/NETA MTS vigente, tabla de acciones sugeridas por aumento de temperatura / NFPA 70B / criterio del fabricante del equipo], edición [año].

| Clase | Delta entre componentes similares con carga similar | Delta sobre la temperatura ambiente | Plazo | Qué se hace |
| :---: | --- | --- | --- | --- |
| [1] | [delta del criterio adoptado] | [delta del criterio adoptado] | [inmediato] | [parar, corregir y volver a medir antes de reponer servicio] |
| [2] | [delta del criterio adoptado] | [delta del criterio adoptado] | [próxima ventana] | [OT programada con repuesto asegurado] |
| [3] | [delta del criterio adoptado] | [delta del criterio adoptado] | [siguiente preventivo] | [corregir cuando el plan lo permita] |
| [4] | [delta del criterio adoptado] | [delta del criterio adoptado] | [seguimiento] | [volver a medir en la próxima ruta, con carga comparable] |

La clasificación se corrige por carga. Como el calor crece con el cuadrado de la corriente, un delta medido a media carga subestima lo que ese punto hará a plena carga: delta estimado a plena carga = delta medido × (corriente nominal ÷ corriente medida) al cuadrado. Es una estimación, no una norma, y solo sirve para subir de clase un hallazgo, nunca para bajarlo. Escribe siempre el delta medido y la carga real al lado del estimado.

## Resumen de hallazgos por severidad

El número que ve dirección. Los abiertos del periodo anterior no se borran: se arrastran hasta que alguien los corrija.

| Clase | Nuevos este periodo | Arrastrados sin corregir | Total abiertos | Abierto más antiguo |
| :---: | ---: | ---: | ---: | --- |
| [1] |  |  |  | [dd/mm/aaaa] |
| [2] |  |  |  | [dd/mm/aaaa] |
| [3] |  |  |  | [dd/mm/aaaa] |
| [4] |  |  |  | [dd/mm/aaaa] |

## Comparación con la inspección anterior

Un punto que sube de delta entre dos rutas está avanzando hacia la falla, aunque hoy siga en clase baja. Solo compara mediciones con carga parecida.

| TAG y punto | Delta anterior | Carga anterior | Delta actual | Carga actual | Tendencia | Qué pasó entre ambas |
| --- | ---: | ---: | ---: | ---: | :---: | --- |
| [TAB-CCM-04 celda 7 L2] |  |  |  |  | [sube / baja / plano] | [se reapretó en la OT-0000 / no se tocó] |

## Recomendaciones y seguimiento

Una fila por hallazgo, con número de OT desde hoy. Un hallazgo sin OT desaparece en cuanto se cierre este informe.

| Hallazgo | Acción comprometida | OT | Responsable | Fecha | Corregido | Termografía de comprobación |
| --- | --- | --- | --- | --- | :---: | --- |
| [HAL-01] | [limpiar contacto y apretar al par del fabricante] | [OT-2026-0000] | [nombre] | [dd/mm] | [sí / no] | [dd/mm — delta medido y carga] |

La termografía de comprobación se hace después de corregir, con el equipo estabilizado térmicamente y con carga parecida a la de la medición original. Si el delta no bajó, la causa no era la que supusiste: no cierres la OT, reábrela con lo que ahora sabes.

## Antes de entregar el informe

- [ ] Cada hallazgo lleva imagen térmica, imagen visible, referencia usada, delta y carga medida.
- [ ] Emisividad, temperatura reflejada y distancia están escritas, no dadas por supuestas.
- [ ] La carga durante la ruta llegó al mínimo de tu procedimiento; si no, está dicho en el resumen.
- [ ] Los deltas de la tabla de severidad salen del criterio adoptado y citado, con su edición.
- [ ] Los equipos no inspeccionados están listados con motivo y fecha de reprogramación.
- [ ] Cada hallazgo abierto tiene OT con número, responsable y fecha, y las clases más severas ya están coordinadas con producción.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Reporting requirements for thermography according to NFPA 70B 2023 (Infraspection / IRINFO)](https://irinfo.org/articles/what-are-the-reporting-requirements-for-thermography-according-to-nfpa-70b-2023) — qué debe llevar el informe: certificación del termógrafo, equipo, emisividad y temperatura reflejada, ambiente, carga, imagen térmica y visible, delta contra referencia y acción.
- [ANSI/NETA MTS, Maintenance Testing Specifications](https://www.netaworld.org/standards/ansi-neta-mts) — ficha oficial de la edición 2023, aprobada como norma nacional el 6 de marzo de 2023; la tabla de deltas no está en la web, hay que sacarla del documento.
- [Electrical inspections using thermal imaging (Fluke, PDF)](https://media.fluke.com/e5fe5900-3285-4e45-8896-b10600678538_original%20file.pdf) — Jim White, Shermco: el calentamiento va con el cuadrado de la corriente y se compara entre fases o componentes similares bajo carga similar. Reproduce la tabla de la MTS-2007, ya sustituida: úsala por el método, nunca por los valores.
- [How does emissivity affect thermal imaging (FLIR)](https://www.flir.com/discover/professional-tools/how-does-emissivity-affect-thermal-imaging/) — emisividad de 0 a 1, metales pulidos por debajo de 0,10, y el aviso de que por debajo de 0,5 difícilmente sacas una temperatura fiable.
- [A practical guide to emissivity in infrared inspections (Reliabilityweb)](https://reliabilityweb.com/articles/entry/a-practical-guide-to-emissivity-in-infrared-inspections) — las tres variables (emisividad, fondo reflejado y transmisividad), no calcular por debajo de 0,6, y qué hacer con lo brillante: cinta, pintura, otro ángulo u otro componente.
- [OSHA 1910.333 — Selection and use of work practices](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333) — desenergizar antes de trabajar es la regla, y solo persona calificada trabaja sobre partes no desenergizadas.

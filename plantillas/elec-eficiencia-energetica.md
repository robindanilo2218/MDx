---
titulo: Programa de eficiencia y gestión de la energía de [planta o área]
subtitulo: [periodo, equipo o alcance]
autor: [nombre y cargo]
fecha: 
---

## Alcance y responsables

Dos frases: qué entra en el programa y qué se compromete. Si dirección solo lee esto, tiene que saber cuánto se gasta hoy y cuánto va a bajar.

| Campo | Dato |
| --- | --- |
| Qué cubre | [planta completa / área x / centro de costo y; lo que no vayas a medir, déjalo fuera por escrito] |
| Periodo del programa | [del mm/aaaa al mm/aaaa] |
| Gasto eléctrico del último año | [monto y moneda] sobre [kWh] y una demanda máxima de [kW] |
| Meta | Bajar [%] los kWh por unidad producida contra la línea base de [periodo] |

Reparto de papeles: [nombre] responde del resultado y lleva la línea base y el informe mensual; [nombre] ejecuta las medidas y responde por el estado de los activos; producción entrega producción, turnos y ventanas de paro; compras negocia tarifa y contrato de suministro; finanzas fija el precio del kWh y valida el ahorro; seguridad firma permisos y bloqueo.

## Línea base de consumo

Doce meses seguidos, mes a mes, con lo que explica el consumo en la misma fila: producción, turnos, días laborados y clima. Con menos de un año te faltan la temporada alta y la época de calor. Deja escrito qué variables entran en el modelo y cuáles descartaste: quien revise el ahorro va a preguntar.

| Mes | kWh | Demanda máxima kW | Factor de potencia | Costo | Producción [unidad] | Días y turnos | Temperatura media |
| --- | ---: | ---: | ---: | ---: | ---: | --- | ---: |
| [mm/aaaa] |  |  |  |  |  |  |  |
| [mm/aaaa] |  |  |  |  |  |  |  |

- Intensidad energética = kWh del mes ÷ unidades producidas en el mes, y factor de carga = kWh del mes ÷ (demanda máxima en kW × horas del mes). El primero es el número del programa; el segundo dice si pagas una demanda que usas pocas horas.
- Modelo de línea base = consumo fijo en kWh + [kWh por unidad] × unidades producidas, ajustado con los doce meses. El consumo fijo es lo que gasta la planta sin producir nada, y ahí suele estar el dinero fácil.
- Ahorro verificado del mes = consumo que predice el modelo con la producción real − consumo real ± ajustes no rutinarios.[^1]

> [!WARNING]
> Sin línea base ajustada por producción no puedes demostrar ningún ahorro. Comparar el kWh de este mes contra el del año pasado con producciones distintas no prueba nada: si produjiste menos, el ahorro es de ventas, no tuyo. Fija el modelo, la fórmula y el periodo antes de tocar la primera medida, y que finanzas lo firme.

## La factura, partida por partida

Pide la factura y el pliego tarifario que te aplica y léelos juntos: buena parte del dinero perdido está en la tarifa, no en los equipos. Costo real del kWh = costo total de la factura ÷ kWh facturados, y con ese precio se evalúa cualquier medida.

| Partida | Qué te cobran | Qué la mueve | Dónde se pierde el dinero |
| --- | --- | --- | --- |
| Energía y horario | kWh del periodo, y por franja de punta, intermedia o valle si tu tarifa la tiene | Horas de operación, carga y a qué hora produces | Equipos encendidos sin producir, y procesos pesados dentro de la punta por costumbre |
| Demanda | El pico de kW o kVA de la ventana de integración | Un solo pico de [ventana de tu tarifa: 15, 30 o 60 min] | Arranques simultáneos tras un paro, y un pico que se arrastra [lo que dure la memoria de demanda] |
| Reactivos | Energía reactiva o penalización por bajo factor de potencia | Motores en vacío, transformadores, capacitores fuera de servicio | Un banco averiado que nadie mira desde hace meses |
| Fijos e impuestos | Comercialización, medición, alquiler de equipo, tributos locales | El contrato y la base gravable | Puntos de suministro que ya no existen y clasificaciones arrastradas años |

- [ ] La tarifa contratada le conviene a tu perfil de carga, la demanda contratada cuadra con la máxima real de 12 meses, y el multiplicador del medidor y la relación de los transformadores de medida coinciden con lo facturado
- [ ] Factor de potencia mínimo que exige tu tarifa y fórmula de la penalización: [cópialos del pliego, no los supongas]. Penalización sumada del último año: [monto]

## Medición y submedición

Se gestiona lo que se mide; lo demás se estima, y lo estimado no se defiende delante de finanzas. Empieza por la acometida y por los tres usos más grandes.

| # | Punto de medición | Qué pregunta responde | Estado | Prioridad |
| :---: | --- | --- | --- | :---: |
| 1 | Acometida | Cuadrar con la factura y ajustar el modelo de línea base | [instalado / falta] | Alta |
| 2 | [tablero de aire comprimido] | Cuánto cuesta el aire y cuánto se fuga | [instalado / falta] | [ ] |
| 3 | [refrigeración, hornos o iluminación de nave] | Qué sigue encendido fuera de turno | [instalado / falta] | [ ] |
| 4 | [CCM de proceso o línea] | El kWh por unidad producida de verdad | [instalado / falta] | [ ] |

Registra intervalos, no solo el acumulado: el perfil horario es lo que descubre lo que queda encendido de noche. Cuadra cada mes la suma de los submedidores contra la acometida y, si la diferencia crece, búscala. Un medidor sin alguien que lea el dato cada mes es un gasto, no una inversión: asígnale nombre antes de comprarlo.

## Usos significativos de la energía

Reparte el consumo entre los usos grandes hasta cubrir [el porcentaje de la factura que fijes como corte; 80 % es lo habitual]. Lo que sobre, agrúpalo en "otros" y no lo persigas.

| Uso | Equipos | kW instalados | Horas/mes | Carga media | kWh/mes | % del total | Cómo se estimó |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| Motores de proceso | [líneas y CCM] |  |  |  |  |  | [submedidor / pinza en operación] |
| Aire comprimido | [compresores y secadores] |  |  |  |  |  | [horas de carga del controlador] |
| Refrigeración | [chillers, cámaras, torres] |  |  |  |  |  | [placa y horas medidas] |
| Bombeo | [bombas de proceso y de servicios] |  |  |  |  |  | [pinza y curva de la bomba] |
| Hornos y resistencias | [equipos] |  |  |  |  |  | [registro del control] |
| Iluminación y servicios | [naves, patios, oficinas] |  |  |  |  |  | [inventario por zona y horas] |

kWh del mes de un motor ≈ (kW de placa ÷ rendimiento) × carga media medida × horas de operación al mes; la carga media sale de medir corriente en operación normal, nunca de suponer que el motor trabaja a placa. Los sistemas de motores se llevan alrededor del 72 % de la electricidad que consume la industria en el mundo: si tu reparto dice otra cosa, revisa la estimación antes de creerle. Marca cuáles son usos significativos, porque ahí vive el programa y no en la máquina que más ruido hace.

## Oportunidades

Una fila por medida, con el número que va a mirar finanzas. Periodo de recuperación en meses = inversión ÷ ahorro mensual neto. Las de inversión cero se hacen esta semana, sin esperar presupuesto.

| # | Medida | Ahorro | Inversión | Recuperación | Riesgo | Prioridad |
| :---: | --- | ---: | ---: | ---: | --- | :---: |
| 1 | Apagar lo que no produce: compresores, extractores, hornos en vacío, líneas y alumbrado fuera de turno | [kWh/mes] | 0 | — | Que alguien lo vuelva a encender | [ ] |
| 2 | Ajustes sin costo: presión del aire a la que pide la máquina más exigente, consignas de frío, limpieza de condensadores e intercambiadores | [kWh/mes] | 0 | — | Una máquina que sí necesitaba más | [ ] |
| 3 | Arranque escalonado tras un paro y traslado de cargas pesadas fuera de la franja de punta | [monto/mes] | 0 | — | Choque con el plan de producción | [ ] |
| 4 | Campaña de fugas de aire comprimido: detectar, etiquetar, reparar y volver a medir | [kWh/mes] | [monto] | [meses] | Vuelven en un año si no queda como rutina | [ ] |
| 5 | Corregir el factor de potencia: reparar el banco existente y, si hace falta, banco automático con reactancia de desintonía | [monto/año] | [monto] | [meses] | Resonancia si no se mide antes | [ ] |
| 6 | Control de demanda máxima con deslastre programado de cargas no críticas | [monto/año] | [monto] | [meses] | Deslastrar algo que sí era crítico | [ ] |
| 7 | Variadores en bombas y ventiladores con carga variable hoy estrangulada | [monto/año] | [monto] | [meses] | Armónicos y calentamiento del motor | [ ] |
| 8 | Motores de alta eficiencia al reemplazar, y sustituir los que trabajan muy por debajo de su placa | [monto/año] | [monto] | [meses] | Cambio de velocidad y de par | [ ] |
| 9 | Transmisiones: bandas gastadas, poleas desalineadas o acoplamiento directo donde quepa | [monto/año] | [monto] | [meses] | Parar la línea para el cambio | [ ] |
| 10 | Iluminación LED con mando por zona y sensores, y recuperación del calor del compresor | [monto/año] | [monto] | [meses] | Iluminación por debajo del nivel exigido | [ ] |

Las fugas desperdician entre el 20 % y el 30 % de la salida del compresor en instalaciones industriales típicas, y una meta razonable de fuga está entre el 5 % y el 10 % del flujo total del sistema: costo anual de las fugas = número de fugas × caudal de cada una en cfm × kW por cfm de tu compresor × horas de operación al año × precio del kWh, y se reparan primero las grandes. En motores, la clase de eficiencia se lee de la placa: IEC 60034-30-1 clasifica los motores de operación directa a la red en IE1 estándar, IE2 alta, IE3 premium e IE4 super premium, y la edición de 2025 sustituye a la de 2014 y añade la clase IE5. La norma clasifica, no obliga: la clase mínima la fija tu legislación, así que comprueba [la edición y la clase mínima que exija la norma de tu país]. Un variador solo ahorra donde la carga es variable: en una bomba estrangulada o un ventilador con compuerta, mucho; en una banda a carga constante, casi nada.

> [!CAUTION]
> No compres un banco de capacitores sin medir antes la distorsión armónica y sin revisar la resonancia con el transformador y con los variadores. Un banco desnudo sobre una red con armónicos amplifica corrientes, quema fusibles y capacitores, y cuesta más que la penalización que ibas a evitar. Compara contra los límites de la edición vigente de IEEE 519 y dimensiona con el factor de desplazamiento.

## Seguridad al medir y al intervenir

Instalar un medidor, revisar un banco de capacitores o cambiar un motor es trabajo eléctrico, y lo ejecuta persona calificada. Desenergizar es la regla; trabajar con tensión es la excepción y exige justificación escrita, análisis de riesgo y permiso firmado antes de empezar.

- [ ] 1. Cortar todas las fuentes de tensión, incluidas las de control y las de respaldo.
- [ ] 2. Bloquear los dispositivos de corte y señalizar: un candado y una tarjeta por cada persona que entra.
- [ ] 3. Verificar ausencia de tensión, fase a fase y fase a tierra, en el punto exacto que vas a tocar y con el método probado-comprobado-probado. Lo hace quien va a meter las manos, no un tercero por radio.
- [ ] 4. Poner a tierra y en cortocircuito donde la tensión o el riesgo de realimentación lo exijan; en media y alta tensión no se discute.
- [ ] 5. Señalizar y delimitar la zona antes de abrir el tablero.
- [ ] EPP y distancias según [la tabla correspondiente de la NFPA 70E vigente o de la norma local que te obligue]: no escribas de memoria fronteras de aproximación, categorías ni energía incidente.

Sustituye la norma por la que te aplique: NFPA 70E y NEC (NFPA 70) en buena parte de América, IEC 60364 en el ámbito internacional, y la local que te obligue: NOM-001-SEDE (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina).

> [!WARNING]
> Un banco de capacitores guarda energía después de abrir el interruptor. Respeta el tiempo de descarga que indique el fabricante, verifica ausencia de tensión en bornes y pon a tierra antes de tocar nada. Lo mismo con el bus de corriente continua de un variador. Ahorrar energía nunca justifica saltarse un paso.

## Plan de acción

Lo que no tiene nombre y fecha no ocurre. Una fila por medida aprobada, con el método de verificación pactado antes de ejecutarla.

| # | Medida | Responsable | Inicio | Fin | Inversión | Cómo se verifica el ahorro |
| :---: | --- | --- | --- | --- | ---: | --- |
| 1 |  |  |  |  |  | [submedidor / factura / modelo de línea base] |
| 2 |  |  |  |  |  |  |

Las medidas que tocan tableros llevan orden de trabajo, permiso y bloqueo. Los cambios de consigna quedan escritos: quién los movió, a qué valor y con qué autorización. Las ventanas de paro se pactan con producción antes de comprar nada: [fechas].

## Seguimiento mensual e indicadores

Un informe de una página, el mismo día de cada mes, con los mismos indicadores. Cambiarlos a mitad de año es empezar de cero.

| Indicador | Fórmula | Línea base | Meta | Quién lo reporta |
| --- | --- | ---: | ---: | --- |
| kWh por unidad producida | kWh del mes ÷ unidades del mes |  |  | [nombre] |
| Costo por unidad producida | costo de la factura ÷ unidades del mes |  |  | [nombre] |
| Factor de potencia | del recibo o del medidor de acometida |  |  | [nombre] |
| Demanda máxima | kW o kVA facturados en el mes |  |  | [nombre] |
| Factor de carga | kWh ÷ (demanda máxima × horas del mes) |  |  | [nombre] |
| Ahorro verificado acumulado | suma mensual del ahorro contra el modelo |  |  | [nombre] |

- [ ] Cerrar el mes con las cuatro fuentes: factura, producción, submedidores y bitácora de lo que cambió
- [ ] Marcar los ajustes no rutinarios (línea nueva, turno suprimido, equipo fuera de servicio, obra) y revisar la línea base una vez al año o cuando la planta cambie de verdad

## El programa como sistema de gestión

No es una campaña de tres meses: el ciclo se repite y cada vuelta deja una línea base nueva y una meta nueva.

La secuencia es siempre la misma: línea base y usos significativos, oportunidades y plan, ejecución con responsables, medición y verificación, informe mensual con decisiones, y ajuste de la línea base y de las metas antes de volver a empezar. Esa es la estructura de ISO 50001 montada sobre un ciclo de planificar, hacer, verificar y actuar, y no hace falta certificarse para usarla: el programa 50001 Ready del Departamento de Energía de Estados Unidos la reparte en tareas y es gratuito. Esa misma fuente reporta que los sitios que sostienen una gestión de la energía consiguen del orden de un 4 % de ahorro anual durante más de una década. La diferencia no la hace el sello, la hace que alguien cierre el mes todos los meses.

## Errores típicos

- Comparar meses sin ajustar por producción. Si el consumo bajó porque bajó la producción, eso no es ahorro tuyo.
- Contar dos veces el mismo ahorro. El variador de una bomba y el motor nuevo de esa misma bomba no suman sus ahorros por separado: la segunda medida se calcula sobre el consumo que dejó la primera.
- Prometer el ahorro del catálogo. El fabricante mide en banco; tu planta tiene fugas, ciclos y días de lluvia.
- Instalar medidores y no leerlos. Un tablero de monitoreo sin dueño se apaga solo en tres meses.
- Poner capacitores para resolver un problema que era de armónicos, o perseguir la iluminación porque se ve mientras el aire comprimido se lleva varias veces más.
- Dejar el ahorro sin firmar por finanzas. El número que nadie valida no existe en el presupuesto del año que viene.

[^1]: Ajustes no rutinarios son los cambios que el modelo no puede predecir: una línea nueva, un turno que desaparece, una ampliación. Se documentan el día que ocurren, con fecha y efecto estimado. Después nadie se acuerda.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [DOE, Energy Management Programs](https://www.energy.gov/cmei/ito/energy-management-programs) — el sistema de gestión de la energía como cultura de mejora continua, 50001 Ready y el orden del 4 % de ahorro anual sostenido.
- [EVO, International Performance Measurement and Verification Protocol (IPMVP)](https://evo-world.org/en/products-services-mainmenu-en/protocols/ipmvp) — el ahorro se determina comparando antes y después con los ajustes que exige el cambio de condiciones.
- [DOE, Compressed Air Tip Sheet #3: Minimize Compressed Air Leaks](https://www.energy.gov/sites/prod/files/2014/05/f16/compressed_air3.pdf) — del 20 % al 30 % de la salida del compresor se fuga, la meta del 5 % al 10 % y la fórmula del costo anual.
- [IEA 4E EMSA, Policy Brief #9: Electric motor systems](https://www.iea-4e.org/emsa/publications/policy-brief-electric-motor-systems-why-are-they-important/) — los sistemas de motores fueron el 53 % del consumo eléctrico mundial en 2023 y el 72 % del industrial.
- [IEC 60034-30-1:2025, Efficiency classes of line operated AC motors (IE code)](https://webstore.iec.ch/en/publication/91195) — alcance de 0,12 kW a 1000 kW y 2, 4, 6 u 8 polos; sustituye a la edición de 2014 e introduce IE5.
- [OSHA 29 CFR 1910.333](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333) — desenergizar antes de trabajar y las dos únicas excepciones admitidas.

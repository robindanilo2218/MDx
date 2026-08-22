---
titulo: Plan de contingencia ante falla eléctrica mayor de [planta o área]
subtitulo: [periodo o equipo]
autor: [nombre y cargo]
fecha: 
---

## Cómo se usa este plan

Está escrito para leerse a oscuras y con prisa: una ficha por escenario y ningún dato que dependa de un servidor que también se cayó.

- Copia impresa y plastificada en [sala de control, portería, subestación y taller eléctrico]. La versión digital es el respaldo, no al revés.
- Quien llegue primero ejecuta las tres primeras acciones de la ficha y avisa. Para lo que ya está escrito no se espera al jefe.
- Desenergizar es la regla. Trabajar con tensión durante una emergencia es la excepción y exige justificación escrita, análisis de riesgo y permiso, también de madrugada.
- Sustituye la norma por la que te aplique: NFPA 70E y NEC (NFPA 70) en buena parte de América, IEC 60364 en el ámbito internacional, y la local que te obligue: NOM-001-SEDE (México), RETIE (Colombia), normas de la CNEE (Guatemala), AEA/IRAM (Argentina).

## Lo primero, en cualquier escenario

Tres pasos antes de tocar nada. Valen para las seis fichas.

1. **Personas.** Cuenta gente, saca a quien sobre y delimita la zona. Si hay un herido, la ficha E6 manda sobre todo lo demás.
2. **Avisa.** Por [canal de radio o teléfono de emergencia]: dónde es, qué se ve y si hay heridos o fuego. Tres datos, no un relato.
3. **No improvises con la energía.** No cierres, no rearmes, no abras tapas. Nadie entra a un equipo sin cortar, bloquear, verificar ausencia de tensión, poner a tierra y en cortocircuito, señalizar y delimitar.

## Roles y teléfonos

Nombres y números, no cargos genéricos. Si el titular no contesta al segundo intento, se llama al suplente y se sigue.

| Función | Quién | Teléfono | Suplente y su teléfono | Dato que hay que dar |
| --- | --- | --- | --- | --- |
| Manda la emergencia | [nombre] | [ ] | [nombre y número] | — |
| Maniobras eléctricas | [jefe de turno eléctrico] | [ ] | [nombre y número] | — |
| Operación y producción | [nombre] | [ ] | [nombre y número] | — |
| Brigada de incendio y primeros auxilios | [nombre] | [ ] | [nombre y número] | — |
| Habla con dirección y con fuera | [nombre] | [ ] | [nombre y número] | — |
| Distribuidora, avería 24 h | [empresa] | [ ] | [segundo número] | [cuenta o NIS, dirección, alimentador, hora] |
| Bomberos | — | [ ] | — | [dirección exacta y acceso de camiones] |
| Ambulancia o servicio médico | [proveedor] | [ ] | [segundo número] | [puerta de acceso y punto de encuentro] |
| Contratista de media tensión | [empresa] | [ ] | [segundo número] | [contrato y tiempo de respuesta pactado] |
| Alquiler de generador o transformador | [empresa] | [ ] | [segundo número] | [kVA, tensión y conexión disponible] |

## E1. Pérdida del suministro de la red

Manda [jefe de turno eléctrico]. Se fue la energía y no la causaste tú: el riesgo está en el regreso, no en el corte.

- **Primeras tres acciones:** 1) confirma que la falla es externa mirando acometida y celda de medición, no solo el tablero; 2) comprueba que la transferencia operó y que el respaldo tomó la carga; 3) llama a la distribuidora y anota número de reporte y hora.
- **Qué se apaga y en qué orden:** primero las cargas no prioritarias — [aire acondicionado de confort, compresores de reserva, alumbrado de patios]; después lo que no tolera un rearranque en frío — [hornos, bombas grandes, variadores]. Deja abiertos los arrancadores que rearrancan solos al volver la tensión.
- **Qué no se hace:** no se cierra el principal "para ver si ya volvió", no se opera a mano la transferencia automática y no se energiza la planta entera de un golpe.

## E2. Falla en la subestación o el transformador principal

Manda [gerente de mantenimiento eléctrico], con [jefe de turno] en sitio. Disparo que no rearma, olor a quemado, ruido anormal o aceite en el piso: aquí se para y se investiga.

- **Primeras tres acciones:** 1) delimita la subestación y saca a todo el mundo; 2) anota qué protección operó, con su bandera, su registro de eventos y la hora; 3) pasa la carga al alimentador de respaldo solo si el unifilar lo permite y hay quien lo autorice.
- **Qué se apaga y en qué orden:** las cargas del lado afectado, de menor a mayor prioridad, antes de abrir el interruptor principal; después el enlace o la transferencia quedan en manual y bloqueados.
- **Qué no se hace:** no se rearma un interruptor que disparó por falla sin saber por qué; no se entra a la celda sin las cinco reglas de oro completas; no se pisa ni se recoge aceite derramado sin equipo y contención.

## E3. Incendio en un tablero

Manda [brigada de incendio]; el eléctrico corta y asesora, no apaga. La decisión de atacar o cerrar la puerta se toma en el primer minuto.

- **Primeras tres acciones:** 1) da la alarma y evacúa el área; 2) corta la alimentación del tablero desde aguas arriba y, si se puede, desde fuera del cuarto; 3) ataca únicamente si el fuego sigue en fase incipiente y con extintor apto para clase C.
- **Qué se apaga y en qué orden:** el circuito que alimenta el tablero; después la ventilación que empuja el humo; al final el resto del cuarto eléctrico si el humo lo invade.
- **Qué no se hace:** no se abre la puerta del tablero para ver qué arde; no se usa agua, espuma ni ningún agente conductor; no se vuelve a energizar nada de ese tablero después del fuego.

> [!CAUTION]
> Un fuego en equipo energizado es clase C: la seguridad depende de que el agente no conduzca la electricidad, y por eso el agua queda descartada. Fase incipiente es la que todavía se controla con un extintor portátil y sin equipo de respiración; si pasó de ahí, se cierra la puerta y se espera a los bomberos. El extintor solo sirve si estaba listo: inspección visual cada mes y revisión de mantenimiento cada año.

## E4. Falla del generador de emergencia o del UPS

Manda [jefe de turno eléctrico]. El respaldo que no arranca se descubre el peor día: desde el primer segundo, cuenta minutos.

- **Primeras tres acciones:** 1) anota la hora exacta en que se perdió el respaldo; 2) baja carga hasta lo que aguante la autonomía que quede; 3) dile a operación cuántos minutos hay para parar el proceso en orden.
- **Qué se apaga y en qué orden:** todo lo que no esté en la tabla de cargas prioritarias; después lo prioritario que admita parada ordenada; se deja para el final [seguridad, alumbrado de emergencia, control y comunicaciones].
- **Qué no se hace:** no se puentea la transferencia; no se pasa el UPS a bypass sin saber qué queda alimentado y con qué; no se arranca el generador en manual sin comprobar que el interruptor de red está abierto y bloqueado.

## E5. Inundación en sala eléctrica

Manda [gerente de mantenimiento eléctrico]. Agua y tableros no vuelven a convivir igual: lo caro no es secar, es reenergizar sin evaluar.

- **Primeras tres acciones:** 1) corta desde aguas arriba antes de que el agua alcance el equipo, si todavía da tiempo; 2) prohíbe el paso a la sala y pon vigilancia en la puerta; 3) localiza y corta el origen del agua.
- **Qué se apaga y en qué orden:** primero los equipos del nivel más bajo y los de control; después el alimentador de la sala; al final se abre y se bloquea la acometida de esa sala.
- **Qué no se hace:** no se entra a agua que toca equipo energizado; no se sopla con aire caliente para energizar el mismo día; no se declara salvado nada porque se vea seco por fuera.

> [!WARNING]
> El equipo que se mojó es peligroso si se reenergiza sin evaluarlo, y el agua contaminada o salada empeora el cuadro. La guía de NEMA lo resume así: en muchos casos hay que reemplazar, y solo algunos equipos grandes se reacondicionan, por personal entrenado y después de consultar al fabricante. Limpiar por cuenta propia con el producto equivocado añade un peligro nuevo, y un "ya secó" en la bitácora no es una evaluación.

## E6. Contacto eléctrico con una persona

Manda quien presenció el accidente, hasta que llegue [brigada de primeros auxilios]. Esta ficha manda sobre la producción, sobre el equipo y sobre el resto del plan.

- **Primeras tres acciones:** 1) corta la energía desde el medio de corte, nunca desde el cable; 2) pide ambulancia diciendo "contacto eléctrico"; 3) empieza RCP en cuanto la persona esté libre y no responda.
- **Qué se apaga y en qué orden:** el circuito de la persona primero, aunque pare la línea; después solo lo que estorbe al rescate; nada más.
- **Qué no se hace:** no se jala al accidentado con las manos; no se le mueve si no hay peligro inmediato; no se le manda a casa aunque camine y hable, porque el daño cardíaco aparece después.

> [!CAUTION]
> No toques al accidentado hasta que la energía esté cortada y comprobada: quien lo intenta se convierte en el segundo paciente. Si no puedes cortar, sepáralo con material aislante y seco, nunca con la mano. El paro por choque eléctrico causa daño cerebral en cuestión de minutos: la OSHA dimensiona el rescate en cuatro minutos, así que el personal entrenado en RCP tiene que estar a esa distancia de cualquier punto de la planta, no en la oficina.

## Cargas prioritarias y orden de reconexión

Se pacta con producción y dirección en frío. Se reconecta de una en una, de arriba hacia abajo, y ningún paso se cierra con gente dentro del equipo, bloqueos puestos o tierras temporales sin retirar.

| Orden | Carga | Por qué no puede esperar | Alimentada por | Máximo sin energía | Autoriza el cierre |
| :---: | --- | --- | --- | --- | --- |
| 1 | [alumbrado de emergencia y comunicaciones] | [evacuación] | [UPS] | [min] | [nombre] |
| 2 | [seguridad de proceso, bomba contra incendio] | [riesgo a personas] | [generador] | [min] | [nombre] |
| 3 | [control, PLC, instrumentación] | [parada segura] | [UPS y generador] | [min] | [nombre] |
| 4 | [cuartos fríos y servicios] | [pérdida de producto] | [generador] | [h] | [nombre] |
| 5 | [líneas de producción] | [producción] | [red] | [h] | [nombre] |

## Equipos de respaldo: autonomía real y última prueba

Autonomía medida en descarga, no la de la hoja de datos. Los porcentajes y las duraciones de prueba salen del manual del fabricante y de la norma que te aplique — [para grupos de emergencia, la edición vigente de la NFPA 110].

| Equipo | Qué alimenta | Autonomía de placa | Autonomía medida | Última prueba | Resultado | Próxima |
| --- | --- | ---: | ---: | --- | --- | --- |
| [Generador de emergencia] | [tablero de emergencia] | [h con tanque lleno] | [h medidas] | [dd/mm] | [ ] | [dd/mm] |
| [UPS de sala de control] | [PLC y control] | [min] | [min medidos] | [dd/mm] | [ ] | [dd/mm] |
| [Banco de baterías] | [protecciones y disparo] | [Ah] | [ ] | [dd/mm] | [ ] | [dd/mm] |
| [Transferencia automática] | [carga de emergencia] | — | — | [dd/mm] | [ ] | [dd/mm] |

Anota también el combustible: [litros en tanque] y [horas a plena carga] valen más que un nivel marcado como lleno.

## Comunicación durante la emergencia

Una sola voz hacia fuera y avisos cortos hacia dentro. Todo aviso lleva hora y queda en la bitácora.

| A quién | Quién habla | Cuándo | Qué se dice |
| --- | --- | --- | --- |
| Personal de planta | [jefe de turno] | Al inicio y cada [30] min | Qué pasó, qué zona está sin energía, dónde no se entra |
| Dirección | [gerente de mantenimiento] | Al inicio y en cada cambio de estado | Alcance, personas, hora estimada de regreso |
| Distribuidora | [nombre designado] | Al confirmar que el corte es externo | Cuenta, dirección, alimentador, hora y si hay generación propia |
| Clientes, proveedores y medios | [dirección] | Solo si la parada supera [horas] | Lo pactado en el contrato, nada más |

## Cierre de la emergencia y registro

La emergencia la declara terminada [quien manda], por escrito y con hora. Ninguna casilla se marca de oído.

- [ ] Nadie herido y nadie sin localizar; fuego apagado y zona ventilada con visto bueno de [brigada o bomberos]
- [ ] Causa identificada o equipo afectado aislado, bloqueado y etiquetado como fuera de servicio
- [ ] Ausencia de tensión verificada donde se trabajó y tierras temporales retiradas
- [ ] Cargas prioritarias reconectadas y estables durante [minutos], sin puentes ni ajustes provisionales en las protecciones
- [ ] Respaldo otra vez disponible: generador con combustible, UPS cargando y transferencia en automático
- [ ] Aviso de cierre a producción, a dirección y al turno entrante

La evidencia se pierde en las primeras horas, así que se recoge durante la emergencia y no al día siguiente:

- Bitácora con hora, hecho, quién lo hizo y dónde quedó registrado, escrita mientras pasa.
- Fotos de la escena antes de mover nada y del tablero cerrado antes de abrirlo; registro de eventos del relé, del variador y del UPS, descargado antes de que se sobrescriba.
- Piezas falladas en cuarentena y etiquetadas: no van al chatarrero hasta cerrar el análisis de causa raíz.
- Condiciones antes, durante y después — carga, temperatura, clima, maniobras y trabajos recientes — y el testimonio de quien estaba presente, tomado el mismo día.

## Pruebas, simulacros y revisión del plan

Lo que no se prueba no existe. Cada prueba deja registro con fecha, resultado y responsable.

| Qué se prueba | Frecuencia | Quién | Qué se registra |
| --- | --- | --- | --- |
| Arranque y toma de carga del generador | [según NFPA 110 vigente y el manual] | [nombre] | Hora de arranque, carga tomada, anomalías |
| Transferencia automática, ida y vuelta | [según NFPA 110 vigente] | [nombre] | Tiempo de transferencia y de retorno |
| Descarga real del UPS y del banco de baterías | [intervalo del fabricante] | [nombre] | Autonomía medida frente a la de placa |
| Extintores del área eléctrica | Inspección visual mensual y revisión de mantenimiento anual | [nombre] | Etiqueta, presión y acceso libre |
| Simulacro de un escenario completo, distinto cada vez | [anual] | [quien manda la emergencia] | Qué falló del plan, no qué falló la gente |
| Llamada real a toda la lista de teléfonos | [trimestral] | [nombre] | Números muertos y suplentes ilocalizables |

Además de la revisión anual, el plan se actualiza en [15] días si se dispara cualquiera de estas casillas, y se explica a cada persona cuando entra, cuando cambia su papel y cuando cambia el plan.

- [ ] Cambió alguien de los roles o algún teléfono
- [ ] Cambió el unifilar, la acometida, la transferencia o el respaldo
- [ ] Se usó el plan en una emergencia real o en un simulacro
- [ ] Cambió el proceso, el horario, las cargas prioritarias o la norma local aplicable

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [OSHA 1910.38, Emergency action plans](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.38) — qué debe contener un plan de emergencia: aviso, evacuación, recuento de personas, rescate y a quién se consulta.
- [OSHA eTool, 4-minute rescue requirement](https://www.osha.gov/etools/electric-power/medical-services-first-aid/4-minute-rescue-requirements) — de dónde salen los cuatro minutos y por qué el personal entrenado en RCP se reparte por la planta.
- [OSHA 1910.157, Portable fire extinguishers](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.157) — inspección visual mensual, revisión de mantenimiento anual y formación anual en el uso del extintor.
- [OSHA 1910.155, definiciones de protección contra incendio](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.155) — fuego clase C es equipo energizado con agente no conductor; y qué cuenta como fase incipiente.
- [NEMA, Evaluating Water-Damaged Electrical Equipment](https://www.tdlr.texas.gov/acr/pdf/NEMA%20Evaluating%20Water-Damaged%20Electrical%20Equipment.pdf) — el equipo mojado es peligroso si se reenergiza sin evaluar: qué se reemplaza y qué se reacondiciona con el fabricante.
- [Preparing for a Root Cause Analysis](https://reliabilityweb.com/articles/entry/preparing_for_a_root_cause_analysis) — Reliabilityweb: la evidencia caduca, y por eso se recoge durante el evento y no después.

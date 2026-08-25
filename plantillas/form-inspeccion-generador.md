---
titulo: Inspección de la planta de emergencia [TAG]
subtitulo: [planta o edificio]
fecha: 
---

> [!NOTE]
> Los recuadros se rellenan aquí mismo, sin abrir el editor: pulsa uno y escribe.
> Hoja por inspección y por equipo. Lo que no se mide no se anota: un renglón en blanco vale más que un dato inventado.

## Datos del equipo

| Dato | Contenido |
| --- | --- |
| TAG del generador | [[TAG]] |
| Marca y modelo del motor | [[Motor]] |
| Marca y modelo del alternador | [[Alternador]] |
| Potencia | [[Potencia en kW y kVA]] |
| Tensión y frecuencia | [[Tensión y frecuencia]] |
| N.º de serie | [[Serie]] |
| Ubicación | [[Ubicación]] |
| Qué respalda | [[Cargas que alimenta]] |
| Horómetro al inicio | [[Horómetro =numero]] |

## Datos de la inspección

| Dato | Contenido |
| --- | --- |
| Fecha | [[Fecha =fecha]] |
| Hora de inicio | [[Inicio =hora]] |
| Tipo | [[Tipo =Semanal/Mensual/Trimestral/Anual/Después de una falla]] |
| Quién inspecciona | [[Nombre y ficha]] |
| Modo en que se encontró | [[Modo =Automático/Manual/Bloqueado/Fuera de servicio]] |
| ¿Se avisó a operaciones? | [ ] |

Si el selector estaba en manual o bloqueado, esa es la primera falla del reporte: la planta no habría arrancado sola.

## Con el motor parado

### Niveles y fugas

| Punto | Nivel | Fuga | Observación |
| --- | --- | --- | --- |
| Aceite del motor | [[Nivel =Máximo/Entre marcas/Mínimo/Bajo mínimo]] | [[Fuga =No/Goteo/Chorro]] | [[Observación]] |
| Refrigerante | [[Nivel =Máximo/Entre marcas/Mínimo/Bajo mínimo]] | [[Fuga =No/Goteo/Chorro]] | [[Observación]] |
| Combustible del tanque diario | [[Nivel =numero]] % | [[Fuga =No/Goteo/Chorro]] | [[Observación]] |
| Combustible del tanque principal | [[Nivel =numero]] % | [[Fuga =No/Goteo/Chorro]] | [[Observación]] |
| Aceite del gobernador o actuador | [[Nivel =Correcto/Bajo/No aplica]] | [[Fuga =No/Goteo/Chorro]] | [[Observación]] |

- [ ] El agua del refrigerante no tiene aceite ni el aceite tiene agua.
- [ ] La bandeja de contención está seca y sin residuos.
- [ ] El respiradero del cárter no gotea.
- [ ] El filtro separador de agua del combustible se drenó.

### Batería y arranque

| Punto | Medida o estado | Observación |
| --- | --- | --- |
| Tensión en reposo | [[Volts =numero]] V | [[Observación]] |
| Tensión durante el arranque | [[Volts =numero]] V | [[Observación]] |
| Corriente del cargador | [[Amperios =numero]] A | [[Observación]] |
| Bornes | [[Bornes =Limpios y apretados/Sulfatados/Flojos]] | [[Observación]] |
| Nivel de electrolito | [[Electrolito =Correcto/Bajo/Sellada]] | [[Observación]] |
| Fecha de instalación de la batería | [[Instalación =fecha]] | [[Años en servicio]] |
| Cargador de baterías | [[Cargador =Flotación correcta/No carga/Sobrecarga]] | [[Observación]] |

Una batería que cae por debajo de 10 V durante el arranque no aguanta el siguiente corte, aunque en reposo marque 12,6 V.

### Motor, correas y escape

| Punto | Estado | Observación |
| --- | --- | --- |
| Correas | [[Correas =Tensión correcta/Flojas/Agrietadas/Vidriadas]] | [[Observación]] |
| Mangueras y abrazaderas | [[Mangueras =Buenas/Endurecidas/Con fisuras]] | [[Observación]] |
| Radiador y aletas | [[Radiador =Limpio/Sucio/Obstruido]] | [[Observación]] |
| Filtro de aire | [[Filtro =Limpio/Sucio/Indicador en rojo]] | [[Observación]] |
| Escape y silenciador | [[Escape =Hermético/Con fuga/Corroído]] | [[Observación]] |
| Soportes antivibratorios | [[Soportes =Buenos/Aplastados/Rotos]] | [[Observación]] |
| Resistencia de precalentamiento | [[Precalentador =Funciona/No funciona/No tiene]] | [[Temperatura del bloque]] |

### Sala, ventilación y seguridad

- [ ] Las rejillas de entrada y salida de aire están libres.
- [ ] La sala no se usa como bodega.
- [ ] El extintor está en su sitio, cargado y vigente: vence [[Extintor vence =fecha]].
- [ ] La señalización y la ruta de salida están despejadas.
- [ ] El paro de emergencia está accesible y sin trabas.
- [ ] La puesta a tierra del grupo está conectada y sin corrosión.
- [ ] La iluminación de la sala funciona, incluida la de emergencia.

## Prueba de arranque

| Dato | Valor |
| --- | --- |
| Hora de arranque | [[Arranque =hora]] |
| ¿Arrancó al primer intento? | [[Arrancó =Sí/Al segundo intento/Al tercero/No arrancó]] |
| Tiempo hasta tensión estable | [[Segundos =numero]] s |
| Humo al arrancar | [[Humo =Normal/Blanco/Negro/Azul]] |
| Ruido anormal | [[Ruido =No/Sí]] |
| Vibración anormal | [[Vibración =No/Sí]] |

## Lecturas en marcha

Toma las lecturas con el motor caliente y anota a qué carga estabas. Una lectura sin carga no compara con nada.

| Parámetro | En vacío | Con carga | Nominal | Observación |
| --- | --- | --- | --- | --- |
| Tensión L1-L2 | [[Volts]] | [[Volts]] | [[Volts nominal]] | [[Observación]] |
| Tensión L2-L3 | [[Volts]] | [[Volts]] | [[Volts nominal]] | [[Observación]] |
| Tensión L3-L1 | [[Volts]] | [[Volts]] | [[Volts nominal]] | [[Observación]] |
| Corriente L1 | [[Amperios]] | [[Amperios]] | [[Amperios nominal]] | [[Observación]] |
| Corriente L2 | [[Amperios]] | [[Amperios]] | [[Amperios nominal]] | [[Observación]] |
| Corriente L3 | [[Amperios]] | [[Amperios]] | [[Amperios nominal]] | [[Observación]] |
| Frecuencia | [[Hz]] | [[Hz]] | [[Hz nominal]] | [[Observación]] |
| Potencia | [[kW]] | [[kW]] | [[kW nominal]] | [[Observación]] |
| Factor de potencia | [[FP]] | [[FP]] | [[FP nominal]] | [[Observación]] |
| Presión de aceite | [[psi o bar]] | [[psi o bar]] | [[Rango]] | [[Observación]] |
| Temperatura de refrigerante | [[Grados]] | [[Grados]] | [[Rango]] | [[Observación]] |
| Tensión de la batería en marcha | [[Volts]] | [[Volts]] | [[Rango]] | [[Observación]] |

**Carga aplicada durante la prueba:** [[Carga =Sin carga/Banco de resistencias/Carga real del edificio/Carga parcial]] — [[Porcentaje de la nominal]] %

**Duración de la prueba:** [[Minutos =numero]] min

Una planta que solo se prueba en vacío se llena de carbón y falla el día del corte. Si tu política lo permite, prueba con carga real al menos una vez al mes.

## Transferencia automática (ATS)

| Punto | Resultado | Tiempo | Observación |
| --- | --- | --- | --- |
| Simulación de falla de red | [[Resultado =Correcto/Con demora/No operó]] | [[Segundos =numero]] s | [[Observación]] |
| Arranque por señal del ATS | [[Resultado =Correcto/Con demora/No operó]] | [[Segundos =numero]] s | [[Observación]] |
| Transferencia a generador | [[Resultado =Correcto/Con demora/No operó]] | [[Segundos =numero]] s | [[Observación]] |
| Retorno a red al normalizar | [[Resultado =Correcto/Con demora/No operó]] | [[Segundos =numero]] s | [[Observación]] |
| Enfriamiento y paro | [[Resultado =Correcto/Con demora/No operó]] | [[Minutos =numero]] min | [[Observación]] |

- [ ] Los tiempos coinciden con los ajustes del temporizador.
- [ ] El enclavamiento mecánico entre red y generador está íntegro.
- [ ] Las señales de alarma llegan al tablero remoto o al SCADA.

## Alarmas y protecciones

| Alarma | Se probó | Responde | Observación |
| --- | :-: | --- | --- |
| Baja presión de aceite | [ ] | [[Responde =Sí/No/No se probó]] | [[Observación]] |
| Alta temperatura | [ ] | [[Responde =Sí/No/No se probó]] | [[Observación]] |
| Sobrevelocidad | [ ] | [[Responde =Sí/No/No se probó]] | [[Observación]] |
| Falla de arranque | [ ] | [[Responde =Sí/No/No se probó]] | [[Observación]] |
| Bajo nivel de combustible | [ ] | [[Responde =Sí/No/No se probó]] | [[Observación]] |
| Paro de emergencia | [ ] | [[Responde =Sí/No/No se probó]] | [[Observación]] |

## Hallazgos

| N.º | Hallazgo | Gravedad | Qué se hace | Responsable | Para cuándo |
| :-: | --- | --- | --- | --- | --- |
| 1 | [[Hallazgo]] | [[Gravedad =Crítica/Alta/Media/Baja]] | [[Acción]] | [[Responsable]] | [[Fecha =fecha]] |
| 2 | [[Hallazgo]] | [[Gravedad =Crítica/Alta/Media/Baja]] | [[Acción]] | [[Responsable]] | [[Fecha =fecha]] |
| 3 | [[Hallazgo]] | [[Gravedad =Crítica/Alta/Media/Baja]] | [[Acción]] | [[Responsable]] | [[Fecha =fecha]] |

Crítica es la que deja al edificio sin respaldo. Esa se avisa por teléfono el mismo día, no en el informe del mes.

## Cierre

| Dato | Contenido |
| --- | --- |
| Horómetro al terminar | [[Horómetro final =numero]] |
| Combustible al terminar | [[Combustible =numero]] % |
| Modo en que queda el equipo | [[Modo final =Automático/Manual/Bloqueado/Fuera de servicio]] |
| ¿Queda disponible para emergencia? | [[Disponible =Sí/No/Con restricciones]] |
| Próxima inspección | [[Próxima =fecha]] |
| Hora de cierre | [[Cierre =hora]] |

- [ ] El selector quedó en automático.
- [ ] El tablero quedó sin alarmas activas.
- [ ] La sala quedó limpia y cerrada.
- [ ] Se registró la inspección en el CMMS con el número [[N.º de OT]].

| Quien inspecciona | Supervisor de mantenimiento | Recibe operaciones | Propietario del activo / cliente |
| --- | --- | --- | --- |
| [[Firma =firma]] | [[Firma =firma]] | [[Firma =firma]] | [[Firma =firma]] |
| [[Nombre]] | [[Nombre]] | [[Nombre]] | [[Nombre]] |

---

*Qué se hace con esta hoja: PDF al expediente del equipo y las lecturas al histórico. El valor de esta hoja no está en la inspección de hoy, sino en poder poner tres al lado y ver la tendencia de la presión de aceite o de la batería.*

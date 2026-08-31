---
titulo: Bitácora de viaje o reparto
subtitulo: [empresa, flota o contrato]
fecha: 
---

> [!NOTE]
> Los recuadros se rellenan aquí mismo, sin abrir el editor: pulsa uno y escribe.
> El mapa de abajo es de ejemplo — cámbialo por tu ruta real con **`+ Insertar` → `Mapas y dibujo técnico` → `Importar archivo .gpx…`**, o edita la lista de puntos a mano.

## Datos del viaje

| Dato | Contenido |
| --- | --- |
| Conductor | [[Nombre]] |
| Vehículo | [[Vehículo]] — placa [[Placa]] |
| Fecha | [[Fecha =fecha]] |
| Salida | [[Hora salida =hora]] — km [[Km inicial =numero]] |
| Retorno | [[Hora retorno =hora]] — km [[Km final =numero]] |
| Ayudante(s) | [[Quiénes]] |

## Recorrido

```gpx
- 15.5041, -88.0250 Salida bodega | tipo=parada
- 15.5089, -88.0198 Cliente 1 | tipo=cliente | nota=entrega programada
- 15.5152, -88.0231 Cliente 2 | tipo=cliente
- 15.5170, -88.0300 Combustible | tipo=combustible
- 15.5041, -88.0250 Retorno bodega | tipo=parada
```

Con la ruta puesta, el botón **Hoja de ruta** (bajo el mapa) inserta la tabla de paradas con su letra, kilómetro y hora — la misma letra que se ve en el mapa impreso.

## Entregas y paradas

| Ref | Cliente o parada | Hora | Entregado | Recibió | Observación |
| :-: | --- | --- | :-: | --- | --- |
| A | [[Cuál]] | [[Hora =hora]] | [ ] | [[Nombre]] | [[Observación]] |
| B | [[Cuál]] | [[Hora =hora]] | [ ] | [[Nombre]] | [[Observación]] |
| C | [[Cuál]] | [[Hora =hora]] | [ ] | [[Nombre]] | [[Observación]] |

## Combustible y gastos

| Concepto | Lugar | Monto | Comprobante |
| --- | --- | --- | :-: |
| Combustible | [[Dónde]] | [[Monto =numero]] | [ ] |
| Peaje / otro | [[Cuál]] | [[Monto =numero]] | [ ] |

## Incidentes

> Si no hubo, se escribe "Sin novedad" — un renglón vacío deja la duda de si se olvidó.

[[Qué pasó, dónde y qué se hizo]]

## Cierre

| Conductor | Supervisor |
| --- | --- |
| [[Firma =firma]] | [[Firma =firma]] |

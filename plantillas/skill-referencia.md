---
name: convenciones-api
description: Convenciones de diseño de la API de este proyecto: nombres de rutas, formato de errores, paginación y versionado
user-invocable: false
paths:
  - "src/api/**/*.ts"
  - "src/routes/**/*.ts"
---

<!-- Guardar como: .claude/skills/convenciones-api/SKILL.md
     user-invocable: false -> es conocimiento de fondo, no un comando
     paths -> solo se carga cuando Claude trabaja con esos archivos -->

# Convenciones de la API

## Rutas

- Sustantivos en plural y en minúsculas: `/facturas`, `/clientes/{id}/pagos`.
- Nada de verbos en la ruta: la acción la marca el método HTTP.
- Versión en el prefijo: `/v1/...`.

## Formato de error

Todos los errores devuelven la misma forma:

```json
{
  "error": {
    "codigo": "factura_no_encontrada",
    "mensaje": "No existe la factura 4821",
    "detalles": {}
  }
}
```

El `codigo` es estable y se puede comparar en el cliente; el `mensaje` es para humanos y puede cambiar.

## Paginación

Por cursor, nunca por número de página:

```json
{ "datos": [], "siguiente": "cursor_opaco_o_null" }
```

## Qué nunca hacemos

- Devolver 200 con un error dentro.
- Romper un contrato sin subir la versión.
- Exponer identificadores de base de datos en la respuesta.

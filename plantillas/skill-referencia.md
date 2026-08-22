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
     paths -> solo se carga cuando Claude trabaja con esos archivos,
     así estas convenciones no gastan contexto el resto del tiempo -->

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

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Extend Claude with skills](https://code.claude.com/docs/en/skills.md) — `user-invocable`, `paths` y cómo Claude carga una habilidad por relevancia.
- [How Claude remembers your project](https://code.claude.com/docs/en/memory.md) — la otra forma de guardar convenciones: `.claude/rules/*.md`, también con `paths`.
- [How to write effective AI agent skills: 6 data-backed practices](https://arize.com/blog/how-to-write-effective-ai-agent-skills/) — Laurie Voss, 2026: mover las referencias a archivos aparte gana puntos frente a la documentación larga.
- [markdown-viewer/skills](https://github.com/markdown-viewer/skills) — catorce habilidades reales donde ver qué se queda en el cuerpo y qué baja a `references/`.

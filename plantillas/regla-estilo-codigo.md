---
paths:
  - "src/**/*.{ts,tsx}"
---

<!-- Guardar como: .claude/rules/estilo-codigo.md
     Con `paths`, esta regla solo entra en contexto cuando Claude abre
     archivos que encajan con el patrón. Sin `paths`, se carga siempre. -->

# Estilo de código TypeScript

## Tipos

- Nada de `any`. Usa `unknown` y estrecha con guardas de tipo.
- Los tipos públicos de un módulo van en su `tipos.ts`; los internos, junto al código.
- Prefiere uniones discriminadas a banderas booleanas:

  ```ts
  type Estado =
    | { tipo: "cargando" }
    | { tipo: "listo"; datos: Factura[] }
    | { tipo: "error"; error: AppError };
  ```

## Funciones

- Una función, una responsabilidad. Si necesitas la palabra «y» para explicarla, pártela.
- Máximo tres parámetros posicionales; a partir de ahí, un objeto con nombres.
- Nada de parámetros booleanos: `crear(usuario, true)` no se entiende sin ir al origen.

## Errores

- Se lanzan con `AppError`, con código estable y mensaje para humanos.
- Un `catch` que no hace nada es un error de revisión.
- No conviertas errores en `null`: quien llama pierde la causa.

## Asincronía

- `await` siempre; nada de `.then()` encadenados.
- Toda promesa se espera o se registra explícitamente como olvidada.
- Las operaciones en paralelo con `Promise.all`, no en bucle secuencial.

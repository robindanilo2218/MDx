---
paths:
  - "**/*.test.{ts,tsx,js}"
  - "tests/**/*"
---

<!-- Guardar como: .claude/rules/pruebas.md
     Los patrones de `paths` son globs: la regla solo entra en contexto
     cuando Claude abre un archivo que encaja con alguno. -->

# Convenciones de pruebas

## Cómo se llaman

`describe` con el nombre de la unidad; `it` con una frase que se lee entera:

```ts
describe("calcularTotal", () => {
  it("suma el IVA cuando el cliente es nacional", () => {});
  it("no suma IVA cuando el cliente está fuera de la UE", () => {});
});
```

## Qué se prueba

- El comportamiento observable, no la implementación.
- Los casos límite primero: vacío, cero, negativo, el último elemento, uno más allá.
- Los fallos: qué ocurre cuando la dependencia se cae.

## Qué no se hace

- Simulacros de todo. Si la prueba solo comprueba simulacros, no prueba nada.
- Pruebas que dependen del orden de ejecución.
- Pruebas que dependen de la hora real: la fecha se inyecta.
- `sleep` para esperar: se usan esperas explícitas.

## Datos de prueba

Se construyen con las factorías de `tests/factorias/`. Nada de objetos literales de 40 líneas copiados entre archivos.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [How Claude remembers your project](https://code.claude.com/docs/en/memory.md) — dónde van las reglas por tema y cómo limitarlas con `paths`.
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices.md) — qué instrucciones merecen ocupar contexto.

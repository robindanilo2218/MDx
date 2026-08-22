---
paths:
  - "**/*.test.{ts,tsx,js}"
  - "tests/**/*"
---

<!-- Guardar como: .claude/rules/pruebas.md -->

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

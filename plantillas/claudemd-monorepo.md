<!-- Guardar como: CLAUDE.md en la raíz del monorepo.
     Cada paquete puede tener su propio CLAUDE.md: se carga cuando Claude
     abre archivos de ese subdirectorio. -->

# Monorepo

## Mapa

| Paquete | Qué es | Puede depender de |
| --- | --- | --- |
| `apps/web` | Aplicación de cliente | `packages/ui`, `packages/core` |
| `apps/api` | Servidor HTTP | `packages/core` |
| `packages/core` | Dominio compartido | nada |
| `packages/ui` | Componentes | `packages/core` |

Una dependencia que no esté en esa tabla es un error de diseño, no un atajo.

## Comandos

Desde la raíz, siempre con filtro de paquete:

```bash
pnpm --filter @proyecto/web dev
pnpm --filter @proyecto/core test
pnpm -r build          # todo, en orden de dependencias
```

## Reglas del monorepo

- Un cambio en `packages/core` obliga a ejecutar las pruebas de todos los paquetes que lo usan.
- Nada de importar por ruta relativa entre paquetes: solo por el nombre del paquete.
- Las versiones se suben con changesets; no edites los `package.json` a mano.

## Instrucciones por paquete

Cada paquete tiene su propio `CLAUDE.md` con sus detalles. Este archivo solo contiene lo que afecta a todos.

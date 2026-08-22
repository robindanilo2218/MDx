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

Si un bloque se repite, sácalo a un archivo aparte y tráelo con una importación `@ruta/al/archivo`, escrita sin las comillas invertidas: dentro de ellas es texto literal y no importa nada. Se resuelven hasta cuatro saltos de profundidad.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [How Claude remembers your project](https://code.claude.com/docs/en/memory.md) — importaciones `@ruta` y carga de los CLAUDE.md de cada subdirectorio.
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices.md) — qué merece estar escrito en un CLAUDE.md y qué sobra.
- [AGENTS.md](https://agents.md) — el formato abierto: también admite uno por subproyecto, y gana el más cercano al archivo que se toca.

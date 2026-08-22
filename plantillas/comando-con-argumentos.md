---
description: Crea el esqueleto de un componente nuevo
argument-hint: "[nombre] [carpeta]"
arguments: [nombre, carpeta]
disable-model-invocation: true
allowed-tools: Write, Read, Glob
---

<!-- Se invoca así:  /componente Boton src/ui
     $nombre  -> Boton      (primer argumento)
     $carpeta -> src/ui     (segundo)
     $ARGUMENTS -> todo junto;  $0, $1... por posición (base 0,
     atajo de $ARGUMENTS[0], $ARGUMENTS[1]...) -->

# Componente `$nombre`

Crea en `$carpeta` un componente llamado `$nombre` siguiendo el estilo de los que ya existen ahí.

## Qué generar

1. `$carpeta/$nombre.tsx` — el componente, con sus tipos de props.
2. `$carpeta/$nombre.test.tsx` — una prueba de que se pinta y una del caso límite.

## Antes de escribir

Abre otro componente de esa misma carpeta y **copia sus convenciones**: cómo exporta, cómo tipa las props, cómo nombra los manejadores. No impongas un estilo nuevo.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Commands](https://code.claude.com/docs/en/commands.md) — la referencia oficial de comandos.
- [Extend Claude with skills](https://code.claude.com/docs/en/skills.md) — `$ARGUMENTS`, `$ARGUMENTS[N]`, `$N` y los argumentos con nombre del campo `arguments`.
- [Explore the .claude directory](https://code.claude.com/docs/en/claude-directory.md) — dónde vive `.claude/commands/` y qué convive con él.

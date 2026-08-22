---
name: revisar
description: Revisa los cambios pendientes buscando errores reales, no cuestiones de estilo
argument-hint: "[rama-o-archivo]"
disable-model-invocation: true
allowed-tools: Bash(git diff *), Bash(git log *), Read, Grep
---

<!-- Guardar como: .claude/skills/revisar/SKILL.md
     Este cuerpo no usa $ARGUMENTS: cuando escribes /revisar mi-rama,
     Claude Code añade `ARGUMENTS: mi-rama` al final, así que llega igual. -->

# Revisión de código

## Qué revisar

Empieza por el diff. Si no hay argumento, revisa lo que no está confirmado.

## Qué buscar, por orden de importancia

1. **Fallos de corrección.** Casos límite, nulos, errores de índice, condiciones de carrera, promesas sin esperar.
2. **Fugas de datos.** Claves, tokens, rutas absolutas, registros con datos personales.
3. **Recursos sin cerrar.** Conexiones, ficheros, escuchadores de eventos.
4. **Errores tragados.** `catch` vacíos, errores que se registran y se ignoran.
5. **Duplicación real.** Código que ya existe en el proyecto y se ha vuelto a escribir.

## Qué NO comentar

- Formato, comillas, punto y coma: eso lo arregla el formateador.
- Preferencias personales sin consecuencias.
- Renombrados cosméticos.

## Cómo entregarlo

Para cada hallazgo:

- **Archivo y línea.**
- **Qué falla**, en una frase.
- **Cómo se rompe**: entradas concretas que provocan el fallo.
- **El arreglo**, en código.

Si no encuentras nada serio, dilo claramente en una línea. No rellenes.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Extend Claude with skills](https://code.claude.com/docs/en/skills.md) — front matter, `allowed-tools` y qué pasa con los argumentos si el cuerpo no los usa.
- [Commands](https://code.claude.com/docs/en/commands.md) — los comandos y habilidades que Claude Code ya trae de fábrica, revisión incluida.
- [Specification](https://agentskills.io/specification) — el cuerpo de una habilidad: pasos, ejemplos de entrada y salida, casos límite.

---
name: desplegar
description: Despliega la aplicación a producción siguiendo la lista de comprobación del equipo
argument-hint: "[entorno]"
disable-model-invocation: true
allowed-tools: Bash(git status), Bash(git log *), Bash(npm run build), Read
---

<!-- Guardar como: .claude/skills/desplegar/SKILL.md
     disable-model-invocation evita que Claude despliegue por su cuenta:
     solo se dispara cuando tú escribes /desplegar
     Si el cuerpo no llevara $ARGUMENTS, Claude Code añadiría al final
     una línea `ARGUMENTS: produccion` con lo que hubieras escrito. -->

# Desplegar a $ARGUMENTS

Sigue estos pasos **en orden** y no saltes ninguno. Si un paso falla, detente y explica qué pasó.

## 1. Comprobaciones previas

- [ ] La rama actual es `main` y está limpia.
- [ ] Las pruebas pasan.
- [ ] La versión en `package.json` se ha subido.

## 2. Construir

Ejecuta la construcción y comprueba que no hay avisos nuevos.

## 3. Desplegar

Lanza el despliegue al entorno indicado.

## 4. Verificar

- [ ] La página principal responde.
- [ ] El registro de errores está limpio en los primeros cinco minutos.

## Si algo sale mal

Revierte al despliegue anterior y avisa antes de intentarlo otra vez.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Extend Claude with skills](https://code.claude.com/docs/en/skills.md) — `argument-hint`, `disable-model-invocation`, `allowed-tools` y las sustituciones de `$ARGUMENTS`.
- [Specification](https://agentskills.io/specification) — por qué el cuerpo va en pasos, con ejemplos y casos límite.
- [How to write effective AI agent skills: 6 data-backed practices](https://arize.com/blog/how-to-write-effective-ai-agent-skills/) — Laurie Voss, 2026: una habilidad enfocada dice cuándo cargarla, qué secuencia seguir y cómo es un buen resultado.

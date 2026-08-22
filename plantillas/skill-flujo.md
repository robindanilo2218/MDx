---
name: desplegar
description: Despliega la aplicación a producción siguiendo la lista de comprobación del equipo
argument-hint: "[entorno]"
disable-model-invocation: true
allowed-tools: Bash(git status), Bash(git log *), Bash(npm run build), Read
---

<!-- Guardar como: .claude/skills/desplegar/SKILL.md
     disable-model-invocation evita que Claude despliegue por su cuenta:
     solo se dispara cuando tú escribes /desplegar -->

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

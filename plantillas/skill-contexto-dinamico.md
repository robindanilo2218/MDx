---
name: resumen-pr
description: Resume los cambios de un pull request con los datos reales traídos de GitHub
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

<!-- La sintaxis !`comando` ejecuta la orden ANTES de enviarle el texto a Claude
     y sustituye el hueco por su salida, así Claude recibe datos de verdad.
     context: fork hace que corra en su propio subagente y no gaste
     el contexto de la conversación principal.
     Todo lo que ejecutes con !`...` tiene que estar permitido en
     allowed-tools, o se quedará esperando permiso. -->

# Contexto del pull request

- Diferencias: !`gh pr diff`
- Archivos tocados: !`gh pr diff --name-only`
- Comentarios: !`gh pr view --comments`

Estado del repositorio:

```!
git status --short
git log --oneline -5
```

# Tu tarea

Escribe un resumen para quien va a revisar el PR:

1. **Qué cambia**, en dos frases y sin jerga.
2. **Por dónde empezar a revisar**, ordenando los archivos por riesgo.
3. **Qué vigilar**: efectos colaterales, migraciones, cambios que rompen contratos.
4. **Qué no está probado**, si lo detectas.

No repitas el diff línea a línea: eso ya lo tiene delante.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Extend Claude with skills](https://code.claude.com/docs/en/skills.md) — la sintaxis !`comando`, que se ejecuta antes de enviarle el texto a Claude.
- [Create custom subagents](https://code.claude.com/docs/en/sub-agents.md) — qué es el subagente al que delegas con `context: fork` y `agent`.

---
name: auditar-dependencias
description: Audita las dependencias del proyecto en busca de paquetes abandonados, duplicados o con licencias problemáticas
context: fork
agent: Explore
background: true
effort: high
allowed-tools: Bash(npm ls *), Bash(npm outdated), Read, Grep
---

<!-- context: fork -> corre en un subagente aparte
     background: true -> no bloquea la conversación; el resultado llega luego
     effort: high -> más razonamiento para una tarea de análisis
     Si necesitas más control (herramientas, modelo, permisos), declara un
     subagente propio en .claude/agents/ y llámalo desde el campo agent. -->

# Auditoría de dependencias

Revisa el proyecto y devuelve **una tabla**, no un ensayo.

## Qué buscar

| Señal | Cómo detectarla |
| --- | --- |
| Paquete abandonado | Sin publicaciones en más de dos años |
| Duplicado | Dos librerías que hacen lo mismo |
| Peso injustificado | Una dependencia enorme usada en un solo sitio |
| Licencia contagiosa | GPL o AGPL en un producto cerrado |
| Sin usar | Está en el manifiesto pero no se importa en ningún lado |

## Formato de salida

| Paquete | Problema | Gravedad | Qué hacer |
| --- | --- | :---: | --- |
| ejemplo | Sin usar | media | Quitar |

Termina con **una** recomendación: por dónde empezar.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Create custom subagents](https://code.claude.com/docs/en/sub-agents.md) — la página oficial: front matter, herramientas heredadas y valores de `model`.
- [Extend Claude with skills](https://code.claude.com/docs/en/skills.md) — `context`, `agent`, `background` y `effort` en el front matter de la habilidad.
- [Explore the .claude directory](https://code.claude.com/docs/en/claude-directory.md) — dónde viven `.claude/agents/` y `.claude/skills/` dentro del proyecto.

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
     effort: high -> más razonamiento para una tarea de análisis -->

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

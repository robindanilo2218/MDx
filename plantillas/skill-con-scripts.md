---
name: generar-grafico
description: Genera un gráfico a partir de un CSV usando el script incluido en la habilidad
argument-hint: "[archivo.csv]"
allowed-tools: Bash(${CLAUDE_SKILL_DIR}/scripts/grafico.py *), Read
---

<!-- Estructura de carpetas:
     .claude/skills/generar-grafico/
     ├── SKILL.md          <- este archivo
     ├── scripts/
     │   └── grafico.py
     └── references/
         └── paletas.md
     Las carpetas scripts/, references/ y assets/ son las del formato
     abierto Agent Skills, y su contenido solo se lee cuando hace falta.
     La regla de allowed-tools usa la misma variable que el cuerpo,
     así el script se ejecuta sin pedir permiso. -->

# Generar un gráfico

## Pasos

1. Lee las primeras filas del CSV para entender las columnas.
2. Elige el tipo de gráfico según la forma de los datos:
   - una serie temporal → líneas
   - comparación entre categorías → barras horizontales
   - parte de un todo → barras apiladas, nunca un queso
3. Ejecuta el script:

   ```
   ${CLAUDE_SKILL_DIR}/scripts/grafico.py $ARGUMENTS --salida grafico.png
   ```

   > Nota: `${CLAUDE_SKILL_DIR}` se sustituye en `allowed-tools` del frontmatter (línea 5), pero dentro del cuerpo del skill NO se sustituye automáticamente. Aquí se resuelve porque este bloque se ejecuta de verdad como comando (con la herramienta Bash, o con la sintaxis de ejecución previa `` `!comando` ``); en texto narrativo que no se ejecuta, la variable queda tal cual, sin resolver.

4. Enseña el resultado y explica en una frase qué se ve.

## Colores

Usa la paleta de `${CLAUDE_SKILL_DIR}/references/paletas.md`. No inventes colores nuevos.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Extend Claude with skills](https://code.claude.com/docs/en/skills.md) — `${CLAUDE_SKILL_DIR}` se sustituye en las reglas Bash de `allowed-tools`; en el cuerpo solo se resuelve cuando ese texto se ejecuta como comando.
- [Specification](https://agentskills.io/specification) — la carpeta de una habilidad: `SKILL.md` más `scripts/`, `references/` y `assets/`.
- [anthropics/skills](https://github.com/anthropics/skills) — el repositorio público de Anthropic, con la plantilla y ejemplos por categoría.
- [markdown-viewer/skills](https://github.com/markdown-viewer/skills) — colección con `references/`, `examples/`, `layouts/` y `styles/` dentro de cada habilidad.

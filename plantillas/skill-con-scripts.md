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
     └── referencias/
         └── paletas.md
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

4. Enseña el resultado y explica en una frase qué se ve.

## Colores

Usa la paleta de `${CLAUDE_SKILL_DIR}/referencias/paletas.md`. No inventes colores nuevos.

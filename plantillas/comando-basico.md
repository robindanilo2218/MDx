---
description: Qué hace este comando, en una frase
disable-model-invocation: true
---

<!-- Guardar como: .claude/commands/mi-comando.md  -> se invoca con /mi-comando
     (equivale a .claude/skills/mi-comando/SKILL.md; en un archivo de commands
     los campos `name` y `paths` se ignoran)
     disable-model-invocation: solo lo lanzas tú, Claude no lo dispara solo.
     Los comandos personalizados se han fusionado con las skills: los archivos
     de commands/ siguen funcionando, pero para algo nuevo la recomendación
     oficial es hacer una skill. Si coinciden en nombre, gana la skill. -->

Haz lo siguiente, en este orden:

1. *[Primer paso]*
2. *[Segundo paso]*
3. *[Cómo termina]*

Cuando acabes, resume en dos líneas qué has hecho.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Commands](https://code.claude.com/docs/en/commands.md) — la referencia oficial de comandos; para los tuyos remite a la página de skills.
- [Extend Claude with skills](https://code.claude.com/docs/en/skills.md) — «Custom commands have been merged into skills»: qué sigue funcionando y qué cambia.
- [Explore the .claude directory](https://code.claude.com/docs/en/claude-directory.md) — por qué para trabajo nuevo se recomienda una skill en vez de un comando.

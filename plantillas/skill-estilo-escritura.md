---
name: voz-de-marca
description: Cómo escribimos los textos de cara al público: tono, palabras que usamos y palabras prohibidas
user-invocable: false
paths:
  - "content/**/*.md"
  - "src/**/*.copy.ts"
---

<!-- Guardar como: .claude/skills/voz-de-marca/SKILL.md
     user-invocable: false -> no sale en el menú /, la carga Claude sola
     paths -> solo cuando trabaja con textos de cara al público -->

# Voz de marca

## Cómo sonamos

Cercanos y concretos. Escribimos como habla una persona que sabe del tema y tiene prisa por ayudarte.

- Frases cortas. Una idea por frase.
- Segunda persona: «puedes», «tienes», no «el usuario puede».
- Voz activa. «El sistema envía el aviso», no «el aviso es enviado».

## Palabras que no usamos

| No escribas | Escribe |
| --- | --- |
| solución integral | lo que hace de verdad |
| potenciar, empoderar | ayudar, permitir |
| en el corto plazo | pronto, o una fecha |
| innovador, disruptivo | (nada: demuéstralo) |
| simplemente, solo tienes que | (quítalo: nada es simple para quien no lo sabe) |

## Formato

- Títulos en mayúscula solo la primera letra.
- Números del cero al nueve con letra; del 10 en adelante, con cifras.
- Precios con el símbolo detrás: `12,50 €`.
- Nunca terminamos con signos de exclamación.

## Antes de dar un texto por bueno

- [ ] ¿Se entiende leyéndolo una sola vez?
- [ ] ¿Sobra alguna palabra?
- [ ] ¿Prometemos algo que el producto no hace?

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Extend Claude with skills](https://code.claude.com/docs/en/skills.md) — `user-invocable: false` y `paths` para conocimiento de fondo, no comandos.
- [How Claude remembers your project](https://code.claude.com/docs/en/memory.md) — las otras casas de las reglas: CLAUDE.md y `.claude/rules/` con `paths`.
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices.md) — «Write an effective CLAUDE.md»: qué merece estar escrito y qué sobra.

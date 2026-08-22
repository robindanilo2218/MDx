---
name: mi-habilidad
description: Qué hace esta habilidad y cuándo debe usarla Claude. Pon el caso de uso principal al principio.
---

<!-- Guardar como: .claude/skills/mi-habilidad/SKILL.md
     El comando (/mi-habilidad) sale del nombre de la carpeta, no del campo `name`.
     En el front matter todos los campos son opcionales; la que conviene poner
     siempre es `description`, porque es lo que Claude lee para saber cuándo usarla. -->

# Mi habilidad

Una frase que explique el objetivo de esta habilidad.

Al arrancar, Claude solo ve el nombre y la `description`; cuando la tarea encaja, carga este archivo entero y se queda en el contexto. Por eso el cuerpo va corto: instrucciones, no ensayo.

## Cuándo usarla

- Cuando el usuario pide *[situación concreta]*.
- Cuando aparece *[señal en el código o en la conversación]*.

## Cómo proceder

1. **Primer paso.** Qué mirar antes de tocar nada.
2. **Segundo paso.** La acción principal, con el detalle que Claude no puede adivinar.
3. **Tercer paso.** Cómo comprobar que ha salido bien.

## Reglas

- Nunca *[cosa que no se debe hacer]*.
- Siempre *[condición que hay que respetar]*.

## Ejemplo

Entrada: *[lo que pide el usuario]*
Salida esperada: *[cómo debe quedar el resultado]*

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Extend Claude with skills](https://code.claude.com/docs/en/skills.md) — la página oficial de skills: dónde viven y qué admite el front matter.
- [Specification](https://agentskills.io/specification) — el formato abierto: `name` y `description` obligatorios, y los límites de tamaño.
- [Guides: Add Skills to Your Agent](https://ai-sdk.dev/cookbook/guides/agent-skills) — las tres fases de carga: descubrimiento, activación y ejecución.
- [Agent Skills: It's Just Markdown Files All the Way Down](https://dev.to/nicoeft/agent-skills-its-just-markdown-files-all-the-way-down-5hj5) — Nicolas Francisquelo Tacca: el `description` es lo que decide si la habilidad se activa, y el cuerpo, por debajo de las 500 líneas.

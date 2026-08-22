<!-- Guardar como: .claude/rules/git.md
     Esto es contexto, no una barrera: para impedir de verdad un push forzado
     hace falta un hook PreToolUse. -->

# Git: ramas, commits y pull requests

## Antes de nada

No confirmes ni subas nada si no te lo he pedido explícitamente.

## Ramas

`tipo/descripcion-corta`, con el tipo entre: `feat`, `fix`, `refactor`, `docs`, `chore`.

```
feat/aviso-de-cobro
fix/fecha-en-utc
```

## Mensajes de commit

- Primera línea: imperativo, en español, máximo 72 caracteres, sin punto final.
- Línea en blanco.
- Cuerpo: **por qué**, no qué. El qué ya está en el diff.

```
Corrige el cálculo del IVA para clientes fuera de la UE

La tabla de tipos aplicaba el tipo nacional a cualquier país sin
código de región, así que los pedidos internacionales salían con
un 21% de más.
```

## Pull requests

- Título como el del commit.
- Cuerpo con tres apartados: **Qué cambia**, **Por qué** y **Cómo probarlo**.
- Un PR, un tema. Si has arreglado algo de paso, va en otro commit y se explica.

## Nunca

- Reescribir el historial de una rama compartida.
- `--force` sobre `main`.
- Commits con el mensaje «cambios», «wip» o «arreglos».

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [How Claude remembers your project](https://code.claude.com/docs/en/memory.md) — `.claude/rules/` y cómo se cargan estas reglas.
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices.md) — qué convenciones merece la pena escribir.
- [Hooks reference](https://code.claude.com/docs/en/hooks.md) — cómo impedir un push forzado pase lo que pase.

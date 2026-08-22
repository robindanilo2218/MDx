<!-- Guardar el bloque JSON en .claude/settings.json (del proyecto)
     o en ~/.claude/settings.json (personal). -->

# Hook: formatear cada archivo que Claude edita

Un hook es una orden que Claude Code ejecuta **siempre**, decida Claude lo que decida. Es la diferencia entre «pídele que formatee» y «se formatea».

## La configuración

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/formatear.sh",
            "timeout": 30,
            "statusMessage": "Formateando..."
          }
        ]
      }
    ]
  }
}
```

Además de `command`, un hook puede ser de tipo `http`, `mcp_tool`, `prompt` o `agent`.

## El script

Guárdalo en `.claude/hooks/formatear.sh` y dale permisos con `chmod +x`.

```bash
#!/usr/bin/env bash
# Recibe por la entrada estándar un JSON con los datos de la herramienta.
entrada=$(cat)
archivo=$(jq -r '.tool_input.file_path // empty' <<<"$entrada")

[ -z "$archivo" ] && exit 0
[ -f "$archivo" ] || exit 0

case "$archivo" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.md)
    npx prettier --write "$archivo" >/dev/null 2>&1
    ;;
  *.py)
    ruff format "$archivo" >/dev/null 2>&1
    ;;
esac

exit 0
```

## Cómo se comporta

| Código de salida | Qué pasa |
| :---: | --- |
| `0` | Todo bien; si imprime JSON, se interpreta como decisión |
| `2` | Error bloqueante: en `PostToolUse` el error se le enseña a Claude |
| otro | Error no bloqueante: sigue adelante y muestra el `stderr` |

## Eventos que más se usan

`PreToolUse`, `PostToolUse`, `UserPromptSubmit`, `Stop`, `SubagentStop`, `SessionStart`, `SessionEnd`, `PreCompact`, `Notification`. La referencia lista 31 eventos en total.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Hooks reference](https://code.claude.com/docs/en/hooks.md) — los 31 eventos, los cinco tipos de hook y la estructura JSON completa.
- [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide.md) — la guía práctica, con ejemplos y el navegador `/hooks`.
- [Claude Code settings](https://code.claude.com/docs/en/settings.md) — en qué archivo poner el bloque y qué manda sobre qué.

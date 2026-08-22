<!-- Guardar en ~/.claude/settings.json para tenerlo en todos tus proyectos -->

# Hooks de aviso y de arranque

## Avisarte cuando Claude termina

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "notify-send 'Claude Code' 'Terminó la tarea'"
          }
        ]
      }
    ],
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "paplay /usr/share/sounds/freedesktop/stereo/message.oga"
          }
        ]
      }
    ]
  }
}
```

En macOS, cambia `notify-send` por:

```bash
osascript -e 'display notification "Terminó la tarea" with title "Claude Code"'
```

## Cargar contexto al arrancar la sesión

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/contexto.sh"
          }
        ]
      }
    ]
  }
}
```

Con un script que imprima lo que quieres que Claude sepa desde el minuto cero:

```bash
#!/usr/bin/env bash
echo "Rama: $(git branch --show-current)"
echo "Últimos commits:"
git log --oneline -3
echo "Tareas abiertas:"
grep -rn "TODO" src/ | head -5
```

## Registrar todo lo que se ejecuta

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.command' >> ~/.claude/ordenes.log"
          }
        ]
      }
    ]
  }
}
```

Estos hooks también pueden declararse en el front matter de una skill o de un subagente, no solo en `settings.json`.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Hooks reference](https://code.claude.com/docs/en/hooks.md) — los nombres exactos de los eventos, `Stop` y `Notification` incluidos.
- [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide.md) — más ejemplos de configuración en settings.json.
- [Claude Code settings](https://code.claude.com/docs/en/settings.md) — los cuatro archivos de settings y su orden de precedencia.

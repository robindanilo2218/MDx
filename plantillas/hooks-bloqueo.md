<!-- Guardar el JSON en .claude/settings.json y el script en .claude/hooks/ -->

# Hook: impedir órdenes peligrosas

CLAUDE.md es contexto: Claude *intenta* seguirlo. Un hook `PreToolUse` es una barrera: se ejecuta antes de la herramienta y puede denegarla.

## La configuración

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/guardian.sh",
            "timeout": 15
          }
        ]
      }
    ]
  }
}
```

## El script

```bash
#!/usr/bin/env bash
entrada=$(cat)
orden=$(jq -r '.tool_input.command // empty' <<<"$entrada")

prohibido() {
  jq -n --arg motivo "$1" '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: $motivo
    }
  }'
  exit 0
}

case "$orden" in
  *"rm -rf /"*)            prohibido "Borrado masivo bloqueado por política" ;;
  *"git push --force"*)    prohibido "Nada de push forzado: reescribe la rama compartida" ;;
  *"git push"*" main"*)    prohibido "No se sube directamente a main; abre una rama" ;;
  *"DROP TABLE"*)          prohibido "Sentencia destructiva de SQL bloqueada" ;;
esac

exit 0
```

## Decisiones que puede devolver

| `permissionDecision` | Efecto |
| --- | --- |
| `"allow"` | Se ejecuta sin preguntar |
| `"deny"` | Se bloquea y Claude ve el motivo |
| `"ask"` | Te pregunta a ti |

También vale salir con código `2` y escribir el motivo en `stderr`: bloquea igual.

## Ojo

Un hook se ejecuta con **tus** permisos. Revisa el script como revisarías cualquier cosa que corre sola en tu máquina.

Comprueba con `/hooks` que quedó registrado: ese menú enseña evento, matcher, tipo y archivo de origen, pero es de solo lectura; para añadir o cambiar un hook se edita el JSON.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Hooks reference](https://code.claude.com/docs/en/hooks.md) — campos de un hook y salida JSON de `PreToolUse`.
- [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide.md) — por qué un hook decide y una instrucción de CLAUDE.md solo orienta.
- [Claude Code settings](https://code.claude.com/docs/en/settings.md) — `permissions.deny`, la otra forma de cerrar la puerta.

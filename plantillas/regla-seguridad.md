<!-- Guardar como: .claude/rules/seguridad.md
     Sin `paths`: aplica a todo el proyecto, en todas las sesiones.
     Recuerda: esto es contexto, no una barrera. Lo que deba impedirse
     de verdad va en permissions.deny de settings.json o en un hook PreToolUse.
     Las reglas deny y ask se aplican de inmediato; las de allow, solo después
     de que cada persona confíe en la carpeta del proyecto. -->

# Reglas de seguridad

## Secretos

- Ninguna clave, token o contraseña en el código, ni siquiera en ejemplos o pruebas.
- Las variables de entorno se leen en un único módulo (`src/config.ts`) y se validan al arrancar.
- Si encuentras un secreto en el repositorio, detente y avísame: no lo borres sin más, hay que rotarlo.

## Datos personales

- No se registran en los logs: nada de correos, teléfonos, direcciones ni documentos de identidad.
- No salen en los mensajes de error que ve el cliente.
- No se envían a servicios externos sin que esté decidido explícitamente.

## Entradas

- Todo lo que llega de fuera se valida en el borde con un esquema, no con `if` sueltos.
- SQL siempre parametrizado. Una consulta construida con concatenación es un fallo crítico.
- Las rutas de archivo que vengan del usuario se normalizan y se comprueban contra el directorio permitido.

## Dependencias

- No añadas dependencias sin preguntar.
- Nada de paquetes con menos de un año o sin mantenimiento para tareas críticas.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [How Claude remembers your project](https://code.claude.com/docs/en/memory.md) — dónde va una regla y por qué es contexto, no una barrera.
- [Claude Code settings](https://code.claude.com/docs/en/settings.md) — `permissions.deny`, `ask` y `allow`, y su precedencia.
- [Hooks reference](https://code.claude.com/docs/en/hooks.md) — el hook `PreToolUse`, que sí bloquea.

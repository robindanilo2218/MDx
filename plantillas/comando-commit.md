---
description: Prepara un commit con un mensaje escrito a partir de los cambios reales
disable-model-invocation: true
allowed-tools: Bash(git status), Bash(git diff *), Bash(git log *), Bash(git add *), Bash(git commit *)
---

<!-- El bloque de abajo se ejecuta ANTES de que Claude lea esto,
     así que recibe el estado de verdad del repositorio. -->

## Estado actual

```!
git status --short
git diff --stat
git log --oneline -5
```

## Tu tarea

1. Mira los cambios y decide si son **un solo commit** o varios. Si son varios temas, dilo y propón cómo partirlos; no los mezcles.
2. Escribe el mensaje siguiendo el estilo de los últimos commits del repositorio.
   - Primera línea en imperativo, máximo 72 caracteres, sin punto final.
   - Cuerpo explicando **por qué**, no qué.
3. Enséñame el mensaje **antes** de confirmar.
4. No subas nada al remoto.

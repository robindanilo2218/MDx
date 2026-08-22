<!-- Guardar como: CLAUDE.md en la raíz del proyecto (o .claude/CLAUDE.md).
     Se carga entero en cada sesión: apunta a menos de 200 líneas.
     Escribe solo lo que Claude NO puede deducir leyendo el código. -->

# Nombre del proyecto

Una o dos frases: qué es y para quién.

## Comandos

| Para | Comando |
| --- | --- |
| Arrancar en local | `npm run dev` |
| Pruebas | `npm test` |
| Una sola prueba | `npm test -- ruta/al/archivo` |
| Comprobar tipos y estilo | `npm run check` |
| Construir | `npm run build` |

Ejecuta `npm run check` antes de dar por terminado cualquier cambio.

## Cómo está organizado

- `src/api/` — controladores HTTP. Nada de lógica de negocio aquí.
- `src/dominio/` — reglas de negocio, sin dependencias del framework.
- `src/datos/` — acceso a base de datos. Solo se llama desde `dominio/`.
- `src/ui/` — componentes. No hablan con la base de datos directamente.

La regla que importa: `ui` → `api` → `dominio` → `datos`. Nunca al revés.

## Convenciones

- Sangría de 2 espacios; el formateador manda, no discutas con él.
- Los archivos de componentes van en `PascalCase.tsx`; el resto en `kebab-case.ts`.
- Nada de `any` en TypeScript. Si hace falta, usa `unknown` y estrecha el tipo.
- Los errores se lanzan con `AppError`, nunca con `throw new Error` pelado.
- Las fechas se guardan siempre en UTC y se convierten solo al pintarlas.

## Trampas conocidas

- El `seed` de la base de datos borra los datos: no lo ejecutes con el entorno de pruebas apuntando a producción.
- `npm run build` no falla con errores de tipos; usa `npm run check`.
- El proveedor de pagos devuelve 200 con un error dentro del cuerpo.

## Git

- Ramas: `tipo/descripcion-corta`, por ejemplo `fix/pago-duplicado`.
- Mensajes de commit en imperativo y en español.
- No confirmes ni subas nada sin que te lo pidan.

# AGENTS.md

> [!NOTE]
> `AGENTS.md` es un formato abierto: un README para agentes. Lo leen Codex, Cursor,
> Copilot, Jules, Aider, Zed, Devin y una veintena más. Va en la **raíz del repositorio**.
> En un monorepo puedes poner uno por subproyecto: gana el más cercano al archivo que se
> está tocando. Borra este aviso y escribe lo tuyo debajo.

Este archivo es para el agente, no para el visitante. El `README.md` explica qué es el
proyecto y cómo empezar; aquí va lo que hay que saber para **trabajar dentro** sin romper
nada. Si algo sirve para las dos cosas, déjalo en el README y aquí solo enlázalo.

## Qué es esto

[Una o dos frases: qué hace el proyecto y para quién. Sin marketing.]

- **Lenguaje y versión:** [TypeScript 5.6, Node 22]
- **Gestor de paquetes:** [pnpm 9 — no uses npm ni yarn, el lockfile es de pnpm]
- **Dónde está lo importante:** [`src/` el código, `tests/` las pruebas, `infra/` el despliegue]

## Comandos

Los que se usan de verdad. Si un comando necesita algo montado antes, dilo aquí.

```bash
[pnpm install]          # instalar dependencias
[pnpm dev]              # levantar en local, en el puerto 3000
[pnpm test]             # todas las pruebas
[pnpm test -- ruta]     # una sola prueba, mientras trabajas
[pnpm lint --fix]       # formato y reglas
[pnpm build]            # compilar para producción
```

## Estilo de código

Las reglas que no puede adivinar leyendo dos archivos.

- [Comillas simples, sin punto y coma. Lo pone el formateador, no lo discutas.]
- [Nombres de archivo en kebab-case; los componentes en PascalCase.]
- [Nada de `any`. Si no sabes el tipo, escríbelo como `unknown` y estrecha.]
- [Los errores se lanzan, no se devuelven como `null`.]
- [Los textos que ve el usuario van en `i18n/`, nunca sueltos en el código.]

## Pruebas

- **Cómo se lanzan:** [`pnpm test`, o `pnpm test -- --watch` mientras escribes]
- **Dónde viven:** [junto al archivo que prueban, con el sufijo `.test.ts`]
- **Qué se espera:** [toda función nueva con lógica de negocio va con su prueba]
- **Lo que no hay que hacer:** [no toques las capturas (*snapshots*) para que pasen; arregla la causa]
- [Si una prueba tarda más de N segundos, algo está llamando a la red de verdad.]

## Antes de abrir un pull request

- [ ] `[pnpm lint && pnpm test]` en verde.
- [ ] El título va como `[tipo(ámbito): descripción en imperativo]`.
- [ ] [Un cambio por PR. Si hay refactor y funcionalidad, son dos.]
- [ ] [Actualiza `CHANGELOG.md` si el cambio se nota desde fuera.]
- [ ] [No incluyas archivos generados ni `.env`.]

## Límites

Lo que **no** debe hacerse sin preguntar. Esta sección es la que evita los desastres.

- **No** [toques `migrations/`: las migraciones se generan con `[comando]`].
- **No** [modifiques la configuración de despliegue ni los secretos].
- **No** [añadas dependencias nuevas sin decirlo: cada una hay que mantenerla].
- **No** [borres pruebas para que pase la CI].
- [Los datos de `datos/produccion/` son reales: no los uses en pruebas.]

## Cosas que aquí se hacen distinto

Las trampas del proyecto, las que solo se aprenden a base de tropezar.

- [`utils/fecha.ts` no usa la zona horaria del sistema: usa la del cliente. Es a propósito.]
- [El módulo `pagos/` está congelado hasta la migración de [mes]. Si algo falla ahí, avisa.]
- [Hay dos clientes de HTTP por motivos históricos. El nuevo es `lib/http.ts`.]

## Dónde mirar

| Si vas a tocar… | Lee antes |
| --- | --- |
| [La API] | [`docs/api.md`] |
| [El esquema de datos] | [`docs/datos.md`] |
| [El despliegue] | [`infra/README.md`] |

---

*Consejos para que este archivo sirva de algo:*

- *Escribe en imperativo y en concreto: «usa pnpm», no «se recomienda usar pnpm».*
- *Que todo lo que pongas sea comprobable. Si dices «pnpm test», que ese comando exista.*
- *Un archivo corto que se lee entero vale más que uno de treinta páginas que se hojea.*
- *Cuando algo cambie en el proyecto, cambia también aquí: un AGENTS.md caducado hace más daño que no tenerlo.*
- *Si además usas Claude Code, puedes tener los dos: pon lo común aquí y en `CLAUDE.md` una línea que diga «lee AGENTS.md», más lo específico de Claude.*

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [AGENTS.md](https://agents.md) — el formato abierto: qué secciones lleva y cómo se resuelve en un monorepo.
- [agentsmd/agents.md](https://github.com/agentsmd/agents.md) — el repositorio del estándar, con ejemplos y la licencia MIT.

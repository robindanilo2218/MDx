# [Nombre de la colección] — habilidades para agentes

> [!NOTE]
> Esto no es una habilidad: es el `README.md` de una **colección** de habilidades, para
> publicarla y que otra gente la instale. Una habilidad suelta se guarda en
> `.claude/skills/<nombre>/SKILL.md`; una colección se comparte en un repositorio y se
> copia dentro. Borra este aviso y escribe lo tuyo.

[Una frase: qué resuelven estas habilidades y para quién. Concreta.
*«Nueve habilidades para dibujar diagramas de arquitectura sin salir del Markdown.»*]

## Qué trae

| Habilidad | Para qué | Se dispara con |
| --- | --- | --- |
| `[nombre-1]` | [qué hace, en media línea] | [«revisa la seguridad de este endpoint»] |
| `[nombre-2]` | [qué hace] | [`/nombre-2`, a mano] |
| `[nombre-3]` | [qué hace] | [al tocar archivos de `migrations/`] |

## Cómo se instala

```bash
# en un proyecto
git clone [url] .claude/skills-tmp
cp -r .claude/skills-tmp/skills/* .claude/skills/
rm -rf .claude/skills-tmp

# o para todos tus proyectos
cp -r skills/* ~/.claude/skills/
```

Comprueba que está: abre el agente y escribe `/[nombre-1]`. Si no aparece, revisa que la
carpeta tenga dentro un `SKILL.md` y que el nombre de la carpeta no lleve espacios.

## Cómo está organizado

```
[nombre-de-la-coleccion]/
├── README.md              este archivo
├── LICENSE                [MIT / Apache-2.0 / GPL-3.0]
└── skills/
    ├── [nombre-1]/
    │   ├── SKILL.md       obligatorio: el único archivo que se carga entero
    │   ├── references/    lo que se lee solo cuando hace falta
    │   ├── examples/      entradas y salidas de ejemplo
    │   ├── scripts/       lo que se ejecuta, no lo que se lee
    │   └── assets/        plantillas, estilos, imágenes
    └── [nombre-2]/
        └── SKILL.md
```

Solo `SKILL.md` es obligatorio. Todo lo demás son carpetas por convenio, y el motivo de que
existan es el mismo: **lo que no se necesita, no se carga**.

## Las reglas que sigue esta colección

Cópialas, cámbialas o bórralas, pero ten unas y escríbelas. Es lo que separa una colección
de un cajón.

- **Una habilidad, un trabajo.** Si el `description` necesita un «y también», son dos.
- **El `description` es lo único que se lee siempre.** Ahí van la tarea y las palabras que
  usaría quien la pide, no un eslogan. Es el campo que decide si la habilidad se activa;
  reescríbelo hasta que dispare cuando toca y calle cuando no.
- **El cuerpo, corto.** Como referencia, por debajo de las 500 líneas. Lo que se lee entero
  ocupa contexto mientras dure la conversación; lo largo se va a `references/` y se enlaza.
- **Rutas portátiles.** Nada de `/home/tuusuario/...`. Dentro de una habilidad, referencia
  sus propios archivos con la variable que te dé el agente y prueba la habilidad desde otra
  carpeta antes de publicarla.
- **Los scripts se bastan solos.** Cada uno con sus dependencias declaradas y con un
  mensaje claro cuando falta algo.
- **Se prueba con tareas de verdad**, no leyéndola y asintiendo. Ver `[nombre-1]/examples/`.
- **[Tu regla propia.]**

## Cuándo NO hace falta una habilidad

Media docena bien elegidas valen más que treinta.

- Si el modelo ya lo hace bien sin ayuda, la habilidad solo añade ruido. Pruébalo antes.
- Si es un dato fijo y corto (una convención, una ruta), va en `CLAUDE.md` o en `AGENTS.md`.
- Si es una orden de una línea que lanzas tú, va como comando.
- Si cambia cada semana, documenta dónde mirar en vez de congelarlo aquí.

## Antes de publicar

- [ ] Cada carpeta tiene `SKILL.md` con `name` y `description`.
- [ ] Los `description` no se pisan entre ellos: cada uno dice cuándo SÍ y cuándo NO.
- [ ] Probada cada habilidad con la petición escrita como la diría una persona.
- [ ] Probada también la que **no** debía activarse: no se activa.
- [ ] Ninguna ruta absoluta ni nombre de usuario dentro de los archivos.
- [ ] Ningún secreto, token ni dato real en `examples/`.
- [ ] `LICENSE` puesta y coherente con lo que hayas reutilizado.
- [ ] El README dice cómo instalarla y cómo comprobar que funcionó.

## Licencia

[MIT] © [año] [tu nombre]. [Una línea sobre qué puede hacer quien la use.]

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Extend Claude with skills](https://code.claude.com/docs/en/skills) — la documentación oficial: campos del front matter y carga por fases.
- [Agent Skills](https://agentskills.io) — la especificación abierta del formato.
- [anthropics/skills](https://github.com/anthropics/skills) — la colección de ejemplo de Anthropic y su empaquetador.
- [markdown-viewer/skills](https://github.com/markdown-viewer/skills) — colección de catorce habilidades de diagramas: buen ejemplo de `references/`, `examples/` y carpetas propias como `layouts/` y `styles/`.
- [Agent Skills: It's Just Markdown Files All the Way Down](https://dev.to/nicoeft/agent-skills-its-just-markdown-files-all-the-way-down-5hj5) — Nicolas Francisquelo Tacca: el tamaño del `SKILL.md`, la importancia del `description` y cuándo no hace falta una habilidad.

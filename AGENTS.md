# AGENTS.md — MDx (editor de Markdown de un solo archivo)

Estás en el código de **MDx**: editor/visor/presentador de Markdown sin build, sin CDN, offline-first — publicado en md.crgm.app. Todo vive en `index.html` (~18.500 líneas).

⚠️ **Esta carpeta tiene su PROPIO repo git**, distinto del repo externo `hashchat-main` en el que vive en disco (remoto: `github.com/robindanilo2218/visor_editor_md`). El repo externo **también** rastrea estos archivos (el `.gitignore` externo tiene una entrada `/MDx/` obsoleta que ya no coincide tras el rename de la carpeta) — un `git commit` corrido desde la raíz del repo externo puede arrastrar cambios de MDx a la historia equivocada. **Siempre `cd md_crgm_app-main` primero** y usa su propio `git status`/`git add`/`git commit`/`git push`. Nada llega a md.crgm.app ni a los builds de escritorio hasta que se hace push al origin de *ese* repo.

➡️ **Reglas canónicas obligatorias:** carga el skill `mdx-architecture` (Skill tool) o léelo en [`../.claude/skills/mdx-architecture/SKILL.md`](../.claude/skills/mdx-architecture/SKILL.md).
Spec del sistema de bloques: [`mdx-bloques-spec-v2.md`](mdx-bloques-spec-v2.md) (supersede a `gpx-integracion-mdcrgm-spec.md`).

## Recordatorios críticos (no exhaustivo — lee las reglas completas)
- Sin librerías, sin CDN, sin `eval`. Únicas dos llamadas de red permitidas: fetch opcional a Overpass API (contexto OSM en ` ```gpx `) y REST anónimo a Firestore para Comunidad.
- Nunca edites a mano `<script id="catalogo">` ni `escritorio/app/`/`movil/app/`/`movil/android/` (copias generadas) — edita las fuentes y vuelve a correr el paso de empaquetado/copiado.
- Bump manual de `sw.js`'s `VERSION` (actualmente v86) en cada cambio a `index.html` o `plantillas/`, incluso fuera de `empaquetar.py`.
- Los docs de prosa en la raíz del repo (`UniversoMarkdown.md`, `MDx Estado *.md`, etc.) son roadmap/brainstorm, no spec del comportamiento actual — verifica contra el código.
- No toques `hashchat/`, `hashchat-dev/`, `Tiendas_bussiness/`, `PDFx/`, `pdfx-web/` ni los proyectos congelados (crgm, morg, shipping, spa).

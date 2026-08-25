---
name: mi-habilidad-evaluable
description: Qué hace esta habilidad y cuándo debe usarla Claude. Empieza por la tarea concreta y mete las palabras que usaría quien la pide.
---

<!-- Guardar como: .claude/skills/mi-habilidad-evaluable/SKILL.md
     Al lado, en la misma carpeta:
     .claude/skills/mi-habilidad-evaluable/
     ├── SKILL.md          <- este archivo
     ├── evals/
     │   └── evals.json    <- los casos de prueba de abajo, para la máquina
     └── references/
         └── detalle.md    <- lo que solo se lee cuando hace falta
     El comando sale del nombre de la carpeta, no del campo `name`. -->

# Mi habilidad evaluable

Una frase con el objetivo: qué produce esta habilidad y para quién.

Una habilidad que no se ha probado contra la tarea que dice hacer es prosa. Esta plantilla trae los apartados que la obligan a demostrarlo: criterios que se miran, casos que se ejecutan y un procedimiento para pasarlos.

Al arrancar, Claude solo ve el nombre y la `description`; cuando la tarea encaja, carga este archivo entero y se queda en el contexto. Por eso el cuerpo va corto: pasos, no ensayo.

## Cuándo se usa y cuándo no

**Se usa cuando:**

- El usuario pide *[la tarea concreta]*.
- Aparece *[la señal en el código, en un archivo o en la conversación]*.
- Hay que seguir *[el procedimiento interno que Claude no puede adivinar]*.

**No se usa cuando:**

- *[La tarea parecida que resuelve otra habilidad]* — usa *[nombre de la otra]*.
- El modelo ya lo hace bien sin ayuda: si sin la habilidad los casos de prueba también pasan, esta habilidad sobra.
- *[El caso peligroso que debe pasar por una persona]*.

## Cómo proceder

1. **Antes de tocar nada.** Qué mirar para saber si hay material suficiente: *[archivo, campo, comando]*.
2. **La acción principal.** El detalle que Claude no puede deducir leyendo el proyecto.
3. **Comprobar.** Repasa los criterios de aceptación uno a uno antes de dar la tarea por hecha.
4. **Entregar.** Formato exacto de la salida: *[archivo, tabla, ruta]*.

Explica el porqué de cada regla: «haz X porque Y provoca Z» funciona mejor que «SIEMPRE X, NUNCA Y».

## Criterios de aceptación

Cómo se sabe que ha hecho bien su trabajo. Escríbelos en cosas que se puedan mirar: un archivo existe, un número cuadra, un comando termina con código 0. Nada de «la salida es buena». Lo que sea gusto o diseño, déjalo para la revisión humana, no lo pongas aquí.

*Ejemplo relleno para una habilidad que extrae facturas a JSON. Cámbialo por el tuyo:*

- [ ] Existe `salidas/factura.json` y es JSON válido (`jq . salidas/factura.json` sale sin error).
- [ ] Están los cuatro campos obligatorios: `numero`, `fecha`, `total` y `moneda`.
- [ ] El `total` coincide con la suma de las líneas, con dos decimales.
- [ ] Un dato que no aparece en el documento vale `null`; no se inventa ninguno.
- [ ] No se ha escrito ni modificado ningún archivo fuera de `salidas/`.

## Casos de prueba

Dos o tres casos bastan para empezar. Uno con la petición escrita como la diría una persona, otro preciso, y al menos uno límite. Guárdalos en `evals/evals.json` con el prompt, la salida esperada y los archivos de entrada.

| Entrada | Qué tiene que salir | Cómo lo compruebas |
| --- | --- | --- |
| `/mi-habilidad evals/entradas/normal.pdf` — factura de una página con 3 líneas | JSON con los 4 campos y 3 líneas | `jq '.lineas \| length'` devuelve `3` y `jq -e '.total'` no falla |
| «sácame los datos de esta factura», con `evals/entradas/escaneo.pdf` | El mismo JSON, aunque el prompt no diga «JSON» ni nombre la habilidad | Los 4 campos están y el total cuadra con la suma de las líneas |
| `evals/entradas/sin-total.pdf` — el documento no trae total | `total` a `null` y un aviso en la respuesta diciendo que falta | `jq '.total'` devuelve `null`, no un número |

## Casos límite

Qué tiene que pasar cuando la entrada no es la de siempre. Decídelo aquí, no en el momento.

- **Falta un dato.** Deja el campo a `null` y dilo en la respuesta. No lo estimes ni lo rellenes con un valor plausible.
- **El archivo está vacío o es ilegible.** Para, di por qué y no escribas una salida a medias. Un archivo incompleto es peor que ninguno.
- **Hay más de un candidato.** Aplica el desempate: *[el más reciente / el de la ruta indicada]*. Si siguen empatados, enseña la lista y pregunta; no elijas al azar.
- **La entrada no es de este tipo.** Dilo en una línea y no sigas. Es mejor no activarse que activarse mal.
- **El resultado sale enorme.** *[Trocea, resume o avisa antes de escribir]*.

## Cómo la pruebas tú

1. **Valida el formato.** Front matter con los campos que toca, el nombre en la carpeta y no en `name`, y la ruta correcta según sea skill de proyecto o personal.
2. **Prepara la línea base.** Cada caso se ejecuta dos veces en condiciones idénticas — mismo modelo, mismas herramientas: una con la habilidad y otra sin ella (o contra la versión anterior guardada). Sin línea base no sabes si la habilidad aporta algo.
3. **Contexto limpio en cada ejecución.** Sesión nueva o subagente, para que Claude siga solo lo que dice este archivo y no restos de cuando la escribiste.
4. **Califica.** Cada criterio, PASS o FAIL, citando el trozo de la salida que lo demuestra. Sin beneficio de la duda. Lo mecánico, mejor con un script que a ojo.
5. **Apunta el coste.** Tokens y segundos de cada ejecución, junto al porcentaje de aciertos. Trece segundos más por cincuenta puntos de acierto compensan; el doble de tokens por dos puntos, no.
6. **Lee los patrones.** El criterio que pasa siempre en las dos, quítalo. El que falla siempre en las dos, o está mal escrito o el caso está mal planteado. El que pasa con la habilidad y falla sin ella es justo donde aporta.
7. **Itera.** Cambia una cosa, vuelve a pasar todos los casos y compara. Generaliza en vez de parchear el caso concreto. Si el acierto se estanca según añades reglas, sobra texto: pon un ejemplo en lugar de otra norma.
8. **Revisión humana.** Léelo tú y anota qué falla en concreto: «faltan las etiquetas de los ejes» sirve, «se ve mal» no. Cuando no tengas nada que anotar, ese caso está.

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Extend Claude with skills](https://code.claude.com/docs/en/skills.md) — la página oficial de skills: dónde viven y qué admite el front matter.
- [Evaluating skill output quality](https://agentskills.io/skill-creation/evaluating-skills) — casos en `evals/evals.json`, aserciones PASS/FAIL con evidencia y el bucle de iteración.
- [How to write effective AI agent skills: 6 data-backed practices](https://arize.com/blog/how-to-write-effective-ai-agent-skills/) — Laurie Voss, 2026: evaluación pareada con y sin habilidad, y por qué las skills compactas ganan.
- [Most "Agent Skills" Are Just Vibes in Markdown. I Wrote Thirteen That Have to Prove They Work.](https://simplyprashant.medium.com/most-agent-skills-are-just-vibes-in-markdown-i-wrote-thirteen-that-have-to-prove-they-work-026b7cbc9e8d) — Suthar Prashant, 2026: por qué una habilidad debería publicarse con el listón que la respalda.

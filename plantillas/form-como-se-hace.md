---
titulo: Cómo se hace un formulario
subtitulo: campos que se rellenan sobre la vista, sin abrir el editor
fecha: 
---

Un formulario aquí no es un programa: es un texto en Markdown con recuadros. Lo escribes una vez,
lo rellenas sobre la vista con el ratón o con el dedo, y lo guardas o lo imprimes. Lo que escribas
no va a una base de datos ni a un servidor: **va al propio texto**, que es tuyo y viaja contigo.

Prueba aquí mismo: pulsa el recuadro y escribe tu nombre → [[Tu nombre]]

## Los cinco elementos

| Lo que escribes | Lo que sale | Para qué |
| --- | --- | --- |
| `[[Nombre]]` | [[Nombre]] | un dato corto |
| `[[Nombre::Ana Ruiz]]` | [[Nombre::Ana Ruiz]] | un dato que ya viene escrito |
| `[[Fecha =fecha]]` | [[Fecha =fecha]] | calendario |
| `[[Estado =Bueno/Regular/Malo]]` | [[Estado =Bueno/Regular/Malo]] | elegir de una lista |
| `[ ]` | [ ] | casilla que se marca |

Lo que va entre los dos corchetes es la **etiqueta**: el texto gris que se ve mientras el recuadro
está vacío. Escribe etiquetas cortas y concretas — «Nombre y apellidos» dice más que «Datos».

## Los tipos

Después de la etiqueta, un espacio, un signo `=` y el tipo. Solo hay seis, más las listas.

| Tipo | Se escribe | Sale así |
| --- | --- | --- |
| Texto corto | `[[Ciudad]]` | [[Ciudad]] |
| Texto largo | `[[Observaciones =larga]]` | [[Observaciones =larga]] |
| Fecha | `[[Fecha de la visita =fecha]]` | [[Fecha de la visita =fecha]] |
| Hora | `[[Hora de inicio =hora]]` | [[Hora de inicio =hora]] |
| Número | `[[Cantidad =numero]]` | [[Cantidad =numero]] |
| Firma | `[[Firma del jefe =firma]]` | [[Firma del jefe =firma]] |
| Lista | `[[Turno =Mañana/Tarde/Noche]]` | [[Turno =Mañana/Tarde/Noche]] |

La lista se hace sola: separa las opciones con barras y no pongas espacios de más. Deja siempre
una opción para lo que no encaja — `No aplica` o `Sin dato` — o la gente inventará un dato.

## Las casillas

Una casilla es `[ ]` sin marcar y `[x]` marcada. Funcionan en tres sitios:

- [ ] En una lista, con guion delante: `- [ ] Revisar la puesta a tierra`
- [x] En una lista, ya marcada: `- [x] Apretar bornes`

Y dentro de una celda de tabla, que es donde más se usan en una hoja de revisión:

| Punto | Bien | Mal | Observación |
| --- | :-: | :-: | --- |
| Nivel de aceite | [ ] | [ ] | [[Observación]] |
| Fugas | [ ] | [ ] | [[Observación]] |

Pulsa una casilla y se marca. Vuelve a pulsarla y se desmarca.

## Dentro de una tabla

Los campos funcionan igual dentro de una celda, con una regla: **el valor va tras dos puntos
dobles**, nunca tras una barra vertical, porque la barra corta la fila de la tabla.

```md
| Equipo | Estado | Responsable |
| --- | --- | --- |
| Bomba 1 | [[Estado =Bueno/Regular/Malo]] | [[Responsable]] |
| Bomba 2 | [[Estado =Bueno/Regular/Malo::Regular]] | [[Responsable::Ana]] |
```

Repite la misma etiqueta todas las veces que quieras: cada recuadro es independiente aunque se
llame igual. Es lo que permite una tabla de diez filas con `[[Nombre]]` en todas.

## El botón «Rellenar»

Aparece arriba cuando el documento tiene campos o casillas. Sirve para dos cosas:

1. **Resaltar** lo que falta por rellenar, para no saltarse un recuadro.
2. **Activar los huecos** de las demás plantillas. Cualquier texto entre corchetes sencillos —
   `[como este]` — se vuelve un recuadro mientras el modo está puesto. Así las plantillas que no
   se hicieron como formulario también se pueden rellenar sin abrir el editor.

En esa barra también está **Vaciar**, que deja el documento limpio para volver a usarlo, y
**Siguiente campo**, que salta al primero que quede en blanco. Con la tecla **Tab** se pasa de un
recuadro al siguiente, y con **Intro** se confirma y se salta.

## Imprimirlo en blanco

Un formulario vacío se imprime como lo que es: renglones para escribir a mano. Sirve para la
cuadrilla que sale a campo sin teléfono. Después alguien lo pasa aquí y queda en PDF.

## Cómo se guarda

Lo que escribes se queda en el texto en Markdown, dentro de los mismos corchetes:

```md
Responsable: [[Nombre y apellidos::Robin Gregorio]]
Fecha: [[Fecha =fecha::2026-08-22]]
```

Eso significa que:

- Se guarda solo en **Recientes**, como cualquier documento.
- Al descargar el `.md` o el `.html`, lo escrito va dentro.
- Si abres el editor, ves el texto y puedes corregirlo a mano.
- Se puede rellenar hoy, cerrar y seguir mañana.

## Reglas para que un formulario se use

- **Una hoja, un trabajo.** Si necesitas explicar cuándo usar cada mitad, son dos hojas.
- **Pregunta lo que vas a leer.** Cada campo que nadie mira es tiempo robado a quien lo llena.
- **Pon el dato difícil al principio**, cuando la persona todavía tiene paciencia.
- **Deja una casilla de «no aplica»** en todo lo que a veces no aplica.
- **Cierra con firmas y con qué se hace con la hoja.** Un formulario que no se sabe a dónde va,
  se queda en el bolsillo.

## Esqueleto para empezar

Borra todo lo de arriba y quédate con esto:

## Datos

| Dato | Contenido |
| --- | --- |
| Fecha | [[Fecha =fecha]] |
| Área | [[Área]] |
| Responsable | [[Nombre]] |

## Revisión

| Punto | Bien | Mal | Observación |
| --- | :-: | :-: | --- |
| [[Punto]] | [ ] | [ ] | [[Observación]] |
| [[Punto]] | [ ] | [ ] | [[Observación]] |

## Cierre

**Resultado:** [[Resultado =Conforme/Con observaciones/No conforme]]

**Observaciones generales:** [[Observaciones =larga]]

| Quien revisa | Quien recibe |
| --- | --- |
| [[Firma =firma]] | [[Firma =firma]] |
| [[Nombre]] | [[Nombre]] |

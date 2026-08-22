---
titulo: [Título del trabajo, claro y específico]
subtitulo: [Subtítulo, si lo hay]
autor: Tu nombre
fecha: 
---

<style>
/* Formato APA 7: márgenes de 2,54 cm, interlineado doble, sangría de primera
   línea, títulos con el aspecto que pide la norma y sangría francesa en las
   referencias. Esto solo cambia cómo se ve y cómo se imprime el documento.
   Si no lo necesitas, borra este bloque entero. */
@page{ margin:2.54cm }
.documento > header.portada{ display:none }   /* la portada buena es la de abajo */
.documento{ font-family:"Times New Roman", Times, Tinos, Liberation Serif, Georgia, serif; font-size:12pt }
.documento p, .documento li{ line-height:2 }
.documento p{ text-indent:1.27cm; text-align:left; margin:0 }
.documento h1, .documento h2, .documento h3, .documento h4{
  font-family:inherit; font-size:12pt; line-height:2; border:0; margin:0; padding:0;
}
.documento h1{ text-align:center; font-weight:700 }
.documento h2{ text-align:left;   font-weight:700 }
.documento h3{ text-align:left;   font-weight:700; font-style:italic }
.documento h4{ text-align:left;   font-weight:700; text-indent:1.27cm }
.documento blockquote{ margin:0 0 0 1.27cm; padding:0; border:0; background:none }
.documento blockquote p{ text-indent:0 }
.documento .portada p{ text-indent:0; text-align:center }
.documento .referencias p{ text-indent:-1.27cm; padding-left:1.27cm }
.documento .sin-sangria p{ text-indent:0 }
.documento h1#resumen + p{ text-indent:0 }   /* el resumen va sin sangría */
.documento table{ font-size:11pt }
.documento table p{ text-indent:0; line-height:1.4 }
</style>

<p class="centrado"><strong>[Título del trabajo: máximo unas 12 palabras, sin abreviaturas ni "Un estudio sobre"]</strong></p>

<p class="centrado">[Nombre y apellidos, tal como los tienes matriculados]</p>

<p class="centrado">[Facultad o departamento], [Universidad]</p>

<p class="centrado">[Código] [Nombre del curso]</p>

<p class="centrado">[Título y nombre del docente]</p>

<p class="centrado">[Día de mes de año de entrega]</p>

> [!NOTE]
> Así es la **portada de estudiante** de APA 7: seis bloques centrados, a doble espacio,
> empezando a un tercio de la página. El título va en **negrita**; lo demás, en redonda.
> La portada de estudiante **no lleva encabezado corto** (*running head*): eso es solo
> para artículos que se mandan a una revista.

<div class="salto-pagina"></div>

# Resumen

Entre **150 y 250 palabras**, en un solo párrafo y **sin sangría**. Es el trabajo entero en
miniatura, no una introducción. Escríbelo al final, cuando ya sepas qué encontraste.

Una frase por cada cosa: el problema y por qué importa; el objetivo; a quién estudiaste y
cómo; el resultado principal **con el dato**; y qué se concluye. Nada de citas, nada de
"se presentarán los resultados".

*Palabras clave:* [tres a cinco términos], [en minúscula], [separados por comas]

<div class="salto-pagina"></div>

# [Título del trabajo]

> [!TIP]
> En APA 7 la introducción **no lleva el título "Introducción"**. Se repite el título del
> trabajo, centrado y en negrita, y el texto empieza debajo. Si tu docente pide el rótulo
> *Introducción*, úsalo aquí como título de nivel 1 y no discutas.

**Primer párrafo: el problema.** Qué pasa, a quién le pasa y qué se ignora todavía. Empieza
por lo concreto, no por "desde tiempos inmemoriales".

**Segundo bloque: qué se sabe ya.** Una revisión breve y ordenada por ideas, no por autores.
Mal: "López (2020) dice X. Ruiz (2021) dice Y". Bien: "La evidencia apunta a X (López, 2020;
Ruiz, 2021), aunque en poblaciones rurales el efecto se invierte (Chan, 2023)".

**Tercer bloque: el hueco.** La frase más importante del trabajo: qué no ha respondido nadie
todavía y por qué merece respuesta.

**Último párrafo: objetivos e hipótesis.** Dilo sin rodeos: "El objetivo de este estudio es
[verbo en infinitivo] […]. Se plantea la hipótesis de que [predicción concreta y falsable]".

# Método

Se escribe con el detalle suficiente para que otra persona pueda **repetir** el estudio.
En pasado y en voz activa: "medimos", "aplicamos", no "se procedió a la aplicación de".

## Participantes

Cuántos, cómo los conseguiste y cómo son: edad (media y desviación típica), sexo, nivel
educativo, procedencia, y los criterios de inclusión y exclusión. Di también cuántos
abandonaron y por qué.

## Instrumentos

Un subapartado por instrumento. De cada uno: nombre completo, autoría y año, qué mide,
cuántos ítems, con qué escala responde y **qué fiabilidad y validez** tiene, con la cita.

### [Nombre del instrumento] ([Autoría], [año])

Describe la versión que usaste. Si la adaptaste o la tradujiste, dilo aquí y explica cómo.

## Procedimiento

El orden real de los hechos: dónde, cuándo, en qué condiciones, quién administró qué y
cuánto duró. Incluye el consentimiento informado y el aval del comité de ética.

## Análisis de datos

Qué pruebas estadísticas usaste, para responder a qué pregunta, con qué programa y versión,
y qué nivel de significación fijaste. Ejemplo: "Se aplicó un ANOVA de medidas repetidas con
un alfa de 0,05, usando jamovi 2.5".

# Resultados

Los hallazgos, sin interpretarlos. Primero los descriptivos, después los contrastes. Cada
resultado con su estadístico, sus grados de libertad, su valor *p* y su **tamaño del efecto**.

En el texto, apunta a la tabla en vez de repetirla: "La Tabla 1 muestra […]". Nunca escribas
"en la tabla de arriba" o "en la siguiente figura".

**Tabla 1**

*Medias y desviaciones típicas de [variable] por grupo*

| Grupo | *n* | *M* | *DT* | *t* | *p* |
| --- | ---: | ---: | ---: | ---: | ---: |
| Experimental |  |  |  |  |  |
| Control |  |  |  |  |  |

*Nota.* [Qué mide la variable y en qué unidades. Explica aquí cualquier abreviatura de la
tabla.] *M* = media; *DT* = desviación típica.

En APA una tabla lleva, por este orden: el número en **negrita**, el título en *cursiva*
debajo, la tabla con líneas solo horizontales, y la nota al pie empezando por *Nota.*

**Figura 1**

*[Título de la figura, en cursiva y descriptivo]*

![Descripción de la figura para quien no pueda verla](ruta/a/la-figura.png)

*Nota.* [Qué se ve, qué representan los ejes y de dónde salen los datos. Si la figura es de
otra fuente, aquí va el permiso y la referencia.]

> [!TIP]
> Si la figura es un diagrama (un flujo de participantes, un modelo), puedes dibujarlo con un
> bloque `mermaid` en vez de insertar una imagen. Se imprime igual de bien.

# Discusión

**Empieza respondiendo.** Primera frase: ¿se cumplió la hipótesis o no? Sin suspense.

**Compara con la literatura.** Qué encaja con lo que ya se sabía y qué no. Cuando algo no
encaja, propón una explicación en vez de esconderlo.

## Limitaciones

Las de verdad: tamaño de la muestra, diseño, instrumento, sesgo de selección. Di cómo afecta
cada una a la conclusión. Una limitación sin consecuencia no es una limitación.

## Implicaciones y líneas futuras

Qué debería cambiar alguien mañana por la mañana a raíz de esto, y qué estudio haría falta
para responder lo que aquí quedó abierto. Concreto: no "se sugiere seguir investigando".

## Conclusión

Dos o tres frases. Lo que se sabe ahora y no se sabía antes. Sin datos nuevos.

<div class="salto-pagina"></div>

# Referencias

Orden alfabético por el apellido del primer autor, **sangría francesa** y solo las obras que
de verdad citaste en el texto. Nada de bibliografía "de apoyo".

<div class="referencias">

Apellido, A. A. (2023). Título del artículo en minúscula salvo la primera palabra.
*Nombre de la Revista, 12*(3), 45-67. https://doi.org/10.xxxx/xxxxx

Apellido, B. B. y Apellido, C. C. (2021). *Título del libro en cursiva* (2.ª ed.). Editorial.

</div>

> [!TIP]
> Ese `<div class="referencias">` es lo que le da la **sangría francesa** a la lista: la
> primera línea al margen y las siguientes metidas. Escribe cada referencia dentro, separada
> por una línea en blanco.

<div class="salto-pagina"></div>

# Apéndices

Va aquí lo que interrumpiría la lectura: el cuestionario completo, el guion de entrevista,
las tablas largas, la sintaxis del análisis. Cada apéndice empieza en página nueva.

Si hay uno solo, se rotula **Apéndice**. Si hay varios, **Apéndice A**, **Apéndice B**… en el
orden en que se mencionan en el texto. Y hay que mencionarlos: "(ver Apéndice A)".

# Apéndice A: [Nombre del anexo]

[Contenido.]

<div class="salto-pagina"></div>

# Cómo se marcan los niveles de título

APA 7 tiene cinco niveles. En este documento se escriben con almohadillas, y la hoja de
estilo se encarga del resto.

| Nivel | Aspecto en APA 7 | Markdown |
| :--- | :--- | :--- |
| 1 | Centrado, **negrita**, empieza en párrafo nuevo | `#` |
| 2 | A la izquierda, **negrita**, párrafo nuevo | `##` |
| 3 | A la izquierda, ***negrita cursiva***, párrafo nuevo | `###` |
| 4 | Sangrado, **negrita**, termina en punto, el texto sigue en la misma línea | `####` |
| 5 | Sangrado, ***negrita cursiva***, termina en punto, el texto sigue en la misma línea | `#####` |

Reglas que se olvidan siempre:

- Se usan **en orden**. No hay un nivel 3 sin un nivel 2 por encima.
- Si una sección tiene un solo subapartado, no lo pongas: no se subdivide en uno.
- *Método*, *Resultados*, *Discusión*, *Referencias* y *Apéndice* son siempre nivel 1.
- En inglés los títulos van en *Title Case*. **En español se respeta la ortografía del
  español**: mayúscula solo en la primera palabra y en los nombres propios.

# Formato general del documento

APA 7 pide: **interlineado doble** en todo el trabajo (también en las referencias y en las
notas de las tablas), **sangría de primera línea de 1,27 cm** en cada párrafo, **márgenes de
2,54 cm** en los cuatro lados y el **número de página arriba a la derecha** en todas.

> [!IMPORTANT]
> Nada de eso se escribe en el Markdown, y no hace falta que lo hagas: el bloque `<style>`
> del principio de esta plantilla ya pone los márgenes de 2,54 cm, el interlineado doble, la
> sangría de primera línea, la sangría francesa de las referencias y el aspecto de los cinco
> niveles de título. Tú escribe el contenido.
>
> Lo único que no puede poner una hoja de estilo es el **número de página**: eso lo añade el
> navegador. Al imprimir, activa *Encabezados y pies de página* en las opciones, o numera
> después si tu facultad exige la posición exacta de APA (arriba a la derecha).

Tipografías que APA acepta, entre otras: Calibri 11, Arial 11, Times New Roman 12, Georgia 11.
Elige una y no la mezcles.

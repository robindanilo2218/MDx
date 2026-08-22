---
titulo: La anatomía de un .md para una IA
subtitulo: Qué va en cada parte del archivo, y por qué
autor: Tu nombre
fecha: 
---

Un archivo que va a leer un modelo se escribe distinto de uno que va a leer una
persona. La persona hojea, salta y vuelve atrás cuando algo no cuadra. El modelo
recibe el texto de corrido, sin poder hojear, y muchas veces recibe **solo un
trozo**. Esta guía explica qué va en cada parte del archivo y por qué esa parte
está ahí.

> [!NOTE]
> Vale para cualquier sistema: Claude, ChatGPT, Gemini, un modelo que corre en tu
> propio equipo o un buscador de documentos tipo RAG. Cambian los nombres de los
> campos; la anatomía no.

[TOC]

## 1. Por qué el formato importa

Al modelo le llega **texto plano**. No hay tamaños de letra, ni columnas, ni
colores, ni el gesto de pasar la página. Los encabezados, las listas y las tablas
son las únicas señales de jerarquía que sobreviven al viaje. Y sobreviven porque
el modelo ha leído millones de archivos Markdown: reconoce lo que significan.

| Lo que escribes | Lo que el modelo entiende |
| --- | --- |
| `## Cómo se nombran las ramas` | Aquí empieza un tema nuevo, y se llama así |
| Una lista con guiones | Estos elementos son hermanos, van al mismo nivel |
| Una tabla | Estos campos pertenecen a estas filas, y solo a estas |
| Código entre vallas | Esto es literal: cópialo, no lo parafrasees |
| Un párrafo de cuarenta líneas | Ninguna jerarquía. Todo pesa lo mismo |

**El formato no es decoración: es la estructura del contenido escrita de manera
que se pueda leer sin ojos.**

## 2. Anatomía, parte por parte

Este es el orden que funciona. No es el único posible, pero cada pieza está donde
está por un motivo.

### a) Metadatos (front matter), cuando alguien los lee

Van al principio, entre dos líneas de tres guiones. Solo tienen sentido si algo
los lee de verdad: una habilidad de Claude Code, un indexador, tu propia
aplicación. Si nadie los lee, sobran.

**Qué va ahí:** el nombre, una descripción y —lo más importante— **cuándo hay que
aplicar este archivo**. En muchos sistemas la descripción es lo único que el
modelo ve antes de decidir si abre el archivo o lo ignora.

````yaml
---
name: convenciones-api
description: Cómo se nombran las rutas, cómo se devuelven los errores y cómo se pagina. Úsalo al crear o modificar cualquier endpoint.
---
````

> [!TIP]
> Escribe la descripción como "qué es **más** cuándo se usa". «Notas de la API» no
> ayuda a elegir. «Cómo se nombran las rutas, y cuándo aplicarlo» sí.

### b) El título

Una sola línea con una almohadilla, y que identifique el archivo **sin depender
de la carpeta donde está**. Puede que el modelo vea el título y nada más.

- Mal: `# Guía`, `# Documentación`, `# Notas internas`.
- Bien: `# Convenciones de la API de facturación`.

Un archivo, un `#`. Todo lo demás son `##` y `###`.

### c) La primera frase

Es la línea más rentable del documento. Tiene que contestar dos preguntas: **para
qué sirve esto** y **cuándo se usa**.

**Mal.** «Este documento describe diversos aspectos relacionados con el proceso
de despliegue.»

**Bien.** «Cómo se publica la API en producción. Úsalo cuando haya que sacar una
versión; para el entorno de pruebas, ve a `docs/pruebas.md`.»

### d) El cuerpo, por secciones, de lo importante a lo accesorio

Aquí no hay intriga que mantener. Lo primero que se lee es lo que más peso tiene,
y si el archivo se corta por longitud, se corta por el final.

Cada sección trata **un** tema y lleva un encabezado que se entiende suelto. Si
una sección pasa de una pantalla, pártela en dos.

Un orden que casi siempre funciona:

1. Las reglas que no se saltan nunca.
2. El procedimiento normal, numerado.
3. Los casos raros.
4. El material de consulta que casi nadie mira.

### e) Ejemplos

Un ejemplo vale más que tres adjetivos. «Escribe mensajes de commit claros» no
dice nada; dos mensajes, uno bueno y otro malo, se entienden a la primera.

Pon el ejemplo **completo** y en el formato exacto en el que quieres la
respuesta. Si tienes un contraejemplo, ponlo justo al lado.

````md
Bien: fix(pagos): evitar el cobro duplicado al reintentar
Mal:  arreglos varios
````

### f) Los límites: lo que NO debe hacer

Sección propia, no una coletilla al final de un párrafo. Lo que puede salir mal
es infinito; solo tú sabes qué caminos están cerrados en tu casa.

Escríbelo en negativo y con la salida al lado:

````md
- No toques `migraciones/`. Si hace falta un cambio de esquema, proponlo y espera.
- No inventes números. Si el dato no está, escribe "sin dato" y sigue.
````

### g) Referencias a otros archivos

Al final, con la ruta exacta y una frase que diga **cuándo** ir allí. Un enlace
sin motivo no se sigue.

````md
- `docs/errores.md` — catálogo de códigos de error. Ve ahí si tienes que
  inventarte un código nuevo.
````

> [!WARNING]
> No escribas instrucciones que dependan de algo que no está en el archivo ni se
> puede abrir desde él: «sigue el estilo de siempre», «como quedamos en la
> reunión», «ya sabes cómo lo hacemos». El modelo no estuvo en la reunión.

<div class="salto-pagina"></div>

## 3. Tabla resumen

| Parte del archivo | Qué va ahí | Error típico |
| --- | --- | --- |
| Front matter | Nombre, descripción y cuándo aplicarlo | Ponerlo cuando nadie lo lee, o describir el tema sin decir cuándo se usa |
| Título | Una línea que identifique el archivo por sí sola | `# Notas`, `# Documentación` |
| Primera frase | Para qué sirve y cuándo se usa | Arrancar con la historia del proyecto |
| Cuerpo | Un tema por sección, lo importante arriba | Un solo bloque de texto sin encabezados |
| Ejemplos | Caso real, completo, en el formato de la salida | Describir el ejemplo en vez de darlo |
| Límites | Lo que no debe hacer, con la alternativa | Darlo por sobreentendido |
| Referencias | Ruta exacta y cuándo ir allí | Una lista de enlaces sin explicación |

## 4. Las reglas de oro

1. **Una cosa por archivo.** Si el título necesita una «y», probablemente son dos
   archivos. Mezclar temas hace que se recupere el archivo entero para responder
   a media pregunta.
2. **Encabezados que se entiendan solos.** Puede que al modelo le llegue
   únicamente ese trozo, sin el título ni las secciones anteriores. El encabezado
   es lo único que le sitúa.
3. **Imperativo y segunda persona.** «Valida la entrada antes de guardar», no «se
   recomienda que la entrada sea validada». Una instrucción se obedece; una
   descripción se resume.
4. **Concreto antes que abstracto.** «Rápido» no se puede cumplir; «por debajo de
   200 ms en el percentil 95» sí. Pon el número, el nombre del archivo, el
   comando exacto.
5. **Un ejemplo vale más que tres adjetivos.** Cuando dudes entre explicar mejor
   o poner un ejemplo, pon el ejemplo.
6. **Di también lo que no se debe hacer.** Las prohibiciones cierran caminos que
   ninguna instrucción positiva cierra.
7. **Lo importante arriba.** El principio y el final de un texto largo se
   atienden mejor que el centro. No entierres la regla clave en la página cuatro.
8. **Corto, y por un motivo.** No corto por estética: corto porque cada línea que
   sobra compite por la atención con las que importan. Si una frase no cambia
   ninguna decisión, quítala.

## 5. Cómo lo lee la máquina

Ventana de contexto
: Todo lo que el modelo puede tener delante a la vez: tu archivo, la conversación y lo demás que se haya cargado.
: Es finita. Lo que metes de más desplaza a otra cosa, y no eliges tú a cuál.[^1]

Troceado
: Muchos sistemas parten los documentos en fragmentos antes de guardarlos, y **cortan por los encabezados**.
: Cada `##` que escribes marca un sitio por donde puede caer el corte.

Recuperación
: Cuando llega una pregunta, el sistema busca los fragmentos que más se parecen y le entrega al modelo **solo esos**.
: El resto del documento, para esa respuesta, no existe.

[^1]: El modelo no cuenta palabras ni caracteres, sino *tokens*: trozos de palabra.
    Cada modelo trocea a su manera, así que la cuenta cambia de uno a otro. Como
    regla de servilleta, en español un token ronda las tres o cuatro letras.

````mermaid
flowchart TD
  A[Tu archivo .md] --> B[Se corta por los encabezados]
  B --> C[Fragmento con encabezado claro]
  B --> D[Fragmento titulado Notas]
  E[Pregunta del usuario] --> F[Búsqueda]
  C --> F
  D --> F
  F --> G[Al modelo le llegan dos o tres fragmentos]
````

**Por qué un archivo de 40 páginas se lee peor que cuatro de 10.** El de 40 se
recupera entero, y entonces se lleva casi toda la ventana de contexto, o se
trocea a ciegas y te devuelve un fragmento sin cabeza ni pies. Cuatro archivos de
10, con títulos distintos, permiten traer justo el que hace falta. Además, dentro
de un archivo largo las instrucciones lejanas empiezan a competir entre sí.

**Y por eso `## Notas` es un fragmento perdido.** Nadie pregunta nunca «notas».
`## Cómo se nombran las ramas de git` comparte palabras con la pregunta real
—«¿cómo llamo a esta rama?»— y por eso se encuentra. El encabezado no es un
rótulo decorativo: es la etiqueta con la que ese trozo va a ser buscado.

<div class="salto-pagina"></div>

## 6. Antipatrones

### El muro de texto

Todo seguido, sin encabezados ni listas. No hay por dónde cortarlo ni qué
priorizar.

````md
Mal
Para desplegar hay que tener en cuenta que primero conviene revisar que las
pruebas pasen y también que la rama esté actualizada, y luego ya se lanza el
comando de construcción, aunque si es viernes mejor no, y recuerda avisar.

Bien
## Desplegar
1. `npm test` — tiene que pasar en verde.
2. `git pull --rebase origin main`.
3. `npm run deploy`.

> [!WARNING]
> Los viernes no se despliega.
````

### El archivo cajón de sastre

Un `notas.md` con el despliegue, el tono de los correos y el cumpleaños de la
jefa. Cuando alguien pregunte por el despliegue, se recuperará también el
cumpleaños.

| Mal | Bien |
| --- | --- |
| `notas.md` (todo dentro) | `despliegue.md`, `tono-correos.md`, `equipo.md` |

### Las reglas contradictorias

Dos frases que no pueden cumplirse a la vez. El modelo elegirá una, y no sabrás
cuál.

````md
Mal
- Nunca modifiques archivos de configuración.
- Actualiza la versión en package.json antes de publicar.

Bien
- No modifiques archivos de configuración, **salvo** el campo `version` de
  `package.json` al publicar.
````

### La cortesía inútil

Frases que ocupan sitio y no cambian ninguna decisión.

````md
Mal
Por favor, sé tan amable de intentar, si te resulta posible, ser lo más
cuidadoso que puedas con el código, ya que es muy importante para nosotros.

Bien
No cambies ninguna firma pública sin decirlo antes.
````

### El contexto caducado sin fecha

Un dato verdadero en marzo, escrito como si fuese eterno.

````md
Mal
Ahora mismo estamos migrando a la versión 3.

Bien
**Estado a 21 de agosto de 2026:** migrando a la versión 3; los módulos de pago
siguen en la 2. Si lees esto tres meses después, pregunta antes de fiarte.
````

### La instrucción que cuelga del aire

Depende de algo que no está en el archivo y no se puede abrir desde él.

````md
Mal
Sigue el estilo habitual del equipo y aplica lo acordado en la revisión.

Bien
Sigue `docs/estilo.md`. Los tres puntos que más se incumplen son: sin `any`,
errores con `AppError`, fechas en UTC.
````

## 7. Antes de guardar

- [ ] El archivo trata **una** cosa y el título lo dice.
- [ ] La primera frase dice para qué sirve y cuándo se usa.
- [ ] Cada encabezado se entiende fuera de contexto.
- [ ] Lo más importante está en el primer tercio.
- [ ] Hay al menos un ejemplo completo, en el formato exacto de la salida.
- [ ] Hay una sección con lo que **no** se debe hacer.
- [ ] Ninguna regla contradice a otra.
- [ ] Todo dato que caduca lleva fecha.
- [ ] Ninguna instrucción depende de algo que no esté aquí o enlazado aquí.
- [ ] Has borrado lo que no cambia ninguna decisión.

*[RAG]: Recuperación aumentada: el sistema busca fragmentos de tus documentos y se los entrega al modelo junto con la pregunta

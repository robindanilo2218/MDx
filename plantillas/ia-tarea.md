# Tarea: [nombre corto de la tarea]

## Objetivo

Una frase que empiece por un verbo y diga qué tiene que existir cuando termines.
*[Convierte el CSV de ventas en un resumen mensual por región.]* Si no cabe en
una frase, son dos tareas.

## Contexto mínimo

Solo lo imprescindible para hacer **esto**. Nada de la historia del proyecto: lo
que sobra compite con lo que importa.

- [Dato de fondo 1: de dónde salen las entradas y con qué frecuencia]
- [Dato de fondo 2: quién lee la salida y para qué la usa]
- [Dato de fondo 3: la decisión que ya está tomada y no se discute]

## Entradas

Qué le das, en qué formato y dónde está. Si un campo puede venir vacío o sucio,
dilo aquí, no en los casos límite.

| Qué | Formato | Dónde está | Puede faltar |
| --- | --- | --- | :---: |
| [ventas] | [CSV con cabecera, separador coma] | [`datos/ventas.csv`] | no |
| [tabla de regiones] | [JSON, código a nombre] | [`datos/regiones.json`] | sí |

## Salida esperada

Describe el formato exacto y **pon un ejemplo completo**, no un esquema. Es la
sección que más errores evita: si no lo defines, te llegará en el formato que al
modelo le parezca bonito.

- **Formato:** [Markdown / JSON / CSV / texto plano]
- **Longitud:** [máximo N líneas, N filas, N palabras]
- **Idioma y tono:** [español neutro, sin adornos]
- **Dónde se entrega:** [en la respuesta y nada más / en el archivo
  `salida/resumen.json`]

Ejemplo completo de cómo tiene que verse:

````json
{
  "periodo": "2026-07",
  "regiones": [
    { "codigo": "NOR", "nombre": "Norte", "ventas": 18420, "variacion": 0.07 },
    { "codigo": "SUR", "nombre": "Sur",   "ventas": 12310, "variacion": -0.02 }
  ],
  "sin_region": 3
}
````

> [!IMPORTANT]
> Si la salida se la va a comer otro programa, di **solo eso y nada más**: ni
> saludo, ni explicación, ni las vallas de código alrededor.

## Criterios de aceptación

Escríbelos de manera que se puedan comprobar mirando el resultado, sin discutir.

- [ ] La salida es [JSON válido] y nada más.
- [ ] Aparecen las [N] regiones, incluso las que tienen cero ventas.
- [ ] Las cifras cuadran con el total del archivo de entrada.
- [ ] Los porcentajes van con [dos decimales] y con el signo cuando son negativos.
- [ ] Ninguna fila inventada: si el dato no está, aparece como `null`.

## Restricciones

- **No** [uses librerías externas / cambies los nombres de los campos].
- **No** [inventes valores para rellenar huecos].
- **No** [modifiques los archivos de entrada].
- Máximo [N] líneas de respuesta. Si no cabe, di qué has recortado.

## Casos límite

| Caso | Qué hacer |
| --- | --- |
| [El archivo viene vacío] | [Devuelve la estructura con la lista vacía, no un error] |
| [Una región no está en la tabla] | [Cuéntala en `sin_region` y sigue] |
| [Hay filas duplicadas] | [Quédate con la última y anótalo al final] |
| [Un importe no es un número] | [Trátalo como cero y avisa] |

## Si falta información

Distingue los dos casos, porque no se resuelven igual:

1. **Falta un dato que cambia el resultado** (una fecha, un criterio, un
   destinatario): **pregunta** y no sigas. Una pregunta concreta, no tres.
2. **Falta un detalle menor** (un nombre de campo, un formato de fecha):
   **supón** lo más conservador, sigue, y deja constancia al final:

````md
## Suposiciones
- He tomado el mes como natural, de día 1 a fin de mes. No estaba definido.
````

## Ejemplo de respuesta buena

````json
{ "periodo": "2026-07", "regiones": [ { "codigo": "NOR", "nombre": "Norte", "ventas": 18420, "variacion": 0.07 } ], "sin_region": 0 }
````

Por qué está bien: es el formato pedido, sin envoltorio, y con todos los campos.

## Ejemplo de respuesta mala

````md
¡Claro! He analizado tus datos de ventas y aquí tienes un resumen. En general las
ventas han ido bastante bien este mes, sobre todo en el norte…
````

Por qué está mal: saluda, resume en prosa lo que se pedía en JSON y opina sobre
los datos en vez de darlos.

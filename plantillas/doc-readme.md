# Nombre del proyecto

Una frase: qué hace y para quién. Sin adjetivos.

## Para qué sirve

Dos o tres frases sobre el problema que resuelve. Si hay una captura o un ejemplo de salida, va aquí.

## Instalación

```bash
git clone https://ejemplo.com/proyecto.git
cd proyecto
npm install
```

**Requisitos:** Node 20 o superior.

## Uso

El caso más común, completo y copiable:

```bash
npm run dev
```

Y el resultado que se espera ver.

## Configuración

| Variable | Por defecto | Para qué |
| --- | --- | --- |
| `PUERTO` | `3000` | Puerto del servidor |
| `NIVEL_LOG` | `info` | `debug`, `info`, `warn`, `error` |

## Desarrollo

```bash
npm test          # pruebas
npm run check     # tipos y estilo
npm run build     # construir
```

## Estructura

```
src/
├── api/      controladores HTTP
├── dominio/  reglas de negocio
└── datos/    acceso a base de datos
```

## Problemas conocidos

- …

## Licencia

MIT. Ver [LICENSE](LICENSE).

## Referencias

*De dónde sale este formato. Borra esta sección al usar la plantilla.*

- [Make a README](https://www.makeareadme.com/) — qué secciones suele llevar un README y por qué.
- [About the repository README file](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) — GitHub: dónde busca el archivo (`.github`, raíz o `docs`) y cómo lo muestra.

---
titulo: Estado del mantenimiento eléctrico
subtitulo: [Área o planta] · [periodo]
fecha: 
---

# Estado del mantenimiento eléctrico

[Área o planta] · [periodo] · [Tu nombre], gerente de mantenimiento eléctrico

---

## Agenda

- Cifras clave del periodo
- Protocolo de escalamiento ante una falla
- Causas de las paradas no programadas
- Plan de mantenimiento preventivo del trimestre
- Respuesta ante una falla crítica
- Ciclo de vida de un activo
- Riesgos y prioridades del área
- Cómo se relacionan activo, orden y técnico
- Taxonomía de los activos eléctricos
- Próximos pasos

---

## Cifras clave del periodo

Antes de entrar en diagramas, los números que sostienen esta reunión.

| Indicador | Valor | Meta |
| --- | ---: | ---: |
| [Indicador 1] | [Valor] | [Meta] |
| [Indicador 2] | [Valor] | [Meta] |
| [Indicador 3] | [Valor] | [Meta] |
| [Indicador 4] | [Valor] | [Meta] |

---

## Protocolo de escalamiento ante una falla eléctrica

Así decidimos en el momento si el turno resuelve solo o si el asunto sube hasta mí.

```mermaid
flowchart TD
  A[Se detecta la falla] --> B{¿Hay riesgo para las personas?}
  B -->|Sí| C(Paro inmediato y aviso a seguridad)
  B -->|No| D[Notificar al supervisor de turno]
  D --> E{¿Se resuelve en 30 minutos?}
  E -->|Sí| F(Cierre y registro en bitácora)
  E -->|No| G[Escalar al gerente de mantenimiento]
  G --> H{¿Requiere proveedor externo?}
  H -->|Sí| I(Activar contrato de soporte)
  H -->|No| J(Cuadrilla propia atiende)
  I --> K([Falla resuelta])
  J --> K
  C --> K
```

---

## Causas de las paradas no programadas

La eléctrica sigue siendo la que más nos pesa este periodo; ahí está el foco del próximo trimestre.

```mermaid
pie title Causas de paradas no programadas del periodo
    "Eléctrica" : 41
    "Mecánica" : 27
    "Error humano" : 18
    "Externa" : 14
```

---

## Plan de mantenimiento preventivo del trimestre

Esto es lo que tiene agendado la cuadrilla antes de que termine [periodo].

```mermaid
gantt
    dateFormat YYYY-MM-DD
    title Mantenimiento preventivo del trimestre
    section Subestaciones y tableros
    Termografía de tableros :a1, 2026-09-01, 20d
    Mantenimiento de celdas de media tensión :a2, after a1, 15d
    section Motores y variadores
    Medición de vibración :a3, 2026-09-15, 25d
    Mantenimiento de motores críticos :a4, after a3, 20d
    section Protecciones
    Prueba y ajuste de relés :a5, after a2, 15d
    Actualización del estudio de coordinación :a6, after a5, 10d
```

---

## Respuesta ante una falla crítica

Cuando algo se pone serio, así se coordinan operador, cuadrilla, yo y el proveedor.

```mermaid
sequenceDiagram
  autonumber
  actor O as Operador
  participant G as Gerente de mantenimiento
  participant Q as Cuadrilla eléctrica
  participant P as Proveedor externo
  O->>G: Reporta falla crítica en tablero principal
  G->>Q: Activa protocolo de emergencia
  alt Se resuelve con personal propio
    Q-->>G: Falla contenida y en reparación
    G-->>O: Confirma reinicio de operación
  else Requiere repuesto o soporte especializado
    G->>P: Solicita apoyo urgente
    P-->>G: Confirma llegada y tiempo estimado
    Q-->>G: Reparación completada con el proveedor
    G-->>O: Confirma reinicio de operación
  end
  Note over O,G: Se abre la orden de trabajo y el reporte de causa raíz
```

---

## Ciclo de vida de un activo

De operativo a dado de baja: por aquí pasa cada equipo que seguimos de cerca.

```mermaid
stateDiagram-v2
    [*] --> Operativo
    state "En alerta" as EnAlerta
    state "En mantenimiento" as EnMantenimiento
    state "Dado de baja" as DadoDeBaja
    Operativo --> EnAlerta : hallazgo_o_alarma
    EnAlerta --> Operativo : hallazgo_descartado
    EnAlerta --> EnMantenimiento : orden_correctiva
    Operativo --> EnMantenimiento : orden_preventiva
    EnMantenimiento --> Operativo : reparado
    EnMantenimiento --> DadoDeBaja : sin_reparacion_viable
    DadoDeBaja --> [*]
```

---

## Riesgos y prioridades del área

Esto es lo que me quita el sueño esta semana, ordenado por dónde vive el riesgo.

```mermaid
mindmap
  root((Riesgos y prioridades del área))
    Falla{{Riesgo de falla}}
      Cableado envejecido
      Sobrecarga en tableros
      Puntos calientes sin corregir
    Personas[Seguridad del personal]
      Trabajos con tensión pendientes de eliminar
      EPP por vencer
    Equipo(Capacidad de la cuadrilla)
      Vacantes sin cubrir
      Formación en curso
    Presupuesto{{Repuestos y contratos}}
      Repuestos críticos por comprar
      Contrato de termografía
```

---

## Cómo se relacionan activo, orden y técnico

Así organiza el sistema lo que ustedes ven como una simple orden de trabajo.

```mermaid
erDiagram
    ACTIVO ||--o{ ORDEN_TRABAJO : genera
    ORDEN_TRABAJO }o--|| TECNICO : asignada_a
    ACTIVO {
        string codigo PK
        string ubicacion
        string criticidad
    }
    ORDEN_TRABAJO {
        string folio PK
        string prioridad
        string estado
        string activo_codigo FK
    }
    TECNICO {
        string matricula PK
        string especialidad
    }
```

---

## Taxonomía de los activos eléctricos

Todo transformador, motor o tablero hereda las mismas reglas base de riesgo y criticidad.

```mermaid
classDiagram
    class Activo {
        +String codigo
        +String ubicacion
        +evaluarRiesgo()
    }
    class ActivoElectrico {
        +String tension
        +revisarAislamiento()
    }
    class Transformador {
        +float potenciaKVA
        +String criticidad
        +ensayarAceite()
    }
    class Motor {
        +float potenciaKW
        +String criticidad
        +medirVibracion()
    }
    class Tablero {
        +int numeroCircuitos
        +String criticidad
        +revisarTermografia()
    }
    Activo <|-- ActivoElectrico
    ActivoElectrico <|-- Transformador
    ActivoElectrico <|-- Motor
    ActivoElectrico <|-- Tablero
```

---

## Próximos pasos

1. [Acción, con fecha]
2. [Acción, con fecha]
3. [Acción, con fecha]

---

## Gracias

[Tu nombre], gerente de mantenimiento eléctrico · [correo o usuario de contacto]

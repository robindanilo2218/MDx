/* ==========================================================================
   Service worker de MDx
   Sube el numero de VERSION cada vez que cambies index.html o las plantillas:
   asi el navegador se entera de que hay algo nuevo.
   ========================================================================== */
var VERSION = "v37";
var CACHE = "mdcrgm-" + VERSION;

var CONCHA = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "favicon.ico",
  "iconos/icono.svg",
  "iconos/favicon.svg",
  "iconos/favicon-32.png",
  "iconos/icono-192.png",
  "iconos/icono-512.png",
  "iconos/icono-maskable-512.png",
  "iconos/apple-touch-icon-180.png",
  "plantillas/indice.json",
  "plantillas/skill-basica.md",
  "plantillas/skill-flujo.md",
  "plantillas/skill-referencia.md",
  "plantillas/skill-con-scripts.md",
  "plantillas/skill-contexto-dinamico.md",
  "plantillas/skill-subagente.md",
  "plantillas/skill-revision-codigo.md",
  "plantillas/skill-estilo-escritura.md",
  "plantillas/skill-evaluable.md",
  "plantillas/skill-coleccion.md",
  "plantillas/agente-basico.md",
  "plantillas/agente-revisor-codigo.md",
  "plantillas/agente-explorador.md",
  "plantillas/agente-depurador.md",
  "plantillas/agente-seguridad.md",
  "plantillas/agente-pruebas.md",
  "plantillas/agente-documentador.md",
  "plantillas/claudemd-proyecto.md",
  "plantillas/claudemd-minimo.md",
  "plantillas/claudemd-personal.md",
  "plantillas/claudemd-monorepo.md",
  "plantillas/regla-estilo-codigo.md",
  "plantillas/regla-pruebas.md",
  "plantillas/regla-seguridad.md",
  "plantillas/regla-commits.md",
  "plantillas/agents-md.md",
  "plantillas/comando-basico.md",
  "plantillas/comando-con-argumentos.md",
  "plantillas/comando-commit.md",
  "plantillas/hooks-formateo.md",
  "plantillas/hooks-bloqueo.md",
  "plantillas/hooks-avisos.md",
  "plantillas/rol-experto.md",
  "plantillas/rol-tutor.md",
  "plantillas/rol-entrevistador.md",
  "plantillas/rol-editor.md",
  "plantillas/prompt-sistema-app.md",
  "plantillas/ia-estructura-md.md",
  "plantillas/ia-contexto-proyecto.md",
  "plantillas/ia-tarea.md",
  "plantillas/ia-base-conocimiento.md",
  "plantillas/guia-markdown.md",
  "plantillas/doc-en-blanco.md",
  "plantillas/doc-informe.md",
  "plantillas/doc-acta-reunion.md",
  "plantillas/doc-readme.md",
  "plantillas/doc-propuesta.md",
  "plantillas/doc-plan-proyecto.md",
  "plantillas/doc-adr.md",
  "plantillas/doc-changelog.md",
  "plantillas/doc-carta.md",
  "plantillas/apa-articulo.md",
  "plantillas/apa-ensayo.md",
  "plantillas/apa-anteproyecto.md",
  "plantillas/apa-citas.md",
  "plantillas/elec-plan-maestro.md",
  "plantillas/elec-criticidad.md",
  "plantillas/elec-kpis.md",
  "plantillas/elec-informe-gerencial.md",
  "plantillas/elec-caso-negocio.md",
  "plantillas/elec-loto.md",
  "plantillas/elec-analisis-riesgo.md",
  "plantillas/elec-estudio-arco.md",
  "plantillas/elec-orden-trabajo.md",
  "plantillas/elec-procedimiento-equipo.md",
  "plantillas/elec-paro-programado.md",
  "plantillas/elec-contingencia.md",
  "plantillas/elec-termografia.md",
  "plantillas/elec-calidad-energia.md",
  "plantillas/elec-rca-falla.md",
  "plantillas/elec-ficha-activo.md",
  "plantillas/elec-repuestos-criticos.md",
  "plantillas/elec-competencias.md",
  "plantillas/elec-contratistas.md",
  "plantillas/elec-auditoria.md",
  "plantillas/elec-eficiencia-energetica.md",
  "plantillas/elec-hoja-ruta-digital.md",
  "plantillas/elec-ia-contexto-planta.md",
  "plantillas/elec-ia-analisis-fallas.md",
  "plantillas/elec-ia-asistente.md",
  "plantillas/form-como-se-hace.md",
  "plantillas/form-acta-reunion.md",
  "plantillas/form-acta-entrega.md",
  "plantillas/form-permiso-horas.md",
  "plantillas/form-permiso-dias.md",
  "plantillas/form-revision-herramienta.md",
  "plantillas/form-inspeccion-generador.md",
  "plantillas/form-inspeccion-subestacion.md",
  "plantillas/form-permiso-trabajo.md",
  "plantillas/form-entrega-epp.md",
  "plantillas/form-bitacora-turno.md",
  "plantillas/form-reporte-incidente.md",
  "plantillas/form-checklist-vehiculo.md",
  "plantillas/dia-como-se-hace.md",
  "plantillas/dia-basica.md",
  "plantillas/dia-pitch.md",
  "plantillas/dia-informe-resultados.md",
  "plantillas/dia-gerente-mantenimiento.md",
  "plantillas/dia-gerente-corrugado.md",
  "plantillas/calc-como-se-hace.md",
  "plantillas/calc-presupuesto-personal.md",
  "plantillas/calc-factura.md",
  "plantillas/calc-horas-proyecto.md",
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      /* una a una: un solo archivo que falle no debe tumbar la instalacion */
      return Promise.all(CONCHA.map(function(u){
        return c.add(new Request(u, { cache: "reload" }))["catch"](function(){});
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(claves){
      return Promise.all(claves.map(function(k){
        if(k !== CACHE) return caches["delete"](k);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("message", function(e){
  if(e.data && e.data.tipo === "ACTUALIZAR") self.skipWaiting();
});

self.addEventListener("fetch", function(e){
  var pet = e.request;
  if(pet.method !== "GET") return;
  var url = new URL(pet.url);
  if(url.origin !== self.location.origin) return;

  /* navegacion: primero la red, para estrenar version en cuanto haya; si no, la copia */
  if(pet.mode === "navigate"){
    e.respondWith(
      fetch(pet).then(function(r){
        var copia = r.clone();
        caches.open(CACHE).then(function(c){ c.put("index.html", copia); });
        return r;
      })["catch"](function(){
        return caches.match("index.html").then(function(r){
          return r || caches.match("./");
        });
      })
    );
    return;
  }

  /* lo demas: primero la copia, y de fondo se refresca */
  e.respondWith(
    caches.match(pet).then(function(guardado){
      var red = fetch(pet).then(function(r){
        if(r && r.status === 200 && r.type === "basic"){
          var copia = r.clone();
          caches.open(CACHE).then(function(c){ c.put(pet, copia); });
        }
        return r;
      })["catch"](function(){ return guardado; });
      return guardado || red;
    })
  );
});

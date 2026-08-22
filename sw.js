/* ==========================================================================
   Service worker de Markdown · crgm
   Sube el numero de VERSION cada vez que cambies index.html o las plantillas:
   asi el navegador se entera de que hay algo nuevo.
   ========================================================================== */
var VERSION = "v2";
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
  "plantillas/agente-basico.md",
  "plantillas/agente-depurador.md",
  "plantillas/agente-documentador.md",
  "plantillas/agente-explorador.md",
  "plantillas/agente-pruebas.md",
  "plantillas/agente-revisor-codigo.md",
  "plantillas/agente-seguridad.md",
  "plantillas/claudemd-minimo.md",
  "plantillas/claudemd-monorepo.md",
  "plantillas/claudemd-personal.md",
  "plantillas/claudemd-proyecto.md",
  "plantillas/comando-basico.md",
  "plantillas/comando-commit.md",
  "plantillas/comando-con-argumentos.md",
  "plantillas/doc-acta-reunion.md",
  "plantillas/doc-adr.md",
  "plantillas/doc-carta.md",
  "plantillas/doc-changelog.md",
  "plantillas/doc-en-blanco.md",
  "plantillas/doc-informe.md",
  "plantillas/doc-plan-proyecto.md",
  "plantillas/doc-propuesta.md",
  "plantillas/doc-readme.md",
  "plantillas/guia-markdown.md",
  "plantillas/hooks-avisos.md",
  "plantillas/hooks-bloqueo.md",
  "plantillas/hooks-formateo.md",
  "plantillas/indice.json",
  "plantillas/prompt-sistema-app.md",
  "plantillas/regla-commits.md",
  "plantillas/regla-estilo-codigo.md",
  "plantillas/regla-pruebas.md",
  "plantillas/regla-seguridad.md",
  "plantillas/rol-editor.md",
  "plantillas/rol-entrevistador.md",
  "plantillas/rol-experto.md",
  "plantillas/rol-tutor.md",
  "plantillas/skill-basica.md",
  "plantillas/skill-con-scripts.md",
  "plantillas/skill-contexto-dinamico.md",
  "plantillas/skill-estilo-escritura.md",
  "plantillas/skill-flujo.md",
  "plantillas/skill-referencia.md",
  "plantillas/skill-revision-codigo.md",
  "plantillas/skill-subagente.md",
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

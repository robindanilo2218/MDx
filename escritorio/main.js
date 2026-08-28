const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

const EXTENSIONES = [".md", ".markdown", ".mdown", ".mkd", ".txt"];

function archivoDesdeArgv(argv){
  for(var i = 0; i < argv.length; i++){
    var a = argv[i];
    if(EXTENSIONES.indexOf(path.extname(a).toLowerCase()) !== -1 && fs.existsSync(a)){
      return path.resolve(a);
    }
  }
  return null;
}

let ventana = null;

function abrirArchivoEnVentana(ruta){
  if(!ventana || !ruta) return;
  var texto = fs.readFileSync(ruta, "utf8");
  var nombre = path.basename(ruta);
  var opciones = { origen: "local", version: 1, descargado: Date.now(), aviso: "Abierto: " + nombre };
  var js = "window.plantilla && window.plantilla.fijar(" +
    JSON.stringify(texto) + "," + JSON.stringify(nombre) + "," + JSON.stringify(opciones) + ");";
  ventana.webContents.executeJavaScript(js).catch(function(){});
}

function crearVentana(rutaInicial){
  ventana = new BrowserWindow({
    width: 1100,
    height: 800,
    autoHideMenuBar: true,
    backgroundColor: "#ffffff",
    icon: path.join(__dirname, "app", "iconos", "icono-512.png"),
    webPreferences: { sandbox: true }
  });
  ventana.loadFile(path.join(__dirname, "app", "index.html"));
  if(rutaInicial){
    ventana.webContents.once("did-finish-load", function(){
      abrirArchivoEnVentana(rutaInicial);
    });
  }
}

const bloqueoUnico = app.requestSingleInstanceLock();
if(!bloqueoUnico){
  app.quit();
}else{
  app.on("second-instance", function(_ev, argv){
    var ruta = archivoDesdeArgv(argv);
    if(ventana){
      if(ventana.isMinimized()) ventana.restore();
      ventana.focus();
      if(ruta) abrirArchivoEnVentana(ruta);
    }
  });

  app.whenReady().then(function(){
    var ruta = archivoDesdeArgv(process.argv.slice(app.isPackaged ? 1 : 2));
    crearVentana(ruta);
  });

  app.on("window-all-closed", function(){
    if(process.platform !== "darwin") app.quit();
  });
}

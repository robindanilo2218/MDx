const { app, BrowserWindow, Menu, dialog, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { execFile } = require("child_process");
const util = require("util");
const execFileP = util.promisify(execFile);

const EXTENSIONES = [".md", ".markdown", ".mdown", ".mkd", ".txt"];
const NOMBRE_APP = "MDx";

function archivoDesdeArgv(argv){
  for(var i = 0; i < argv.length; i++){
    var a = argv[i];
    if(EXTENSIONES.indexOf(path.extname(a).toLowerCase()) !== -1 && fs.existsSync(a)){
      return path.resolve(a);
    }
  }
  return null;
}

/* varias ventanas: cada una con su propio documento. Un mismo archivo no se
   abre dos veces -- si ya está en alguna ventana, esa se enfoca en vez de
   duplicarla. */
let ventanas = []; // { win, ruta }
let pendientes = new Map(); // webContents.id -> {texto,nombre,opciones} | null, para el preload

/* ---------- registrar como app para .md ----------
 * Windows protege la asociacion "predeterminada" (UserChoice) con un hash
 * que ningun programa puede escribir directamente desde hace varias
 * versiones (y desde 2024 hay hasta un driver, UCPD.sys, que lo bloquea a
 * proposito) - por diseno, solo el usuario puede fijarla desde el propio
 * cuadro de "Abrir con" o desde Configuracion. Por eso esta funcion no
 * intenta forzar esa clave: registra MDx correctamente (con su nombre e
 * icono, para que deje de aparecer "en blanco" al elegirlo a mano) y abre
 * ella misma el cuadro nativo de "Abrir con" para que el usuario de el
 * ultimo clic. En Linux no existe esa proteccion: xdg-mime si puede fijar
 * el predeterminado sin pasos manuales. */

function rutaEjecutablePropio(){
  if(process.platform === "win32") return process.env.PORTABLE_EXECUTABLE_FILE || process.execPath;
  if(process.platform === "linux") return process.env.APPIMAGE || process.execPath;
  return process.execPath;
}

async function registrarWindows(){
  const exe = rutaEjecutablePropio();
  const comando = '"' + exe + '" "%1"';
  const claveApp = "HKCU\\Software\\Classes\\Applications\\MDx.exe";
  const claveProgId = "HKCU\\Software\\Classes\\MDx.md";
  const pasos = [
    ["add", claveApp, "/ve", "/d", NOMBRE_APP, "/f"],
    ["add", claveApp + "\\shell\\open\\command", "/ve", "/d", comando, "/f"],
    ["add", claveApp + "\\DefaultIcon", "/ve", "/d", exe + ",0", "/f"],
    ["add", claveProgId, "/ve", "/d", NOMBRE_APP + " Markdown", "/f"],
    ["add", claveProgId + "\\shell\\open\\command", "/ve", "/d", comando, "/f"],
    ["add", claveProgId + "\\DefaultIcon", "/ve", "/d", exe + ",0", "/f"],
    ["add", "HKCU\\Software\\Classes\\.md\\OpenWithProgids", "/v", "MDx.md", "/d", "", "/f"],
    ["add", "HKCU\\Software\\Classes\\.md", "/ve", "/d", "MDx.md", "/f"]
  ];
  for(const args of pasos){
    await execFileP("reg", args);
  }
}

// rundll32 con OpenAs_RunDLL no devuelve el control hasta que el usuario
// cierra el cuadro nativo - por eso esto se dispara SIN esperar (el aviso
// de instrucciones tiene que verse antes de que aparezca el cuadro, no
// despues, o el usuario ya lo habra cerrado para cuando llegue el aviso).
function abrirSelectorWindows(){
  const marcador = path.join(app.getPath("temp"), "mdx-abrir-con.md");
  fs.writeFileSync(marcador, "# Elige MDx\n\nMarca «Usar siempre esta aplicación» y listo.\n");
  execFileP("rundll32.exe", ["shell32.dll,OpenAs_RunDLL", marcador]).catch(function(){});
}

async function registrarLinux(){
  const exe = rutaEjecutablePropio();
  const home = os.homedir();
  const dirApps = path.join(home, ".local", "share", "applications");
  const dirIconosApp = path.join(home, ".local", "share", "icons", "hicolor", "512x512", "apps");
  const dirIconosMime = path.join(home, ".local", "share", "icons", "hicolor", "512x512", "mimetypes");
  fs.mkdirSync(dirApps, { recursive: true });
  fs.mkdirSync(dirIconosApp, { recursive: true });
  fs.mkdirSync(dirIconosMime, { recursive: true });

  const iconoOrigen = path.join(__dirname, "app", "iconos", "icono-512.png");
  fs.copyFileSync(iconoOrigen, path.join(dirIconosApp, "mdx.png"));
  // Sobrescribe tambien el icono compartido del tipo text/markdown: es lo
  // unico que hace que el Explorador de archivos "vea" el icono de MDx en
  // los propios .md, no solo en el menu de aplicaciones. Efecto colateral
  // esperado: cambia para cualquier app asociada a .md, no solo para MDx.
  fs.copyFileSync(iconoOrigen, path.join(dirIconosMime, "text-markdown.png"));

  const exeEscapado = exe.indexOf(" ") !== -1
    ? '"' + exe.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"'
    : exe;
  const escritorio = [
    "[Desktop Entry]",
    "Type=Application",
    "Name=" + NOMBRE_APP,
    "Comment=Editor de Markdown",
    "Exec=" + exeEscapado + " %f",
    "Icon=mdx",
    "Terminal=false",
    "MimeType=text/markdown;",
    "Categories=Office;TextEditor;"
  ].join("\n") + "\n";
  const archivoDesktop = path.join(dirApps, "mdx.desktop");
  fs.writeFileSync(archivoDesktop, escritorio);
  fs.chmodSync(archivoDesktop, 0o755);

  await execFileP("xdg-mime", ["default", "mdx.desktop", "text/markdown"]);
  await execFileP("update-desktop-database", [dirApps]).catch(function(){});
  await execFileP("gtk-update-icon-cache", ["-f", path.join(home, ".local", "share", "icons", "hicolor")]).catch(function(){});
}

function ventanaActiva(){
  return BrowserWindow.getFocusedWindow() || (ventanas[0] && ventanas[0].win) || null;
}

async function usarComoPredeterminado(){
  var win = ventanaActiva();
  try{
    if(process.platform === "win32"){
      await registrarWindows();
      await dialog.showMessageBox(win, {
        type: "info", title: NOMBRE_APP,
        message: "MDx ya quedó registrado con su nombre e icono correctos. Ahora se abre el cuadro «¿Cómo quieres abrir este archivo?» - elige MDx y marca «Usar siempre esta aplicación» para terminar."
      });
      abrirSelectorWindows();
    }else if(process.platform === "linux"){
      await registrarLinux();
      dialog.showMessageBox(win, {
        type: "info", title: NOMBRE_APP,
        message: "Listo: los archivos .md ya se abren con MDx. Si el icono en tu gestor de archivos no cambia enseguida, cierra sesión y vuelve a entrar (algunos escritorios refrescan el caché de iconos ahí)."
      });
    }else{
      dialog.showMessageBox(win, {
        type: "info", title: NOMBRE_APP,
        message: "En macOS: clic derecho en un .md → Obtener información → «Abrir con» → MDx → «Cambiar todos…»."
      });
    }
  }catch(err){
    dialog.showMessageBox(win, {
      type: "error", title: NOMBRE_APP,
      message: "No se pudo registrar automáticamente (" + (err && err.message ? err.message : err) +
        ").\n\nHazlo a mano: clic derecho en un .md → Abrir con → elige MDx → «Usar siempre esta aplicación»."
    });
  }
}

function construirMenu(){
  var plantilla = [
    {
      label: NOMBRE_APP,
      submenu: [
        { label: "Usar " + NOMBRE_APP + " para abrir archivos .md", click: usarComoPredeterminado },
        { type: "separator" },
        { role: "quit", label: "Salir" }
      ]
    },
    { role: "editMenu" },
    { role: "viewMenu" }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(plantilla));
}

function ventanaPorRuta(ruta){
  if(!ruta) return null;
  for(var i = 0; i < ventanas.length; i++){
    if(ventanas[i].ruta === ruta) return ventanas[i].win;
  }
  return null;
}

/* el archivo se manda a la ventana ANTES de cargar index.html (ver
   preload.js: lo pide de forma síncrona vía ipcMain.on de más abajo), no
   después con executeJavaScript -- así no compite con la restauración del
   documento anterior que hace la propia página al arrancar. */
function crearVentana(rutaInicial){
  var win = new BrowserWindow({
    width: 1100,
    height: 800,
    autoHideMenuBar: false,
    backgroundColor: "#ffffff",
    icon: path.join(__dirname, "app", "iconos", "icono-512.png"),
    webPreferences: { sandbox: true, preload: path.join(__dirname, "preload.js") }
  });
  var registro = { win: win, ruta: rutaInicial || null };
  ventanas.push(registro);
  win.on("closed", function(){
    var i = ventanas.indexOf(registro);
    if(i !== -1) ventanas.splice(i, 1);
  });
  if(rutaInicial){
    var nombre = path.basename(rutaInicial);
    try{
      pendientes.set(win.webContents.id, {
        texto: fs.readFileSync(rutaInicial, "utf8"),
        nombre: nombre,
        opciones: { origen: "local", version: 1, descargado: Date.now(), aviso: "Abierto: " + nombre }
      });
    }catch(e){
      pendientes.set(win.webContents.id, null);
    }
  }
  win.loadFile(path.join(__dirname, "app", "index.html"));
  return win;
}

ipcMain.on("mdx-archivo-inicial", function(event){
  var id = event.sender.id;
  event.returnValue = pendientes.has(id) ? pendientes.get(id) : null;
  pendientes.delete(id);
});

/* abrir un archivo desde el sistema (doble clic, "Abrir con", una segunda
   instancia): si ya está abierto en alguna ventana, se enfoca esa en vez de
   duplicarlo; si no, se abre una ventana nueva y la que ya estaba en pantalla
   queda intacta -- antes se reusaba siempre la misma ventana y se pisaba lo
   que hubiera. */
function abrirArchivo(ruta){
  var existente = ventanaPorRuta(ruta);
  if(existente){
    if(existente.isMinimized()) existente.restore();
    existente.focus();
    return;
  }
  crearVentana(ruta);
}

const bloqueoUnico = app.requestSingleInstanceLock();
if(!bloqueoUnico){
  app.quit();
}else{
  app.on("second-instance", function(_ev, argv){
    var ruta = archivoDesdeArgv(argv);
    if(ruta){
      abrirArchivo(ruta);
    }else{
      var win = ventanaActiva();
      if(win){
        if(win.isMinimized()) win.restore();
        win.focus();
      }
    }
  });

  app.whenReady().then(function(){
    construirMenu();
    var ruta = archivoDesdeArgv(process.argv.slice(app.isPackaged ? 1 : 2));
    crearVentana(ruta);
  });

  app.on("window-all-closed", function(){
    if(process.platform !== "darwin") app.quit();
  });
}

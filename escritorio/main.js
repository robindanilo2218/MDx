const { app, BrowserWindow, Menu, dialog } = require("electron");
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

let ventana = null;

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

async function usarComoPredeterminado(){
  try{
    if(process.platform === "win32"){
      await registrarWindows();
      await dialog.showMessageBox(ventana, {
        type: "info", title: NOMBRE_APP,
        message: "MDx ya quedó registrado con su nombre e icono correctos. Ahora se abre el cuadro «¿Cómo quieres abrir este archivo?» - elige MDx y marca «Usar siempre esta aplicación» para terminar."
      });
      abrirSelectorWindows();
    }else if(process.platform === "linux"){
      await registrarLinux();
      dialog.showMessageBox(ventana, {
        type: "info", title: NOMBRE_APP,
        message: "Listo: los archivos .md ya se abren con MDx. Si el icono en tu gestor de archivos no cambia enseguida, cierra sesión y vuelve a entrar (algunos escritorios refrescan el caché de iconos ahí)."
      });
    }else{
      dialog.showMessageBox(ventana, {
        type: "info", title: NOMBRE_APP,
        message: "En macOS: clic derecho en un .md → Obtener información → «Abrir con» → MDx → «Cambiar todos…»."
      });
    }
  }catch(err){
    dialog.showMessageBox(ventana, {
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
    autoHideMenuBar: false,
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
    construirMenu();
    var ruta = archivoDesdeArgv(process.argv.slice(app.isPackaged ? 1 : 2));
    crearVentana(ruta);
  });

  app.on("window-all-closed", function(){
    if(process.platform !== "darwin") app.quit();
  });
}

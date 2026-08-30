const { contextBridge, ipcRenderer } = require("electron");

/* mdx-archivo-inicial es síncrono a propósito: corre ANTES que cualquier
   línea del script de index.html (los preload siempre corren primero), así
   que el archivo con el que se abrió esta ventana (si lo hay) queda listo
   antes de que arranque la restauración por almacén -- sin eso, esa
   restauración es asíncrona y a veces gana la carrera, mostrando un
   documento anterior en vez del que se acaba de abrir. */
var archivoInicial = null;
try{
  archivoInicial = ipcRenderer.sendSync("mdx-archivo-inicial");
}catch(e){
  archivoInicial = null;
}
contextBridge.exposeInMainWorld("mdxArchivoInicial", archivoInicial);

const {app, BrowserWindow} = require('electron')

  // Mantén una referencia global del objeto ventana, si no lo haces, la ventana se
  // cerrará automáticamente cuando el objeto de JavaScript sea basura colleccionada.
  let win

//var usbDetect = require('usb-detection');


  
  function createWindow () {
    // Crea la ventana del navegador.
    win = new BrowserWindow({width:1000,height:1000,backgroundColor: '#ffffff',icon:`file://${__dirname}/dist/assets/icon.png`})
  
    // y carga el archivo index.html de la aplicación.
    win.loadURL(`file://${__dirname}/dist/index.html`)
  
     //Abre las herramientas de desarrollo.
    //win.webContents.openDevTools()

    // Emitido cuando la ventana es cerrada.
    win.on('closed', () => {
      // Desreferencia el objeto ventana, usualmente tu guardarias ventanas
      // en un arreglo si tu aplicación soporta multi ventanas, este es el momento
      // cuando tu deberías borrar el elemento correspiente.
      win = null
    })
  }
  
  // Este método será llamado cuando Electron haya terminado
  // la inicialización y esté listo para crear ventanas del navegador.
  // Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.
  app.on('ready', createWindow)
  
  // Salir cuando todas las ventanas estén cerradas.
  app.on('window-all-closed', () => {
    // En macOS es común para las aplicaciones y sus barras de menú
    // que estén activas hasta que el usuario salga explicitamente con Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // En macOS es común volver a crear una ventana en la aplicación cuando el
    // icono del dock es clickeado y no hay otras ventanas abieras.
    if (win === null) {
      createWindow()
    }
  })
  
  // En este archivo tu puedes incluir el resto del código del proceso principal de
  // tu aplicación. Tu también puedes ponerlos en archivos separados y requerirlos aquí.
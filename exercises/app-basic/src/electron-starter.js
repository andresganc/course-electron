// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Uso de electron-reload
if (process.env.NODE_ENV !== 'production'){
  require('electron-reload')(__dirname, {
    // Linea adicional para el reload de los archivos .js (Electron)
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
  })
}


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
    /*
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
    */
    
  })

  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')

  // Carga para React en http://localhost:3000
  mainWindow.loadURL("http://localhost:3000");


  // ========================== CARGA DE ELECTRON & REACT EN DEV Y BUILD INICIO =======================
  /*
  mainWindow.loadURL(url.format({
    pathname: path.join(_dirname, "/../build/index.html"),
    protocol: "file:",
    slashes: true
  }))
  */
  
  /*
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);
  */
  // ========================== CARGA DE ELECTRON & REACT EN DEV Y BUILD FIN =======================
  
  // Open the DevTools. (Activar o desactivar la ventana de herramientas para desarroladores)
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // ================= Llamada de Menu ====================
  const mainMenu = Menu.buildFromTemplate(MenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

// ================= Menu ====================
const MenuTemplate = [
  {

    label: 'File',
    submenu: [
      {
        label: 'Nuevo Producto',
        accelerator: 'Ctrl+N',
        click() {
          alert('New Product')
        }
      }
    ]

  }
]
// ================= Menu ====================

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

/*
app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(url.format({
    //pathname: path.join(__dirname, '/../build/index.html'),
    //protoco: 'file:',
    //slashes: true
  }))

  //const mainMenu = Menu.buildFromTemplate(MenuTemplate);
  //Menu.setApplicationMenu(mainMenu);
})
*/



// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
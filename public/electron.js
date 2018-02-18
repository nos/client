/* eslint-disable */
const electron = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

const { app, BrowserWindow, ipcMain: ipc } = electron;

// Manage login state on the main app.
let wif = null;

ipc.on('login', (event, { wif: newWif }) => {
  wif = newWif;
});

ipc.on('logout', (event) => {
  wif = null;
});

ipc.on('get-wif', (event, arg) => {
  event.returnValue = wif;
});

function installExtensions() {
  const {
    default: installer,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
  } = require('electron-devtools-installer');

  const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];

  return Promise.all(extensions.map((extension) => installer(extension)));
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preloadMain.js')
    }
  });
  mainWindow.loadURL(process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../build/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  if (isDev) {
    installExtensions().then(createWindow);
  } else {
    createWindow();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

import { app, protocol, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';
import url from 'url';

import getStaticPath from './util/getStaticPath';
import bindMenus from './util/bindMenus';
import injectHeaders from './util/injectHeaders';
import installExtensions from './util/installExtensions';
import registerNosProtocol from './util/registerNosProtocol';

// This wouldn't be necessary if we could call `electron-webpack` directly.  But since we have to
// use webpack-cli (as a result of using a custom webpack config), we are faking this env var
// already being assigned.
if (isDev) {
  process.env.ELECTRON_WEBPACK_WDS_PORT = process.env.ELECTRON_WEBPACK_WDS_PORT || 9080;
}

protocol.registerStandardSchemes(['nos']);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let splashWindow;

const isMac = process.platform === 'darwin';

function getWindowPath(productionPath, filename) {
  return isDev
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}/${filename}`
    : url.format({ pathname: path.join(productionPath, filename), protocol: 'file:', slashes: true });
}

function createWindow() {
  const framelessConfig = isMac ? { titleBarStyle: 'hidden' } : { frame: false };

  const iconPath = path.join(getStaticPath(), 'icons', 'icon1024x1024.png');

  mainWindow = new BrowserWindow(
    Object.assign({ width: 1250, height: 700, show: false, icon: iconPath }, framelessConfig)
  );

  bindMenus(mainWindow);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // splashWindow is shown while mainWindow is loading hidden
  // As it is light weight it will load almost instantly and before mainWindow
  splashWindow = new BrowserWindow({
    width: 275,
    height: 330,
    show: true,
    titleBarStyle: 'customButtonsOnHover',
    frame: false,
    icon: iconPath
  });

  splashWindow.loadURL(getWindowPath(getStaticPath(), 'splash.html'));
  mainWindow.loadURL(getWindowPath(__dirname, 'index.html'));

  // When mainWindow finishes loading, then show
  // the mainWindow and destroy the splashWindow.
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.maximize();
    mainWindow.show();
    splashWindow.destroy();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  registerNosProtocol();
  injectHeaders();

  if (isDev) {
    await installExtensions();
  }

  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

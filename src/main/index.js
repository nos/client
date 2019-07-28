import { app, protocol, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import isDev from 'electron-is-dev';
import path from 'path';
import url from 'url';

import getStaticPath from './util/getStaticPath';
import bindApplicationMenu from './util/bindApplicationMenu';
import bindContextMenu from './util/bindContextMenu';
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
const iconPath = path.join(getStaticPath(), 'icons', 'icon1024x1024.png');

function getWindowPath(productionPath, filename) {
  const windowPath = isDev
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}/${filename}`
    : url.format({
      pathname: path.join(productionPath, filename),
      protocol: 'file:',
      slashes: true
    });

  // There is a peculiar bug that is causing the window location to redirect to the current URL, but
  // with an empty query string appended. By loading that URL initially instead, no redirect occurs.
  // REF: https://github.com/nos/client/issues/340#issuecomment-414095942
  return windowPath.includes('?') ? windowPath : `${windowPath}?`;
}

function createMainWindow() {
  const framelessConfig = isMac ? { titleBarStyle: 'hidden' } : { frame: false };

  // Main Window
  mainWindow = new BrowserWindow(
    Object.assign(
      { width: 1250, height: 720, minWidth: 1250, minHeight: 720, show: false, icon: iconPath },
      framelessConfig
    )
  );
  mainWindow.loadURL(getWindowPath(__dirname, 'index.html'));

  bindApplicationMenu(mainWindow);
  bindContextMenu(mainWindow);

  if (isDev) {
    mainWindow.webContents.once('dom-ready', () => {
      mainWindow.webContents.openDevTools();
    });
  }

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.maximize();
    mainWindow.show();
    splashWindow.destroy();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createSplashWindow() {
  // splashWindow is shown while mainWindow is loading hidden
  // As it is light weight it will load almost instantly and before mainWindow
  splashWindow = new BrowserWindow({
    width: 320,
    height: 320,
    titleBarStyle: 'customButtonsOnHover',
    show: false,
    frame: false,
    transparent: true,
    icon: iconPath
  });

  splashWindow.loadURL(getWindowPath(getStaticPath(), 'splash.html'));
  splashWindow.once('ready-to-show', () => {
    splashWindow.show();

    if (isDev) {
      createMainWindow();
    } else {
      autoUpdater.allowPrerelease = false;
      autoUpdater.checkForUpdates();
      autoUpdater.on('update-available', ({ version }) => {
        splashWindow.webContents.send('updaterMsg', `Updating nOS client to version ${version}`);
      });
      autoUpdater.on('update-not-available', () => {
        createMainWindow();
      });
      autoUpdater.on('update-downloaded', () => {
        autoUpdater.quitAndInstall();
      });
    }
  });
}

// Methods which require to be called BEFORE the app is ready
app.commandLine.appendSwitch('ignore-gpu-blacklist');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  registerNosProtocol();
  injectHeaders();

  if (isDev) {
    await installExtensions();
  }

  createSplashWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow();
  }
});

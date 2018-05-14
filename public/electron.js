const electron = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');
const resolve = require('./resolve');

const { app, protocol, BrowserWindow } = electron;

protocol.registerStandardSchemes(['nos']);

function registerProtocol() {
  protocol.registerHttpProtocol('nos', async (request, callback) => {
    try {
      const resolvedUrl = await resolve(url.parse(request.url));
      const result = Object.assign({}, request, { url: resolvedUrl });
      callback(result);
    } catch (error) {
      callback({ error });
    }
  });
}

function installExtensions() {
  const {
    default: installer,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
  } = require('electron-devtools-installer'); // eslint-disable-line global-require

  const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];

  return Promise.all(extensions.map((extension) => installer(extension)));
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let splashWindow;

const isMac = process.platform === 'darwin';

function createWindow() {
  const basePath = isDev ? __dirname : process.env.PUBLIC_URL;

  const framelessConfig = isMac ? { titleBarStyle: 'hidden' } : { frame: false };
  const iconPath = path.join(
    basePath,
    'icons/icon.png'
  );

  mainWindow = new BrowserWindow(
    Object.assign({ width: 1250, height: 700, show: false, icon: iconPath }, framelessConfig)
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // splashWindow is shown while mainWindow is loading hidden
  // As it is light weight it will load almost instantly and before mainWindow
  splashWindow = new BrowserWindow({ width: 1250, height: 700, show: true, icon: iconPath });

  splashWindow.loadURL(
    url.format({
      pathname: path.join(
        basePath,
        'splash.html'
      ),
      protocol: 'file:',
      slashes: true
    })
  );

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true
      })
  );

  // When mainWindow finishes loading, then show
  // the mainWindow and desotry the splashWindow.
  mainWindow.webContents.on('did-finish-load', () => {
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
app.on('ready', () => {
  registerProtocol();

  if (isDev) {
    installExtensions().then(createWindow);
  } else {
    createWindow();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (isMac) {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

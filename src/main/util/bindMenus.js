import localShortcut from 'electron-localshortcut';
import { app, shell, webContents, ipcMain, Menu } from 'electron';
import { noop, find } from 'lodash';

const isMac = process.platform === 'darwin';

const NULL_WEBVIEW = {
  canGoBack: () => false,
  canGoForward: () => false,
  isDevToolsOpened: () => false,
  goBack: noop,
  goForward: noop,
  reload: noop,
  on: noop,
  addListener: noop,
  removeListener: noop
};

function getWebview(id) {
  // For some reason, `webContents.fromId(activeId)` is throwing an error even though it seems to be
  // passing arguments of the correct type.
  // const webview = id && webContents.fromId.call(webContents, id);
  // return webview || NULL_WEBVIEW;

  const allWebContents = webContents.getAllWebContents();
  return find(allWebContents, (wc) => wc.getId() === id) || NULL_WEBVIEW;
}

function bindAppMenu(webview) {
  const template = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Stop',
          accelerator: isMac ? 'Cmd+.' : 'Esc',
          enabled: webview !== NULL_WEBVIEW && webview.isLoading(),
          click: () => webview.stop()
        },
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          enabled: webview !== NULL_WEBVIEW && !webview.isLoading(),
          click: () => webview.reload()
        },
        // { type: 'separator' },
        // { role: 'togglefullscreen' },
        // { role: 'resetzoom' },
        // { role: 'zoomin' },
        // { role: 'zoomout' },
        { type: 'separator' },
        {
          label: 'Toggle Developer Tools',
          type: 'checkbox',
          accelerator: isMac ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          enabled: webview !== NULL_WEBVIEW,
          checked: webview.isDevToolsOpened(),
          click: () => {
            if (webview.isDevToolsOpened()) {
              webview.closeDevTools();
            } else {
              webview.openDevTools();
            }
          }
        }
      ]
    },
    {
      label: 'History',
      submenu: [
        {
          label: 'Back',
          accelerator: 'CmdOrCtrl+[',
          enabled: webview.canGoBack(),
          click: () => webview.goBack()
        },
        {
          label: 'Forward',
          accelerator: 'CmdOrCtrl+]',
          enabled: webview.canGoForward(),
          click: () => webview.goForward()
        }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() { shell.openExternal('https://nos.io'); }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    // nOS menu
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    });

    // Edit menu
    find(template, { label: 'Edit' }).submenu.push(
      { type: 'separator' },
      {
        label: 'Speech',
        submenu: [
          { role: 'startspeaking' },
          { role: 'stopspeaking' }
        ]
      }
    );

    // Window menu
    find(template, { role: 'window' }).submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

export default function bindMenu(browserWindow) {
  let menu = null;
  let webview = NULL_WEBVIEW;

  function replaceMenu() {
    const oldMenu = menu;
    menu = bindAppMenu(webview);
    if (oldMenu) oldMenu.destroy();
  }

  function bindEventListeners() {
    webview.addListener('did-start-loading', replaceMenu);
    webview.addListener('did-stop-loading', replaceMenu);
    webview.addListener('devtools-opened', replaceMenu);
    webview.addListener('devtools-closed', replaceMenu);
  }

  function unbindEventListeners() {
    webview.removeListener('did-start-loading', replaceMenu);
    webview.removeListener('did-stop-loading', replaceMenu);
    webview.removeListener('devtools-opened', replaceMenu);
    webview.removeListener('devtools-closed', replaceMenu);
  }

  localShortcut.register(browserWindow, isMac ? 'Cmd+Left' : 'Alt+Left', () => {
    webview.goBack();
  });
  localShortcut.register(browserWindow, isMac ? 'Cmd+Right' : 'Alt+Right', () => {
    webview.goForward();
  });

  replaceMenu(webview);

  ipcMain.on('webview:focus', (event, id) => {
    unbindEventListeners();
    webview = getWebview(id);
    replaceMenu();
    bindEventListeners();
  });

  ipcMain.on('history:back', () => webview.goBack());
  ipcMain.on('history:forward', () => webview.goForward());
  ipcMain.on('view:reload', () => webview.reload());
}

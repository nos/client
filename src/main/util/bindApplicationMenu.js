import path from 'path';
import openAboutWindow from 'about-window';
import localShortcut from 'electron-localshortcut';
import { app, webContents, ipcMain, Menu, BrowserWindow } from 'electron';
import { noop, find, times } from 'lodash';

import getStaticPath from './getStaticPath';

const isMac = process.platform === 'darwin';

const NULL_WEBVIEW = {
  canGoBack: () => false,
  canGoForward: () => false,
  isDevToolsOpened: () => false,
  send: noop,
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

function ifMac(menuItem) {
  return isMac ? menuItem : null;
}

function filterItems(menuItems) {
  return menuItems.filter((item) => item);
}

const appMenu = () =>
  ifMac({
    label: app.getName(),
    submenu: [
      {
        label: 'About',
        click: () =>
          openAboutWindow({
            icon_path: path.join(getStaticPath(), 'icons', 'icon1024x1024.png'),
            package_json_dir: path.join('..', '..', '..'),
            bug_link_text: 'Report a bug',
            bug_report_url: 'https://github.com/nos/client/issues/new/choose'
          })
      },
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

const fileMenu = (browserWindow) => ({
  label: 'File',
  submenu: [
    {
      label: 'New Tab',
      accelerator: 'CmdOrCtrl+T',
      click: () => browserWindow.webContents.send('file:new-tab')
    },
    {
      label: 'Open Location',
      accelerator: 'CmdOrCtrl+L',
      click: () => browserWindow.webContents.send('file:open-location')
    },
    { type: 'separator' },
    {
      label: 'Close Tab',
      accelerator: 'CmdOrCtrl+W',
      click: () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();

        if (browserWindow.isFocused()) {
          browserWindow.webContents.send('file:close-tab');
        } else if (focusedWindow) {
          focusedWindow.close();
        }
      }
    }
  ]
});

const editMenu = () => ({
  label: 'Edit',
  submenu: filterItems([
    { role: 'undo' },
    { role: 'redo' },
    { type: 'separator' },
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    { role: 'pasteandmatchstyle' },
    { role: 'delete' },
    { role: 'selectall' },
    ifMac({ type: 'separator' }),
    ifMac({
      label: 'Speech',
      submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }]
    })
  ])
});

const viewMenu = (browserWindow, webview) => ({
  label: 'View',
  submenu: [
    {
      label: 'Stop',
      accelerator: isMac ? 'Cmd+.' : 'Esc',
      enabled: webview !== NULL_WEBVIEW && !webview.isLoading(),
      click: () => webview.stop()
    },
    {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      enabled: webview !== NULL_WEBVIEW && !webview.isLoading(),
      click: () => webview.reload()
    },
    { type: 'separator' },
    { role: 'togglefullscreen' },
    {
      label: 'Actual Size',
      accelerator: 'CommandOrControl+0',
      enabled: webview !== NULL_WEBVIEW && !webview.isLoading(),
      click: () => webview.setZoomLevel(0)
    },
    {
      label: 'Zoom In',
      accelerator: 'CommandOrControl+Plus',
      enabled: webview !== NULL_WEBVIEW && !webview.isLoading(),
      click: () => {
        webview.getZoomLevel((zoomLevel) => {
          webview.setZoomLevel(zoomLevel + 0.5);
        });
      }
    },
    {
      label: 'Zoom Out',
      accelerator: 'CommandOrControl+-',
      enabled: webview !== NULL_WEBVIEW && !webview.isLoading(),
      click: () => {
        webview.getZoomLevel((zoomLevel) => {
          webview.setZoomLevel(zoomLevel - 0.5);
        });
      }
    },
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
});

const historyMenu = (browserWindow, webview) => ({
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
});

const windowMenu = (browserWindow) => ({
  role: 'window',
  submenu: filterItems([
    { role: 'minimize' },
    ifMac({ role: 'zoom' }),
    { type: 'separator' },
    {
      label: 'Select Next Tab',
      accelerator: 'Ctrl+Tab',
      click: () => browserWindow.webContents.send('window:next-tab')
    },
    {
      label: 'Select Previous Tab',
      accelerator: 'Shift+Ctrl+Tab',
      click: () => browserWindow.webContents.send('window:previous-tab')
    },
    ifMac({ type: 'separator' }),
    ifMac({ role: 'front' })
  ])
});

const helpMenu = (browserWindow) => ({
  role: 'help',
  submenu: [
    {
      label: 'Learn More',
      click: () => browserWindow.webContents.send('file:new-tab', 'https://nos.io')
    }
  ]
});

function bindAppMenu(browserWindow, webview) {
  const menus = [appMenu, fileMenu, editMenu, viewMenu, historyMenu, windowMenu, helpMenu];

  const template = filterItems(
    menus.map((builder) => {
      return builder(browserWindow, webview);
    })
  );

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function registerShortcuts(browserWindow, getActiveWebview) {
  // navigation
  localShortcut.register(browserWindow, isMac ? 'Cmd+Left' : 'Alt+Left', () => {
    getActiveWebview().goBack();
  });

  localShortcut.register(browserWindow, isMac ? 'Cmd+Right' : 'Alt+Right', () => {
    getActiveWebview().goForward();
  });

  // tab switching
  times(8, (i) => {
    localShortcut.register(browserWindow, `CmdOrCtrl+${i + 1}`, () => {
      browserWindow.webContents.send('window:goto-tab', i + 1);
    });
  });

  localShortcut.register(browserWindow, 'CmdOrCtrl+9', () => {
    browserWindow.webContents.send('window:goto-tab', 'last');
  });

  // mouse buttons (Windows only)
  browserWindow.on('app-command', (event, command) => {
    if (command === 'browser-backward') {
      getActiveWebview().goBack();
    } else if (command === 'browser-forward') {
      getActiveWebview().goForward();
    } else if (command === 'close') {
      browserWindow.webContents.send('file:close-tab');
    }
  });
}

export default function bindApplicationMenu(browserWindow) {
  let menu = null;
  let webview = NULL_WEBVIEW;

  function replaceMenu() {
    const oldMenu = menu;
    menu = bindAppMenu(browserWindow, webview);
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

  registerShortcuts(browserWindow, () => webview);
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

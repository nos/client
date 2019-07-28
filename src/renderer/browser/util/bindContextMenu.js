import contextMenu from 'electron-context-menu';

function prepend(_params, browserWindow) {
  return [
    {
      label: 'Back',
      enabled: browserWindow.canGoBack(),
      click: () => browserWindow.goBack()
    },
    {
      label: 'Forward',
      enabled: browserWindow.canGoForward(),
      click: () => browserWindow.goForward()
    },
    browserWindow.isLoading()
      ? {
          label: 'Stop',
          click: () => browserWindow.stop()
        }
      : {
          label: 'Reload',
          click: () => browserWindow.reload()
        },
    { type: 'separator' }
  ];
}

function bindOnce(emitter, event, callback) {
  function bind() {
    callback();
    emitter.removeEventListener(event, bind);
  }

  emitter.addEventListener(event, bind);
}

export default function bindContextMenu(browserWindowOrWebview) {
  bindOnce(browserWindowOrWebview, 'dom-ready', () => {
    contextMenu({
      window: browserWindowOrWebview,
      showInspectElement: true,
      prepend
    });
  });
}

const { noop } = require('lodash');

module.exports = {
  app: {
    getPath: () => {
      return '/tmp';
    }
  },

  remote: {
    BrowserWindow: {
      getFocusedWindow: () => ({
        minimize: noop,
        maximize: noop,
        unmaximize: noop,
        isMaximized: noop
      })
    }
  },

  ipcRenderer: {
    send: noop,
    on: noop,
    removeListener: noop
  }
};

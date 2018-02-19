const { ipcRenderer: ipc } = require('electron');

const { alert } = window;

function alertWIF() {
  alert(ipc.sendSync('get-wif'));
}

process.once('loaded', () => {
  // Be careful not to expose any functionality or APIs that could compromise the user's system.
  // For example, don't directly expose core Electron (even IPC) or node.js modules.
  window.NOS = {
    alertWIF
  };
});

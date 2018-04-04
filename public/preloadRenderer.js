const electron = require('electron');
const { uniqueId } = require('lodash');

const { ipcRenderer } = electron;

function createDelegate(channel) {
  return (...args) => new Promise((resolve, reject) => {
    const id = uniqueId();
    const successChannel = `${channel}-success-${id}`;
    const failureChannel = `${channel}-failure-${id}`;

    try {
      ipcRenderer.once(successChannel, (event, ...successArgs) => resolve(...successArgs));
      ipcRenderer.once(failureChannel, (event, message) => reject(new Error(message)));
      ipcRenderer.sendToHost(channel, id, ...args);
    } catch (err) {
      reject(err);
    } finally {
      ipcRenderer.removeListener(successChannel, resolve);
      ipcRenderer.removeListener(failureChannel, reject);
    }
  });
}

const V1 = {
  getAddress: createDelegate('getAddress'),
  getBalance: createDelegate('getBalance')
};

process.once('loaded', () => {
  // Be careful not to expose any functionality or APIs that could compromise the user's system.
  // For example, don't directly expose core Electron (even IPC) or node.js modules.
  window.NOS = { V1 };
});

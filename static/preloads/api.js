const { ipcRenderer } = require('electron');
const uuid = require('uuid/v1');

function createDelegate(channel) {
  return (...args) =>
    new Promise((resolve, reject) => {
      const id = uuid();
      const successChannel = `${channel}-success-${id}`;
      const failureChannel = `${channel}-failure-${id}`;

      ipcRenderer.once(successChannel, (event, ...successArgs) => {
        ipcRenderer.removeAllListeners(failureChannel);
        resolve(...successArgs);
      });

      ipcRenderer.once(failureChannel, (event, message) => {
        ipcRenderer.removeAllListeners(successChannel);
        reject(new Error(message));
      });

      ipcRenderer.sendToHost(channel, id, ...args);
    });
}

const api = {
  // No persmissions required
  getAddress: createDelegate('getAddress'),
  getBalance: createDelegate('getBalance'),
  getStorage: createDelegate('getStorage'),
  getLastBlock: createDelegate('getLastBlock'),
  getPublicKey: createDelegate('getPublicKey'),
  testInvoke: createDelegate('testInvoke'),
  encrypt: createDelegate('encrypt'),
  decrypt: createDelegate('decrypt'),

  // Permissions required
  invoke: createDelegate('invoke'),
  send: createDelegate('send'),
  claimGas: createDelegate('claimGas')
};

module.exports = api;

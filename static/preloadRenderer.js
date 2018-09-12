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

const ASSETS = {
  NEO: 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
  GAS: '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7'
};

const V1 = {
  // No persmissions required
  getAddress: createDelegate('getAddress'),
  getBalance: createDelegate('getBalance'),
  getStorage: createDelegate('getStorage'),
  testInvoke: createDelegate('testInvoke'),
  getLastBlock: createDelegate('getLastBlock'),

  // Permissions required
  invoke: createDelegate('invoke'),
  send: createDelegate('send'),
  claimGas: createDelegate('claimGas')
};

process.once('loaded', () => {
  // Be careful not to expose any functionality or APIs that could compromise the user's system.
  // For example, don't directly expose core Electron (even IPC) or node.js modules.
  window.NOS = { ASSETS, V1 };
});

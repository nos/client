const electron = require('electron');
const uuid = require('uuid/v1');
const { each, isEmpty, isUndefined } = require('lodash');

const { ipcRenderer } = electron;

function createDelegate(channel) {
  return (...args) => new Promise((resolve, reject) => {
    const id = uuid();
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

const subscriptions = {};

function on(eventName, callback) {
  const id = uuid();
  subscriptions[eventName] = subscriptions[eventName] || {};
  subscriptions[eventName][id] = callback;
  return id;
}

function off(eventName, id) {
  if (!eventName || !subscriptions[eventName]) {
    return;
  }

  if (isUndefined(id)) {
    delete subscriptions[eventName];
  } else {
    delete subscriptions[eventName][id];

    if (isEmpty(subscriptions[eventName])) {
      delete subscriptions[eventName];
    }
  }
}

function once(eventName, callback) {
  const id = on(eventName, (...args) => {
    off(eventName, id);
    callback(...args);
  });
  return id;
}

ipcRenderer.on('event', (event, eventName, ...args) => {
  each(subscriptions[eventName], (callback) => callback(...args));
});

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
  claimGas: createDelegate('claimGas'),

  // Events
  on,
  off,
  once
};

process.once('loaded', () => {
  // Be careful not to expose any functionality or APIs that could compromise the user's system.
  // For example, don't directly expose core Electron (even IPC) or node.js modules.
  window.NOS = { ASSETS, V1 };
});

const { v1: uuid } = require('uuid');
const { ipcRenderer } = require('electron');
const { each, isEmpty, isUndefined } = require('lodash');

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

module.exports.on = on;
module.exports.off = off;
module.exports.once = once;

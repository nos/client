const scroller = require('electron-scroller');

const api = require('./preloads/api');
const events = require('./preloads/events');
const handleErrors = require('./preloads/handleErrors');

handleErrors(document);

const ASSETS = {
  NEO: 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
  GAS: '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7'
};

const V1 = { ...api, ...events };

process.once('loaded', () => {
  // Be careful not to expose any functionality or APIs that could compromise the user's system.
  // For example, don't directly expose core Electron (even IPC) or node.js modules.
  window.NOS = { ASSETS, V1 };

  // Preserve scroll position when using back/forward.
  scroller.preload();
});

const { ipcRenderer } = require('electron');

const KEY_CTRL = 17;

const isMac = process.platform === 'darwin';

module.exports = function handleZoom(document) {
  let isCtrl = false;

  function ctrlCheck(event) {
    if (event.which === KEY_CTRL) {
      isCtrl = event.type === 'keydown';
    }
  }

  function isZooming(event) {
    return (isMac && event.metaKey) || (!isMac && isCtrl);
  }

  document.addEventListener('mousewheel', (event) => {
    if (isZooming(event)) {
      event.preventDefault();
      ipcRenderer.sendToHost('view:zoom', event.deltaY);
    }
  });

  document.addEventListener('keydown', ctrlCheck);
  document.addEventListener('keyup', ctrlCheck);
};

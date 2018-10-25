const electron = require('electron');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const { URL } = require('whatwg-url');

const { ipcRenderer } = electron;

ejs.fileLoader = (filePath) => {
  return fs.readFileSync(path.normalize(path.join(__dirname, '..', filePath)));
};

module.exports = function handleErrors(document) {
  function renderErrorPage(data) {
    ejs.renderFile('error.ejs', data, (err, content) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(`Failed to render error page. Error code "${data.errorDescription}".`);
        return;
      }

      document.open('text/html', 'replace');
      document.write(content);
      document.close();
    });
  }

  ipcRenderer.on('did-fail-load', (event, validatedURL, errorCode, errorDescription) => {
    const url = new URL(validatedURL);
    renderErrorPage({ host: url.hostname, errorCode, errorDescription });
  });
};

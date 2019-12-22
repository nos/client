import 'babel-polyfill'; // TODO - remove if possible, only needed for @ledgerhq/hw-transport-node-hid

import React from 'react';
import ReactDOM from 'react-dom';
import { Managers } from '@arkecosystem/crypto';
import 'what-input';

import 'root/stylesheets/global.scss';

import { Root } from './root';

function render(Component) {
  ReactDOM.render(<Component />, document.getElementById('app'));
}

render(Root);

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  console.info('Running in dev mode..');
  Managers.configManager.setFromPreset('testnet');
} else {
  Managers.configManager.setFromPreset('mainnet');
}

if (module.hot) {
  module.hot.accept('./root', () => {
    const NextRoot = require('./root').Root; // eslint-disable-line global-require
    render(NextRoot);
  });
}

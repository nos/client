import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import 'what-input';

import 'root/stylesheets/global.scss';

import { Root } from './root';

function render(Component) {
  ReactDOM.render(<Component />, document.getElementById('app'));
}

render(Root);

if (module.hot) {
  module.hot.accept('./root', () => {
    const NextRoot = require('./root').Root; // eslint-disable-line global-require
    render(NextRoot);
  });
}

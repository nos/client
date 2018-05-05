import React from 'react';
import ReactDOM from 'react-dom';
import 'what-input';

import { Root } from './root';
import registerServiceWorker from './registerServiceWorker';

import './root/stylesheets/global.scss';

function render(Component) {
  ReactDOM.render(<Component />, document.getElementById('root'));
}

render(Root);
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./root', () => {
    const NextRoot = require('./root').Root; // eslint-disable-line global-require
    render(NextRoot);
  });
}

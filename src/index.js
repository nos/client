import React from 'react';
import ReactDOM from 'react-dom';
import 'what-input';

import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';

import './shared/stylesheets/global.scss';

function render(Component) {
  ReactDOM.render(<Component />, document.getElementById('root'));
}

render(Root);
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root').default; // eslint-disable-line global-require
    render(NextRoot);
  });
}

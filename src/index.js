import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

function render(Component) {
  ReactDOM.render(<Component />, document.getElementById('root'));
}

render(Root);
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root').default; // eslint-disable-line global-require
    render(NextRoot);
  });
}

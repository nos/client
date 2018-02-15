import React from 'react';
import { HashRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from '../App';
import Routes from '../Routes';
import reducers from '../../reducers';

const store = createStore(reducers);

export default function Root() {
  return (
    <HashRouter>
      <Provider store={store}>
        <App>
          <Routes />
        </App>
      </Provider>
    </HashRouter>
  );
}

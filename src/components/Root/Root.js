import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from '../App';
import Routes from '../Routes';
import configureStore from '../../store/configureStore';

const store = configureStore();

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

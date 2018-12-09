/* eslint-disable import/no-extraneous-dependencies, global-require */
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { saga } from 'spunky';
import { identity } from 'lodash';

import createRootReducer from '../reducers';

export default function configureStore(history) {
  const initialState = {
    spunky: {
      auth: {
        batch: false,
        progress: 'LOADED',
        rollbackProgress: 'LOADED',
        loadedCount: 1,
        data: {
          wif: 'KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr',
          address: 'AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y'
        },
        error: null
      }
    }
  };
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [thunk, sagaMiddleware, routerMiddleware(history)];

  const composeEnhancers =
    process.env.NODE_ENV === 'production'
      ? identity
      : require('redux-devtools-extension').composeWithDevTools;

  const enhancers = composeEnhancers(applyMiddleware(...middleware));
  const store = createStore(
    createRootReducer(history),
    initialState,
    enhancers
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextCreateRootReducer = require('../reducers').default;
      store.replaceReducer(nextCreateRootReducer(history));
    });
  }

  sagaMiddleware.run(saga);

  return store;
}

/* eslint-disable import/no-extraneous-dependencies, global-require */
import { createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { saga } from 'spunky';
import { identity } from 'lodash';

import reducers from '../reducers';

export default function configureStore(history) {
  const initialState = {};
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [thunk, sagaMiddleware, routerMiddleware(history)];

  const composeEnhancers = process.env.NODE_ENV === 'production'
    ? identity
    : require('redux-devtools-extension').composeWithDevTools;

  const enhancers = composeEnhancers(applyMiddleware(...middleware));
  const store = createStore(connectRouter(history)(reducers), initialState, enhancers);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  sagaMiddleware.run(saga);

  return store;
}

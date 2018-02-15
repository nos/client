/* eslint-disable import/no-extraneous-dependencies, global-require */
import { createStore, applyMiddleware } from 'redux';

import reducer from '../reducers';

export default function configureStore(initialState = {}) {
  const middleware = [];

  const composeWithDevTools = process.env.NODE_ENV === 'production'
    ? obj => obj
    : require('redux-devtools-extension').composeWithDevTools;

  const enhancers = composeWithDevTools(applyMiddleware(...middleware));
  const store = createStore(reducer, initialState, enhancers);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
}

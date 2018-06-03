import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { createStore as createReduxStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducers from 'root/reducers';

export const createStore = (initialState = {}) => {
  return createReduxStore(reducers, initialState, applyMiddleware(thunk));
};

export const createMockStore = configureStore([thunk]);

export const provideStore = (node, store) => {
  return <Provider store={store}>{node}</Provider>;
};

export const provideState = (node, initialState = {}) => {
  const store = createMockStore(initialState);
  return provideStore(node, store);
};

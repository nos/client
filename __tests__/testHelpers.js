import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { saga, progressValues } from 'spunky';
import { get } from 'lodash';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'connected-react-router';

import reducers from 'root/reducers';

export const createStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const history = createHistory();
  const store = createReduxStore(
    reducers(history),
    initialState,
    compose(applyMiddleware(routerMiddleware(history), thunk, sagaMiddleware))
  );
  sagaMiddleware.run(saga);
  return store;
};

export const createMockStore = configureStore([thunk]);

export const provideStore = (node, store) => {
  return <Provider store={store}>{node}</Provider>;
};

export const provideState = (node, initialState = {}) => {
  const store = createMockStore(initialState);
  return provideStore(node, store);
};

const spunkyInitialState = {
  batch: false,
  progress: progressValues.INITIAL,
  rollbackProgress: null,
  loadedCount: 0,
  data: null,
  error: null
};

export const spunkyKey = 'spunky';

export const mockSpunkyLoaded = (data, { loadedCount = 1 } = {}) => ({
  ...spunkyInitialState,
  progress: progressValues.LOADED,
  loadedCount,
  data
});

export const mockSpunkyLoading = ({ loadedCount = 0 } = {}) => ({
  ...spunkyInitialState,
  progress: progressValues.LOADING,
  loadedCount
});

export const mockSpunkyFailed = (error, { loadedCount = 0 } = {}) => ({
  ...spunkyInitialState,
  progress: progressValues.FAILED,
  loadedCount,
  error
});

export const addLoadedListener = (store, storeKey, callback) => {
  const unsubscribe = store.subscribe(() => {
    const key = `${spunkyKey}.${storeKey}.progress`;
    const progress = get(store.getState(), key);

    if (progress === progressValues.LOADED || progress === progressValues.FAILED) {
      unsubscribe();
      callback();
    }
  });
};

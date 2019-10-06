/* eslint-disable import/no-extraneous-dependencies, global-require */
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { saga } from 'spunky';
import { identity } from 'lodash';

import createRootReducer from '../reducers';

export default function configureStore(history) {
  // const initialState = {};

  const initialState = {
    spunky: {
      auth: {
        batch: false,
        progress: 'LOADED',
        rollbackProgress: 'LOADED',
        loadedCount: 1,
        data: {
          accountLabel: 'Development Wallet',
          secretWord: 'Software Dev Wallet',
          isHardware: false,
          encryptedMnemonic:
            '2729f97ab8a718c5932dcf8ae2a10351:4899b2fd66ce73b95ff45239e41fdfac79876853a3d946026be659a087fd92a4236195fc15ceebc14a2653475c9587dd7a1ed972f6e8f95e55961dbef872a139c5f074b8dd08ee21d141d1ea52a4bdfa670ce93d1ed477cd5e058d15da3e27c548bd53df9641741c925a021ad4671cf946866dc731cc14959d59eb9e97fa1637d430c9b51f633ae7dae9ff04e7a116c1',
          activeWalletId: '108c0a1a-ddb6-4342-98d9-6501c4f5a362',
          wallet: {
            walletId: '108c0a1a-ddb6-4342-98d9-6501c4f5a362',
            walletLabel: 'MiewWalleett',
            canDelete: false,
            isHardware: false,
            index: 0,
            coinType: 888,
            account: 0,
            change: 0,
            net: 'MainNet',
            publicKey: '02b2548d08f7f4540e6fbecc58521d1032636652f1a4db6014ea1bd3448825f745',
            address: 'ANu8c1svNBG3ro6Rhg6W4LfT85dHxxMv1N',
            privateKey: 'd5d946dd17ff895c91f0a72432b8d3c50cf90fb9fcd20a6e7ae2f0fc4dccf432',
            wif: 'L4PQSH6XLgvnHPGn7HdNqx5cnmT8v8PFpJN3rhtpLVzmeLenXNz5'
          }
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
  const store = createStore(createRootReducer(history), initialState, enhancers);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextCreateRootReducer = require('../reducers').default;
      store.replaceReducer(nextCreateRootReducer(history));
    });
  }

  sagaMiddleware.run(saga);

  return store;
}

/* eslint-disable import/no-extraneous-dependencies, global-require */
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { saga } from 'spunky';
import { identity } from 'lodash';

import createRootReducer from '../reducers';

export default function configureStore(history) {
  let initialState = {
    spunky: {
      auth: {
        progress: 'LOADED',
        rollbackProgress: 'LOADED',
        data: {
          isLedger: false,
          accountLabel: '0.17435372167932273e',
          encryptedMnemonic:
            'ab77e7e7246e4e16d2a83e102b7a001d:6c51ece6a27a7698eb1ee5d18f8441a2c3ddc53e554c8c4d264edff6de25b8e67c3ba00d1aca8a58447cf933ec693c86d65b0616e3b18e86f6dfe3fec6a4a0798c80041afebf8afa952f63c7772636a0ea1bd5d4749ee887007590e66e5d9a96fbffe53b8bb69fd564f286f4f4cf07be25eb38a8c30ab214bc81436c4cc21f55055a74a4610d69f99e79e600ba6f012aedc7bbb5f92c33e7dfb19269fed2e38b',
          secretWord: 'MySercetWord',
          passphrase: 'q',
          mnemonic:
            'gain hidden ice foil fiction lemon despair iron shine wreck pause magic raw indicate label safe velvet will manual cheap prosper neutral exotic rescue',
          activeAccountId: '655e8d60-4401-4d71-b1ba-f805fc8f76e5',
          accounts: {
            '655e8d60-4401-4d71-b1ba-f805fc8f76e5': {
              accountId: '655e8d60-4401-4d71-b1ba-f805fc8f76e5',
              chainId: 888,
              index: 0,
              account: 0,
              change: 0,
              net: 'MainNet'
            },
            'eebe77cd-830d-41ba-ba69-acbba23651c5': {
              accountId: 'eebe77cd-830d-41ba-ba69-acbba23651c5',
              chainId: 60,
              index: 0,
              account: 0,
              change: 0,
              net: 'MainNet'
            }
          },
          instances: {
            '655e8d60-4401-4d71-b1ba-f805fc8f76e5': {
              address: 'ANkHHe9AXxi1zZnfqX2WeDLsyUndMgPNhj',
              privateKey: '0e021f1a96ee34f919b8a344618465c6aa45967dbc011e8ee11b3df9fe5a69d5',
              WIF: 'KwgwYKSUHznMwsZem9vdKE6wh7xdUeJyhmAbJK4dFsTz6xqDdHod',
              publicKey: '0380059b812d5d9eb42bb220d26f216dac2d3e208ddc7ae7a5f7692a3b4f9dd926',
              type: 'NEO',
              index: 0
            },
            'eebe77cd-830d-41ba-ba69-acbba23651c5': {
              privateKey: '03045891a21df8fa86e434a215f304b6955f3f9041a3899a5ef00ba99df2db8e',
              publicKey: '0x038e88330f0710a7f67691a6308d18bf30ec1a3bb27adbe463da408015f20e344b',
              address: '0x7cbe2da55e7a28b15fedc32d1e183b4a3c7848c4',
              WIF: 'KwKaLCWx3N8hGLk3cHWk2Ewsy16AwEMJdTtvFYcfFmRMgzz8dKDB',
              type: 'ETH',
              index: 0
            }
          }
        }
      }
    }
  };

  initialState = {};
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

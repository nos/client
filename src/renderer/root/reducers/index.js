import { combineReducers } from 'redux';
import { reducer as spunkyReducer } from 'spunky';
import { connectRouter } from 'connected-react-router';

import browserReducer from 'browser/reducers/browserReducer';
import requestsReducer from 'browser/reducers/requestsReducer';
import toastsReducer from 'shared/reducers/toastsReducer';

import dialogsReducer from './dialogsReducer';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    spunky: spunkyReducer,
    dialogs: dialogsReducer,
    browser: browserReducer,
    requests: requestsReducer,
    toasts: toastsReducer
  });

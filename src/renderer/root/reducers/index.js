import { combineReducers } from 'redux';
import { reducer as spunkyReducer } from 'spunky';

import browserReducer from 'browser/reducers/browserReducer';
import requestsReducer from 'browser/reducers/requestsReducer';
import toastsReducer from 'shared/reducers/toastsReducer';

import dialogsReducer from './dialogsReducer';

export default combineReducers({
  spunky: spunkyReducer,
  dialogs: dialogsReducer,
  browser: browserReducer,
  requests: requestsReducer,
  toasts: toastsReducer
});

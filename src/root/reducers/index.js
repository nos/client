import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as spunkyReducer } from 'spunky';

import requestsReducer from 'browser/reducers/requestsReducer';

import dialogsReducer from './dialogsReducer';

export default combineReducers({
  router: routerReducer,
  spunky: spunkyReducer,
  dialogs: dialogsReducer,
  requests: requestsReducer
});

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as spunkyReducer } from 'spunky';

import browserReducer from './browserReducer';
import dialogsReducer from './dialogsReducer';
import requestsReducer from './requestsReducer';

export default combineReducers({
  router: routerReducer,
  spunky: spunkyReducer,
  browser: browserReducer,
  dialogs: dialogsReducer,
  requests: requestsReducer
});

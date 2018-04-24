import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as spunkyReducer } from 'spunky';

import dialogsReducer from './dialogsReducer';
import requestsReducer from './requestsReducer';
import currentNetworkReducer from './currentNetworkReducer';

export default combineReducers({
  router: routerReducer,
  spunky: spunkyReducer,
  dialogs: dialogsReducer,
  requests: requestsReducer,
  currentNetwork: currentNetworkReducer
});

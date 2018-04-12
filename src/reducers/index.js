import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as spunkyReducer } from 'spunky';

import alertsReducer from './alertsReducer';
import requestsReducer from './requestsReducer';

export default combineReducers({
  router: routerReducer,
  spunky: spunkyReducer,
  alerts: alertsReducer,
  requests: requestsReducer
});

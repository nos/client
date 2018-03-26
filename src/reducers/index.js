import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as spunkyReducer } from 'spunky';

export default combineReducers({
  router: routerReducer,
  spunky: spunkyReducer
});

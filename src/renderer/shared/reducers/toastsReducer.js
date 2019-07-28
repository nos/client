import uuid from 'uuid/v1';
import { takeRight, filter } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';

import { ENQUEUE, DEQUEUE } from '../actions/toastsActions';
import { MAX_TOASTS } from '../values/toasts';

const initialState = [];

function enqueue(state, payload) {
  return takeRight([...state, { ...payload, id: uuid() }], MAX_TOASTS);
}

function dequeue(state, payload) {
  return filter(state, (toast) => toast.id !== payload.id);
}

export default function toastsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ENQUEUE:
      return enqueue(state, action.payload);
    case DEQUEUE:
      return dequeue(state, action.payload);
    case LOCATION_CHANGE:
      return initialState;
    default:
      return state;
  }
}

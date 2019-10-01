import { findIndex, omit } from 'lodash';

import {
  ENQUEUE_REQUEST,
  DEQUEUE_REQUEST,
  EMPTY_REQUESTS,
  EMPTY_ALL_REQUESTS
} from '../actions/requestsActions';
import { CLOSE_TAB } from '../actions/browserActions';

const initialState = {};

function getQueue(queues, sessionId) {
  return queues[sessionId] || [];
}

function enqueue(queues, sessionId, item) {
  const queue = getQueue(queues, sessionId);
  return { ...queues, [sessionId]: [...queue, item] };
}

function dequeue(queues, sessionId, id) {
  const queue = getQueue(queues, sessionId);
  const index = findIndex(queue, (item) => item.id === id);

  if (index === -1) {
    return queues;
  }

  return {
    ...queues,
    [sessionId]: [...queue.slice(0, index), ...queue.slice(index + 1)]
  };
}

function empty(queues, sessionId) {
  return omit(queues, sessionId);
}

export default function requestsReducer(state = initialState, action) {
  switch (action.type) {
    case ENQUEUE_REQUEST:
      return enqueue(state, action.sessionId, action.request);
    case DEQUEUE_REQUEST:
      return dequeue(state, action.sessionId, action.id);
    case EMPTY_REQUESTS:
    case CLOSE_TAB:
      return empty(state, action.sessionId);
    case EMPTY_ALL_REQUESTS:
      return initialState;
    default:
      return state;
  }
}

import { findIndex } from 'lodash';

import { ENQUEUE_REQUEST, DEQUEUE_REQUEST, EMPTY_REQUESTS } from '../actions/requestsActions';

const initialState = [];

function enqueue(queue, item) {
  return [...queue, item];
}

function dequeue(queue, id) {
  const index = findIndex(queue, (item) => item.id === id);

  if (index === -1) {
    return queue;
  }

  return [
    ...queue.slice(0, index),
    ...queue.slice(index + 1)
  ];
}

export default function requestsReducer(state = initialState, action) {
  switch (action.type) {
    case ENQUEUE_REQUEST:
      return enqueue(state, action.request);
    case DEQUEUE_REQUEST:
      return dequeue(state, action.id);
    case EMPTY_REQUESTS:
      return initialState;
    default:
      return state;
  }
}

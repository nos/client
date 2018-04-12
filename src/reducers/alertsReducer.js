import { ENQUEUE_ALERT, DEQUEUE_ALERT } from '../actions/alertsActions';

const initialState = [];

function enqueue(queue, payload) {
  return [...queue, payload];
}

function dequeue(queue) {
  return queue.slice(1);
}

export default function alertsReducer(state = initialState, action) {
  switch (action.type) {
    case ENQUEUE_ALERT:
      return enqueue(state, action.payload);
    case DEQUEUE_ALERT:
      return dequeue(state);
    default:
      return state;
  }
}

import { ENQUEUE_ALERT, ENQUEUE_CONFIRM, DEQUEUE_DIALOG } from '../actions/dialogsActions';
import { TYPE_ALERT, TYPE_CONFIRM } from '../values/dialogs';

const initialState = [];

function enqueue(queue, type, props) {
  return [...queue, { type, props }];
}

function dequeue(queue) {
  return queue.slice(1);
}

export default function dialogsReducer(state = initialState, action) {
  switch (action.type) {
    case ENQUEUE_ALERT:
      return enqueue(state, TYPE_ALERT, action.payload);
    case ENQUEUE_CONFIRM:
      return enqueue(state, TYPE_CONFIRM, action.payload);
    case DEQUEUE_DIALOG:
      return dequeue(state);
    default:
      return state;
  }
}

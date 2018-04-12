export const ENQUEUE_ALERT = 'ENQUEUE_ALERT';
export const ENQUEUE_CONFIRM = 'ENQUEUE_CONFIRM';
export const DEQUEUE_DIALOG = 'DEQUEUE_DIALOG';

export const alert = (message, props = {}) => ({
  type: ENQUEUE_ALERT,
  payload: { ...props, children: message }
});

export const confirm = (message, props = {}) => ({
  type: ENQUEUE_CONFIRM,
  payload: { ...props, children: message }
});

export const close = () => ({
  type: DEQUEUE_DIALOG
});

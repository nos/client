export const ENQUEUE_ALERT = 'ENQUEUE_ALERT';
export const ENQUEUE_CONFIRM = 'ENQUEUE_CONFIRM';
export const ENQUEUE_AUTH = 'ENQUEUE_AUTH';
export const ENQUEUE_NEW_WALLET = 'ENQUEUE_NEW_WALLET';

export const DEQUEUE_DIALOG = 'DEQUEUE_DIALOG';

export const alert = (message, props = {}) => ({
  type: ENQUEUE_ALERT,
  payload: { ...props, children: message }
});

export const confirm = (message, props = {}) => ({
  type: ENQUEUE_CONFIRM,
  payload: { ...props, children: message }
});

export const auth = (message, props = {}) => ({
  type: ENQUEUE_AUTH,
  payload: { ...props, children: message }
});

export const newWallet = (message, props = {}) => ({
  type: ENQUEUE_NEW_WALLET,
  payload: { ...props, children: message }
});

export const close = () => ({
  type: DEQUEUE_DIALOG
});

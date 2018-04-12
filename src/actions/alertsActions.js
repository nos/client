export const ENQUEUE_ALERT = 'ENQUEUE_ALERT';
export const DEQUEUE_ALERT = 'DEQUEUE_ALERT';

export const alert = (payload) => ({ type: ENQUEUE_ALERT, payload });
export const close = () => ({ type: DEQUEUE_ALERT });

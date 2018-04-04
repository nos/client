export const ENQUEUE_REQUEST = 'ENQUEUE_REQUEST';
export const DEQUEUE_REQUEST = 'DEQUEUE_REQUEST';

export const enqueue = (request) => ({ type: ENQUEUE_REQUEST, request });
export const dequeue = (id) => ({ type: DEQUEUE_REQUEST, id });

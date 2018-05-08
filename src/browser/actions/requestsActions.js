export const ENQUEUE_REQUEST = 'ENQUEUE_REQUEST';
export const DEQUEUE_REQUEST = 'DEQUEUE_REQUEST';
export const EMPTY_REQUESTS = 'EMPTY_REQUESTS';

export const enqueue = (sessionId, request) => ({ type: ENQUEUE_REQUEST, sessionId, request });
export const dequeue = (sessionId, id) => ({ type: DEQUEUE_REQUEST, sessionId, id });
export const empty = (sessionId) => ({ type: EMPTY_REQUESTS, sessionId });

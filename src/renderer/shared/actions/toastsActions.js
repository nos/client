import { DISMISS_SECONDS } from '../values/toasts';

export const ENQUEUE = 'ENQUEUE_TOAST';
export const DEQUEUE = 'DEQUEUE_TOAST';

export const TYPE_SUCCESS = 'success';
export const TYPE_ERROR = 'error';
export const TYPE_INFO = 'info';

export const showToast = ({ message, type, autoDismiss = DISMISS_SECONDS } = {}) => ({
  type: ENQUEUE,
  payload: { message, type, autoDismiss }
});

export const showSuccessToast = ({ message, autoDismiss = DISMISS_SECONDS } = {}) =>
  showToast({
    message,
    type: TYPE_SUCCESS,
    autoDismiss
  });

export const showErrorToast = ({ message, autoDismiss = false } = {}) =>
  showToast({
    message,
    type: TYPE_ERROR,
    autoDismiss
  });

export const showInfoToast = ({ message, autoDismiss = DISMISS_SECONDS } = {}) =>
  showToast({
    message,
    type: TYPE_INFO,
    autoDismiss
  });

export const hideToast = (id) => ({
  type: DEQUEUE,
  payload: { id }
});

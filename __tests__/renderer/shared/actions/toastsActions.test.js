import {
  showToast,
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  hideToast,
  ENQUEUE,
  DEQUEUE,
  TYPE_SUCCESS,
  TYPE_ERROR,
  TYPE_INFO
} from 'shared/actions/toastsActions';

describe('toastsActions', () => {
  describe('showToast', () => {
    const message = 'Settings updated successfully';
    const type = TYPE_SUCCESS;

    it('returns action object with default values', () => {
      expect(showToast({ message, type })).toEqual({
        type: ENQUEUE,
        payload: { message, type, autoDismiss: 5 }
      });
    });

    it('returns action object with custom values', () => {
      const autoDismiss = false;

      expect(showToast({ message, type, autoDismiss })).toEqual({
        type: ENQUEUE,
        payload: { message, type, autoDismiss }
      });
    });
  });

  describe('showSuccessToast', () => {
    const message = 'Settings updated successfully';

    it('returns action object with default values', () => {
      expect(showSuccessToast({ message })).toEqual({
        type: ENQUEUE,
        payload: { message, type: TYPE_SUCCESS, autoDismiss: 5 }
      });
    });
  });

  describe('showErrorToast', () => {
    const message = 'Error saving changes';

    it('returns action object with default values', () => {
      expect(showErrorToast({ message })).toEqual({
        type: ENQUEUE,
        payload: { message, type: TYPE_ERROR, autoDismiss: false }
      });
    });
  });

  describe('showInfoToast', () => {
    const message = 'Address copied';

    it('returns action object with default values', () => {
      expect(showInfoToast({ message })).toEqual({
        type: ENQUEUE,
        payload: { message, type: TYPE_INFO, autoDismiss: 5 }
      });
    });
  });

  describe('hideToast', () => {
    const id = 'abc123';

    it('returns action object', () => {
      expect(hideToast(id)).toEqual({
        type: DEQUEUE,
        payload: { id }
      });
    });
  });
});

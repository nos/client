import { reduce, map } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';

import toastsReducer from 'shared/reducers/toastsReducer';
import { ENQUEUE, TYPE_SUCCESS } from 'shared/actions/toastsActions';

describe('toastsReducer', () => {
  const initialState = toastsReducer();

  it('returns initial state', () => {
    expect(initialState).toEqual([]);
  });

  describe('action type ENQUEUE', () => {
    it('adds a toast to the queue', () => {
      const state = toastsReducer(initialState, {
        type: ENQUEUE,
        payload: { message: 'foo', type: 'bar', autoDismiss: false }
      });

      expect(state).toMatchObject([
        {
          id: expect.stringMatching(/[-a-z0-9]+/),
          message: 'foo',
          type: 'bar',
          autoDismiss: false
        }
      ]);
    });

    it('limits queue to 3 toasts', () => {
      const state = reduce(
        ['a', 'b', 'c', 'd'],
        (nextState, message) =>
          toastsReducer(nextState, {
            type: ENQUEUE,
            payload: { message, type: TYPE_SUCCESS, autoDismiss: false }
          }),
        initialState
      );

      expect(state).toHaveLength(3);
      expect(map(state, 'message')).toEqual(['b', 'c', 'd']);
    });
  });

  describe('action type LOCATION_CHANGE', () => {
    it('resets the store state', () => {
      const intermediateState = toastsReducer(initialState, {
        type: ENQUEUE,
        payload: { message: 'foo', type: 'bar', autoDismiss: false }
      });
      const state = toastsReducer(intermediateState, {
        type: LOCATION_CHANGE
      });

      expect(state).toEqual([]);
    });
  });
});

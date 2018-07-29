import { keys } from 'lodash';

import browserReducer from 'browser/reducers/browserReducer';
import { EXTERNAL } from 'browser/values/browserValues';
import {
  OPEN_TAB,
  // CLOSE_TAB,
  RESET_TABS
  // SET_ACTIVE_TAB,
  // SET_TAB_ERROR,
  // SET_TAB_TARGET,
  // SET_TAB_TITLE,
  // SET_TAB_LOADED
} from 'browser/actions/browserActions';

describe('browserReducer', () => {
  const initialState = browserReducer();

  it('returns initial state', () => {
    expect(initialState.activeSessionId).toMatch(/[-a-f0-9]+/);
    expect(keys(initialState.tabs)).toEqual([initialState.activeSessionId]);
  });

  describe('action type OPEN_TAB', () => {
    const state = browserReducer(initialState, {
      type: OPEN_TAB,
      payload: { type: EXTERNAL, target: 'nos://example.neo' }
    });

    expect(state.activeSessionId).not.toEqual(initialState.activeSessionId);
    expect(keys(state.tabs)).toEqual([initialState.activeSessionId, state.activeSessionId]);
  });

  describe('action type RESET_TABS', () => {
    const intermediateState = browserReducer(initialState, {
      type: OPEN_TAB,
      payload: { type: EXTERNAL, target: 'nos://example.neo' }
    });

    const state = browserReducer(intermediateState, {
      type: RESET_TABS
    });

    expect(keys(state.tabs)).toHaveLength(1);
    expect(state.activeSessionId).not.toEqual(initialState.activeSessionId);
    expect(state.activeSessionId).not.toEqual(intermediateState.activeSessionId);
  });
});

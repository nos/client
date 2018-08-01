import { keys } from 'lodash';

import browserReducer from 'browser/reducers/browserReducer';
import { INTERNAL, EXTERNAL, ACCOUNT, SETTINGS } from 'browser/values/browserValues';
import {
  OPEN_TAB,
  // CLOSE_TAB,
  RESET_TABS,
  // SET_ACTIVE_TAB,
  // SET_TAB_ERROR,
  SET_TAB_TARGET
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
      payload: { type: INTERNAL, target: ACCOUNT }
    });

    it('adds a session to the tabs list', () => {
      expect(keys(state.tabs)).toEqual([initialState.activeSessionId, state.activeSessionId]);
    });

    it('changes the active session to the new tab', () => {
      expect(state.activeSessionId).not.toEqual(initialState.activeSessionId);
    });

    describe('when the internal tab exists', () => {
      const updatedState = browserReducer(state, {
        type: OPEN_TAB,
        payload: { type: INTERNAL, target: ACCOUNT }
      });

      it('does not open a new tab', () => {
        expect(keys(updatedState.tabs)).toEqual(keys(state.tabs));
      });

      it('focuses the existing tab', () => {
        expect(updatedState.tabs[updatedState.activeSessionId].target).toEqual(ACCOUNT);
      });
    });

    describe('when the internal tab does not exists', () => {
      const updatedState = browserReducer(state, {
        type: OPEN_TAB,
        payload: { type: INTERNAL, target: SETTINGS }
      });

      it('opens a new tab', () => {
        expect(keys(updatedState.tabs)).toHaveLength(keys(state.tabs).length + 1);
      });

      it('focuses the existing tab', () => {
        expect(updatedState.tabs[updatedState.activeSessionId].target).toEqual(SETTINGS);
      });
    });
  });

  describe('action type RESET_TABS', () => {
    const intermediateState = browserReducer(initialState, {
      type: OPEN_TAB,
      payload: { type: EXTERNAL, target: 'nos://example.neo' }
    });

    const state = browserReducer(intermediateState, {
      type: RESET_TABS
    });

    it('removes the session from the tabs list', () => {
      expect(keys(state.tabs)).toHaveLength(1);
    });

    it('changes the active session', () => {
      expect(state.activeSessionId).not.toEqual(initialState.activeSessionId);
      expect(state.activeSessionId).not.toEqual(intermediateState.activeSessionId);
    });
  });

  describe('action type SET_TAB_TARGET', () => {
    const sessionId = initialState.activeSessionId;
    const addressBarEntry = false;

    function itBehavesLikeTabUpdate(state) {
      const originalTab = initialState.tabs[sessionId];
      const updatedTab = state.tabs[sessionId];

      it('sets the title to the target URI', () => {
        expect(updatedTab.title).toEqual(updatedTab.target);
      });

      it('assigns the address bar entry flag', () => {
        expect(updatedTab.addressBarEntry).toEqual(addressBarEntry);
      });

      it('increments the request count', () => {
        expect(updatedTab.requestCount).toEqual(originalTab.requestCount + 1);
      });

      it('resets any errors', () => {
        expect(updatedTab.errorCode).toBe(null);
        expect(updatedTab.errorDescription).toBe(null);
      });
    }

    describe('when navigating away from the current page', () => {
      const target = 'nos://example.neo';
      const state = browserReducer(initialState, {
        type: SET_TAB_TARGET,
        payload: { sessionId, target, addressBarEntry }
      });

      itBehavesLikeTabUpdate(state);

      it('updates the target on the tab', () => {
        expect(state.tabs[sessionId].target).toEqual(target);
      });

      it('updates the loading state', () => {
        expect(state.tabs[sessionId].loading).toBe(true);
      });
    });

    describe('when navigating within the current page', () => {
      const target = `${initialState.tabs[sessionId].target}/#foo`;
      const state = browserReducer(initialState, {
        type: SET_TAB_TARGET,
        payload: { sessionId, target, addressBarEntry }
      });

      itBehavesLikeTabUpdate(state);

      it('updates the target on the tab', () => {
        expect(state.tabs[sessionId].target).toEqual(target);
      });

      it('updates the loading state', () => {
        expect(state.tabs[sessionId].loading).toBe(false);
      });
    });
  });
});

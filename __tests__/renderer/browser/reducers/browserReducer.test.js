import { keys } from 'lodash';

import browserReducer from 'browser/reducers/browserReducer';
import { INTERNAL, EXTERNAL, ACCOUNT, SETTINGS } from 'browser/values/browserValues';
import {
  NAVIGATE,
  OPEN_TAB,
  // CLOSE_TAB,
  RESET_TABS,
  SET_ACTIVE_TAB,
  SET_TAB_TARGET,
  SET_TAB_TITLE,
  SET_TAB_ICON,
  SET_TAB_LOADED
} from 'browser/actions/browserActions';

function getActiveTab(state) {
  return state.tabs[state.activeSessionId];
}

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

  describe('action type SET_ACTIVE_TAB', () => {
    const intermediateState = browserReducer(initialState, {
      type: OPEN_TAB,
      payload: { type: INTERNAL, target: ACCOUNT }
    });
    const state = browserReducer(intermediateState, {
      type: SET_ACTIVE_TAB,
      payload: { sessionId: initialState.activeSessionId }
    });

    it('updates the activeSessionId', () => {
      expect(state.activeSessionId).toEqual(initialState.activeSessionId);
    });
  });

  describe('action type NAVIGATE', () => {
    const sessionId = initialState.activeSessionId;
    const target = 'nos://example.neo';
    const state = browserReducer(initialState, {
      type: NAVIGATE,
      payload: { sessionId, target }
    });

    const originalTab = getActiveTab(initialState);
    const updatedTab = getActiveTab(state);

    it('updates the target on the tab', () => {
      expect(updatedTab.target).toEqual(target);
    });

    it('does not update the loading state', () => {
      expect(updatedTab.loading).toBe(originalTab.loading);
    });

    it('sets the title to the target URI', () => {
      expect(updatedTab.title).toEqual(updatedTab.target);
    });

    it('increments the request count', () => {
      expect(updatedTab.requestCount).toEqual(originalTab.requestCount + 1);
    });
  });

  describe('action type SET_TAB_TARGET', () => {
    const sessionId = initialState.activeSessionId;
    const target = 'nos://example.neo';
    const intermediateState = browserReducer(initialState, {
      type: NAVIGATE,
      payload: { sessionId, target: 'nos://example.neo' }
    });
    const state = browserReducer(intermediateState, {
      type: SET_TAB_TARGET,
      payload: { sessionId, target }
    });

    const originalTab = getActiveTab(intermediateState);
    const updatedTab = getActiveTab(state);

    it('updates the target and addressBarEntry on the tab', () => {
      expect(updatedTab).toEqual({ ...originalTab, target, addressBarEntry: false });
    });
  });

  describe('action type SET_TAB_TITLE', () => {
    const sessionId = initialState.activeSessionId;
    const title = 'Foo';
    const state = browserReducer(initialState, {
      type: SET_TAB_TITLE,
      payload: { sessionId, title }
    });

    const originalTab = getActiveTab(initialState);
    const updatedTab = getActiveTab(state);

    it('updates the title on the tab', () => {
      expect(updatedTab).toEqual({ ...originalTab, title });
    });
  });

  describe('action type SET_TAB_ICON', () => {
    const sessionId = initialState.activeSessionId;
    const url =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';
    const state = browserReducer(initialState, {
      type: SET_TAB_ICON,
      payload: { sessionId, url }
    });

    const originalTab = getActiveTab(initialState);
    const updatedTab = getActiveTab(state);

    it('updates the icon on the tab', () => {
      expect(updatedTab).toEqual({ ...originalTab, icon: url });
    });
  });

  describe('action type SET_TAB_LOADED', () => {
    const sessionId = initialState.activeSessionId;
    const loaded = true;
    const state = browserReducer(initialState, {
      type: SET_TAB_LOADED,
      payload: { sessionId, loaded }
    });

    const originalTab = getActiveTab(initialState);
    const updatedTab = getActiveTab(state);

    it('updates the loading flag on the tab', () => {
      expect(updatedTab).toEqual({ ...originalTab, loading: !loaded });
    });
  });
});

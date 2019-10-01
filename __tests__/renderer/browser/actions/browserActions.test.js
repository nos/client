import {
  navigate,
  openTab,
  closeTab,
  resetTabs,
  setActiveTab,
  setTabTarget,
  setTabTitle,
  setTabIcon,
  setTabLoaded,
  NAVIGATE,
  OPEN_TAB,
  CLOSE_TAB,
  RESET_TABS,
  SET_ACTIVE_TAB,
  SET_TAB_TARGET,
  SET_TAB_TITLE,
  SET_TAB_ICON,
  SET_TAB_LOADED
} from 'browser/actions/browserActions';

describe('browserActions', () => {
  describe('openTab', () => {
    it('returns action object', () => {
      const type = 'foo';
      const target = 'bar';

      expect(openTab({ type, target })).toEqual({
        type: OPEN_TAB,
        payload: { type, target }
      });
    });
  });

  describe('closeTab', () => {
    it('returns action object', () => {
      const sessionId = 'abc123';

      expect(closeTab(sessionId)).toEqual({
        type: CLOSE_TAB,
        payload: { sessionId }
      });
    });
  });

  describe('resetTabs', () => {
    it('returns action object', () => {
      expect(resetTabs()).toEqual({ type: RESET_TABS });
    });
  });

  describe('setActiveTab', () => {
    it('returns action object', () => {
      const sessionId = 'abc123';

      expect(setActiveTab(sessionId)).toEqual({
        type: SET_ACTIVE_TAB,
        payload: { sessionId }
      });
    });
  });

  describe('navigate', () => {
    const sessionId = 'abc123';
    const target = 'nos://nos.neo';

    it('returns action object', () => {
      expect(navigate(sessionId, target)).toEqual({
        type: NAVIGATE,
        payload: { sessionId, target }
      });
    });
  });

  describe('setTabTarget', () => {
    const sessionId = 'abc123';
    const target = 'nos://nos.neo';

    it('returns action object', () => {
      expect(setTabTarget(sessionId, target)).toEqual({
        type: SET_TAB_TARGET,
        payload: { sessionId, target }
      });
    });
  });

  describe('setTabTitle', () => {
    it('returns action object', () => {
      const sessionId = 'abc123';
      const title = 'Google';

      expect(setTabTitle(sessionId, title)).toEqual({
        type: SET_TAB_TITLE,
        payload: { sessionId, title }
      });
    });
  });

  describe('setTabIcon', () => {
    it('returns action object', () => {
      const sessionId = 'abc123';
      const url =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';

      expect(setTabIcon(sessionId, url)).toEqual({
        type: SET_TAB_ICON,
        payload: { sessionId, url }
      });
    });
  });

  describe('setTabLoaded', () => {
    it('returns action object', () => {
      const sessionId = 'abc123';
      const loaded = true;

      expect(setTabLoaded(sessionId, loaded)).toEqual({
        type: SET_TAB_LOADED,
        payload: { sessionId, loaded }
      });
    });
  });
});

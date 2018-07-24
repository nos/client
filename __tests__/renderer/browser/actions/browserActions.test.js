import {
  openTab,
  closeTab,
  resetTabs,
  setActiveTab,
  setTabError,
  setTabTarget,
  setTabTitle,
  setTabLoaded,
  OPEN_TAB,
  CLOSE_TAB,
  RESET_TABS,
  SET_ACTIVE_TAB,
  SET_TAB_ERROR,
  SET_TAB_TARGET,
  SET_TAB_TITLE,
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

  describe('setTabError', () => {
    it('returns action object', () => {
      const sessionId = 'abc123';
      const code = '-1';
      const description = 'Uh oh...';

      expect(setTabError(sessionId, code, description)).toEqual({
        type: SET_TAB_ERROR,
        payload: { sessionId, code, description }
      });
    });
  });

  describe('setTabTarget', () => {
    const sessionId = 'abc123';
    const target = 'nos://nos.neo';

    describe('without options', () => {
      it('returns action object', () => {
        expect(setTabTarget(sessionId, target)).toEqual({
          type: SET_TAB_TARGET,
          payload: { sessionId, target, addressBarEntry: false }
        });
      });
    });

    describe('with options', () => {
      it('returns action object', () => {
        const addressBarEntry = true;

        expect(setTabTarget(sessionId, target, { addressBarEntry })).toEqual({
          type: SET_TAB_TARGET,
          payload: { sessionId, target, addressBarEntry }
        });
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

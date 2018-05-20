export const OPEN_TAB = 'OPEN_TAB';
export const CLOSE_TAB = 'CLOSE_TAB';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const SET_TAB_TARGET = 'SET_TAB_TARGET';
export const SET_TAB_TITLE = 'SET_TAB_TITLE';
export const SET_TAB_LOADED = 'SET_TAB_LOADED';

export const openTab = () => ({ type: OPEN_TAB });
export const closeTab = (sessionId) => ({ type: CLOSE_TAB, sessionId });
export const setActiveTab = (sessionId) => ({ type: SET_ACTIVE_TAB, sessionId });
export const setTabTarget = (sessionId, target, {
  addressBarEntry = false,
  leavingPage = true
} = {}) => ({
  type: SET_TAB_TARGET,
  sessionId,
  target,
  addressBarEntry, // differentiates between link clicks and address bar entries
  leavingPage // differentiates between anchor link clicks on the current page vs. new page loads
});
export const setTabTitle = (sessionId, title) => ({ type: SET_TAB_TITLE, sessionId, title });
export const setTabLoaded = (sessionId, loaded) => ({ type: SET_TAB_LOADED, sessionId, loaded });

import { EXTERNAL } from '../values/browserValues';

export const NAVIGATE = 'NAVIGATE';
export const OPEN_TAB = 'OPEN_TAB';
export const CLOSE_TAB = 'CLOSE_TAB';
export const RESET_TABS = 'RESET_TABS';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const SET_TAB_TARGET = 'SET_TAB_TARGET';
export const SET_TAB_TITLE = 'SET_TAB_TITLE';
export const SET_TAB_ICON = 'SET_TAB_ICON';
export const SET_TAB_LOADED = 'SET_TAB_LOADED';

const DEFAULT_TARGET = 'nos://nos.neo';

export const openTab = ({ type = EXTERNAL, target = DEFAULT_TARGET } = {}) => ({
  type: OPEN_TAB,
  payload: { type, target }
});

export const closeTab = (sessionId) => ({
  type: CLOSE_TAB,
  payload: { sessionId }
});

export const resetTabs = () => ({
  type: RESET_TABS
});

export const setActiveTab = (sessionId) => ({
  type: SET_ACTIVE_TAB,
  payload: { sessionId }
});

export const navigate = (sessionId, target) => ({
  type: NAVIGATE,
  payload: { sessionId, target }
});

export const setTabTarget = (sessionId, target) => ({
  type: SET_TAB_TARGET,
  payload: { sessionId, target }
});

export const setTabTitle = (sessionId, title) => ({
  type: SET_TAB_TITLE,
  payload: { sessionId, title }
});

export const setTabIcon = (sessionId, url) => ({
  type: SET_TAB_ICON,
  payload: { sessionId, url }
});

export const setTabLoaded = (sessionId, loaded) => ({
  type: SET_TAB_LOADED,
  payload: { sessionId, loaded }
});

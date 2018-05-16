export const OPEN_TAB = 'OPEN_TAB';
export const CLOSE_TAB = 'CLOSE_TAB';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const SET_TAB_TITLE = 'SET_TAB_TITLE';
export const QUERY = 'QUERY';

export const openTab = () => ({ type: OPEN_TAB });
export const closeTab = (sessionId) => ({ type: CLOSE_TAB, sessionId });
export const setActiveTab = (sessionId) => ({ type: SET_ACTIVE_TAB, sessionId });
export const setTabTitle = (sessionId, title) => ({ type: SET_TAB_TITLE, sessionId, title });
export const query = (sessionId, queryString) => ({ type: QUERY, sessionId, query: queryString });

import uuid from 'uuid/v1';
import { findIndex, keys, omit, has, size } from 'lodash';

import { OPEN_TAB, CLOSE_TAB, SET_ACTIVE_TAB, SET_TAB_TITLE, QUERY } from '../actions/browserActions';
import parseURL from '../util/parseURL';

const initialTabState = {
  target: 'nos://nos.neo/',
  title: 'Welcome to nOS'
};

const generateSessionId = () => uuid();

function generateInitialState() {
  const sessionId = generateSessionId();

  return {
    activeSessionId: sessionId,
    tabs: {
      [sessionId]: { ...initialTabState }
    }
  };
}

function tabExists(tabs, sessionId) {
  return has(tabs, sessionId);
}

function updateTab(state, sessionId, data) {
  if (!tabExists(state.tabs, sessionId)) {
    return state;
  }

  const tab = state.tabs[sessionId];

  return {
    ...state,
    tabs: {
      ...state.tabs,
      [sessionId]: { ...tab, ...data }
    }
  };
}

function parse(query) {
  try {
    const { href } = parseURL(query);
    return href;
  } catch (err) {
    return query;
  }
}

function open(state) {
  const sessionId = generateSessionId();
  const { tabs } = state;

  return {
    ...state,
    activeSessionId: sessionId,
    tabs: {
      ...tabs,
      [sessionId]: { ...initialTabState }
    }
  };
}

function close(state, action) {
  if (!tabExists(state.tabs, action.sessionId)) {
    return state;
  }

  // if the last tab is being closed, automatically open a new tab as a starting point
  if (size(state.tabs) === 1) {
    return generateInitialState();
  }

  const tabIndex = findIndex(state.tabs, action.sessionId);
  const tabs = omit(state.tabs, action.sessionId);

  const activeSessionId = state.activeSessionId === action.sessionId
    ? keys(tabs)[Math.max(tabIndex - 1, 0)]
    : state.activeSessionId;

  return { ...state, tabs, activeSessionId };
}

function focus(state, action) {
  if (!tabExists(state.tabs, action.sessionId)) {
    return state;
  }

  return {
    ...state,
    activeSessionId: action.sessionId
  };
}

function title(state, action) {
  return updateTab(state, action.sessionId, {
    title: action.title
  });
}

function search(state, action) {
  return updateTab(state, action.sessionId, {
    target: parse(action.query)
  });
}

export default function browserReducer(state = generateInitialState(), action) {
  switch (action.type) {
    case OPEN_TAB:
      return open(state);
    case CLOSE_TAB:
      return close(state, action);
    case SET_ACTIVE_TAB:
      return focus(state, action);
    case SET_TAB_TITLE:
      return title(state, action);
    case QUERY:
      return search(state, action);
    default:
      return state;
  }
}

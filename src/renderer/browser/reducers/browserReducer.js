import uuid from 'uuid/v1';
import { keys, findKey, omit, has, size, isEmpty } from 'lodash';

import parseURL from '../util/parseURL';
import { INTERNAL, EXTERNAL } from '../values/browserValues';
import {
  NAVIGATE,
  OPEN_TAB,
  CLOSE_TAB,
  RESET_TABS,
  SET_ACTIVE_TAB,
  SET_TAB_ERROR,
  SET_TAB_TITLE,
  SET_TAB_TARGET,
  SET_TAB_ICON,
  SET_TAB_LOADED
} from '../actions/browserActions';

const initialTabState = {
  type: EXTERNAL,
  target: 'https://my.nos.app',
  title: 'My nOS',
  icon: null,
  addressBarEntry: true, // differentiates between link clicks and address bar entries
  loading: false,
  requestCount: 1,
  errorCode: null,
  errorDescription: null
};

const newTabState = {
  ...initialTabState,
  target: '',
  title: 'New Tab'
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

function getSessionId(tabs, callback) {
  return findKey(tabs, callback);
}

function focus(state, data) {
  if (!tabExists(state.tabs, data.sessionId)) {
    return state;
  }

  return {
    ...state,
    activeSessionId: data.sessionId
  };
}

function open(state, data) {
  const sessionId = generateSessionId();
  const { tabs } = state;
  const { type, target } = data;
  const internal = type === INTERNAL;

  const existingSessionId = getSessionId(tabs, (tab) => {
    return tab.type === data.type && tab.target === data.target;
  });

  if (internal && existingSessionId) {
    return focus(state, { sessionId: existingSessionId });
  }

  const tab = {
    ...newTabState,
    type,
    target,
    title: internal ? target : newTabState.title,
    loading: !internal && !isEmpty(target)
  };

  return {
    ...state,
    activeSessionId: sessionId,
    tabs: { ...tabs, [sessionId]: tab }
  };
}

function close(state, data) {
  if (!tabExists(state.tabs, data.sessionId)) {
    return state;
  }

  // if the last tab is being closed, automatically open a new tab as a starting point
  if (size(state.tabs) === 1) {
    return generateInitialState();
  }

  const tabIndex = keys(state.tabs).indexOf(data.sessionId);
  const tabs = omit(state.tabs, data.sessionId);

  const activeSessionId = state.activeSessionId === data.sessionId
    ? keys(tabs)[Math.max(tabIndex - 1, 0)]
    : state.activeSessionId;

  return { ...state, tabs, activeSessionId };
}

function setTitle(state, data) {
  return updateTab(state, data.sessionId, { title: data.title });
}

function setError(state, data) {
  return updateTab(state, data.sessionId, {
    loading: false,
    errorCode: data.code,
    errorDescription: data.description
  });
}

function setTarget(state, data) {
  return updateTab(state, data.sessionId, {
    target: data.target,
    addressBarEntry: false
  });
}

function setIcon(state, data) {
  return updateTab(state, data.sessionId, {
    icon: data.url
  });
}

function navigate(state, data) {
  const tab = state.tabs[data.sessionId];

  if (!tab) {
    return state;
  }

  const target = parse(data.target);

  return updateTab(state, data.sessionId, {
    target,
    title: target,
    icon: null,
    addressBarEntry: true,
    requestCount: tab.requestCount + 1,
    errorCode: null,
    errorDescription: null
  });
}

function setLoaded(state, action) {
  return updateTab(state, action.sessionId, { loading: !action.loaded });
}

export default function browserReducer(state = generateInitialState(), action = {}) {
  switch (action.type) {
    case OPEN_TAB:
      return open(state, action.payload);
    case CLOSE_TAB:
      return close(state, action.payload);
    case RESET_TABS:
      return generateInitialState();
    case NAVIGATE:
      return navigate(state, action.payload);
    case SET_ACTIVE_TAB:
      return focus(state, action.payload);
    case SET_TAB_ERROR:
      return setError(state, action.payload);
    case SET_TAB_TITLE:
      return setTitle(state, action.payload);
    case SET_TAB_TARGET:
      return setTarget(state, action.payload);
    case SET_TAB_ICON:
      return setIcon(state, action.payload);
    case SET_TAB_LOADED:
      return setLoaded(state, action.payload);
    default:
      return state;
  }
}

import uuid from 'uuid/v1';
import { keys, omit, has, size, isEmpty } from 'lodash';

import parseURL from '../util/parseURL';
import { INTERNAL, EXTERNAL } from '../values/browserValues';
import {
  OPEN_TAB,
  CLOSE_TAB,
  SET_ACTIVE_TAB,
  SET_TAB_ERROR,
  SET_TAB_TITLE,
  SET_TAB_TARGET,
  SET_TAB_LOADED
} from '../actions/browserActions';

const initialTabState = {
  type: EXTERNAL,
  target: 'https://my.nos.app',
  title: 'My nOS',
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

function normalize(target) {
  return target.split('#')[0].replace(/\/^/, '');
}

function isNavigatingAway(oldTarget, newTarget) {
  return normalize(oldTarget) === normalize(newTarget);
}

function open(state, action) {
  const sessionId = generateSessionId();
  const { tabs } = state;
  const { type, target } = action;
  const internal = type === INTERNAL;

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

function close(state, action) {
  if (!tabExists(state.tabs, action.sessionId)) {
    return state;
  }

  // if the last tab is being closed, automatically open a new tab as a starting point
  if (size(state.tabs) === 1) {
    return generateInitialState();
  }

  const tabIndex = keys(state.tabs).indexOf(action.sessionId);
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

function setTitle(state, action) {
  return updateTab(state, action.sessionId, { title: action.title });
}

function setError(state, action) {
  return updateTab(state, action.sessionId, {
    loading: false,
    errorCode: action.code,
    errorDescription: action.description
  });
}

function setTarget(state, action) {
  const tab = state.tabs[action.sessionId];

  if (!tab) {
    return state;
  }

  const target = parse(action.target);

  return updateTab(state, action.sessionId, {
    target,
    title: target,
    loading: isNavigatingAway(state.target, target),
    addressBarEntry: action.addressBarEntry,
    requestCount: tab.requestCount + 1,
    errorCode: null,
    errorDescription: null
  });
}

function setLoaded(state, action) {
  return updateTab(state, action.sessionId, { loading: !action.loaded });
}

export default function browserReducer(state = generateInitialState(), action) {
  switch (action.type) {
    case OPEN_TAB:
      return open(state, action.payload);
    case CLOSE_TAB:
      return close(state, action.payload);
    case SET_ACTIVE_TAB:
      return focus(state, action.payload);
    case SET_TAB_ERROR:
      return setError(state, action.payload);
    case SET_TAB_TITLE:
      return setTitle(state, action.payload);
    case SET_TAB_TARGET:
      return setTarget(state, action.payload);
    case SET_TAB_LOADED:
      return setLoaded(state, action.payload);
    default:
      return state;
  }
}

import React from 'react';
import { string } from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faBell,
  faBookmark as faBookmarkReg,
  faCheckCircle,
  faCopy,
  faHandshake,
  faWindowClose,
  faWindowMaximize,
  faWindowMinimize,
  faWindowRestore
} from '@fortawesome/free-regular-svg-icons';

import {
  faBookmark,
  faCog,
  faCubes,
  faGlobe,
  faKey,
  faPlusSquare,
  faQuestionCircle,
  faSignOutAlt,
  faSpinner,
  faSync,
  faTimes,
  faUser
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBell,
  faBookmark,
  faBookmarkReg,
  faCog,
  faCheckCircle,
  faCopy,
  faCubes,
  faGlobe,
  faHandshake,
  faKey,
  faPlusSquare,
  faQuestionCircle,
  faSignOutAlt,
  faSpinner,
  faSync,
  faTimes,
  faUser,
  faWindowClose,
  faWindowMaximize,
  faWindowMinimize,
  faWindowRestore
);

const ICONS = {
  account: 'user',
  browser: 'globe',
  check: ['far', 'check-circle'],
  close: 'times',
  copy: 'copy',
  dapp: 'cube',
  exchange: ['far', 'handshake'],
  favorite: ['far', 'bookmark'],
  login: 'key',
  logout: 'sign-out-alt',
  notifications: ['far', 'bell'],
  settings: 'cog',
  spin: 'spinner',
  unfavorite: ['far', 'bookmark'],
  wallet: ['far', 'money-bill-alt'],
  windowClose: ['far', 'window-close'],
  windowMax: ['far', 'window-maximize'],
  windowMin: ['far', 'window-minimize'],
  windowRestore: ['far', 'window-restore'],
  transfer: ['fas', 'sync'],
  add: ['far', 'plus-square']
};

// Eventually, we will need icons not supplied by FontAwesome,
// this component only wraps FA right now, but eventually it's
// implementation could be updated to render custome icons and
// FA through the same interface.
const Icon = ({ name, ...props }) => (
  <FontAwesomeIcon icon={ICONS[name] || Icon.defaultProps.name} {...props} />
);

Icon.propTypes = {
  name: string
};

Icon.defaultProps = {
  name: 'question-circle'
};

export default Icon;

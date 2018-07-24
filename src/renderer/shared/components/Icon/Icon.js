import React from 'react';
import { string } from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faBell,
  faBookmark as faBookmarkReg,
  faCheckCircle,
  faCopy,
  faListAlt,
  faHandshake,
  faWindowClose,
  faWindowMaximize,
  faWindowMinimize,
  faWindowRestore
} from '@fortawesome/free-regular-svg-icons';

import {
  faArrowLeft,
  faArrowRight,
  faBookmark,
  faCog,
  faCubes,
  faGlobe,
  faKey,
  faPlus,
  faQuestionCircle,
  faSignOutAlt,
  faSpinner,
  faSync,
  faTimes,
  faUndo,
  faUser
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faArrowLeft,
  faArrowRight,
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
  faListAlt,
  faPlus,
  faQuestionCircle,
  faSignOutAlt,
  faSpinner,
  faSync,
  faTimes,
  faUndo,
  faUser,
  faWindowClose,
  faWindowMaximize,
  faWindowMinimize,
  faWindowRestore
);

const ICONS = {
  account: 'user',
  add: ['fas', 'plus'],
  back: ['fas', 'arrow-left'],
  browser: 'globe',
  check: ['far', 'check-circle'],
  close: 'times',
  copy: 'copy',
  dapp: 'cube',
  exchange: ['far', 'handshake'],
  favorite: ['far', 'bookmark'],
  forward: ['fas', 'arrow-right'],
  login: 'key',
  logout: 'sign-out-alt',
  notifications: ['far', 'bell'],
  reload: ['fas', 'undo'],
  settings: 'cog',
  sidebar: ['far', 'list-alt'],
  spin: 'spinner',
  unfavorite: ['far', 'bookmark'],
  wallet: ['far', 'money-bill-alt'],
  windowClose: ['far', 'window-close'],
  windowMax: ['far', 'window-maximize'],
  windowMin: ['far', 'window-minimize'],
  windowRestore: ['far', 'window-restore'],
  transfer: ['fas', 'sync']
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

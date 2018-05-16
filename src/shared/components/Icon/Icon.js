import React from 'react';
import { string } from 'prop-types';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import {
  faBell,
  faBookmark as faBookmarkReg,
  faCheckCircle,
  faCopy,
  faHandshake,
  faUser,
  faWindowClose,
  faWindowMaximize,
  faWindowMinimize,
  faWindowRestore
} from '@fortawesome/fontawesome-free-regular';

import {
  faBookmark,
  faCog,
  faCubes,
  faKey,
  faQuestionCircle,
  faSignOutAlt,
  faSync,
  faPlusSquare
} from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(
  faBell,
  faBookmark,
  faBookmarkReg,
  faCog,
  faCheckCircle,
  faCopy,
  faCubes,
  faHandshake,
  faKey,
  faQuestionCircle,
  faSignOutAlt,
  faUser,
  faWindowClose,
  faWindowMaximize,
  faWindowMinimize,
  faWindowRestore,
  faSync,
  faPlusSquare
);

const ICONS = {
  account: 'user',
  browser: 'globe',
  check: 'check-circle',
  copy: 'copy',
  dapp: 'cube',
  exchange: ['far', 'handshake'],
  favorite: ['far', 'bookmark'],
  login: 'key',
  logout: 'sign-out-alt',
  notifications: ['far', 'bell'],
  settings: 'cog',
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

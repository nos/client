import React from 'react';
import { string } from 'prop-types';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import {
  faBell,
  faCopy,
  faBookmark as faBookmarkReg,
  faHandshake
} from '@fortawesome/fontawesome-free-regular';

import {
  faBookmark,
  faCog,
  faCubes,
  faKey,
  faQuestionCircle
} from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(
  faBell,
  faBookmark,
  faBookmarkReg,
  faCog,
  faCubes,
  faHandshake,
  faKey,
  faQuestionCircle,
  faCopy
);

const ICONS = {
  browser: 'globe',
  dapp: 'cube',
  wallet: ['far', 'money-bill-alt'],
  exchange: ['far', 'handshake'],
  favorite: ['far', 'bookmark'],
  login: 'key',
  notifications: ['far', 'bell'],
  settings: 'cog',
  unfavorite: ['far', 'bookmark'],
  copy: 'copy'
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

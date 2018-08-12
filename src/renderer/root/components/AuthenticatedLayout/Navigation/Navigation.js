/* eslint-disable consistent-return */

import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { string } from 'prop-types';
import { noop } from 'lodash';

import { DAPPS, ACCOUNT, SETTINGS } from 'browser/values/browserValues';
import DAppsIcon from 'shared/images/icons/dapps.svg';
import AccountIcon from 'shared/images/icons/account.svg';
import SettingsIcon from 'shared/images/icons/settings.svg';
import LogoutIcon from 'shared/images/icons/logout.svg';
import Tooltip from 'shared/components/Tooltip';

import TabLink from '../TabLink';
import styles from './Navigation.scss';

export default function Navigation(props) {
  return (
    <nav className={classNames(styles.navigation, props.className)}>
      <ul className={styles.group}>
        <li>
          <Tooltip overlay="DApps">
            <TabLink id="dapps" target={DAPPS} disabled>
              <DAppsIcon aria-label="dapps" />
            </TabLink>
          </Tooltip>
        </li>
        <li>
          <Tooltip overlay="Account">
            <TabLink id="account" target={ACCOUNT}>
              <AccountIcon aria-label="account" />
            </TabLink>
          </Tooltip>
        </li>
        <li>
          <Tooltip overlay="Settings">
            <TabLink id="settings" target={SETTINGS}>
              <SettingsIcon aria-label="settings" />
            </TabLink>
          </Tooltip>
        </li>
        <li>
          <Tooltip overlay="Logout">
            <NavLink id="logout" exact to="/logout" draggable={false} className={styles.link}>
              <LogoutIcon aria-label="logout" />
            </NavLink>
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  className: string
};

Navigation.defaultProps = {
  className: noop
};

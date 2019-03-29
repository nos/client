/* eslint-disable consistent-return */

import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { string } from 'prop-types';

import { APPSTORE, ACCOUNT, EXCHANGE, SETTINGS } from 'browser/values/browserValues';
import AppStoreIcon from 'shared/images/icons/dapps.svg';
import AccountIcon from 'shared/images/icons/account.svg';
import ExchangeIcon from 'shared/images/icons/exchange.svg';
import SettingsIcon from 'shared/images/icons/settings.svg';
import LogoutIcon from 'shared/images/icons/logout.svg';
import Tooltip from 'shared/components/Tooltip';

import TabLink from '../TabLink';
import ExplorerLink from '../ExplorerLink';
import LastBlock from '../LastBlock';
import StatusIcon from '../StatusIcon';
import styles from './Navigation.scss';

export default class Navigation extends React.PureComponent {
  static propTypes = {
    className: string
  };

  static defaultProps = {
    className: null
  };

  render() {
    return (
      <nav className={classNames(styles.navigation, this.props.className)}>
        <ul>
          <li>
            <Tooltip overlay="App Store">
              <div>
                <TabLink id="appstore" target={APPSTORE}>
                  <AppStoreIcon aria-label="appstore" />
                </TabLink>
              </div>
            </Tooltip>
          </li>
          <li>
            <Tooltip overlay="Exchange">
              <div>
                <TabLink id="exchange" target={EXCHANGE} disabled>
                  <ExchangeIcon aria-label="exchange" />
                </TabLink>
              </div>
            </Tooltip>
          </li>
          <li>
            <Tooltip overlay="Account">
              <div>
                <TabLink id="account" target={ACCOUNT}>
                  <AccountIcon aria-label="account" />
                </TabLink>
              </div>
            </Tooltip>
          </li>
          <li>
            <Tooltip overlay="Settings">
              <div>
                <TabLink id="settings" target={SETTINGS}>
                  <SettingsIcon aria-label="settings" />
                </TabLink>
              </div>
            </Tooltip>
          </li>
        </ul>
        <ul>
          <li>
            <Tooltip overlay={<LastBlock />}>
              <div className={styles.link}>
                <ExplorerLink id="status">
                  <StatusIcon aria-label="status" />
                </ExplorerLink>
              </div>
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
}

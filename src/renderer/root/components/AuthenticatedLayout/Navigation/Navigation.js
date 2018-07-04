/* eslint-disable consistent-return */

import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { string } from 'prop-types';
import { noop } from 'lodash';

import Icon from 'shared/components/Icon';
import Tooltip from 'shared/components/Tooltip';

import TabLink from '../TabLink';
import styles from './Navigation.scss';

export default class Navigation extends React.Component {
  static propTypes = {
    className: string
  };

  static defaultProps = {
    className: noop
  };

  render() {
    return (
      <nav className={classNames(styles.navigation, this.props.className)}>
        <ul className={styles.group}>
          {/*
          <li>
            <NavLink to="/browser" draggable={false} className={styles.link}>
              <Tooltip id="browser" overlay="Browser">
                <Icon name="browser" aria-label="Browser" />
              </Tooltip>
            </NavLink>
          </li>
          */}
          <li>
            <TabLink id="account" target="about:account" className={styles.link}>
              <Tooltip id="account" overlay="Account">
                <Icon name="account" aria-label="Account" />
              </Tooltip>
            </TabLink>
          </li>
          <li>
            <TabLink id="account" target="about:settings" className={styles.link}>
              <Tooltip id="settings" overlay="Settings">
                <Icon name="settings" aria-label="Settings" />
              </Tooltip>
            </TabLink>
          </li>
          <li>
            <NavLink exact to="/logout" draggable={false} className={styles.link}>
              <Tooltip id="logout" overlay="Logout">
                <Icon name="logout" aria-label="Logout" />
              </Tooltip>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }

  handleDisabled = (event) => {
    event.preventDefault();
  }
}

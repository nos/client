/* eslint-disable consistent-return */

import React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from 'shared/components/Icon';
import Tooltip from 'shared/components/Tooltip';

import styles from './Navigation.scss';

export default class Navigation extends React.Component {
  render() {
    return (
      <nav className={styles.navigation}>
        <ul className={styles.group}>
          <li>
            <NavLink to="/browser">
              <Tooltip id="browser" overlay="Browser">
                <Icon name="browser" aria-describedby="browser" />
              </Tooltip>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/favorites" className={styles.disabled} onClick={this.handleDisabled}>
              <Tooltip id="favorites" overlay="Favorites (coming soon!)">
                <Icon name="favorite" aria-describedby="favorites" />
              </Tooltip>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/exchange" className={styles.disabled} onClick={this.handleDisabled}>
              <Tooltip id="exchange" overlay="Exchange (coming soon!)">
                <Icon name="exchange" aria-describedby="exchange" />
              </Tooltip>
            </NavLink>
          </li>
          <li>
            <NavLink id="account" exact to="/account">
              <Tooltip id="account" overlay="Account">
                <Icon name="account" aria-describedby="account" />
              </Tooltip>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/settings">
              <Tooltip id="settings" overlay="Settings">
                <Icon name="settings" aria-describedby="settings" />
              </Tooltip>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/logout">
              <Tooltip id="logout" overlay="Logout">
                <Icon name="logout" aria-describedby="logout" />
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

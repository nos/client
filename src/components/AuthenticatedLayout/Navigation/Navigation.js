/* eslint-disable consistent-return */

import React from 'react';
import { bool } from 'prop-types';
import { NavLink } from 'react-router-dom';

import Icon from '../../Icon';
import styles from './Navigation.scss';

export default class Navigation extends React.Component {
  static propTypes = {
    authenticated: bool
  };

  static defaultProps = {
    authenticated: false
  };

  render() {
    return (
      <nav className={styles.navigation}>
        <ul>
          {this.renderAuthenticated()}
          {this.renderUnauthenticated()}
        </ul>
      </nav>
    );
  }

  renderAuthenticated = () => {
    if (this.props.authenticated) {
      return (
        <ul className={styles.group}>
          <li>
            <NavLink exact to="/browser">
              <Icon name="browser" />
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/favorites">
              <Icon name="favorite" />
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/exchange">
              <Icon name="exchange" />
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/dapp">
              <Icon name="dapp" />
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/logout">
              <Icon name="logout" />
            </NavLink>
          </li>
        </ul>
      );
    }
  };

  renderUnauthenticated = () => {
    if (!this.props.authenticated) {
      return (
        <div className={styles.group}>
          <li>
            <NavLink exact to="/login">
              <Icon name="login" />
              <span>Login</span>
            </NavLink>
          </li>
        </div>
      );
    }
  };
}

/* eslint-disable consistent-return */

import React from 'react';
import { bool } from 'prop-types';
import { NavLink } from 'react-router-dom';

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
      <div className={styles.navigation}>
        {this.renderAuthenticated()}
        {this.renderUnauthenticated()}
      </div>
    );
  }

  renderAuthenticated = () => {
    if (this.props.authenticated) {
      return (
        <div className={styles.group}>
          <NavLink exact to="/">Home</NavLink>
          {' | '}
          <NavLink exact to="/dapp">DApp Example</NavLink>
          {' | '}
          <NavLink exact to="/logout">Logout</NavLink>
        </div>
      );
    }
  }

  renderUnauthenticated = () => {
    if (!this.props.authenticated) {
      return (
        <div className={styles.group}>
          <NavLink exact to="/login">Login</NavLink>
        </div>
      );
    }
  }
}

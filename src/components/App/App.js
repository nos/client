import React from 'react';

import { NavLink } from 'react-router-dom';
import { bool } from 'prop-types';
import Navigation from './Navigation';
import Routes from './Routes';
import Icon from '../Icon';
import logo from '../../images/logo.svg';

import styles from './App.scss';

export default function App(props) {
  return (
    <div className={styles.app}>
      <div className={styles.menu}>
        <header>
          <NavLink exact to="/">
            <img src={logo} alt="nOS Logo" width="32" height="32" />
          </NavLink>
          <h1>
            <NavLink exact to="/">
              n<span>OS</span>
            </NavLink>
          </h1>
        </header>
        <Navigation authenticated={props.authenticated} />
      </div>
      <main className={styles.main}>
        <div className={styles.addressBar}>
          <input type="text" placeholder="Search or enter address" />
          <button>
            <Icon name="unfavorite" />
          </button>
          <button>
            <Icon name="settings" />
          </button>
        </div>
        <div className={styles.breadCrumbs}>
          <ul>
            <li>Home</li>
            <li>Browser</li>
            <li>Example dApp</li>
          </ul>
        </div>
        <div className={styles.content}>
          <Routes />
        </div>
        <footer className={styles.footer}>
          <div className={styles.status}>
            This is some status text, maybe it only appears if there&rsquo;s something to show?
          </div>
        </footer>
      </main>
    </div>
  );
}

App.displayName = 'App';

App.propTypes = {
  authenticated: bool
};

App.defaultProps = {
  authenticated: false
};

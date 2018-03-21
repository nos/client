import React from 'react';
import { NavLink } from 'react-router-dom';
import { node } from 'prop-types';
import Icon from '../Icon';
import styles from './App.scss';
import logo from '../../images/logo.svg';

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
        <nav className={styles.navigation}>
          <ul>
            <li>
              <NavLink to="/browser">
                <Icon name="browser" />
                <span>Browser</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites">
                <Icon name="favorite" />
                <span>Favorites</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/exchange">
                <Icon name="exchange" />
                <span>Exchange</span>
              </NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink exact to="/login">
                <Icon name="login" />
                <span>Login</span>
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/dapp">
                <Icon name="dapp" />
                <span>dApp Example</span>
              </NavLink>
            </li>
          </ul>
        </nav>
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
        <div className={styles.content}>{props.children}</div>
        <footer className={styles.footer}>
          <div className={styles.status}>
            This is some status text, maybe it only appears if there&rsquo;s something to show?
          </div>
        </footer>
      </main>
    </div>
  );
}

App.propTypes = {
  children: node
};

App.defaultProps = {
  children: null
};

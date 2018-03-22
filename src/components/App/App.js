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
            <img src={logo} alt="nOS Logo" width="36" height="36" />
          </NavLink>
        </header>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <NavLink to="/browser">
                <Icon name="browser" size="2x" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites">
                <Icon name="favorite" size="2x" />
              </NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to="/wallet">
                <Icon name="wallet" size="2x" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/exchange">
                <Icon name="exchange" size="2x" />
              </NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink exact to="/login">
                <Icon name="login" size="2x" />
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/dapp">
                <Icon name="dapp" size="2x" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <main className={styles.main}>
        <div className={styles.addressBar}>
          <input type="text" placeholder="Search or enter address" autoFocus />
          <button>
            <Icon name="unfavorite" />
          </button>
          <button>
            <Icon name="settings" />
          </button>
        </div>
        {/*<div className={styles.breadCrumbs}>*/}
          {/*<ul>*/}
            {/*<li>Home</li>*/}
            {/*<li>Browser</li>*/}
            {/*<li>Example dApp</li>*/}
          {/*</ul>*/}
        {/*</div>*/}
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

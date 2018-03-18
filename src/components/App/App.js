import React from 'react';
import { bool, node } from 'prop-types';

import Navigation from './Navigation';
import logo from './logo.svg';
import styles from './App.scss';

export default function App(props) {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h1 className={styles.title}>Welcome to React</h1>
      </header>
      <Navigation authenticated={props.authenticated} />
      <div>
        {props.children}
      </div>
    </div>
  );
}

App.displayName = 'App';

App.propTypes = {
  children: node,
  authenticated: bool
};

App.defaultProps = {
  children: null,
  authenticated: false
};

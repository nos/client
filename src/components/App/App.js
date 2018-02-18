import React from 'react';
import { NavLink } from 'react-router-dom';
import { node } from 'prop-types';

import logo from './logo.svg';
import styles from './App.scss';

export default function App(props) {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h1 className={styles.title}>Welcome to React</h1>
      </header>
      <div>
        <NavLink exact to="/">Home</NavLink>
        {' | '}
        <NavLink exact to="/login">Login</NavLink>
        {' | '}
        <NavLink exact to="/dapp">DApp Example</NavLink>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: node
};

App.defaultProps = {
  children: null
};

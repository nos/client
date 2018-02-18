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
        <NavLink exact to="/">Home</NavLink>
      </header>
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

import React from 'react';
import { bool, node } from 'prop-types';

import Navigation from './Navigation';
import styles from './App.scss';

export default function App(props) {
  return (
    <div className={styles.app}>
      <Navigation authenticated={props.authenticated} />
      <div className={styles.content}>
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

import React from 'react';
import { bool } from 'prop-types';

import Navigation from './Navigation';
import Routes from './Routes';
import styles from './App.scss';

export default function App(props) {
  return (
    <div className={styles.app}>
      <Navigation authenticated={props.authenticated} />
      <div className={styles.content}>
        <Routes />
      </div>
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

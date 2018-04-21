import React from 'react';

import Routes from './Routes';
import DialogPresenter from './DialogPresenter';
import styles from './App.scss';

export default function App(_props) {
  return (
    <div className={styles.app}>
      <Routes />
      <DialogPresenter />
    </div>
  );
}

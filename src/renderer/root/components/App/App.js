import React from 'react';

import Routes from './Routes';
import Toasts from './Toasts';
import DialogPresenter from './DialogPresenter';
import ButtonBar from './ButtonBar';
import styles from './App.scss';

export default function App(_props) {
  return (
    <div className={styles.app}>
      <Routes />
      <Toasts />
      <DialogPresenter />
      <ButtonBar className={styles.buttonBar} />
    </div>
  );
}

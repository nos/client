import React from 'react';

import NetworkPanel from '../NetworkPanel';
import styles from './Settings.scss';

export default function Settings() {
  return (
    <div className={styles.settings}>
      <NetworkPanel />
    </div>
  );
}

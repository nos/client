import React from 'react';

import AccountPanel from './AccountPanel';
import styles from './Home.scss';

export default function Home() {
  return (
    <div className={styles.home}>
      <AccountPanel />
    </div>
  );
}

import React from 'react';

import WalletPanel from './WalletPanel';
import styles from './Home.scss';

export default function Home() {
  return (
    <div className={styles.home}>
      <WalletPanel />
    </div>
  );
}

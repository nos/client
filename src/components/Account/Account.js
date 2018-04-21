import React from 'react';

import AccountPanel from './AccountPanel';
import styles from './Account.scss';

export default function Account() {
  return (
    <div className={styles.account}>
      <AccountPanel />
    </div>
  );
}

import React from 'react';

import AccountPanel from './AccountPanel';
import AccountTransaction from './AccountTransaction';
import styles from './Account.scss';

export default function Account() {
  return (
    <div className={styles.account}>
      <AccountPanel />
      <AccountTransaction />
    </div>
  );
}

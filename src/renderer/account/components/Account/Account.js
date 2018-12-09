import React from 'react';

import Page from 'shared/components/Page';

import AccountPanel from '../AccountPanel';
import TransactionsPanel from '../TransactionsPanel';
import styles from './Account.scss';

export default function Account() {
  return (
    <div className={styles.account}>
      <Page className={styles.content}>
        <AccountPanel className={styles.panel} />
        <TransactionsPanel className={styles.panel} />
      </Page>
    </div>
  );
}

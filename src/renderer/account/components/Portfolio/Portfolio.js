import React from 'react';

import Page from 'shared/components/Page';

import AccountPanel from './AccountPanel';
import TransactionsPanel from './TransactionsPanel';
import styles from './Portfolio.scss';

export default function Account(props) {
  console.log('Acc props', props);
  return (
    <div className={styles.account}>
      <Page className={styles.content}>
        <AccountPanel className={styles.panel} />
        <TransactionsPanel className={styles.panel} />
      </Page>
    </div>
  );
}

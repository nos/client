import React from 'react';

import Page from 'shared/components/Page';

import AccountPanel from './AccountPanel';
import TransactionsPanel from './TransactionsPanel';
import styles from './Portfolio.scss';

export default class Portfolio extends React.PureComponent {
  render() {
    return (
      <div className={styles.account}>
        <Page className={styles.content}>
          <AccountPanel className={styles.panel} />
          <TransactionsPanel className={styles.panel} />
        </Page>
      </div>
    );
  }
}

Portfolio.propTypes = {};

Portfolio.defaultProps = {};

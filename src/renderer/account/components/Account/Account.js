import React from 'react';

import { string, func } from 'prop-types';

import Page from 'shared/components/Page';

import AccountPanel from '../AccountPanel';
import TransactionsPanel from '../TransactionsPanel';
import styles from './Account.scss';

export default class Account extends React.PureComponent {
  static propTypes = {
    __progress__: string.isRequired,
    showErrorToast: func.isRequired
  };

  render() {
    const { __progress__, showErrorToast } = this.props;

    if (__progress__ === 'FAILED') {
      showErrorToast('Loading is taking longer than expected. Check your nOS Network Settings.');
    }

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

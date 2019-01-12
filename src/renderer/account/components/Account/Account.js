import React from 'react';
import { objectOf, number, string } from 'prop-types';
import { values } from 'lodash';

import Page from 'shared/components/Page';

import AccountPanel from '../AccountPanel';
import TransactionsPanel from '../TransactionsPanel';
import balanceShape from '../../shapes/balanceShape';
import styles from './Account.scss';

export default function Account(props) {
  const { claimable, balances, prices } = props;

  return (
    <div className={styles.account}>
      <Page className={styles.content}>
        <AccountPanel
          className={styles.panel}
          claimable={claimable}
          balances={values(balances)}
          prices={prices}
        />
        <TransactionsPanel
          className={styles.panel}
          balances={balances}
          prices={prices}
        />
      </Page>
    </div>
  );
}

Account.propTypes = {
  claimable: string.isRequired,
  balances: objectOf(balanceShape).isRequired,
  prices: objectOf(number).isRequired
};

import React from 'react';
import { objectOf, number } from 'prop-types';
import { values } from 'lodash';

import Page from 'shared/components/Page';

import AccountPanel from '../AccountPanel';
import TransactionsPanel from '../TransactionsPanel';
import balanceShape from '../../shapes/balanceShape';
import styles from './Account.scss';

export default function Account(props) {
  const { balances, prices } = props;

  return (
    <Page className={styles.account}>
      <AccountPanel
        className={styles.panel}
        balances={values(balances)}
        prices={prices}
      />
      <TransactionsPanel
        className={styles.panel}
        balances={balances}
      />
    </Page>
  );
}

Account.propTypes = {
  balances: objectOf(balanceShape).isRequired,
  prices: objectOf(number).isRequired
};

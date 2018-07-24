import React from 'react';
import { objectOf, number } from 'prop-types';
import { values } from 'lodash';

import AccountPanel from '../AccountPanel';
import SendPanel from '../SendPanel';
import balanceShape from '../../shapes/balanceShape';
import styles from './Account.scss';

export default function Account(props) {
  const { balances, prices } = props;

  return (
    <div className={styles.account}>
      <AccountPanel
        className={styles.panel}
        balances={values(balances)}
        prices={prices}
      />
      <SendPanel
        className={styles.panel}
        balances={balances}
      />
    </div>
  );
}

Account.propTypes = {
  balances: objectOf(balanceShape).isRequired,
  prices: objectOf(number).isRequired
};

import React from 'react';
import { arrayOf, objectOf, number } from 'prop-types';

import AccountPanel from '../AccountPanel';
import SendPanel from '../SendPanel';
import balanceShape from '../../shapes/balanceShape';
import styles from './Account.scss';

export default function Account(props) {
  const { balances, prices } = props;

  return (
    <div className={styles.account}>
      <AccountPanel className={styles.panel} balances={balances} prices={prices} />
      <SendPanel className={styles.panel} balances={balances} />
    </div>
  );
}

Account.propTypes = {
  balances: arrayOf(balanceShape).isRequired,
  prices: objectOf(number).isRequired
};

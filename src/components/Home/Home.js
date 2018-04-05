import React from 'react';
import { string, objectOf } from 'prop-types';

import WalletPanel from './WalletPanel';
import balanceShape from '../../shapes/balanceShape';
import styles from './Home.scss';

export default function Home(props) {
  return (
    <div className={styles.home}>
      <WalletPanel address={props.address} balances={props.balances} />
    </div>
  );
}

Home.propTypes = {
  address: string.isRequired,
  balances: objectOf(balanceShape).isRequired
};

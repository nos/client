import React from 'react';
import { map } from 'lodash';

import accountShape from 'auth/shapes/accountShape';
import walletsShape from 'auth/shapes/walletsShape';

import Wallet from '../Wallet';
import styles from './Wallets.scss';

const Wallets = ({ account, wallets }) => {
  const { isHardware } = account;

  return (
    <div className={styles.wallets}>
      <div className={styles.title}>
        Accounts generated from {isHardware ? 'Ledger' : 'Keychain'}
      </div>
      {map(wallets, (wallet) => (
        <Wallet wallet={wallet} key={`${wallet.coinType}-${wallet.index}`} />
      ))}
    </div>
  );
};

Wallets.propTypes = {
  account: accountShape.isRequired,
  wallets: walletsShape.isRequired
};

export default Wallets;

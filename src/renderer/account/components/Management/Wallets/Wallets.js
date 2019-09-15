import React from 'react';
import { map, filter } from 'lodash';

import accountShape from 'auth/shapes/accountShape';
import walletsShape from 'auth/shapes/walletsShape';

import Wallet from '../Wallet';
import styles from './Wallets.scss';

const Wallets = ({ account, wallets }) => {
  const { isHardware } = account;
  const generatedWallets = filter(wallets, (wallet) => !wallet.isImport);
  const importedWallets = filter(wallets, (wallet) => wallet.isImport);

  return (
    <React.Fragment>
      <div className={styles.wallets}>
        <div className={styles.title}>
          Accounts generated from {isHardware ? 'Ledger' : 'Keychain'}
        </div>
        {map(generatedWallets, (wallet) => (
          <Wallet wallet={wallet} key={`${wallet.walletId}`} />
        ))}
      </div>
      <div className={styles.wallets}>
        <div className={styles.title}>Imported Wallets</div>
        {map(importedWallets, (wallet) => (
          <Wallet wallet={wallet} key={`${wallet.walletId}`} />
        ))}
      </div>
    </React.Fragment>
  );
};

Wallets.propTypes = {
  account: accountShape.isRequired,
  wallets: walletsShape.isRequired
};

export default Wallets;

import React from 'react';

import accountShape from 'auth/shapes/accountShape';

import AccountDatum from './AccountDatum';
import SaveAccount from './SaveAccount';
import styles from './AccountDetails.scss';

export default function AccountDetails(props) {
  const { account } = props;

  return (
    <div className={styles.accountDetails}>
      <div>
        <AccountDatum label="Secret Word" hidden value={account.secretWord} />
        <AccountDatum label="Mnemonic" hidden value={account.mnemonic} />
        <AccountDatum label="Passphrase" hidden value={account.passphrase} />
      </div>
      <div className={styles.actions}>
        <SaveAccount account={account} />
      </div>
      <div className={styles.disclaimer}>
        Everything except your passphrase will be saved to nOS Client. Make sure you store all of
        this data securely yourself as well. nOS Client is not responsible for loss of keys or loss
        of funds.
      </div>
    </div>
  );
}

AccountDetails.propTypes = {
  account: accountShape.isRequired
};

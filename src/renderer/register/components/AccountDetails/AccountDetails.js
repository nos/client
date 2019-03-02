import React from 'react';

import AccountDatum from './AccountDatum';
import SaveAccount from './SaveAccount';
import accountShape from '../../shapes/accountShape';
import styles from './AccountDetails.scss';

export default function AccountDetails(props) {
  const { account } = props;

  return (
    <div className={styles.accountDetails}>
      <div>
        <AccountDatum label="Address" value={account.address} />
        <AccountDatum label="Private Key" value={account.key} />
        <AccountDatum label="Encrypted Key" value={account.encryptedKey} />
        <AccountDatum label="Passphrase" hidden value={account.passphrase} />
      </div>
      <div className={styles.actions}>
        <SaveAccount account={account} />
      </div>
      <div className={styles.disclaimer}>
        Your Address and Encrypted Key will be saved to nOS Client. Make sure you store all of this
        data securely yourself as well. nOS Client is not responsible for loss of keys or loss of
        funds.
      </div>
    </div>
  );
}

AccountDetails.propTypes = {
  account: accountShape.isRequired
};

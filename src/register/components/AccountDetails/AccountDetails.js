import React from 'react';
import { Link } from 'react-router-dom';

import AccountDatum from './AccountDatum';
import SaveAccount from './SaveAccount';
import accountShape from '../../shapes/accountShape';
import styles from './AccountDetails.scss';

export default function AccountDetails(props) {
  const { account } = props;

  return (
    <div className={styles.accountDetails}>
      <SaveAccount account={account} />
      <div>
        <AccountDatum label="Address" value={account.address} />
        <AccountDatum label="Private Key" value={account.key} />
        <AccountDatum label="Encrypted Key" value={account.encryptedKey} />
        <AccountDatum label="Passphrase" value={account.passphrase} />
      </div>
      <div className={styles.actions}>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

AccountDetails.propTypes = {
  account: accountShape.isRequired
};

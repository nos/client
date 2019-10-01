import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import KeyChainIcon from 'shared/images/account/keychain.svg';

import styles from './Account.scss';
import EncryptedInput from '../EncryptedInput';

const Info = () => (
  <div className={styles.left}>
    <div className={styles.icon}>
      <KeyChainIcon />
    </div>
    <div>
      <div className={styles.title}>Keychain</div>
      <div className={styles.subtitle}>Secret Words</div>
    </div>
  </div>
);

const Account = ({ className, encryptedMnemonic, secretWord }) => {
  return (
    <div className={classNames(styles.account, className)}>
      <Info />
      <div className={styles.encryptedContainer}>
        <EncryptedInput
          title="Secret Words"
          secretWord={secretWord}
          encryptedData={encryptedMnemonic}
          className={styles.encryptedInput}
        />
      </div>
    </div>
  );
};

Account.propTypes = {
  className: string,
  encryptedMnemonic: string.isRequired,
  secretWord: string.isRequired
};

Account.defaultProps = {
  className: null
};

export default Account;

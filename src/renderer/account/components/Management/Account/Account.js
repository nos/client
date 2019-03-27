import React from 'react';
import classNames from 'classnames';
import { string, bool } from 'prop-types';

import KeyChainIcon from 'shared/images/account/keychain.svg';
import CopyIcon from 'shared/images/wallet/copy.svg';

import AccountData from '../AccountData';
import styles from './Account.scss';

export default function AccountAddress(props) {
  return (
    <div className={classNames(styles.account, props.className)}>
      <div className={styles.left}>
        <div className={styles.icon}>
          <KeyChainIcon />
        </div>
        <div className={styles.data}>
          <div className={styles.title}>Keychain</div>
          <div className={styles.subtitle}>Secret Words</div>
        </div>
      </div>
      <AccountData data={props.data} />
    </div>
  );
}

// TODO what if not signed in?
AccountAddress.propTypes = {
  className: string,
  address: string
};

AccountAddress.defaultProps = {
  className: null,
  address: null
};

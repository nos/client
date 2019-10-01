import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import CopyIcon from 'shared/images/wallet/copy.svg';
import QRCodeIcon from 'shared/images/wallet/qrcode.svg';

import styles from './AccountAddress.scss';

export default function AccountAddress(props) {
  return (
    <div className={classNames(styles.accountAddress, props.className)}>
      <div>Wallet Address</div>
      <div className={styles.address}>{props.address}</div>
      <ul className={styles.actions}>
        <li className={styles.action}>
          <CopyIcon />
        </li>
        <li className={styles.action}>
          <QRCodeIcon />
        </li>
      </ul>
    </div>
  );
}

AccountAddress.propTypes = {
  className: string,
  address: string
};

AccountAddress.defaultProps = {
  className: null,
  address: null
};

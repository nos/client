import React from 'react';
import classNames from 'classnames';
import { string, bool } from 'prop-types';

import CopyIcon from 'shared/images/wallet/copy.svg';
import QRCodeIcon from 'shared/images/wallet/qrcode.svg';
import Input from 'shared/components/Forms/Input';

import styles from './SecretView.scss';

export default function SecretView(props) {
  return (
    <div className={classNames(styles.secretView, props.className)}>
      <div className={styles.heading}>
        <div className={styles.type}>Secret Words</div>
        <div className={styles.toggle}>Show & Unlock</div>
      </div>
      <div className={styles.data}>
        <Input className={styles.secretInput} type="password" value="hint goat exhibit matter damp season receive begin yard element random purity turtle exact mixture art gold into effort goddess shed brick marriage faith" />
      </div>
    </div>
  );
}

SecretView.propTypes = {
  className: string,
  address: string
};

SecretView.defaultProps = {
  className: null,
  address: null
};

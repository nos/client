import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import Input from 'shared/components/Forms/Input';

import styles from './AccountData.scss';

export default function SecretView(props) {
  return (
    <div className={classNames(styles.accountData, props.className)}>
      <div className={styles.secretView}>
        <div className={styles.heading}>
          <div>Secret Words</div>
          <div className={styles.toggle}>Show & Unlock</div>
        </div>
        <div className={styles.data}>
          <Input
            className={styles.input}
            type="password"
            value={
              props.data.mnemonic ? props.data.mnemonic : props.data.privateKey
            }
          />
        </div>
      </div>
      {props.data.publicKey && (
        <div className={styles.publicView}>
          <div className={styles.heading}>Public Address</div>
          <Input
            className={styles.input}
            type="text"
            value={props.data.publicKey}
          />
        </div>
      )}
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

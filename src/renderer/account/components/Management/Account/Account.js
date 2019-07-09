import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import KeyChainIcon from 'shared/images/account/keychain.svg';

import styles from './Account.scss';
import EncryptedInput from '../EncryptedInput';

export default class Account extends React.PureComponent {
  static propTypes = {
    className: string,
    encryptedMnemonic: string,
    secretWord: string.isRequired
  };

  static defaultProps = {
    className: null,
    encryptedMnemonic: ''
  };

  render() {
    const { className, encryptedMnemonic, secretWord } = this.props;

    return (
      <div className={classNames(styles.account, className)}>
        {this.renderInfo()}
        <EncryptedInput title="Secret Words" secretWord={secretWord} encryptedData={encryptedMnemonic} />
      </div>
    );
  }

  // TODO move to function component
  renderInfo = () => (
    <div className={styles.left}>
      <div className={styles.icon}>
        <KeyChainIcon />
      </div>
      <div>
        <div className={styles.title}>
          Keychain
        </div>
        <div className={styles.subtitle}>Secret Words</div>
      </div>
    </div>
  )
}

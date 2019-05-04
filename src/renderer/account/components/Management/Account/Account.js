import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import instanceShape from 'shared/shapes/instanceShape';

import KeyChainIcon from 'shared/images/account/keychain.svg';
import NeoIcon from 'shared/images/tokens/neo.svg';
import EthIcon from 'shared/images/tokens/eth.svg';

import AccountData from '../AccountData';
import styles from './Account.scss';

export default class Account extends React.PureComponent {
  static propTypes = {
    className: string,
    instance: instanceShape,
    encryptedMnemonic: string,
    secretWord: string.isRequired
  };

  static defaultProps = {
    className: null,
    instance: null,
    encryptedMnemonic: ''
  };

  render() {
    const { className, encryptedMnemonic, instance, secretWord } = this.props;
    const identityColor = instance ? styles[instance.type.toLowerCase()] : styles.neo;

    return (
      <div className={classNames(identityColor, styles.account, className)}>
        <div className={styles.left}>
          <div className={styles.icon}>{this.renderIcon()}</div>
          <div className={styles.data}>
            <div className={styles.title}>
              {encryptedMnemonic ? 'Keychain' : `${instance.type} Account ${instance.index + 1}`}
            </div>
            <div className={styles.subtitle}>{encryptedMnemonic ? 'Secret Words' : 'Wallet'}</div>
          </div>
        </div>
        <AccountData
          encryptedMnemonic={encryptedMnemonic}
          instance={instance}
          secretWord={secretWord}
        />
      </div>
    );
  }

  renderIcon = () => {
    if (this.props.encryptedMnemonic) return <KeyChainIcon />;

    switch (this.props.instance.type.toLowerCase()) {
      case 'eth':
        return <EthIcon />;
      case 'neo':
        return <NeoIcon />;
      default:
        return <KeyChainIcon />;
    }
  };
}

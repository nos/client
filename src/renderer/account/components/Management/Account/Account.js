import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import instanceShape from 'shared/shapes/instanceShape';
import CHAINS, { ETH, NEO } from 'shared/values/chains';
import KeyChainIcon from 'shared/images/account/keychain.svg';
import NeoIcon from 'shared/images/tokens/neo.svg';
import EthIcon from 'shared/images/tokens/eth.svg';

import AccountData from '../AccountData';
import styles from './Account.scss';

export default class Account extends React.PureComponent {
  static propTypes = {
    className: string,
    wallet: instanceShape,
    encryptedMnemonic: string,
    secretWord: string.isRequired
  };

  static defaultProps = {
    className: null,
    instance: null,
    encryptedMnemonic: ''
  };

  render() {
    const { className, encryptedMnemonic, wallet, secretWord } = this.props;
    const identityColor = wallet ? styles[CHAINS[wallet.type].symbol.toLowerCase()] : styles.neo;

    return (
      <div className={classNames(identityColor, styles.account, className)}>
        {this.renderInfo({ encryptedMnemonic, wallet })}
        <AccountData
          encryptedMnemonic={encryptedMnemonic}
          instance={wallet}
          secretWord={secretWord}
        />
      </div>
    );
  }

  renderInfo = ({ encryptedMnemonic, wallet }) => (
    <div className={styles.left}>
      <div className={styles.icon}>{this.renderIcon()}</div>
      <div className={styles.data}>
        <div className={styles.title}>
          {encryptedMnemonic ? 'Keychain' : `${CHAINS[wallet.type].name} Account ${wallet.index + 1}`}
        </div>
        <div className={styles.subtitle}>{encryptedMnemonic ? 'Secret Words' : 'Wallet'}</div>
      </div>
    </div>
  )

  renderIcon = () => {
    if (this.props.encryptedMnemonic) return <KeyChainIcon />;

    // TODO refactor ETH NEO to CHAIN_TYPES.ETH, CHAIN_TYPES.NEO
    switch (this.props.wallet.type) {
      case ETH:
        return <EthIcon />;
      case NEO:
        return <NeoIcon />;
      default:
        return <KeyChainIcon />;
    }
  };
}

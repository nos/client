import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';
import bip39 from 'bip39';

import CHAINS, { ETH, NEO } from 'shared/values/chains';
import KeyChainIcon from 'shared/images/account/keychain.svg';
import NeoIcon from 'shared/images/tokens/neo.svg';
import EthIcon from 'shared/images/tokens/eth.svg';
import Input from 'shared/components/Forms/Input';

import simpleDecrypt from 'shared/util/simpleDecrypt';
import newWalletInstance from 'auth/util/HardwareWallet/HardwareWallet';

import styles from './Wallet.scss';

import EncryptedInput from '../EncryptedInput';

export default class Wallet extends React.PureComponent {
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
    const { className, encryptedMnemonic, secretWord, wallet, privateKey } = this.props;
    const identityColor = styles[CHAINS[wallet.type].symbol.toLowerCase()];

    return (
      <div className={classNames(styles.neo, identityColor, styles.wallet, className)}>
        {this.renderInfo({ wallet })}
        <div className={styles.walletData}>
          {this.renderAddress({ wallet })}
          <EncryptedInput
            title="Private Key"
            encryptedData={encryptedMnemonic}
            secretWord={secretWord}
            wallet={wallet}
          />
        </div>
      </div>
    );
  }

  renderInfo = ({ wallet }) => (
    <div className={styles.left}>
      <div className={styles.icon}>{this.renderIcon()}</div>
      <div>
        <div className={styles.title}>
          {CHAINS[wallet.type].name} Account {wallet.index + 1}
        </div>
        <div className={styles.subtitle}>Wallet</div>
      </div>
    </div>
  )


  renderAddress = ({ wallet }) => (
    <div className={styles.publicView}>
      <div className={styles.subtitle}>Public Address</div>
      <Input readOnly className={styles.input} type="text" value={wallet.address} />
    </div>
  );

  renderIcon = () => {
    const { wallet } = this.props;

    // TODO refactor ETH NEO to CHAIN_TYPES.ETH, CHAIN_TYPES.NEO
    switch (wallet.type) {
      case ETH:
        return <EthIcon />;
      case NEO:
        return <NeoIcon />;
      default:
        return <KeyChainIcon />;
    }
  };
}

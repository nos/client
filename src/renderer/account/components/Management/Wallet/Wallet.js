import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import COINS, { ETH, NEO, DEFAULT_COIN } from 'shared/values/coins';
import KeyChainIcon from 'shared/images/account/keychain.svg';
import NeoIcon from 'shared/images/tokens/neo.svg';
import EthIcon from 'shared/images/tokens/eth.svg';
import Input from 'shared/components/Forms/Input';

import styles from './Wallet.scss';

import EncryptedInput from '../EncryptedInput';
import walletShape from '../../../../auth/shapes/walletShape';

export default class Wallet extends React.PureComponent {
  static propTypes = {
    className: string,
    encryptedMnemonic: string.isRequired,
    secretWord: string.isRequired,
    wallet: walletShape.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    const { className, encryptedMnemonic, secretWord, wallet } = this.props;

    const coinType = COINS[wallet.coinType];
    const identityColor = styles[coinType ? coinType.symbol.toLowerCase() : DEFAULT_COIN];

    return (
      <div className={classNames(styles.neo, identityColor, styles.wallet, className)}>
        {this.renderInfo({ wallet })}
        <div className={styles.walletData}>
          {this.renderAddress({ wallet })}
          {this.renderPrivateKey({ encryptedMnemonic, secretWord, wallet })}
        </div>
      </div>
    );
  }

  renderInfo = ({ wallet }) => {
    const coinType = COINS[wallet.coinType];
    const coinName = coinType ? coinType.name : '';

    return (
      <div className={styles.left}>
        <div className={styles.icon}>{this.renderIcon()}</div>
        <div>
          <div className={styles.title}>
            {coinName} {wallet.index + 1}
          </div>
          <div className={styles.subtitle}>Wallet</div>
        </div>
      </div>
    );
  };

  renderAddress = ({ wallet }) => (
    <div className={styles.publicView}>
      <div className={styles.subtitle}>Public Address</div>
      <Input readOnly className={styles.input} type="text" value={wallet.address} />
    </div>
  );

  renderPrivateKey = ({ encryptedMnemonic, secretWord, wallet }) => {
    return !wallet.isHardware ? (
      <EncryptedInput
        title="Private Key"
        encryptedData={encryptedMnemonic}
        secretWord={secretWord}
        wallet={wallet}
      />
    ) : null;
  };

  renderIcon = () => {
    const { wallet } = this.props;

    // TODO refactor ETH NEO to CHAIN_TYPES.ETH, CHAIN_TYPES.NEO
    switch (wallet.coinType) {
      case ETH:
        return <EthIcon />;
      case NEO:
        return <NeoIcon />;
      default:
        return <KeyChainIcon />;
    }
  };
}

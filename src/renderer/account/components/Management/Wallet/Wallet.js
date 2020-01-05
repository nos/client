import React from 'react';
import classNames from 'classnames';
import { string, func } from 'prop-types';

import COINS, { ETH, NEO } from 'shared/values/coins';
import accountShape from 'auth/shapes/accountShape';
import NeoIcon from 'shared/images/tokens/neo.svg';
import EthIcon from 'shared/images/tokens/eth.svg';
import Input from 'shared/components/Forms/Input';
import LabeledInput from 'shared/components/Forms/LabeledInput';
import Pill from 'shared/components/Pill';
import walletShape from 'auth/shapes/walletShape';

import Star from 'shared/images/wallet/star.svg';
import KeyChainIcon from 'shared/images/account/keychain.svg';
import EmptyStar from 'shared/images/wallet/star-empty.svg';

import styles from './Wallet.scss';

import EncryptedInput from '../EncryptedInput';

export default class Wallet extends React.PureComponent {
  labelRef = React.createRef();

  static propTypes = {
    className: string,
    wallet: walletShape.isRequired,
    passphrase: string.isRequired,
    setPassphrase: func.isRequired,
    account: accountShape.isRequired,
    confirm: func.isRequired,
    changeActiveWallet: func.isRequired,
    updateWallet: func.isRequired,
    showErrorToast: func.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    const { className, wallet, account } = this.props;
    const { encryptedMnemonic, secretWord } = account;

    const coinType = COINS[wallet.coinType];
    // TODO dont hardcode fallback color
    const identityColor = styles[coinType ? coinType.symbol.toLowerCase() : 'nos'];

    return (
      <div className={classNames(styles.neo, identityColor, styles.wallet, className)}>
        {this.renderSelection({ account, wallet })}
        {this.renderInfo({ wallet })}
        <div className={styles.walletData}>
          {this.renderPrivateKey({ encryptedMnemonic, secretWord, wallet })}
          {this.renderAddress({ wallet })}
        </div>
      </div>
    );
  }

  renderSelection = ({ account, wallet }) => {
    const isActiveWallet = account.activeWalletId === wallet.walletId;
    const activeStyle = isActiveWallet ? '' : styles.inactive;

    return (
      <div
        className={classNames(styles.selection, activeStyle)}
        onClick={this.showConfirm}
        role="button"
        tabIndex={0}
      >
        {isActiveWallet ? <Star /> : <EmptyStar />}
      </div>
    );
  };

  renderInfo = ({ wallet }) => {
    const coinType = COINS[wallet.coinType];
    const coinName = coinType ? coinType.name : '';

    return (
      <div className={styles.left}>
        <div className={styles.icon}>{this.renderIcon()}</div>
        <div className={styles.wrapper}>
          <div
            className={styles.title}
            contentEditable="true"
            onBlur={this.handleChangeLabel}
            suppressContentEditableWarning="true"
            onKeyPress={this.validateLabel}
            role="textbox"
            tabIndex={0}
            ref={this.labelRef}
          >
            {wallet.walletLabel || 'Wallet'}
          </div>
          <div className={styles.subtitle}>
            {coinName} Wallet {!wallet.isImport ? wallet.index + 1 : ''}
          </div>
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
      <div className={styles.secretView}>
        <EncryptedInput
          title="Private Key"
          encryptedData={encryptedMnemonic}
          secretWord={secretWord}
          wallet={wallet}
        />
      </div>
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

  handleChangeLabel = (e) => {
    const { wallet, account, updateWallet } = this.props;

    const newLabel = e.target.textContent;
    if (newLabel.length > 31) {
      e.preventDefault();
      return;
    }

    const newWallet = {
      ...wallet,
      walletLabel: newLabel
    };

    updateWallet({ account, wallet: newWallet });
  };

  handleSetPrimary = () => {
    const { wallet, account, passphrase, changeActiveWallet, setPassphrase } = this.props;
    const { walletId } = wallet;
    changeActiveWallet({ account, passphrase, walletId });
    setPassphrase('');
  };

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };

  validateLabel = (e) => {
    if (e.target.textContent.length > 30) {
      e.preventDefault();
      return this.props.showErrorToast('Wallet label cannot be longer than 30 characters.');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      this.labelRef.current.blur();
    }
  };

  showConfirm = () => {
    const { account, setPassphrase, confirm, wallet } = this.props;
    const { secretWord, activeWalletId } = account;
    const { walletId } = wallet;

    if (activeWalletId === walletId) {
      return null;
    }

    confirm(
      <div>
        <Pill className={styles.pill}>{secretWord}</Pill>
        <LabeledInput
          id="passphrase"
          type="password"
          label="Enter Passphrase"
          placeholder="Passphrase"
          onChange={this.handleChangePassphrase}
        />
      </div>,
      {
        title: 'Set as primary wallet',
        onConfirm: this.handleSetPrimary,
        onCancel: () => setPassphrase('')
      }
    );
  };
}

import React from 'react';
import { string, number, func } from 'prop-types';
import { map } from 'lodash';
import classNames from 'classnames';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import Button from 'shared/components/Forms/Button';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';
import Pill from 'shared/components/Pill';
import COINS from 'shared/values/coins';
import accountShape from 'auth/shapes/accountShape';

import styles from './Mnemonic.scss';

export default class Mnemonic extends React.PureComponent {
  static propTypes = {
    className: string,
    account: accountShape.isRequired,
    onCancel: func.isRequired,
    passphrase: string.isRequired,
    setPassphrase: func.isRequired,
    coinType: number.isRequired,
    setCoinType: func.isRequired,
    addAccount: func.isRequired,
    walletLabel: string.isRequired,
    setWalletLabel: func.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    const { className, account, coinType, passphrase, walletLabel } = this.props;
    const { secretWord } = account;

    return (
      <form className={classNames(className, styles.mnemonic)} onSubmit={this.confirm}>
        <Pill>{secretWord}</Pill>
        <LabeledInput
          id="walletLabel"
          type="text"
          label="Enter Wallet Label"
          placeholder="Wallet Label"
          value={walletLabel}
          onChange={this.handleChangeWalletLabel}
        />
        <LabeledInput
          id="passphrase"
          type="password"
          label="Enter Passphrase"
          placeholder="Passphrase"
          value={passphrase}
          onChange={this.handleChangePassphrase}
        />
        <LabeledSelect
          className={styles.input}
          labelClass={styles.label}
          id="network"
          label="Current Network"
          value={coinType}
          items={this.getCoinTypes()}
          onChange={this.handleChangeCoinType}
        />
        <div className={styles.actions}>
          <Button className={styles.action} onClick={this.cancel}>
            Cancel
          </Button>
          <PrimaryButton type="submit" className={styles.action}>
            Add Wallet
          </PrimaryButton>
        </div>
      </form>
    );
  }

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };

  handleChangeWalletLabel = (event) => {
    this.props.setWalletLabel(event.target.value);
  };

  handleChangeCoinType = (coinId) => {
    this.props.setCoinType(coinId);
  };

  cancel = () => {
    const { onCancel, setPassphrase, setWalletLabel } = this.props;
    setPassphrase('');
    setWalletLabel('');
    onCancel();
  };

  confirm = () => {
    const {
      account,
      passphrase,
      coinType,
      setPassphrase,
      setWalletLabel,
      addAccount,
      walletLabel
    } = this.props;

    const options = {
      coinType,
      walletLabel,
      isHardware: account.isHardware
    };

    addAccount({ account, passphrase, options });
    setPassphrase('');
    setWalletLabel('');
  };

  getCoinTypes = () => {
    return map(COINS, ({ name, coinType }) => ({ label: name, value: coinType }));
  };
}

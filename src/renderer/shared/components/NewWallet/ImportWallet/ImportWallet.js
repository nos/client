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

import styles from './ImportWallet.scss';

export default class ImportWallet extends React.PureComponent {
  static propTypes = {
    className: string,
    account: accountShape.isRequired,
    onCancel: func.isRequired,
    passphrase: string.isRequired,
    setPassphrase: func.isRequired,
    coinType: number.isRequired,
    setCoinType: func.isRequired,
    addAccount: func.isRequired,
    privateKey: string.isRequired,
    setPrivateKey: func.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    const { className, account, coinType } = this.props;
    const { secretWord } = account;

    return (
      <div className={classNames(className, styles.mnemonic)}>
        <Pill>{secretWord}</Pill>
        <LabeledInput
          id="passphrase"
          type="password"
          label="Enter Passphrase"
          placeholder="Passphrase"
          onChange={this.handleChangePassphrase}
        />
        <LabeledInput
          id="privateKey"
          type="text"
          label="Enter private key"
          placeholder="Private Key"
          onChange={this.handleChangePrivateKey}
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
          <PrimaryButton className={styles.action} onClick={this.confirm}>
            Import Wallet
          </PrimaryButton>
        </div>
      </div>
    );
  }

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };

  handleChangePrivateKey = (event) => {
    this.props.setPrivateKey(event.target.value);
  };

  handleChangeCoinType = (coinId) => {
    this.props.setCoinType(coinId);
  };

  cancel = () => {
    const { onCancel, setPassphrase } = this.props;
    setPassphrase('');
    onCancel();
  };

  confirm = () => {
    const { account, passphrase, coinType, setPassphrase, addAccount, privateKey } = this.props;

    const options = {
      coinType,
      isHardware: account.isHardware,
      isImport: true,
      privateKey
    };

    addAccount({ account, passphrase, options });
    setPassphrase('');
  };

  getCoinTypes = () => {
    return map(COINS, ({ name, coinType }) => ({ label: name, value: coinType }));
  };
}

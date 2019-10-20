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
    addAccount: func.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    const { className, account, coinType } = this.props;
    const { secretWord } = account;

    return (
      <form className={classNames(className, styles.mnemonic)} onSubmit={this.confirm}>
        <Pill>{secretWord}</Pill>
        <LabeledInput
          id="passphrase"
          type="password"
          label="Enter Passphrase"
          placeholder="Passphrase"
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
          <PrimaryButton className={styles.action}>Add Wallet</PrimaryButton>
        </div>
      </form>
    );
  }

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
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
    const { account, passphrase, coinType, setPassphrase, addAccount } = this.props;
    const options = {
      coinType,
      isHardware: account.isHardware
    };

    addAccount({ account, passphrase, options });
    setPassphrase('');
  };

  getCoinTypes = () => {
    return map(COINS, ({ name, coinType }) => ({ label: name, value: coinType }));
  };
}

import React from 'react';
import { string, number, func } from 'prop-types';
import { map } from 'lodash';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import COINS from 'shared/values/coins';
import accountShape from 'auth/shapes/accountShape';

export default class NewImport extends React.PureComponent {
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
    const { className, coinType } = this.props;

    return (
      <form className={className} onSubmit={this.submit} id="walletForm">
        <LabeledInput
          id="privateKey"
          type="password"
          label="Enter Private Key"
          placeholder="Private Key"
          onChange={this.handleChangePrivateKey}
        />
        <LabeledInput
          id="passphrase"
          type="password"
          label="Enter Passphrase"
          placeholder="Passphrase"
          onChange={this.handleChangePassphrase}
        />
        <LabeledSelect
          id="network"
          label="Current Network"
          value={coinType}
          items={this.getCoinTypes()}
          onChange={this.handleChangeCoinType}
        />
      </form>
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

  submit = () => {
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

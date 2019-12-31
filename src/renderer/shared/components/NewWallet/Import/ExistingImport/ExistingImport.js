import React from 'react';
import { string, func, shape, arrayOf } from 'prop-types';
import { map, isEmpty } from 'lodash';
import { wallet } from '@cityofzion/neon-js';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import { NEO } from 'shared/values/coins';
import accountShape from 'auth/shapes/accountShape';

const legacyAccountShape = shape({
  walletName: string.isRequired,
  encryptedKey: string.isRequired
});

export default class ExistingImport extends React.PureComponent {
  static propTypes = {
    className: string,
    account: accountShape.isRequired,
    passphrase: string.isRequired,
    legacyPassphrase: string.isRequired,
    setPassphrase: func.isRequired,
    setLegacyPassphrase: func.isRequired,
    addAccount: func.isRequired,
    accounts: arrayOf(legacyAccountShape).isRequired,
    setCurrentAccount: func.isRequired,
    currentAccount: string.isRequired,
    showErrorToast: func.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    const { className, accounts, passphrase, legacyPassphrase, currentAccount } = this.props;

    return (
      <form className={className} onSubmit={this.submit} id="walletForm">
        <LabeledSelect
          id="profiel"
          label="Account"
          disabled={isEmpty(accounts)}
          value={currentAccount}
          items={this.getProfiles()}
          onChange={this.handleChangeCurrentAccount}
        />

        <LabeledInput
          id="legacyPassphrase"
          type="password"
          label="Legacy Passphrase"
          placeholder="Enter your legacy passphrase"
          value={legacyPassphrase}
          onChange={this.handleChangeLegacyPassphrase}
        />

        <LabeledInput
          id="passphrase"
          type="password"
          label="Current Passphrase"
          placeholder="Enter your current passphrase"
          value={passphrase}
          onChange={this.handleChangePassphrase}
        />
      </form>
    );
  }

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };

  handleChangeLegacyPassphrase = (event) => {
    this.props.setLegacyPassphrase(event.target.value);
  };

  handleChangeCurrentAccount = (value) => {
    this.props.setCurrentAccount(value);
  };

  submit = async () => {
    const {
      account,
      passphrase,
      accounts,
      setPassphrase,
      addAccount,
      showErrorToast,
      legacyPassphrase,
      currentAccount
    } = this.props;

    const walletLabel = accounts.filter((acc) => acc.encryptedKey === currentAccount)[0].walletName;

    try {
      const wif = await wallet.decryptAsync(currentAccount, legacyPassphrase);
      const { privateKey } = new wallet.Account(wif);

      const options = {
        walletLabel,
        coinType: NEO,
        isHardware: account.isHardware,
        isImport: true,
        privateKey
      };

      addAccount({ account, passphrase, options });
      setPassphrase('');
    } catch (e) {
      showErrorToast(`Incorrect legacy passphrase for account ${walletLabel}`);
    }
  };

  getProfiles = () => {
    const { accounts } = this.props;

    if (isEmpty(accounts)) {
      return [{ label: 'No accounts Found', value: '' }];
    }

    return map(accounts, ({ walletName, encryptedKey }) => ({
      label: walletName,
      value: encryptedKey
    }));
  };
}

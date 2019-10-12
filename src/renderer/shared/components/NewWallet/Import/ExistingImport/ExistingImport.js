import React from 'react';
import { string, func, arrayOf } from 'prop-types';
import { map, isEmpty } from 'lodash';
import classNames from 'classnames';
import { wallet } from '@cityofzion/neon-js';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import { NEO } from 'shared/values/coins';
import accountShape from 'auth/shapes/accountShape';

import styles from './ExistingImport.scss';

export default class ExistingImport extends React.PureComponent {
  static propTypes = {
    className: string,
    account: accountShape.isRequired,
    passphrase: string.isRequired,
    setPassphrase: func.isRequired,
    addAccount: func.isRequired,
    accounts: arrayOf(accountShape).isRequired,
    setCurrentAccount: func.isRequired,
    currentAccount: string.isRequired,
    showErrorToast: func.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    const { className, accounts, passphrase, currentAccount } = this.props;

    return (
      <form
        className={classNames(className, styles.existingImport)}
        onSubmit={this.submit}
        id="walletForm"
      >
        <LabeledSelect
          className={styles.input}
          labelClass={styles.label}
          id="profiel"
          label="Account"
          disabled={isEmpty(accounts)}
          value={currentAccount}
          items={this.getProfiles()}
          onChange={this.handleChangeCurrentAccount}
        />

        <LabeledInput
          id="passphrase"
          type="password"
          label="Passphrase"
          placeholder="Enter your passphrase"
          value={passphrase}
          onChange={this.handleChangePassphrase}
        />
      </form>
    );
  }

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
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
      currentAccount
    } = this.props;

    const walletLabel = accounts.filter((acc) => acc.encryptedKey === currentAccount)[0].walletName;

    try {
      const wif = await wallet.decryptAsync(currentAccount, passphrase);
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
      showErrorToast(`Wrong passphrase for account ${walletLabel}`);
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

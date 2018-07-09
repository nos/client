import React from 'react';
import { remote } from 'electron';
import { bool, string, func, object, arrayOf } from 'prop-types';
import { noop, map } from 'lodash';
import { wallet } from '@cityofzion/neon-js';

import Button from 'shared/components/Forms/Button';
import Select from 'shared/components/Forms/Select';
import Input from 'shared/components/Forms/Input/Input';

import styles from './LoginFormWalletFile.scss';

export default class LoginFormWalletFile extends React.Component {
  static propTypes = {
    disabled: bool,
    encryptedWIF: string,
    setEncryptedWIF: func,
    passphrase: string,
    setPassphrase: func,
    accounts: arrayOf(object),
    setAccounts: func,
    onLogin: func,
    alert: func
  };

  static defaultProps = {
    disabled: false,
    encryptedWIF: '',
    setEncryptedWIF: noop,
    passphrase: '',
    setPassphrase: noop,
    accounts: [],
    setAccounts: noop,
    onLogin: noop,
    alert: noop
  };

  render() {
    const { disabled } = this.props;

    return (
      <form className={styles.loginForm} onSubmit={this.handleSubmit}>
        <Button onClick={this.handleLoadWallet} disabled={disabled}>Select Wallet File</Button>

        {this.renderAccounts()}
        {this.renderPassphraseInput()}
        {this.renderDescription()}

        <div className={styles.actions}>
          <Button type="submit" disabled={disabled || !this.isValid()}>Login</Button>
        </div>
      </form>
    );
  }

  renderAccounts = () => {
    const { accounts, encryptedWIF, disabled } = this.props;

    if (accounts.length === 0) {
      return null;
    }

    return (
      <Select
        className={styles.accounts}
        value={encryptedWIF}
        onChange={this.handleSelect}
        disabled={disabled}
      >
        <option value="">Select an account</option>
        {map(this.props.accounts, (account, index) => (
          <option value={account.encrypted} key={`account${index}`}>{account.label}</option>
        ))}
      </Select>
    );
  }

  renderPassphraseInput = () => {
    const { encryptedWIF, passphrase, disabled } = this.props;

    if (encryptedWIF === '' || wallet.isPrivateKey(encryptedWIF)) {
      return null;
    }

    return (
      <Input
        id="passphrase"
        type="password"
        label="Passphrase"
        placeholder="Enter passphrase"
        value={passphrase}
        onChange={this.handleChangePassphrase}
        disabled={disabled}
      />
    );
  }

  renderDescription = () => {
    const { encryptedWIF } = this.props;

    if (encryptedWIF === '') {
      return null;
    }

    if (wallet.isPrivateKey(encryptedWIF)) {
      return 'Private key detected.';
    } else {
      return 'Encrypted key detected, please type passphrase.';
    }
  }

  handleLoadWallet = () => {
    const filenames = remote.dialog.showOpenDialog({
      title: 'Select Wallet file',
      filters: [{ name: 'Wallet file', extensions: ['json'] }]
    });

    if (filenames) {
      this.load(filenames[0]);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { encryptedWIF, passphrase, onLogin } = this.props;
    const loginCredentials = wallet.isPrivateKey(encryptedWIF) ? {
      wif: encryptedWIF
    } : {
      encryptedWIF,
      passphrase
    };

    onLogin(loginCredentials);
  }

  handleSelect = (event) => {
    this.props.setPassphrase('');
    this.props.setEncryptedWIF(event.target.value);
  }

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  }

  isValid = () => {
    return this.props.encryptedWIF !== '';
  }

  load = (filename) => {
    const { setAccounts, setEncryptedWIF, alert } = this.props;

    try {
      const walletFile = wallet.Wallet.readFile(filename);

      if (walletFile.accounts.length === 0) {
        throw new Error('This wallet file contains no accounts.');
      }

      setAccounts(walletFile.accounts);
      setEncryptedWIF('');
    } catch (err) {
      alert(`Error loading wallet file: ${err.message}`);
    }
  }
}

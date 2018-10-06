import React from 'react';
import { remote } from 'electron';
import { bool, string, func, object, arrayOf } from 'prop-types';
import { isEmpty, noop, map } from 'lodash';
import { wallet } from '@cityofzion/neon-js';

import Button from 'shared/components/Forms/Button';
import LabeledInput from 'shared/components/Forms/LabeledInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';

import styles from './LoginFormWalletFile.scss';
import LoginButton from '../LoginButton';

export default class LoginFormWalletFile extends React.PureComponent {
  static propTypes = {
    disabled: bool,
    encryptedWIF: string,
    setEncryptedWIF: func,
    passphrase: string,
    setPassphrase: func,
    accounts: arrayOf(object),
    setAccounts: func,
    onLogin: func,
    showErrorToast: func
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
    showErrorToast: noop
  };

  render() {
    const { disabled } = this.props;

    return (
      <form className={styles.loginForm} onSubmit={this.handleSubmit}>
        <Button onClick={this.handleLoadWallet} disabled={disabled}>Select Wallet File</Button>

        {this.renderAccounts()}
        {this.renderPassphraseInput()}
        {this.renderDescription()}

        <LoginButton disabled={disabled || !this.isValid()} />
      </form>
    );
  }

  renderAccounts = () => {
    const { accounts, encryptedWIF, disabled } = this.props;

    if (isEmpty(accounts)) {
      return null;
    }

    return (
      <LabeledSelect
        id="account"
        label="Select an account"
        labelClass={styles.accounts}
        value={encryptedWIF}
        items={this.getAccountItems()}
        disabled={disabled}
        onChange={this.handleSelect}
      />
    );
  };

  renderPassphraseInput = () => {
    const { encryptedWIF, passphrase, disabled } = this.props;

    if (isEmpty(encryptedWIF) || wallet.isPrivateKey(encryptedWIF)) {
      return null;
    }

    return (
      <LabeledInput
        id="passphrase"
        type="password"
        label="Passphrase"
        placeholder="Enter passphrase"
        value={passphrase}
        onChange={this.handleChangePassphrase}
        disabled={disabled}
      />
    );
  };

  renderDescription = () => {
    const { encryptedWIF } = this.props;

    if (isEmpty(encryptedWIF)) {
      return null;
    }

    if (wallet.isPrivateKey(encryptedWIF)) {
      return 'Private key detected.';
    } else {
      return 'Encrypted key detected, please type passphrase.';
    }
  };

  handleLoadWallet = () => {
    const filenames = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
      title: 'Select Wallet file',
      filters: [{ name: 'Wallet file', extensions: ['json'] }]
    });

    if (filenames) {
      this.load(filenames[0]);
    }
  };

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
  };

  handleSelect = (value) => {
    this.props.setPassphrase('');
    this.props.setEncryptedWIF(value);
  };

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };

  getAccountItems = () => {
    return map(this.props.accounts, ({ label, encrypted }) => ({ label, value: encrypted }));
  }

  isValid = () => {
    const { encryptedWIF, passphrase } = this.props;
    return !(isEmpty(encryptedWIF) || (!wallet.isPrivateKey(encryptedWIF) && isEmpty(passphrase)));
  };

  load = (filename) => {
    const { setAccounts, setEncryptedWIF, showErrorToast } = this.props;

    try {
      const walletFile = wallet.Wallet.readFile(filename);

      if (isEmpty(walletFile.accounts)) {
        throw new Error('This wallet file contains no accounts.');
      }

      setAccounts(walletFile.accounts);
      setEncryptedWIF('');
    } catch (err) {
      showErrorToast(`Error loading wallet file: ${err.message}`);
    }
  }
}

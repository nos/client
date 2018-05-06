import React from 'react';
import { remote } from 'electron';
import { bool, string, func, object, arrayOf } from 'prop-types';
import { noop, map } from 'lodash';
import { wallet } from '@cityofzion/neon-js';

import Button from '../../Forms/Button';
import Select from '../../Forms/Select';
import styles from './LoginFormWalletFile.scss';
import Input from '../../Forms/Input';

export default class LoginFormWalletFile extends React.Component {
  static propTypes = {
    disabled: bool,
    wif: string,
    setWIF: func,
    passphrase: string,
    setPassphrase: func,
    accounts: arrayOf(object),
    setAccounts: func,
    onLogin: func,
    alert: func
  };

  static defaultProps = {
    disabled: false,
    wif: '',
    setWIF: noop,
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

        <div className={styles.actions}>
          <Button type="submit" disabled={disabled || !this.isValid()}>Login</Button>
        </div>
      </form>
    );
  }

  renderAccounts = () => {
    const { accounts, wif, passphrase } = this.props;

    if (accounts.length === 0) {
      return null;
    }

    return (
      <div>
        <Select className={styles.accounts} value={wif} onChange={this.handleSelect}>
          <option value="">Select an account</option>
          {map(this.props.accounts, (account, index) => (
            <option value={account.encrypted} key={`account${index}`}>{account.label}</option>
          ))}
        </Select>
        <Input
          id="passphrase"
          type="password"
          label="Passphrase"
          placeholder="Enter passphrase"
          value={passphrase}
          onChange={this.handleChangePassphrase}
        />
      </div>
    );
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

  handleSubmit = (event: Object) => {
    event.preventDefault();
    this.props.onLogin({
      wif: this.props.wif,
      passphrase: this.props.passphrase
    });
  }

  handleSelect = (event) => {
    this.props.setWIF(event.target.value);
  }

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  }

  isValid = () => {
    return this.props.wif !== '';
  }

  load = (filename) => {
    const { setAccounts, setWIF, alert } = this.props;

    try {
      const walletFile = wallet.Wallet.readFile(filename);

      if (walletFile.accounts.length === 0) {
        throw new Error('This wallet file contains no accounts.');
      }

      setAccounts(walletFile.accounts);
      setWIF('');
    } catch (err) {
      alert(`Error loading wallet file: ${err.message}`);
    }
  }
}

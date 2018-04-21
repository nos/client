import React from 'react';
import { remote } from 'electron';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';
import { wallet } from '@cityofzion/neon-js';

import Button from '../../Forms/Button';
import Select from '../../Forms/Select';
import styles from './LoginFormWalletFile.scss';

export default class LoginFormWalletFile extends React.Component {
  static propTypes = {
    disabled: bool,
    wif: string,
    onLogin: func
  };

  static defaultProps = {
    disabled: false,
    wif: '',
    onLogin: noop
  };

  state = {
    wif: '',
    accountsInWalletFile: []
  };

  render() {
    const { disabled } = this.props;
    const { wif, accountsInWalletFile } = this.state;

    return (
      <form className={styles.loginForm} onSubmit={this.handleSubmit}>
        <Button onClick={this.handleLoadWallet} disabled={disabled}>
          Select Wallet File
        </Button>

        <Select
          className={styles.listWallet}
          value={wif}
          onChange={this.handleAccountSelected}
        >
          <option value="">Select an account</option>
          {accountsInWalletFile.map((account, index) => {
            return this.addAccountToOption(account);
          })}
        </Select>

        <div className={styles.actions}>
          <Button type="submit" disabled={!this.isValid()}>
            Login
          </Button>
        </div>
      </form>
    );
  }

  handleLoadWallet = () => {
    const showOpenDialogOptions = {
      title: 'Select Wallet file',
      filters: [{ name: 'Wallet file', extensions: ['json'] }]
    };
    remote.dialog.showOpenDialog(showOpenDialogOptions, (selectedFile) => {
      if (selectedFile) {
        this.load(selectedFile[0]); 
        // There can only be 1 value in the array as only 1 file can be loaded at a time
      }
    });
  };

  handleSubmit = (event) => {
    const { onLogin } = this.props;
    const { wif } = this.state;
    event.preventDefault();
    onLogin({ wif });
  };

  handleAccountSelected = (event) => {
    if (!wallet.isPrivateKey(event.target.value)) {
      this.props.alert('Error: This account doesn\'t have a valid key.');
      this.setState({ wif: '' });
      return;
    }
    this.setState({ wif: event.target.value });
  };

  removeEverythingFromArray = (array) => {
    if (array.length > 0) {
      while (array.length > 0) {
        array.pop();
      }
    }
  }

  addAccountToOption = (account) => {
    return (
      <option value={account._encrypted} key={`wallet${account.address}`}>
        {account.label}
      </option>
    );
  }

  load = (selectedFile) => {
    const { accountsInWalletFile } = this.state;
    // const { walletFile } = this.props

    try {
      this.walletFile = wallet.Wallet.readFile(selectedFile);
    } catch (err) {
      this.props.alert(`Error reading the wallet file: ${err.message}`);
      return;
    }

    if (!this.walletFile.accounts.length > 0) {
      this.props.alert('This wallet file has no account in it.');
      return;
    }

    this.removeEverythingFromArray(accountsInWalletFile);

    this.walletFile.accounts.forEach((account, i) => {
      accountsInWalletFile.push(account);
    });

    this.setState(accountsInWalletFile);
  };

  isValid = () => {
    return this.state.wif !== '' && wallet.isPrivateKey(this.state.wif);
  };
}

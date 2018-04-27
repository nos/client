import fs from 'fs';
import React from 'react';
import { string, func } from 'prop-types';
import { remote } from 'electron';
import { promisify } from 'es6-promisify';
import { noop, isEmpty } from 'lodash';
import { wallet } from '@cityofzion/neon-js';

import Input from '../../../Forms/Input';
import Button from '../../../Forms/Button';
import accountShape from '../../../../shapes/accountShape';
import styles from './SaveAccount.scss';

const writeFile = promisify(fs.writeFile);

export default class SaveAccount extends React.Component {
  static propTypes = {
    account: accountShape.isRequired,
    label: string,
    setLabel: func,
    alert: func
  };

  static defaultProps = {
    label: '',
    setLabel: noop,
    alert: noop
  };

  render() {
    return (
      <div className={styles.saveAccount}>
        <Input
          className={styles.label}
          id="label"
          label="Account Label"
          value={this.props.label}
          onChange={this.handleChangeLabel}
        />
        <div className={styles.saveButtons}>
          <Button
            className={styles.button}
            disabled={isEmpty(this.props.label)}
            onClick={this.handleSaveNewWallet}
          >
            Save as new NP6 Wallet
          </Button>
          <Button
            className={styles.button}
            disabled={isEmpty(this.props.label)}
            onClick={this.handleAddToWallet}
          >
            Add account to NP6 Wallet
          </Button>
        </div>
      </div>
    );
  }

  handleChangeLabel = (event) => {
    this.props.setLabel(event.target.value);
  }


  handleAddToWallet = async () => {
    const { account, label } = this.props;

    const filenames = remote.dialog.showOpenDialog({
      title: 'Add account to a NEP6 Wallet',
      message: 'Add account to a NEP6 Wallet',
      filters: [{ name: 'NEP6 Wallet File', extensions: ['json'] }]
    });

    if (!filenames) {
      return;
    }

    const walletLoaded = this.loadWallet(filenames[0]);

    if (walletLoaded == null) {
      return;
    }

    const newAccount = new wallet.Account({ ...account, label });
    walletLoaded.addAccount(newAccount);
    await this.save(filenames[0], walletLoaded);
  }


  handleSaveNewWallet = async () => {
    const { label, account } = this.props;

    const filename = remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
      title: 'Save as new NEP6 Wallet',
      message: 'Save as new NEP6 Wallet',
      filters: [{ name: 'NEP6 Wallet File', extensions: ['json'] }]
    });

    if (!filename) {
      return;
    }

    const newAccount = new wallet.Account({ ...account, label, isDefault: true });
    const newWallet = new wallet.Wallet({ accounts: [newAccount] });
    await this.save(filename, newWallet);
  }


  loadWallet = (filename) => {
    const { alert } = this.props;

    try {
      const walletLoaded = wallet.Wallet.readFile(filename);
      return walletLoaded;
    } catch (err) {
      alert(`Error loading wallet file: ${err.message}`);
      return null;
    }
  }


  save = async (filename, walletToSave) => {
    let data = null;

    data = JSON.stringify(walletToSave.export());

    if (isEmpty(data)) {
      throw new Error('Error saving file.');
    }

    try {
      await writeFile(filename, data);
      this.props.alert('File saved successfully.');
    } catch (err) {
      this.props.alert(`Error saving file: ${err.message}`);
    }
  }
}

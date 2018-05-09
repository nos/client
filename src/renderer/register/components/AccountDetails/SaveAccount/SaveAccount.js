import fs from 'fs';
import React from 'react';
import { string, func } from 'prop-types';
import { remote } from 'electron';
import { promisify } from 'es6-promisify';
import { noop, isEmpty } from 'lodash';
import { wallet } from '@cityofzion/neon-js';

import Input from 'shared/components/Forms/Input';
import Button from 'shared/components/Forms/Button';

import accountShape from '../../../shapes/accountShape';
import styles from './SaveAccount.scss';

const writeFile = promisify(fs.writeFile);

const FILE_FILTERS = [
  { name: 'NEP6 Wallet File', extensions: ['json'] }
];

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
            Save as new NEP6 Wallet
          </Button>
          <Button
            className={styles.button}
            disabled={isEmpty(this.props.label)}
            onClick={this.handleAddToWallet}
          >
            Add account to NEP6 Wallet
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
      filters: FILE_FILTERS
    });

    if (!filenames) {
      return;
    }

    const walletLoaded = this.loadWallet(filenames[0]);

    if (!walletLoaded) {
      return;
    }

    const newAccount = new wallet.Account({ ...account, key: account.encryptedKey, label });
    walletLoaded.addAccount(newAccount);
    await this.save(filenames[0], walletLoaded);
  }

  handleSaveNewWallet = async () => {
    const { label, account } = this.props;

    const filename = remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
      title: 'Save as new NEP6 Wallet',
      message: 'Save as new NEP6 Wallet',
      filters: FILE_FILTERS
    });

    if (!filename) {
      return;
    }

    const newAccount = new wallet.Account({
      ...account,
      key: account.encryptedKey,
      label,
      isDefault: true
    });
    const newWallet = new wallet.Wallet({ accounts: [newAccount] });
    await this.save(filename, newWallet);
  }

  loadWallet = (filename) => {
    const { alert } = this.props;

    try {
      return wallet.Wallet.readFile(filename);
    } catch (err) {
      alert(`Error loading wallet file: ${err.message}`);
      return null;
    }
  }

  save = async (filename, walletToSave) => {
    const { alert } = this.props;
    const data = JSON.stringify(walletToSave.export());

    if (isEmpty(data)) {
      throw new Error('Error saving file.');
    }

    try {
      await writeFile(filename, data);
      alert('Wallet file saved.');
    } catch (err) {
      alert(`Error saving wallet file: ${err.message}`);
    }
  }
}

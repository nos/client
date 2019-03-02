import React from 'react';
import fs from 'fs';
import { bool, func } from 'prop-types';
import { remote } from 'electron';
import { promisify } from 'es6-promisify';
import { noop, isEmpty } from 'lodash';
import { wallet } from '@cityofzion/neon-js';

import PrimaryButton from 'shared/components/Forms/PrimaryButton';

import accountShape from '../../../shapes/accountShape';
import styles from './SaveAccount.scss';

const writeFile = promisify(fs.writeFile);

const FILE_FILTERS = [{ name: 'NEP6 Wallet File', extensions: ['json'] }];

export default class SaveAccount extends React.PureComponent {
  static propTypes = {
    account: accountShape.isRequired,
    loading: bool.isRequired,
    login: func.isRequired,
    storeProfile: func.isRequired,
    alert: func
  };

  static defaultProps = {
    alert: noop
  };

  render() {
    const { loading } = this.props;
    console.log('load', loading);

    return (
      <div className={styles.saveAccount}>
        <div className={styles.saveButtons}>
          <PrimaryButton
            className={styles.button}
            onClick={this.handleSaveAndContinue}
            disabled={loading}
          >
            Save & Continue
          </PrimaryButton>
        </div>
      </div>
    );
  }

  handleSaveAndContinue = async () => {
    const { account, login, storeProfile } = this.props;
    const { walletName, address, passphrase, encryptedKey } = account;

    storeProfile({ walletName, address, encryptedKey });
    login({ passphrase, encryptedWIF: encryptedKey });
  };

  // handleAddToWallet = async () => {
  //   const { account, label } = this.props;

  //   const filenames = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
  //     title: 'Add account to a NEP6 Wallet',
  //     message: 'Add account to a NEP6 Wallet',
  //     filters: FILE_FILTERS
  //   });

  //   if (!filenames) {
  //     return;
  //   }

  //   const walletLoaded = this.loadWallet(filenames[0]);

  //   if (!walletLoaded) {
  //     return;
  //   }

  //   const newAccount = new wallet.Account({ ...account, key: account.encryptedKey, label });
  //   walletLoaded.addAccount(newAccount);
  //   await this.save(filenames[0], walletLoaded);
  // };

  // handleSaveNewWallet = async () => {
  //   const { label, account } = this.props;
  //   console.log('label', label);

  //   const filename = remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
  //     title: 'Save as new NEP6 Wallet',
  //     message: 'Save as new NEP6 Wallet',
  //     filters: FILE_FILTERS
  //   });

  //   if (!filename) {
  //     return;
  //   }

  //   const newAccount = new wallet.Account({
  //     ...account,
  //     key: account.encryptedKey,
  //     label,
  //     isDefault: true
  //   });
  //   const newWallet = new wallet.Wallet({ accounts: [newAccount] });
  //   await this.save(filename, newWallet);
  // };

  // save = async (filename, walletToSave) => {
  //   const { alert } = this.props;
  //   const data = JSON.stringify(walletToSave.export());

  //   if (isEmpty(data)) {
  //     throw new Error('Error saving file.');
  //   }

  //   try {
  //     await writeFile(filename, data);
  //     alert('Wallet file saved.');
  //   } catch (err) {
  //     alert(`Error saving wallet file: ${err.message}`);
  //   }
  // };
}

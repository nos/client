import React from 'react';
import { number, string, func } from 'prop-types';
import { map } from 'lodash';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import Pill from 'shared/components/Pill';
import CHAINS from 'shared/values/chains';
import accountShape from 'auth/shapes/accountShape';

import Account from '../Account';
import styles from './Accounts.scss';

export default class Accounts extends React.PureComponent {
  static propTypes = {
    account: accountShape.isRequired, // TODO remove instanceShape (not here currently)
    confirm: func.isRequired,
    passphrase: string.isRequired,
    setPassphrase: func.isRequired,
    chainType: number.isRequired,
    setChainType: func.isRequired,
    addAccount: func.isRequired
  };

  render() {
    const {
      account: { isHardware, encryptedMnemonic, instances, secretWord },
      wallets
    } = this.props;


    console.log('Accounts.js props ', this.props);

    return (
      <div className={styles.accounts}>
        {this.renderHeading()}
        {!isHardware
          ? <Account encryptedMnemonic={encryptedMnemonic} secretWord={secretWord} />
          : null
        }
        {this.renderAccounts({ secretWord, wallets })}
      </div>
    );
  }

  renderHeading = () => (
    <div className={styles.heading}>
      <div className={styles.title}>My Account</div>
      <div className={styles.link} role="button" tabIndex={0} onClick={this.handleAddAccount}>
        New Address
      </div>
    </div>
  )

  renderAccounts = ({ secretWord, wallets }) => (
    <React.Fragment>
      <div className={styles.subtitle}>Accounts generated from Keychain</div>
      {map(wallets, (wallet) => (
        <Account
          wallet={wallet}
          key={`${wallet.type}-${wallet.index}`}
          secretWord={secretWord}
        />
      ))}
    </React.Fragment>
  )

  handleAddAccount = () => {
    const {
      confirm,
      setPassphrase,
      account: { secretWord }
    } = this.props;

    confirm(
      <div>
        <Pill className={styles.pill}>{secretWord}</Pill>
        <LabeledInput
          id="passphrase"
          type="password"
          label="Enter Passphrase"
          placeholder="Passphrase"
          onChange={this.handleChangePassphrase}
        />
        <LabeledSelect
          className={styles.input}
          labelClass={styles.label}
          id="network"
          label="Current Network"
          value={this.props.chainType}
          items={this.getChainTypes()}
          onChange={this.handleChangeChainType}
        />
      </div>,
      {
        title: 'Add a New Account',
        onConfirm: this.handleAddAccountConfirm,
        onCancel: () => setPassphrase('')
      }
    );
  };

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };

  handleChangeChainType = (event) => {
    this.props.setChainType(event.target.value);
  };

  handleAddAccountConfirm = () => {
    const { account, passphrase, chainType, addAccount } = this.props;

    addAccount({ account, passphrase, chainType });
  };

  getChainTypes = () => {
    return map(CHAINS, ({ name, chainId }) => ({ label: name, value: chainId }));
  };
}

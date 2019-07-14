import React from 'react';
import { string, number, func, any } from 'prop-types';
import { map } from 'lodash';

import Page from 'shared/components/Page';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import Pill from 'shared/components/Pill';
import COINS from 'shared/values/coins';
import accountShape from 'auth/shapes/accountShape';

import Wallets from './Wallets';
import Account from './Account';

import styles from './Management.scss';

export default class Management extends React.PureComponent {
  static propTypes = {
    className: string,
    account: accountShape.isRequired, // TODO remove instanceShape (not here currently)
    confirm: func.isRequired,
    passphrase: string.isRequired,
    setPassphrase: func.isRequired,
    chainType: number.isRequired,
    setChainType: func.isRequired,
    addAccount: func.isRequired,
    showErrorToast: func.isRequired,
    wallets: any // TODO any
  };

  static defaultProps = {
    className: null,
    wallets: {}
  };

  render() {
    const { wallets, account: { encryptedMnemonic, secretWord } } = this.props;

    return (
      <Page className={styles.management}>
        {this.renderHeading()}
        <Account encryptedMnemonic={encryptedMnemonic} secretWord={secretWord} />
        {wallets && (
          <Wallets
            encryptedMnemonic={encryptedMnemonic}
            secretWord={secretWord}
            wallets={wallets}
          />
        )}
      </Page>
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


  handleAddAccount = () => {
    const {
      confirm,
      chainType,
      setPassphrase,
      account: { secretWord }
    } = this.props;

    confirm(
      <form>
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
          value={chainType}
          items={this.getChainTypes()}
          onChange={this.handleChangeChainType}
        />
      </form>,
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

  handleChangeChainType = (chainId) => {
    this.props.setChainType(chainId);
  };

  handleAddAccountConfirm = () => {
    const { account, passphrase, setPassphrase, chainType, addAccount } = this.props;

    addAccount({ account, passphrase, coinType: chainType });
    setPassphrase('');
  };

  getChainTypes = () => {
    return map(COINS, ({ name, chainId }) => ({ label: name, value: chainId }));
  };
}

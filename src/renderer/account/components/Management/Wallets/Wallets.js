import React from 'react';
import { any } from 'prop-types';
import { map } from 'lodash';

// import LabeledInput from 'shared/components/Forms/LabeledInput';
// import LabeledSelect from 'shared/components/Forms/LabeledSelect';
// import Pill from 'shared/components/Pill';
// import CHAINS from 'shared/values/chains';
import accountShape from 'auth/shapes/accountShape';

import Wallet from '../Wallet';
import styles from './Wallets.scss';

export default class Wallets extends React.PureComponent {
  static propTypes = {
    account: accountShape.isRequired, // TODO remove instanceShape (not here currently)
    wallets: any.isRequired
    // confirm: func.isRequired,
    // passphrase: string.isRequired,
    // setPassphrase: func.isRequired,
    // chainType: number.isRequired,
    // setChainType: func.isRequired,
    // addAccount: func.isRequired
  };

  // TODO make it function component
  render() {
    const { account, wallets } = this.props;
    const { encryptedMnemonic, secretWord } = account;

    return (
      <div className={styles.wallets}>
        <div className={styles.title}>Accounts generated from Keychain</div>
        {this.renderWallets({ secretWord, wallets, encryptedMnemonic })}
      </div>
    );
  }

  renderWallets = ({ secretWord, wallets, encryptedMnemonic }) => (
    <React.Fragment>
      {map(wallets, (wallet) => (
        <Wallet
          wallet={wallet}
          key={`${wallet.type}-${wallet.index}`}
          secretWord={secretWord}
          encryptedMnemonic={encryptedMnemonic}
        />
      ))}
    </React.Fragment>
  )

  // TODO move this to Management.js and cleanup index.js
  // handleAddAccount = () => {
  //   const {
  //     confirm,
  //     setPassphrase,
  //     account: { secretWord }
  //   } = this.props;

  //   confirm(
  //     <div>
  //       <Pill className={styles.pill}>{secretWord}</Pill>
  //       <LabeledInput
  //         id="passphrase"
  //         type="password"
  //         label="Enter Passphrase"
  //         placeholder="Passphrase"
  //         onChange={this.handleChangePassphrase}
  //       />
  //       <LabeledSelect
  //         className={styles.input}
  //         labelClass={styles.label}
  //         id="network"
  //         label="Current Network"
  //         value={this.props.chainType}
  //         items={this.getChainTypes()}
  //         onChange={this.handleChangeChainType}
  //       />
  //     </div>,
  //     {
  //       title: 'Add a New Account',
  //       onConfirm: this.handleAddAccountConfirm,
  //       onCancel: () => setPassphrase('')
  //     }
  //   );
  // };

  // handleChangePassphrase = (event) => {
  //   this.props.setPassphrase(event.target.value);
  // };

  // handleChangeChainType = (event) => {
  //   this.props.setChainType(event.target.value);
  // };

  // handleAddAccountConfirm = () => {
  //   const { account, passphrase, chainType, addAccount } = this.props;

  //   addAccount({ account, passphrase, chainType });
  // };

  // getChainTypes = () => {
  //   return map(CHAINS, ({ name, chainId }) => ({ label: name, value: chainId }));
  // };
}

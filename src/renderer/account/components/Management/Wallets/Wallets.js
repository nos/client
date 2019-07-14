import React from 'react';
import { any } from 'prop-types';
import { map } from 'lodash';

// import LabeledInput from 'shared/components/Forms/LabeledInput';
// import LabeledSelect from 'shared/components/Forms/LabeledSelect';
// import Pill from 'shared/components/Pill';
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
          key={`${wallet.coinType}-${wallet.index}`}
          secretWord={secretWord}
          encryptedMnemonic={encryptedMnemonic}
        />
      ))}
    </React.Fragment>
  )
}

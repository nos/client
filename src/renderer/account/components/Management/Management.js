import React from 'react';
import { string, func, objectOf } from 'prop-types';
import classnames from 'classnames';

import Page from 'shared/components/Page';
import accountShape from 'auth/shapes/accountShape';
import walletShape from 'auth/shapes/walletShape';

import Wallets from './Wallets';
import Account from './Account';

import styles from './Management.scss';

export default class Management extends React.PureComponent {
  static propTypes = {
    className: string,
    account: accountShape.isRequired,
    newWallet: func.isRequired,
    wallets: objectOf(walletShape)
  };

  static defaultProps = {
    className: null,
    wallets: {}
  };

  render() {
    const { className, wallets, account } = this.props;
    const { encryptedMnemonic, secretWord } = account;

    return (
      <Page className={classnames(className, styles.management)}>
        {this.renderHeading({ account, encryptedMnemonic, secretWord })}
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

  renderHeading = ({ account, encryptedMnemonic, secretWord }) => (
    <React.Fragment>
      <div className={styles.heading}>
        <div className={styles.title}>My Account</div>
        <div className={styles.link} role="button" tabIndex={0} onClick={this.handleAddAccount}>
          New Address
        </div>
      </div>
      {!account.isHardware && (
        <Account encryptedMnemonic={encryptedMnemonic} secretWord={secretWord} />
      )}
    </React.Fragment>
  );

  handleAddAccount = () => {
    const { newWallet, account } = this.props;

    newWallet(<div />, {
      title: 'Add a New Wallet',
      className: styles.test,
      account
    });
  };
}

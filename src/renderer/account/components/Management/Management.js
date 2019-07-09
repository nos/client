import React from 'react';
import { string, func, any } from 'prop-types';

import Page from 'shared/components/Page';

import Wallets from './Wallets';
import Account from './Account';

import styles from './Management.scss';

export default class Management extends React.PureComponent {
  static propTypes = {
    className: string,
    __progress__: string.isRequired,
    showErrorToast: func.isRequired,
    wallets: any // TODO any
  };

  static defaultProps = {
    className: null,
    wallets: {}
  };

  render() {
    const { wallets, account: { accountLabel, encryptedMnemonic, secretWord } } = this.props;

    return (
      <Page className={styles.management}>
        {this.renderHeading()}
        <Account encryptedMnemonic={encryptedMnemonic} secretWord={secretWord} />
        <Wallets
          encryptedMnemonic={encryptedMnemonic}
          secretWord={secretWord}
          wallets={wallets ? wallets[accountLabel] : null}
        />
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
}

import React from 'react';
import { bool, func } from 'prop-types';

import Panel from 'shared/components/Panel';
import Tabs from 'shared/components/Tabs';
import Logo from 'shared/images/logo.svg';

import LoginFormPassphrase from '../LoginFormPassphrase';
import LoginFormPrivateKey from '../LoginFormPrivateKey';
import LoginFormLedger from '../LoginFormLedger';
import LoginFormWalletFile from '../LoginFormWalletFile';
import styles from './Login.scss';

const TAB_PRIVATE_KEY = 'privatekey';
const TAB_PASSPHRASE = 'passphrase';
const TAB_LEDGER = 'ledger';
const TAB_FILE = 'file';

const TABS = {
  [TAB_PASSPHRASE]: 'Passphrase',
  [TAB_PRIVATE_KEY]: 'Private Key',
  [TAB_LEDGER]: 'Ledger',
  [TAB_FILE]: 'Wallet File'
};

export default class Login extends React.PureComponent {
  static propTypes = {
    loading: bool,
    login: func.isRequired
  };

  static defaultProps = {
    loading: false
  };

  state = {
    tab: TAB_PASSPHRASE
  };

  render() {
    return (
      <Panel className={styles.login}>
        <Logo className={styles.logo} />
        <Tabs
          className={styles.tabs}
          tabs={TABS}
          selectedTab={this.state.tab}
          renderTab={this.renderTab}
          onSelect={this.handleSelectTab}
        />
      </Panel>
    );
  }

  renderTab = (id) => {
    const { loading, login } = this.props;

    switch (id) {
      case TAB_PRIVATE_KEY:
        return <LoginFormPrivateKey disabled={loading} onLogin={login} />;
      case TAB_PASSPHRASE:
        return <LoginFormPassphrase disabled={loading} onLogin={login} />;
      case TAB_LEDGER:
        return <LoginFormLedger disabled={loading} onLogin={login} />;
      case TAB_FILE:
        return <LoginFormWalletFile disabled={loading} onLogin={login} />;
      default:
        throw new Error('Invalid tab.');
    }
  }

  handleSelectTab = (tab) => {
    this.setState({ tab });
  }
}

import React from 'react';
import { bool, func } from 'prop-types';

import LoginFormPassphrase from './LoginFormPassphrase';
import LoginFormWIF from './LoginFormWIF';
import LoginFormLedger from './LoginFormLedger';
import LoginFormWalletFile from './LoginFormWalletFile';
import Panel from '../Panel';
import Tabs from '../Tabs';
import logo from '../../images/logo.svg';
import styles from './Login.scss';

const TAB_WIF = 'wif';
const TAB_PASSPHRASE = 'passphrase';
const TAB_LEDGER = 'ledger';
const TAB_WALLET_FILE = 'wallet_file';

const TABS = {
  [TAB_PASSPHRASE]: 'Passphrase',
  [TAB_WIF]: 'WIF',
  [TAB_LEDGER]: 'Ledger',
  [TAB_WALLET_FILE]: 'Wallet File'
};

export default class Login extends React.Component {
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
        <img className={styles.logo} src={logo} alt="nOS" />
        <Tabs
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
      case TAB_WIF:
        return <LoginFormWIF disabled={loading} onLogin={login} />;
      case TAB_PASSPHRASE:
        return <LoginFormPassphrase disabled={loading} onLogin={login} />;
      case TAB_LEDGER:
        return <LoginFormLedger disabled={loading} onLogin={login} />;
      case TAB_WALLET_FILE:
        return <LoginFormWalletFile disabled={loading} onLogin={login} />;
      default:
        throw new Error('Invalid tab.');
    }
  }

  handleSelectTab = (tab) => {
    this.setState({ tab });
  }
}

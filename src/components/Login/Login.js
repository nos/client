import React from 'react';
import { func } from 'prop-types';

import LoginFormPassphrase from './LoginFormPassphrase';
import LoginFormWIF from './LoginFormWIF';
import LoginFormLedger from './LoginFormLedger';
import Panel from '../Panel';
import Tabs from '../Tabs';
import styles from './Login.scss';

const TAB_WIF = 'wif';
const TAB_PASSPHRASE = 'passphrase';
const TAB_LEDGER = 'ledger';

const TABS = {
  [TAB_PASSPHRASE]: 'Passphrase',
  [TAB_WIF]: 'WIF',
  [TAB_LEDGER]: 'Ledger'
};

export default class Login extends React.Component {
  static propTypes = {
    login: func.isRequired
  };

  state = {
    tab: TAB_PASSPHRASE
  };

  render() {
    return (
      <Panel className={styles.login} renderHeader={this.renderHeader}>
        <Tabs
          tabs={TABS}
          selectedTab={this.state.tab}
          renderTab={this.renderTab}
          onSelect={this.handleSelectTab}
        />
      </Panel>
    );
  }

  renderHeader = () => {
    return 'Login';
  }

  renderTab = (id) => {
    switch (id) {
      case TAB_WIF:
        return <LoginFormWIF onLogin={this.props.login} />;
      case TAB_PASSPHRASE:
        return <LoginFormPassphrase onLogin={this.props.login} />;
      case TAB_LEDGER:
        return <LoginFormLedger onLogin={this.props.login} />;
      default:
        throw new Error('Invalid tab.');
    }
  }

  handleSelectTab = (tab) => {
    this.setState({ tab });
  }
}

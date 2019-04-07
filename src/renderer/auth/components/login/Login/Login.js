import React from 'react';
import { bool, func } from 'prop-types';

import Panel from 'shared/components/Panel';
import Tabs from 'shared/components/Tabs';

import LoginFormAccount from '../LoginFormAccount';
import LoginFormLedger from '../LoginFormLedger';
import styles from './Login.scss';

const TAB_PROFILES = 'Profiles';
const TAB_LEDGER = 'Ledger';

const TABS = {
  [TAB_PROFILES]: 'Saved Profiles',
  [TAB_LEDGER]: 'Ledger'
};

export default class LoginPanel extends React.PureComponent {
  static propTypes = {
    loading: bool,
    login: func
  };

  static defaultProps = {
    loading: false,
    login: undefined
  };

  state = {
    tab: TAB_PROFILES
  };

  render() {
    return (
      <Panel className={styles.login}>
        <div className={styles.title}>Log In</div>
        <div className={styles.heading}>
          <div className={styles.pill}>
            <div className={styles.pillText}>
              Secret word: <b>Peanuts</b>
            </div>
          </div>
        </div>
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
      case TAB_PROFILES:
        return <LoginFormAccount disabled={loading} onLogin={login} />;
      case TAB_LEDGER:
        return <LoginFormLedger disabled={loading} onLogin={login} />;
      default:
        throw new Error('Invalid tab.');
    }
  };

  handleSelectTab = (tab) => {
    this.setState({ tab });
  };
}

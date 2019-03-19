import React from 'react';
import { bool, func } from 'prop-types';

import Panel from 'shared/components/Panel';
import Tabs from 'shared/components/Tabs';
import Logo from 'shared/images/logo.svg';

import LoginFormProfile from '../LoginFormProfile';
import styles from './Login.scss';

const TAB_PROFILES = 'Profiles';

const TABS = {
  [TAB_PROFILES]: 'Saved Profiles'
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
    console.log('daw', this.props);
    return (
      <Panel className={styles.login}>
        <h1>Log In</h1>
        <div>Secret word: </div>
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
        return <LoginFormProfile disabled={loading} onLogin={login} />;
      default:
        throw new Error('Invalid tab.');
    }
  };

  handleSelectTab = (tab) => {
    this.setState({ tab });
  };
}

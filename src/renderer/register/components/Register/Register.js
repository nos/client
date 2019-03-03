import React from 'react';

import Panel from 'shared/components/Panel';
import Tabs from 'shared/components/Tabs';
import Logo from 'shared/images/logo.svg';

import RegisterForm from '../RegisterForm';
import AccountDetails from '../AccountDetails';
import accountShape from '../../shapes/accountShape';
import styles from './Register.scss';

const TAB_CREATE = 'create';

const TABS = {
  [TAB_CREATE]: 'Create New Wallet'
};

export default class Register extends React.PureComponent {
  static propTypes = {
    account: accountShape
  };

  static defaultProps = {
    account: null
  };

  state = {
    tab: TAB_CREATE
  };

  render() {
    return (
      <Panel className={styles.register}>
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
    switch (id) {
      case TAB_CREATE:
        return this.renderCreateTab();
      default:
        throw new Error('Invalid tab.');
    }
  };

  renderCreateTab = () => {
    const { account } = this.props;

    if (account) {
      return <AccountDetails account={account} />;
    } else {
      return <RegisterForm />;
    }
  };

  handleSelectTab = (tab) => {
    this.setState({ tab });
  };
}

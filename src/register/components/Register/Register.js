import React from 'react';
import { bool, func } from 'prop-types';

import Panel from 'shared/components/Panel';
import Tabs from 'shared/components/Tabs';
import logo from 'shared/images/logo.svg';

import RegisterForm from '../RegisterForm';
import AccountDetails from '../AccountDetails';
import accountShape from '../../shapes/accountShape';
import styles from './Register.scss';

const TAB_CREATE = 'create';

const TABS = {
  [TAB_CREATE]: 'Create Account'
};

export default class Register extends React.Component {
  static propTypes = {
    loading: bool,
    account: accountShape,
    register: func.isRequired
  };

  static defaultProps = {
    loading: false,
    account: null
  };

  state = {
    tab: TAB_CREATE
  };

  render() {
    return (
      <Panel className={styles.register}>
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
    switch (id) {
      case TAB_CREATE:
        return this.renderCreateTab();
      default:
        throw new Error('Invalid tab.');
    }
  }

  renderCreateTab = () => {
    const { loading, account, register } = this.props;

    if (account) {
      return <AccountDetails account={account} />;
    } else {
      return <RegisterForm disabled={loading} onRegister={register} />;
    }
  }

  handleSelectTab = (tab) => {
    this.setState({ tab });
  }
}

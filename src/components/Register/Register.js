import React from 'react';
import { func } from 'prop-types';

import RegisterForm from './RegisterForm';
import AccountDetails from './AccountDetails';
import Panel from '../Panel';
import Tabs from '../Tabs';
import accountShape from '../../shapes/accountShape';
import logo from '../../images/logo.svg';
import styles from './Register.scss';

const TAB_CREATE = 'create';

const TABS = {
  [TAB_CREATE]: 'Create Account'
};

export default class Register extends React.Component {
  static propTypes = {
    account: accountShape,
    register: func.isRequired
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
    if (this.props.account) {
      return <AccountDetails account={this.props.account} />;
    } else {
      return <RegisterForm onRegister={this.props.register} />;
    }
  }

  handleSelectTab = (tab) => {
    this.setState({ tab });
  }
}

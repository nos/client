import React from 'react';

import Panel from 'shared/components/Panel';
import Tabs from 'shared/components/Tabs';
import accountShape from 'auth/shapes/accountShape';

import RegisterForm from '../RegisterForm';
import SidePanel from '../SidePanel';
import AccountDetails from '../AccountDetails';
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
      <div className={styles.sidePanel}>
        <SidePanel
          step="1"
          title="New Wallet"
          text="🔗 Connect a wallet to interact with decentralized apps and transfer
      crypto-currencies."
        />

        <div className={styles.component}>
          {this.renderHeader()}
          {this.renderCreateTab()}
          <AuthFooter onClick={this.handleSelectComponent} />
        </div>
      </div>
    );
  }

  renderTab = (id) => {
    switch (id) {
      case TAB_CREATE:
        return;
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

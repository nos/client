import React from 'react';
import classNames from 'classnames';
import { string, func } from 'prop-types';

import Page from 'shared/components/Page';

import AccountPanel from '../AccountPanel';
import TransactionsPanel from '../TransactionsPanel';
import styles from './Account.scss';

import Panel from 'shared/components/Panel';
import Tabs from 'shared/components/Tabs';
import SendIcon from 'shared/images/account/send.svg';
import ReceiveIcon from 'shared/images/account/receive.svg';

import IconTab from '../TransactionsPanel/IconTab';

const TAB_PORTFOLIO = 'portfolio';
const TAB_KEY_MANAGEMENT = 'keyManagement';

const TABS = {
  [TAB_PORTFOLIO]: <IconTab renderIcon={SendIcon}>Portfolio</IconTab>,
  [TAB_KEY_MANAGEMENT]: <IconTab renderIcon={ReceiveIcon}>Key Management</IconTab>,
};

export default class Account extends React.PureComponent {
  static propTypes = {
    className: string,
    __progress__: string.isRequired,
    showErrorToast: func.isRequired
  };

  static defaultProps = {
    className: null
  };

  state = {
    tab: TAB_PORTFOLIO
  };

  render() {
    const { __progress__, showErrorToast } = this.props;
    console.log(this.props);

    if (__progress__ === 'FAILED') {
      showErrorToast('Loading is taking longer than expected. Check your nOS Network Settings.');
    }

    return (
      <Panel className={classNames(styles.transactionsPanel, this.props.className)}>
        <Tabs
          tabsClass={styles.tabs}
          tabClass={styles.tab}
          tabs={TABS}
          selectedTab={this.state.tab}
          renderTab={this.renderTab}
          onSelect={this.handleSelectTab}
          onScroll={this.handleScroll}
        />
      </Panel>
    );
  }

  renderTab = (id) => {
    switch (id) {
      case TAB_PORTFOLIO:
        return <div className={styles.account}>
        <Page className={styles.content}>
          <AccountPanel className={styles.panel} />
          <TransactionsPanel className={styles.panel} />
        </Page>
       </div>;
      case TAB_KEY_MANAGEMENT:
        return <div className={styles.account}>
        <Page className={styles.content}>
          <AccountPanel className={styles.panel} />
          <TransactionsPanel className={styles.panel} />
        </Page>
       </div>;
      default:
        throw new Error('Invalid tab.');
    }
  };

  handleSelectTab = (tab) => {
    this.setState({ tab });
  };
}

import React from 'react';
import classNames from 'classnames';
import { string, func } from 'prop-types';

import Page from 'shared/components/Page';

import Panel from 'shared/components/Panel';
import Tabs from 'shared/components/Tabs';
import SendIcon from 'shared/images/account/portfolio.svg';
import ReceiveIcon from 'shared/images/account/keyManagement.svg';

import styles from './Account.scss';

// import TransactionsPanel from '../TransactionsPanel';
// import AccountPanel from '../AccountPanel';

import Portfolio from '../Portfolio';
import Management from '../Management';

import IconTab from '../Portfolio/TransactionsPanel/HorizontalIconTab';

const TAB_PORTFOLIO = 'portfolio';
const TAB_KEY_MANAGEMENT = 'keyManagement';

const TABS = {
  [TAB_PORTFOLIO]: <IconTab renderIcon={SendIcon}>Portfolio</IconTab>,
  [TAB_KEY_MANAGEMENT]: <IconTab renderIcon={ReceiveIcon}>Key Management</IconTab>
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

    if (__progress__ === 'FAILED') {
      showErrorToast('Loading is taking longer than expected. Check your nOS Network Settings.');
    }

    return (
      <Tabs
        tabsClass={styles.tabs}
        tabClass={styles.tab}
        tabs={TABS}
        selectedTab={this.state.tab}
        renderTab={this.renderTab}
        onSelect={this.handleSelectTab}
        onScroll={this.handleScroll}
      />
    );
  }

  renderTab = (id) => {
    switch (id) {
      case TAB_PORTFOLIO:
        return (
          <Portfolio />
          // <div className={styles.account}>
          //   <Page className={styles.content}>
          //     <Portfolio className={styles.panel} />
          //     <AccountPanel className={styles.panel} />
          //     <TransactionsPanel className={styles.panel} />
          //   </Page>
          // </div>
        );
      case TAB_KEY_MANAGEMENT:
        return (
          <div className={styles.account}>
            <Page className={styles.content}>
              <Management />
            </Page>
          </div>
        );
      default:
        throw new Error('Invalid tab.');
    }
  };

  handleSelectTab = (tab) => {
    this.setState({ tab });
  };
}

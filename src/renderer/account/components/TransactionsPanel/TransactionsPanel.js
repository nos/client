import React from 'react';
import classNames from 'classnames';
import { string, objectOf } from 'prop-types';

import Panel from 'shared/components/Panel';
import Tabs from 'shared/components/Tabs';
import SendIcon from 'shared/images/account/send.svg';
import ReceiveIcon from 'shared/images/account/receive.svg';
import transactionsIcon from 'shared/images/account/transactions.svg';

import Send from './Send';
import Receive from './Receive';
import Transactions from './Transactions';
import IconTab from './IconTab';
import balanceShape from '../../shapes/balanceShape';
import styles from './TransactionsPanel.scss';

const TAB_SEND = 'send';
const TAB_RECEIVE = 'receive';
const TAB_TRANSACTIONS = 'transactions';

const TABS = {
  [TAB_SEND]: <IconTab renderIcon={SendIcon}>Send</IconTab>,
  [TAB_RECEIVE]: <IconTab renderIcon={ReceiveIcon}>Receive</IconTab>,
  [TAB_TRANSACTIONS]: <IconTab renderIcon={transactionsIcon}>Transactions</IconTab>
};

export default class TransactionsPanel extends React.PureComponent {
  static propTypes = {
    className: string,
    balances: objectOf(balanceShape).isRequired
  };

  static defaultProps = {
    className: null
  };

  state = {
    tab: TAB_SEND
  };

  render() {
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
      case TAB_SEND:
        return <Send balances={this.props.balances} />;
      case TAB_RECEIVE:
        return <Receive />;
      case TAB_TRANSACTIONS:
        return <Transactions />;
      default:
        throw new Error('Invalid tab.');
    }
  };

  handleSelectTab = (tab) => {
    this.setState({ tab });
  };

  handleScroll = (e) => {
    console.log('ieofisjefoiesjfoisej');
    // const { handleFetchAddtionalTxData } = this.props;
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      console.log('BOTTOM!');
      // handleFetchAddtionalTxData();
    }
  };
}

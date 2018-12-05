import React from 'react';
import classNames from 'classnames';
import { number, string, objectOf } from 'prop-types';

import Panel from 'shared/components/Panel';
import Tabs from 'shared/components/Tabs';
import SendIcon from 'shared/images/account/send.svg';
import ReceiveIcon from 'shared/images/account/receive.svg';

import Send from './Send';
import Receive from './Receive';
import IconTab from './IconTab';
import balanceShape from '../../shapes/balanceShape';
import styles from './TransactionsPanel.scss';

const TAB_SEND = 'send';
const TAB_RECEIVE = 'receive';

const TABS = {
  [TAB_SEND]: <IconTab renderIcon={SendIcon}>Send</IconTab>,
  [TAB_RECEIVE]: <IconTab renderIcon={ReceiveIcon}>Receive</IconTab>
};

export default class TransactionsPanel extends React.PureComponent {
  static propTypes = {
    className: string,
    balances: objectOf(balanceShape).isRequired,
    prices: objectOf(number).isRequired
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
        />
      </Panel>
    );
  }

  renderTab = (id) => {
    switch (id) {
      case TAB_SEND:
        return <Send balances={this.props.balances} prices={this.props.prices} />;
      case TAB_RECEIVE:
        return <Receive />;
      default:
        throw new Error('Invalid tab.');
    }
  }

  handleSelectTab = (tab) => {
    this.setState({ tab });
  }
}

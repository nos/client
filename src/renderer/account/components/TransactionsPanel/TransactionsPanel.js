import React from 'react';
import classNames from 'classnames';
import { string, objectOf } from 'prop-types';

import Panel from 'shared/components/Panel';
import Tabs from 'shared/components/Tabs';

import Send from './Send';
import Receive from './Receive';
import balanceShape from '../../shapes/balanceShape';
import styles from './TransactionsPanel.scss';

const TAB_SEND = 'send';
const TAB_RECEIVE = 'receive';

const TABS = {
  [TAB_SEND]: 'Send',
  [TAB_RECEIVE]: 'Receive'
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
        return <Send balances={this.props.balances} />;
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

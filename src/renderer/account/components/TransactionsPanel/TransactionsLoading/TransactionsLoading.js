import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';
import { noop } from 'lodash';

import Tabs from 'shared/components/Tabs';
import Panel from 'shared/components/Panel';
import SendIcon from 'shared/images/account/send.svg';
import ReceiveIcon from 'shared/images/account/receive.svg';
import transactionsIcon from 'shared/images/account/transactions.svg';

import IconTab from '../IconTab';
import Send from '../Send';

import styles from './TransactionsLoading.scss';

const TAB_SEND = 'send';
const TAB_RECEIVE = 'receive';
const TAB_TRANSACTIONS = 'transactions';

const TABS = {
  [TAB_SEND]: <IconTab renderIcon={SendIcon}>Send</IconTab>,
  [TAB_RECEIVE]: <IconTab renderIcon={ReceiveIcon}>Receive</IconTab>,
  [TAB_TRANSACTIONS]: <IconTab renderIcon={transactionsIcon}>Transactions</IconTab>
};

const initialState = {
  balances: {
    c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b: {
      scriptHash: 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
      name: 'NEO',
      symbol: 'NEO',
      decimals: 0,
      balance: '12'
    }
  },
  prices: {
    NEO: 0,
    GAS: 0
  }
};

const renderTab = () => <Send {...initialState} />;

export default function TransactionsLoading(props) {
  return (
    <Panel className={classNames(styles.transactionsLoading, props.className)}>
      <Tabs
        tabsClass={styles.tabs}
        tabClass={styles.tab}
        tabs={TABS}
        selectedTab={TAB_SEND}
        renderTab={renderTab}
        onSelect={noop}
        onScroll={noop}
      />
    </Panel>
  );
}

TransactionsLoading.propTypes = {
  className: string
};

TransactionsLoading.defaultProps = {
  className: null
};

import React from 'react';
import classNames from 'classnames';
import { string, func } from 'prop-types';
import { isEmpty } from 'lodash';

import Transaction from './Transaction';
import transactionHistoryShape from '../../../../shapes/transactionHistoryShape';

import styles from './Transactions.scss';

export default class Transactions extends React.PureComponent {
  static propTypes = {
    className: string,
    address: string.isRequired,
    transactionHistory: transactionHistoryShape.isRequired,
    handleFetchAdditionalTxData: func.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    const { className, transactionHistory, address } = this.props;

    return (
      <div className={classNames(styles.transactions, className)} onScroll={this.handleScroll}>
        {this.renderTransactions(transactionHistory, address)}
      </div>
    );
  }

  renderTransactions = ({ entries }, address) => {
    if (isEmpty(entries)) {
      return <div> No transaction history found. </div>;
    }
    return entries.map((tx) => <Transaction key={tx.id} transaction={tx} address={address} />);
  };

  handleScroll = ({ target }) => {
    const { handleFetchAdditionalTxData, transactionHistory } = this.props;
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom) {
      handleFetchAdditionalTxData(transactionHistory);
    }
  };
}

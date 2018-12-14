import React from 'react';
import classNames from 'classnames';
import { string, arrayOf, func } from 'prop-types';

import transactionShape from '../../../shapes/transactionShape';
import Transaction from './Transaction';

import styles from './Transactions.scss';

export default class Receive extends React.PureComponent {
  static propTypes = {
    className: string,
    address: string.isRequired,
    transactionHistory: arrayOf(transactionShape).isRequired,
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
    return entries.map((tx) => <Transaction transaction={tx} address={address} />);
  };

  handleScroll = ({ target }) => {
    const { handleFetchAdditionalTxData, transactionHistory } = this.props;
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom) {
      handleFetchAdditionalTxData(transactionHistory);
    }
  };
}

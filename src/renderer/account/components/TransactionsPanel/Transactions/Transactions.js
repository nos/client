import React from 'react';
import classNames from 'classnames';
import { string, func, objectOf, arrayOf } from 'prop-types';
import { noop } from 'lodash';

import transactionShape from '../../../shapes/transactionShape';
import Transaction from './Transaction';

import styles from './Transactions.scss';

export default class Receive extends React.PureComponent {
  static propTypes = {
    className: string,
    address: string.isRequired,
    transactionHistory: arrayOf(transactionShape).isRequired
  };

  static defaultProps = {
    className: null
  };

  componentDidMount() {
    console.log('Test');
    console.log(this.props);
  }

  render() {
    const { className, transactionHistory, address } = this.props;

    return (
      <div className={classNames(styles.transactions, className)}>
        {this.renderTransactions(transactionHistory, address)}
      </div>
    );
  }

  renderTransactions = (transactionHistory, address) => transactionHistory.map((tx) => <Transaction transaction={tx} address={address} />);
}

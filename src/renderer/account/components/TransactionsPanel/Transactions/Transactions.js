import React from 'react';
import classNames from 'classnames';
import { string, func } from 'prop-types';
import { noop } from 'lodash';

import Transaction from './Transaction';

import styles from './Transactions.scss';

export default class Receive extends React.PureComponent {
  static propTypes = {
    className: string,
    showInfoToast: func
  };

  static defaultProps = {
    className: null,
    showInfoToast: noop
  };

  render() {
    console.log("==========");
    console.log(this.props);
    console.log("==========");
    const { className } = this.props;

    return (
      <div className={classNames(styles.transactions, className)}>
        {this.renderTransactions()}
      </div>
    );
  }

  renderTransactions = () => {
    return <Transaction />;
  }
}

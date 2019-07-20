import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import ExplorerLink from 'root/components/AuthenticatedLayout/ExplorerLink';

import transactionShape from '../../../../../shapes/transactionShape';

import styles from './Transaction.scss';

export default class Transaction extends React.PureComponent {
  static propTypes = {
    className: string,
    address: string.isRequired,
    transaction: transactionShape.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    const {
      className,
      address,
      transaction: { to, amount, label, asset, txId, type }
    } = this.props;

    const labelStyle = to === address ? styles.labelIn : styles.labelOut;

    return (
      <div className={classNames(styles.transaction, className)}>
        <div className={styles.transactionInfoWrap}>
          <div className={classNames(labelStyle, styles.label)}> {label} </div>
          <div className={styles.type}> {type} </div>
          <div className={styles.asset}>
            {amount} {asset.symbol}
          </div>
        </div>
        <ExplorerLink endpoint={`transaction/${txId}`} className={styles.transactionId}>
          {txId}
        </ExplorerLink>
      </div>
    );
  }
}

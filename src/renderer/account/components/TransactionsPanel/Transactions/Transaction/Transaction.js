import React from 'react';
import classNames from 'classnames';
import { string, objectOf } from 'prop-types';

import ExplorerLink from 'root/components/AuthenticatedLayout/ExplorerLink';

import transactionShape from '../../../../shapes/transactionShape';

import styles from './Transaction.scss';

export default class TokenItem extends React.PureComponent {
  static propTypes = {
    className: string,
    address: string.isRequired,
    transaction: objectOf(transactionShape).isRequired
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
        <div className={labelStyle}> {label} </div>
        <div className={styles.type}> {type} </div>
        <div className={styles.asset}>
          {amount} {asset.symbol}
        </div>
        <ExplorerLink endpoint={`transaction/${txId}`} className={styles.transactionId}>
          {txId}
        </ExplorerLink>
      </div>
    );
  }
}

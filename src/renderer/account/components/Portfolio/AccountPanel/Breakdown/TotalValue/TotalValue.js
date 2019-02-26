import React from 'react';
import classNames from 'classnames';
import { number, string } from 'prop-types';

import formatCurrency from '../../../../../util/formatCurrency';
import styles from './TotalValue.scss';

export default class TotalValue extends React.PureComponent {
  static propTypes = {
    className: string,
    total: number.isRequired,
    currency: string.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    const { className, total, currency } = this.props;

    return (
      <div className={classNames(styles.totalValue, className)}>
        <div className={styles.value}>{formatCurrency(total, currency)}</div>
        <div className={styles.label}>Total Value</div>
      </div>
    );
  }
}

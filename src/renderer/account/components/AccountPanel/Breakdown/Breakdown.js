import React from 'react';
import classNames from 'classnames';
import { number, string, arrayOf, objectOf } from 'prop-types';

import TokenIcon from 'shared/components/TokenIcon';

import balanceShape from '../../../shapes/balanceShape';
import BreakdownChart from './BreakdownChart';
import styles from './Breakdown.scss';

export default class Breakdown extends React.PureComponent {
  static propTypes = {
    className: string,
    balances: arrayOf(balanceShape).isRequired,
    prices: objectOf(number).isRequired,
    currency: string.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    const { className, balances, prices, currency } = this.props;

    return (
      <div className={classNames(styles.breakdown, className)}>
        <BreakdownChart
          className={styles.chart}
          balances={balances}
          prices={prices}
          currency={currency}
        />
        {this.renderIcon()}
      </div>
    );
  }

  renderIcon = () => {
    const token = this.props.balances[0];

    if (!token) {
      return null;
    }

    return <TokenIcon className={styles.icon} {...token} />;
  }
}

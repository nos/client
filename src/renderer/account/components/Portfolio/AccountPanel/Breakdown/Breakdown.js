import React from 'react';
import classNames from 'classnames';
import { number, string, arrayOf, objectOf } from 'prop-types';

import TokenIcon from 'shared/components/TokenIcon';

import balanceShape from '../../../../shapes/balanceShape';
import TotalValue from './TotalValue';
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
        <TotalValue
          className={styles.totalValue}
          balances={balances}
          prices={prices}
          currency={currency}
        />
        <div className={styles.chart}>
          <BreakdownChart balances={balances} prices={prices} currency={currency} />
          {this.renderIcon()}
        </div>
      </div>
    );
  }

  renderIcon = () => {
    const { balances } = this.props;
    const filteredBalances = balances.filter((balance) => balance.symbol === 'NOS');
    const token = filteredBalances[0] || balances[0];

    if (!token) {
      return null;
    }

    // TODO refactor balance to be a BN everywhere inside the app
    if (token.balance === '0') {
      return <TokenIcon className={classNames(styles.icon, styles.emptyIcon)} {...token} />;
    }

    return <TokenIcon className={styles.icon} {...token} />;
  };
}

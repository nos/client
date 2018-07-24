import React from 'react';
import classNames from 'classnames';
import { number, string, arrayOf, objectOf } from 'prop-types';

import TokenBalance from '../TokenBalance';
import balanceShape from '../../../shapes/balanceShape';
import styles from './Holdings.scss';

export default class Holdings extends React.Component {
  static propTypes = {
    className: string,
    balances: arrayOf(balanceShape).isRequired,
    prices: objectOf(number).isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    return (
      <div className={classNames(styles.holdings, this.props.className)}>
        <h2>My Holdings</h2>
        {this.renderBalances()}
      </div>
    );
  }

  renderBalances = () => {
    const { balances, prices } = this.props;

    return balances.map((token) => (
      <TokenBalance key={token.symbol} token={token} price={prices[token.symbol] || 0} />
    ));
  }
}

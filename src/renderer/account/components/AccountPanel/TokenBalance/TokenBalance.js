import React from 'react';
import classNames from 'classnames';
import { string, number } from 'prop-types';

import TokenIcon from '../../TokenIcon';
import balanceShape from '../../../shapes/balanceShape';
import formatCurrency from '../../../util/formatCurrency';
import styles from './TokenBalance.scss';

export default class TokenBalance extends React.PureComponent {
  static propTypes = {
    className: string,
    token: balanceShape.isRequired,
    price: number.isRequired,
    currency: string.isRequired
  };

  static defaultProps = {
    className: null
  };

  render = () => {
    const { className, token, price, currency } = this.props;

    return (
      <div className={classNames(styles.tokenBalance, className)}>
        {this.renderImage()}
        <div className={styles.detail}>
          <div className={styles.balance}>{token.balance} {token.symbol}</div>
          <div className={styles.currency}>
            <span className={styles.tokenValue}>
              {formatCurrency(price, currency)}
            </span>
            <span className={styles.totalValue}>
              {formatCurrency(price * token.balance, currency)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  renderImage = () => {
    const { token } = this.props;

    return (
      <TokenIcon
        className={styles.icon}
        image={token.image}
        symbol={token.symbol}
        scriptHash={token.scriptHash}
      />
    );
  }
}

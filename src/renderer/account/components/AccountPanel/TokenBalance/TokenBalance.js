import React from 'react';
import classNames from 'classnames';
import { string, number } from 'prop-types';

import NeoIcon from 'shared/images/tokens/neo.svg';
import GasIcon from 'shared/images/tokens/gas.svg';
import { NEO, GAS } from 'shared/values/assets';

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

    if (token.image) {
      return <img className={styles.icon} src={token.image} alt={token.symbol} />;
    }

    if (token.scriptHash === NEO) {
      return <NeoIcon className={styles.icon} />;
    }

    if (token.scriptHash === GAS) {
      return <GasIcon className={styles.icon} />;
    }

    // TODO: generic token design
    return <NeoIcon className={styles.icon} />;
  }
}

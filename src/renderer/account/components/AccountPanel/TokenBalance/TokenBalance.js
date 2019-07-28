import React from 'react';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { string, number } from 'prop-types';

import TokenIcon from 'shared/components/TokenIcon';

import balanceShape from '../../../shapes/balanceShape';
import formatCurrency from '../../../util/formatCurrency';
import formatBalance from '../../../util/formatBalance';
import ClaimButton from '../ClaimButton';
import styles from './TokenBalance.scss';

export default class TokenBalance extends React.PureComponent {
  static propTypes = {
    className: string,
    token: balanceShape.isRequired,
    price: number.isRequired,
    currency: string.isRequired,
    claimable: string
  };

  static defaultProps = {
    className: null,
    claimable: null
  };

  render = () => {
    return (
      <div className={classNames(styles.tokenBalance, this.props.className)}>
        {this.renderToken()}
        {this.renderClaim()}
      </div>
    );
  }

  renderToken = () => {
    const { token, price, currency } = this.props;

    return (
      <div className={styles.token}>
        {this.renderImage()}
        <div className={styles.detail}>
          <div className={styles.balance}>
            {formatBalance(token.balance, token.decimals)} {token.symbol}
          </div>
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

  renderClaim = () => {
    const { claimable, token } = this.props;

    if (!claimable || new BigNumber(claimable).eq(0)) {
      return null;
    }

    return (
      <ClaimButton
        className={styles.claim}
        amount={claimable}
        symbol={token.symbol}
      />
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

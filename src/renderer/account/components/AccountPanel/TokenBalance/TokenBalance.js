import React from 'react';
import classNames from 'classnames';
import { string, number } from 'prop-types';

import TokenIcon from 'shared/components/TokenIcon';
import Button from 'shared/components/Forms/Button';

import balanceShape from '../../../shapes/balanceShape';
import formatCurrency from '../../../util/formatCurrency';
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

  renderClaim = () => {
    const { claimable } = this.props;

    if (!claimable) {
      return null;
    }

    return (
      <Button className={styles.claim} onClick={this.handleClaim}>
        Claim {claimable} GAS
      </Button>
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

  handleClaim = (_event) => {
    // TODO
    alert('TODO: claim gas here!');
  }
}

import React from 'react';
import classNames from 'classnames';
import { number, string, arrayOf, objectOf } from 'prop-types';

import Panel from 'shared/components/Panel';

import TokenBalance from './TokenBalance';
import balanceShape from '../../shapes/balanceShape';
import styles from './AccountPanel.scss';

export default class AccountPanel extends React.Component {
  static propTypes = {
    className: string,
    address: string.isRequired,
    balances: arrayOf(balanceShape).isRequired,
    prices: objectOf(number).isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    return (
      <Panel className={classNames(styles.accountPanel, this.props.className)}>
        <div className={styles.content}>
          <h2>My Holdings</h2>
          <p>Wallet Address: {this.props.address}</p>
          {this.renderBalances()}
        </div>
      </Panel>
    );
  }

  renderBalances = () => {
    const { balances, prices } = this.props;

    return balances.map((token) => (
      <TokenBalance key={token.symbol} token={token} price={prices[token.symbol] || 0} />
    ));
  }
}

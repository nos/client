import React from 'react';
import classNames from 'classnames';
import { string, objectOf } from 'prop-types';
import { values } from 'lodash';

import Panel from 'shared/components/Panel';

import balanceShape from '../../shapes/balanceShape';
import styles from './AccountPanel.scss';

const balancesShape = objectOf(balanceShape);

export default class AccountPanel extends React.Component {
  static propTypes = {
    className: string,
    address: string.isRequired,
    balances: balancesShape.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    return (
      <Panel className={classNames(styles.accountPanel, this.props.className)}>
        <div className={styles.content}>
          <p>Wallet Address: {this.props.address}</p>
          {this.renderBalances()}
        </div>
      </Panel>
    );
  }

  renderBalances = () => {
    const balances = values(this.props.balances);

    if (balances.length === 0) {
      return 'No available assets.';
    }

    return balances.map(({ symbol, balance }) => (
      <span key={symbol}>{symbol}: {balance}<br /></span>
    ));
  }

  getBalance = (assetIdOrScriptHash) => {
    const assetOrToken = this.props.balances[assetIdOrScriptHash];
    return assetOrToken ? assetOrToken.balance : '0';
  }
}

import React from 'react';
import { string, objectOf } from 'prop-types';
import { values } from 'lodash';

import Panel from 'shared/components/Panel';

import balanceShape from '../../shapes/balanceShape';
import styles from './AccountPanel.scss';

const balancesShape = objectOf(balanceShape);

export default class AccountPanel extends React.Component {
  static propTypes = {
    address: string.isRequired,
    balances: balancesShape.isRequired
  };

  render() {
    return (
      <Panel className={styles.accountPanel} renderHeader={this.renderHeader}>
        <div className={styles.content}>
          {this.renderBalances()}
        </div>
      </Panel>
    );
  }

  renderHeader = () => {
    return `Address ${this.props.address}`;
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

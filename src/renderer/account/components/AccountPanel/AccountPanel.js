import React from 'react';
import { string, objectOf } from 'prop-types';

import Panel from 'shared/components/Panel';
import { NEO, GAS } from 'shared/values/assets';
import { TOKENS } from 'shared/values/tokens';

import balanceShape from '../../shapes/balanceShape';
import styles from './AccountPanel.scss';

const balancesShape = objectOf(balanceShape);

export default class AccountPanel extends React.Component {
  static propTypes = {
    address: string.isRequired,
    balances: balancesShape.isRequired
  };

  render() {
    const tokenBalances = [];
    Object.entries(TOKENS).forEach(([scriptHash, tokenSymbol], i) => {
      const token = this.props.balances[scriptHash];
      if (!token) {
        return;
      }
      const balance = token.balance;
      tokenBalances.push({ tokenSymbol, balance });
    });

    return (
      <Panel className={styles.accountPanel} renderHeader={this.renderHeader}>
        <div className={styles.content}>
          NEO: {this.getBalance(NEO)}<br />
          GAS: {this.getBalance(GAS)}<br />
          {
            tokenBalances.map(({tokenSymbol, balance}, index) => {
              return <span key={index}>{tokenSymbol}: {balance}<br /></span>;
            })
          }
        </div>
      </Panel>
    );
  }

  renderHeader = () => {
    return `Address ${this.props.address}`;
  }

  getBalance = (assetIdOrScriptHash) => {
    const assetOrToken = this.props.balances[assetIdOrScriptHash];
    return assetOrToken ? assetOrToken.balance : '0';
  }
}

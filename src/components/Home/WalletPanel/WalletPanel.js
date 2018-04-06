import React from 'react';
import { string, objectOf } from 'prop-types';

import Panel from '../../Panel';
import balanceShape from '../../../shapes/balanceShape';
import { NEO, GAS } from '../../../values/assets';
import styles from './WalletPanel.scss';

const balancesShape = objectOf(balanceShape);

export default class WalletPanel extends React.Component {
  static propTypes = {
    address: string.isRequired,
    balances: balancesShape.isRequired
  };

  render() {
    return (
      <Panel className={styles.walletPanel} renderHeader={this.renderHeader}>
        <div className={styles.content}>
          Address: {this.props.address}<br />
          NEO: {this.getBalance(NEO)}<br />
          GAS: {this.getBalance(GAS)}
        </div>
      </Panel>
    );
  }

  renderHeader = () => {
    return 'Wallet';
  }

  getBalance = (assetIdOrScriptHash) => {
    const assetOrToken = this.props.balances[assetIdOrScriptHash];
    return assetOrToken ? assetOrToken.balance : '0';
  }
}

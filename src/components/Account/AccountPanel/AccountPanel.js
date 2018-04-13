import React from 'react';
import { string, objectOf } from 'prop-types';

import Panel from '../../Panel';
import balanceShape from '../../../shapes/balanceShape';
import { NEO, GAS } from '../../../values/assets';
import styles from './AccountPanel.scss';

const balancesShape = objectOf(balanceShape);

export default class AccountPanel extends React.Component {
  static propTypes = {
    address: string.isRequired,
    balances: balancesShape.isRequired
  };

  render() {
    return (
      <Panel className={styles.accountPanel}>
        <div className={styles.content}>
          Address: {this.props.address}<br />
          NEO: {this.getBalance(NEO)}<br />
          GAS: {this.getBalance(GAS)}
        </div>
      </Panel>
    );
  }

  getBalance = (assetIdOrScriptHash) => {
    const assetOrToken = this.props.balances[assetIdOrScriptHash];
    return assetOrToken ? assetOrToken.balance : '0';
  }
}

import React from 'react';
import { string, func, objectOf } from 'prop-types';
import { wallet } from '@cityofzion/neon-js';

import balanceShape from 'account/shapes/balanceShape';
import { NEO, GAS } from 'shared/values/assets';

function isValidAssetHash(asset) {
  return wallet.isScriptHash(asset) || [NEO, GAS].includes(asset);
}

export default class GetBalance extends React.Component {
  static propTypes = {
    balances: objectOf(balanceShape).isRequired,
    asset: string.isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  componentDidMount() {
    const { asset } = this.props;

    if (!isValidAssetHash(asset)) {
      this.props.onReject(`Invalid asset hash: "${asset}"`);
    } else {
      this.props.onResolve(this.getBalance(asset));
    }
  }

  render() {
    return null;
  }

  getBalance = (asset) => {
    const token = this.props.balances[asset];
    return token ? token.balance : '0';
  };
}

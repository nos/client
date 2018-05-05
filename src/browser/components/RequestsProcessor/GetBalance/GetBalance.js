import React from 'react';
import { string, func, arrayOf } from 'prop-types';
import { wallet } from '@cityofzion/neon-js';

import balanceShape from 'account/shapes/balanceShape';
import { NEO, GAS } from 'shared/values/assets';

function isValidScriptHash(scriptHash) {
  return wallet.isScriptHash(scriptHash) || [NEO, GAS].includes(scriptHash);
}

export default class GetBalance extends React.Component {
  static propTypes = {
    balances: arrayOf(balanceShape).isRequired,
    scriptHash: string.isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  componentDidMount() {
    const { scriptHash } = this.props;

    if (!isValidScriptHash(scriptHash)) {
      this.props.onReject(`Invalid script hash: "${scriptHash}"`);
    } else {
      this.props.onResolve(this.getBalance(scriptHash));
    }
  }

  render() {
    return null;
  }

  getBalance = (scriptHash) => {
    const token = this.props.balances[scriptHash];
    return token ? token.balance : '0';
  };
}

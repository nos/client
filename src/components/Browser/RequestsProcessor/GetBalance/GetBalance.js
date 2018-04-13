import React from 'react';
import { func, any, arrayOf } from 'prop-types';
import { wallet } from '@cityofzion/neon-js';

import { NEO, GAS } from '../../../../values/assets';
import balanceShape from '../../../../shapes/balanceShape';

function isValidScriptHash(scriptHash) {
  return wallet.isScriptHash(scriptHash) || [NEO, GAS].includes(scriptHash);
}

export default class GetBalance extends React.Component {
  static propTypes = {
    balances: arrayOf(balanceShape).isRequired,
    args: arrayOf(any).isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  componentDidMount() {
    const scriptHash = this.getScriptHash();

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
  }

  getScriptHash = () => {
    return this.props.args[0];
  }
}

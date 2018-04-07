import Neon, { api, rpc, u, tx } from '@cityofzion/neon-js';

import { createActions } from 'spunky';

import * as assets from '../../values/assets';
import { createScript } from "../../util/scriptHelper";

export const ID = 'invoke';

const doInvoke = async (net, { account, balances, scriptHash, operation, args }) => {
  try {
    const gasCost = 0;
    const intents = [
      {
        assetId: assets.GAS,
        value: 0.00000001,
        scriptHash: Neon.get.scriptHashFromAddress(account.address)
      }
    ];

    // Create SC script
    const myScript = createScript(scriptHash, operation, args);

    // Create TX
    const unsignedTx = tx.Transaction.createInvocationTx(
      balances,
      intents,
      myScript,
      gasCost,
      { version: 1 }
    );

    // Sign TX
    const signedTx = tx.signTransaction(unsignedTx, account.wif);

    return rpc.queryRPC(net, {
      method: "sendrawtransaction",
      params: [tx.serializeTransaction(signedTx)],
      id: 1
    });
  } catch (e) {
    console.log('errr', e);
  }
};

export default createActions(ID, ({net, account, balances, scriptHash, operation, args}) => async () => {
  return doInvoke(net, {account, balances, scriptHash, operation, args});
});

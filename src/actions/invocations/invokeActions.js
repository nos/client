import Neon, { rpc, tx, wallet } from '@cityofzion/neon-js';
import { isArray } from 'lodash';

import { createActions } from 'spunky';

import * as assets from '../../values/assets';
import createScript from '../../util/scriptHelper';

export const ID = 'invoke';

const doInvoke = async ({ net, account, balances, scriptHash, operation, args }) => {
  if (!wallet.isScriptHash(scriptHash)) {
    throw new Error(`Invalid script hash: "${scriptHash}"`);
  }

  if (typeof operation !== 'string') {
    throw new Error(`Invalid operation: "${operation}"`);
  }

  if (!isArray(args)) {
    throw new Error(`Invalid arguments: "${args}"`);
  }

  // Prepare balances
  const invokeBalance = new wallet.Balance({ net, address: account.address });
  invokeBalance.addAsset('NEO', balances[assets.NEO].balance);
  invokeBalance.addAsset('GAS', balances[assets.GAS].balance);

  // Prepare intents
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
  const gasCost = 0;
  const unsignedTx = tx.Transaction.createInvocationTx(
    invokeBalance,
    intents,
    myScript,
    gasCost,
    { version: 1 }
  );

  // Sign TX
  const signedTx = tx.signTransaction(unsignedTx, account.wif);

  // Execute Query
  return rpc.queryRPC(net, {
    method: 'sendrawtransaction',
    params: [tx.serializeTransaction(signedTx)],
    id: 1
  });
};

export default createActions(ID, ({ net, account, balances, scriptHash, operation, args }) =>
  () => {
    return doInvoke({ net, account, balances, scriptHash, operation, args });
  });

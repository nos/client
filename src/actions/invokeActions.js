import Neon, { api } from 'neon-js';
const sb = Neon.create.scriptBuilder;

import { createActions } from 'spunky';

export const ID = 'testInvoke';

/**
 * Create an invoke out of your params
 * @param {string} scriptHash Contract address
 * @param {string} operation Operation string
 * @param {array} args Argument array
 */
export const createInvoke = (scriptHash, operation, args) => {
  return { scriptHash, operation, args };
};

/**
 * Execute a test invocation
 * @param {string} host Host endpoint
 * @param {object} invoke Invoke data
 */
export const testInvoke = async (host, invoke) => {
  /*
  // Get local RPC
  const client = await api.neonDB.getRPCEndpoint(host);

  // Create SC script
  const vmScript = sb().emitAppCall(
    invoke.scriptHash,
    invoke.operation,
    invoke.args,
    false
  );

  // Execute
  return rpc.Query.invokeScript(client, {
    method: "sendrawtransaction",
    params: [tx.serializeTransaction(signedTx)],
    id: 1
  });
  */

  return 'test';
};


export default createActions(ID, ({ host, invoke }) => () => {
  return testInvoke(host, invoke)
});

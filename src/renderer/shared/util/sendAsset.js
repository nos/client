import { api, wallet, u, tx } from '@cityofzion/neon-js';
import { keys } from 'lodash';

import getRPCEndpoint from 'util/getRPCEndpoint';

import createScript from 'shared/util/createScript';
import validateRemark from 'shared/util/validateRemark';

import { ASSETS } from '../values/assets';

export default async function sendAsset(
  { net, asset, amount, receiver, address, wif, publicKey, signingFunction, remark, fee = 0 },
  getBalance = api.neoscan.getBalance,
  doSendAsset = api.sendAsset,
  doInvoke = api.doInvoke,
  doGetRPCEndpoint = getRPCEndpoint
) {
  if (!wallet.isAddress(receiver)) {
    throw new Error(`Invalid script hash: "${receiver}"`);
  }

  if (amount <= 0) {
    throw new Error(`Invalid amount: "${amount}"`);
  }

  if (remark !== undefined) {
    validateRemark(remark);
  }

  const send = async () => {
    const url = await doGetRPCEndpoint(net);
    const config = {
      net,
      url,
      address,
      privateKey: wif,
      publicKey,
      signingFunction,
      fees: fee
    };

    if (keys(ASSETS).includes(asset)) {
      const selectedAsset = ASSETS[asset].symbol;
      const intents = api.makeIntent({ [selectedAsset]: amount }, receiver);
      const balance = await getBalance(net, address);
      const transaction = tx.Transaction.createContractTx(balance, intents, {}, fee);

      if (typeof remark === 'string') {
        transaction.addRemark(remark);
      } else if (Array.isArray(remark)) {
        for (let i = 0; i < remark.length; i += 1) {
          transaction.addAttribute(tx.TxAttrUsage.Remark + i, remark[i]);
        }
      }

      return doSendAsset({ ...config, balance, tx: transaction }, api.neoscan);
    } else {
      const script = createScript(
        asset,
        'transfer',
        [address, receiver, new u.Fixed8(amount)],
        true
      );

      return doInvoke({ ...config, script, gas: 0 }, api.neoscan);
    }
  };

  const {
    response: { result, txid }
  } = await send();

  if (!result) {
    throw new Error('Transaction rejected by blockchain');
  }

  return txid;
}

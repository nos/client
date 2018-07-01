import Neon, { api, wallet, u } from '@cityofzion/neon-js';
import { keys } from 'lodash';

import createScript from 'shared/util/createScript';

import { ASSETS, GAS } from '../values/assets';

export default async function sendAsset({ net, asset, amount, receiver, address, wif }) {
  if (!wallet.isAddress(receiver)) {
    throw new Error(`Invalid script hash: "${receiver}"`);
  }

  if (amount <= 0) {
    throw new Error(`Invalid amount: "${amount}"`);
  }

  let result;
  let txid;
  if (keys(ASSETS).includes(asset)) {
    const selectedAsset = ASSETS[asset];
    const intents = await api.makeIntent({ [selectedAsset]: amount }, receiver);

    const config = {
      net,
      address,
      privateKey: new wallet.Account(wif).privateKey,
      intents
    };

    ({ response: { result, txid } } = await api.sendAsset(config, api.neoscan));
  } else {
    ({ response: { result, txid } } = await Neon.doInvoke({
      net,
      address,
      script: createScript(asset, 'transfer', [
        address,
        receiver,
        new u.Fixed8(amount)
      ], true),
      privateKey: wif,
      gas: 0,
      intents: [{
        assetId: GAS,
        value: '0.00000001',
        scriptHash: wallet.getScriptHashFromAddress(address)
      }]
    }));
  }

  if (!result) {
    throw new Error('Invocation failed.');
  }

  return txid;
}

import { api, wallet } from '@cityofzion/neon-js';
import { keys } from 'lodash';

import { ASSETS } from '../values/assets';

export default async function sendAsset({ net, asset, amount, receiver, address, wif }) {
  if (!keys(ASSETS).includes(asset)) {
    throw new Error(`Invalid asset: ${asset}`);
  }

  if (!wallet.isAddress(receiver)) {
    throw new Error(`Invalid script hash: "${receiver}"`);
  }

  if (amount <= 0) {
    throw new Error(`Invalid amount: "${amount}"`);
  }

  const selectedAsset = ASSETS[asset];
  const intents = await api.makeIntent({ [selectedAsset]: amount }, receiver);

  const config = {
    net,
    address,
    privateKey: new wallet.Account(wif).privateKey,
    intents
  };

  const { response: { result, txid } } = await api.sendAsset(config);

  if (!result) {
    throw new Error('Invocation failed.');
  }

  return txid;
}

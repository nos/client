import { api, wallet, u } from '@cityofzion/neon-js';
import { keys } from 'lodash';

import createScript from 'shared/util/createScript';

import { ASSETS } from '../values/assets';

export default async function sendAsset({ net, asset, amount, receiver, address, wif }) {
  if (!wallet.isAddress(receiver)) {
    throw new Error(`Invalid script hash: "${receiver}"`);
  }

  if (amount <= 0) {
    throw new Error(`Invalid amount: "${amount}"`);
  }

  const send = () => {
    const config = { net, address, privateKey: wif };

    if (keys(ASSETS).includes(asset)) {
      const selectedAsset = ASSETS[asset];
      const intents = api.makeIntent({ [selectedAsset]: amount }, receiver);

      return api.sendAsset({ ...config, intents }, api.neoscan);
    } else {
      const script = createScript(asset, 'transfer', [address, receiver, new u.Fixed8(amount)], true);

      return api.doInvoke({ ...config, script, gas: 0 }, api.neoscan);
    }
  };

  const { response: { result, txid } } = await send();

  if (!result) {
    throw new Error('Invocation failed.');
  }

  return txid;
}

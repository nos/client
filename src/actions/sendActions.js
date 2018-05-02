import { createActions } from 'spunky';
import Neon, { api, wallet } from '@cityofzion/neon-js';

import { NEO, assetsAsArray } from '../values/assets';

export const ID = 'send';

// TODO check if user has enough balance - invocation fails (catch rpc error)
const send = async ({ net, asset, amount, receiver, address, wif }) => {
  if (!assetsAsArray.includes(asset)) {
    throw new Error(`Invalid asset: ${asset}`);
  }

  if (!wallet.isAddress(receiver)) {
    throw new Error(`Invalid script hash: "${receiver}"`);
  }

  if (amount <= 0) {
    throw new Error(`Invalid amount: "${amount}"`);
  }

  const selectedAsset = asset === NEO ? 'NEO' : 'GAS';
  const intents = await api.makeIntent({ [selectedAsset]: amount }, receiver);

  const config = {
    net,
    address,
    privateKey: new wallet.Account(wif).privateKey,
    intents
  };

  const { response: { result, txid } } = await Neon.sendAsset(config);

  if (!result) {
    throw new Error('Invocation failed.');
  }

  return txid;
};

export default createActions(ID, ({ net, asset, amount, receiver, address, wif }) => () => {
  return send({ net, asset, amount, receiver, address, wif });
});

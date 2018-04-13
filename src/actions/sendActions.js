import { createActions } from 'spunky';
import Neon, { api, wallet } from '@cityofzion/neon-js';

import { GAS, NEO } from '../values/assets';

export const ID = 'send';

const send = async ({ net, asset, amount, receiver, address, wif }) => {
  if (![GAS, NEO].includes(asset)) {
    throw new Error(`Invalid asset: ${asset}`);
  }

  // TODO check if user has enough balance
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

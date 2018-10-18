import { api } from '@cityofzion/neon-js';

export default async function claimGas({ net, address, wif }) {
  const config = {
    net,
    address,
    privateKey: wif
  };

  const { response: { result, txid } } = await api.claimGas(config, api.neoscan);

  if (!result) {
    throw new Error('Transaction rejected by blockchain');
  }

  return txid;
}

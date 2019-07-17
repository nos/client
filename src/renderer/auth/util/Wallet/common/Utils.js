import { wallet } from '@cityofzion/neon-js';

// TODO is this the same for ETH/BTC/...?
const publicKeyToAddress = (publicKey) => {
  const encodedKey = wallet.getPublicKeyEncoded(publicKey);

  return new wallet.Account(encodedKey).address;
};

// eslint-disable-next-line
export { publicKeyToAddress };

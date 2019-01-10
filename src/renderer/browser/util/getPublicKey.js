import { wallet } from '@cityofzion/neon-js';

export default function getPublicKey(wif) {
  const account = new wallet.Account(wif);
  return account.publicKey;
}

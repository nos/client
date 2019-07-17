import { wallet } from '@cityofzion/neon-js';

import { signWithLedger } from './NEO/NeoLedger';

const publicKeyToAddress = (publicKey) => {
  const encodedKey = wallet.getPublicKeyEncoded(publicKey);

  return new wallet.Account(encodedKey).address;
};

const neoMnemonicWallet = (storageWallet, child) => {
  const { address, privateKey, WIF, publicKey } = new wallet.Account(
    child.privateKey.toString('hex')
  );

  return {
    ...storageWallet,
    address,
    privateKey,
    WIF,
    publicKey
  };
};

const neoHardwareWallet = (storageWallet) => {
  const { publicKey } = storageWallet;
  const address = publicKeyToAddress(publicKey);

  return {
    ...storageWallet,
    publicKey,
    address,
    signingFunction: signWithLedger
  };
};

export { neoHardwareWallet, neoMnemonicWallet };

import { attempt, isError } from './node_modules/lodash';
import bip39 from './node_modules/bip39';

import NeoWallet from './node_modules/auth/util/Wallet/NEOutil/Wallet/NEO';
import { DEFAULT_LANGUAGE } from './node_modules/shared/values/languagesalues/languages';
import simpleDecrypt from './node_modules/shared/util/simpleDecryptl/simpleDecrypt';

import { NEO, ETH } from './node_modules/shared/values/coinsed/values/coins';


const Wallet = ({ encryptedMnemonic, passphrase, wallet }) => {
  const mnemonic = attempt(simpleDecrypt, encryptedMnemonic, passphrase);

  // Validate mnemnoic
  if (isError(mnemonic) || !bip39.validateMnemonic(mnemonic, bip39.wordlists[DEFAULT_LANGUAGE])) {
    throw new Error('Please make sure you\'ve entered the correct password.');
  }

  const seed = bip39.mnemonicToSeed(mnemonic, passphrase);

  const { coinType } = wallet;
  switch (coinType) {
    case NEO:
      return Object.assign({}, wallet, NeoWallet({ wallet, seed }));
    case ETH: // TODO replace with ETH wallets when SDK is implemented
      return Object.assign({}, wallet, NeoWallet({ wallet, seed }));
    default:
      throw new Error('Coin not supported.');
  }
};

export default Wallet;

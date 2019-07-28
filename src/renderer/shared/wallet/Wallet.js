import { attempt, isError } from 'lodash';
import * as bip39 from 'bip39';

import NeoWallet from 'shared/wallet/NEO';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';
import simpleDecrypt from 'shared/util/simpleDecrypt';
import { NEO, ETH } from 'shared/values/coins';

const Wallet = ({ encryptedMnemonic, passphrase, wallet }) => {
  const mnemonic = attempt(simpleDecrypt, encryptedMnemonic, passphrase);

  // Validate mnemnoic
  if (isError(mnemonic) || !bip39.validateMnemonic(mnemonic, bip39.wordlists[DEFAULT_LANGUAGE])) {
    throw new Error("Please make sure you've entered the correct password.");
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

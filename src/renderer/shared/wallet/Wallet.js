import { attempt, isError } from 'lodash';
import * as bip39 from 'bip39';

import NeoWallet from 'shared/wallet/NEO';
import ArkWallet from 'shared/wallet/ARK';

import { DEFAULT_LANGUAGE } from 'shared/values/languages';
import simpleDecrypt from 'shared/util/simpleDecrypt';
import { NEO, ARK } from 'shared/values/coins';

const Wallet = ({ encryptedMnemonic, passphrase, wallet }) => {
  const mnemonic = attempt(simpleDecrypt, encryptedMnemonic, passphrase);

  // Validate mnemnoic
  if (isError(mnemonic) || !bip39.validateMnemonic(mnemonic, bip39.wordlists[DEFAULT_LANGUAGE])) {
    throw new Error("Please make sure you've entered the correct password.");
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic, passphrase);

  const { coinType } = wallet;
  switch (coinType) {
    case NEO:
      return { ...wallet, ...NeoWallet({ wallet, seed }) };
    case ARK:
      return { ...wallet, ...ArkWallet({ wallet, seed }) };
    default:
      throw new Error('Coin not supported.');
  }
};

export default Wallet;

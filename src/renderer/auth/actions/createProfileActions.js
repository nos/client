import { createActions } from 'spunky';
import { isEmpty } from 'lodash';
import bip39 from 'bip39';

import simpleEncrypt from 'shared/util/simpleEncrypt';
import PROFILE_ID from 'shared/values/profile';
import { getStorage, setStorage } from 'shared/lib/storage';
import { DEFAULT_NET } from 'values/networks';
import { DEFAULT_FEE } from 'shared/values/fees';
import { DEFAULT_CURRENCY } from 'shared/values/currencies';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';

const MIN_PASSPHRASE_LEN = 6;

export const ID = 'createAccount';

const createProfile = async (label, passphrase, passphraseConfirmation, secretWord) => {
  if (passphrase.length < MIN_PASSPHRASE_LEN) {
    throw new Error('Passphrase is too short.');
  }

  if (passphrase !== passphraseConfirmation) {
    throw new Error('Passphrase verification does not match.');
  }

  const profiles = await getStorage(PROFILE_ID);
  const newProfile = profiles[label];

  if (!isEmpty(newProfile)) {
    throw new Error(`Profile with label ${label} already exists.`);
  }

  // Generate bip39 Mnemonic - 256-bits entropy (24-word long mnemonic)
  const mnemonic = bip39.generateMnemonic(256, null, bip39.wordlists[DEFAULT_LANGUAGE]);
  const encryptedMnemonic = simpleEncrypt(mnemonic, passphrase);

  const profile = {
    label,
    fee: DEFAULT_FEE,
    currency: DEFAULT_CURRENCY,
    net: {
      NEO: DEFAULT_NET,
      ETH: DEFAULT_NET
    },
    language: DEFAULT_LANGUAGE,
    mnemonic: encryptedMnemonic,
    secretWord
  };

  await setStorage(PROFILE_ID, { ...profiles, [label]: profile });

  return { ...profile, mnemonic, passphrase };
};

export default createActions(
  ID,
  ({ walletName, passphrase, passphraseConfirmation, secretWord }) => {
    return () => createProfile(walletName, passphrase, passphraseConfirmation, secretWord);
  }
);

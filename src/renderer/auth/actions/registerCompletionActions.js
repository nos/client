import { createActions } from 'spunky';
import { omit } from 'lodash';
import bip39 from 'bip39';

import { newStorageWallet } from 'auth/util/StorageWallet/StorageWallet';
import { appendAccountToStorage } from 'auth/util/AccountStorage';
import { appendWalletToStorage } from 'auth/util/WalletStorage';
import { HardwareWallet, MnemonicWallet } from 'auth/util/Wallet/Wallet';

export const ID = 'registerCompletion';

const accountFilterProps = ['passphrase', 'passphraseConfirm', 'mnemonic', 'publicKey'];
const walletFilterProps = ['signingFunction', 'WIF', 'privateKey'];

export const verifyAndCreateWallet = async ({
  account,
  passphrase,
  secretWord,
  firstMnemonicWord,
  firstMnemonicWordIndex,
  secondMnemonicWord,
  secondMnemonicWordIndex
}) => {
  const { accountLabel, isHardware } = account;

  const mnemonicArray = account.mnemonic.trim().split(' ');

  // Validate password
  if (account.passphrase !== passphrase) {
    throw new Error("You've entered a wrong password");
  }

  // Validate secret word
  if (account.secretWord !== secretWord) {
    throw new Error("You've entered the wrong secret word");
  }

  // Validate mnemonic words if it's a mnemonic wallet
  if (!account.isHardware) {
    if (mnemonicArray[firstMnemonicWordIndex - 1] !== firstMnemonicWord) {
      throw new Error(
        `Word number #${firstMnemonicWordIndex} of your recovery seed does not match the word "${firstMnemonicWord}"`
      );
    }

    if (mnemonicArray[secondMnemonicWordIndex - 1] !== secondMnemonicWord) {
      throw new Error(
        `Word number #${secondMnemonicWordIndex} of your recovery seed does not match the word "${secondMnemonicWord}"`
      );
    }
  }

  // Creates and stores a new storage wallet (same for Ledger/MnemonicWallet)
  const wallet = newStorageWallet({
    isHardware,
    canDelete: false,
    publicKey: account.publicKey // exists only with hardware wallet
  });

  const initializedWallet = isHardware
    ? HardwareWallet(wallet)
    : MnemonicWallet(wallet, bip39.mnemonicToSeed(account.mnemonic, passphrase));

  // Set last active wallet to this wallet.
  const updatedAccount = {
    ...omit(account, ...accountFilterProps),
    activeWalletId: wallet.label
  };

  // Store account
  await appendAccountToStorage({
    label: account.accountLabel,
    value: updatedAccount
  });

  // Store wallet
  await appendWalletToStorage({
    label: account.accountLabel,
    value: {
      ...omit(initializedWallet, ...walletFilterProps)
    }
  });

  // TODO - Return data to authenticate - is this needed??
  return { account: updatedAccount, passphrase };
};

export default createActions(ID, (data) => {
  return () => {
    return verifyAndCreateWallet(data);
  };
});

import { omit } from 'lodash';

import { getStorage, appendStorage } from 'shared/lib/storage';

import { newStorageWallet } from './StorageWallet/StorageWallet';
import { appendAccountToStorage } from './AccountStorage';

export const ID = 'wallets';

const filterProps = ['passphrase', 'passphraseConfirm', 'mnemonic', 'publicKey'];

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
  const wallet = await newStorageWallet({
    isHardware,
    canDelete: false,
    publicKey: account.publicKey
  });

  // Set last active wallet to this wallet.
  const updatedAccount = {
    ...omit(account, ...filterProps),
    activeWalletId: wallet.label,
    wallet
  };

  // Store account in storage
  await appendAccountToStorage({
    label: account.accountLabel,
    value: omit(updatedAccount, 'wallet')
  });

  // Return data to authenticate
  return { account: updatedAccount, passphrase };
};

const appendWalletToStorage = async ({ label, value }) => {
  console.info(
    `Appending wallet with label ${value.label} to account with label ${label} to storage `,
    value
  );

  await appendStorage(ID, label, {
    [value.label]: {
      ...value
    }
  });
  return getStorage(ID);
};

export { appendWalletToStorage };

import { createActions } from 'spunky';
import { omit } from 'lodash';

import { DEFAULT_COIN } from 'shared/values/coins';
import { addWalletToAccount } from 'shared/wallet/WalletHelpers';
import { appendStorage } from 'shared/lib/storage';
import { ID as ACCOUNT_ID } from 'auth/actions/accountActions';

export const ID = 'registerCompletion';

const accountFilterProps = ['passphrase', 'passphraseConfirm', 'mnemonic', 'publicKey'];

export const verifyAndCreateWallet = async ({
  account,
  passphrase,
  secretWord,
  firstMnemonicWord,
  firstMnemonicWordIndex,
  secondMnemonicWord,
  secondMnemonicWordIndex
}) => {
  const { isHardware, publicKey } = account;

  const mnemonicArray = account.mnemonic.trim().split(' ');

  // Validate passphrase
  if (account.passphrase !== passphrase) {
    throw new Error("You've entered a wrong passphrase");
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

  const options = {
    isHardware,
    canDelete: false,
    coinType: DEFAULT_COIN, // Always register with default coin
    publicKey // When using HW device, publicKey is passed through options
  };

  const wallet = await addWalletToAccount({ account, passphrase, options });

  // Set last active wallet to this wallet.
  const updatedAccount = {
    ...omit(account, ...accountFilterProps),
    activeWalletId: wallet.walletId
  };

  await appendStorage(ACCOUNT_ID, account.accountLabel, updatedAccount);

  return { account: updatedAccount, passphrase };
};

export default createActions(ID, (data) => {
  return () => {
    return verifyAndCreateWallet(data);
  };
});

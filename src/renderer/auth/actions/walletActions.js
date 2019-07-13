import { createActions } from 'spunky';
import bip39 from 'bip39';
import { reduce, filter, omit } from 'lodash';

import { addWalletToAccount } from 'auth/util/StorageWallet/WalletHelpers';
import { getStorage } from 'shared/lib/storage';
import { verifyAndCreateWallet, appendWalletToStorage } from 'auth/util/WalletStorage';
import { getActiveWalletForAccount, storeWallet, newStorageWallet } from 'auth/util/StorageWallet/StorageWallet';
import newWalletInstance from 'auth/util/HardwareWallet/HardwareWallet';

import { appendAccountToStorage } from 'auth/util/AccountStorage';

import { HardwareWallet, MnemonicWallet } from 'auth/util/Wallet/Wallet';

export const ID = 'wallets';
const walletFilterProps = ['signingFunction', 'WIF', 'privateKey'];

// Getters
export default createActions(ID, ({ accountLabel }) => async () => {
  return getStorage(`${ID}-${accountLabel}`);
});

// Setter - Add new wallets
export const addWalletActions = createActions(ID, ({ account, passphrase, coinType }) => async () => {
  return addWalletToAccount({ account, passphrase, options: { coinType } });
  // const wallets = await getStorage(ID);
  // console.log(wallets);
  // const walletsForAccount = wallets[account.accountLabel];

  // console.log('walletsForAccount', walletsForAccount);
  // console.log('filter(walletsForAccount, { type: coinType })', filter(walletsForAccount, { type: coinType }));

  // const latestAccount = reduce(filter(walletsForAccount, { type: coinType }), (max, obj) => {
  //   return obj.index > max.index ? obj : max;
  // });

  // console.log('LAtests ', latestAccount.index + 1);


  // // Creates and stores a new storage wallet (same for Ledger/MnemonicWallet)
  // const wallet = newStorageWallet({
  //   isHardware: account.isHardware,
  //   publicKey: account.publicKey // exists only with hardware wallet
  // });

  // const initializedWallet = account.isHardware
  //   ? HardwareWallet(wallet)
  //   : MnemonicWallet(wallet, bip39.mnemonicToSeed(account.mnemonic, passphrase));

  // // Store wallet
  // await appendWalletToStorage({
  //   label: account.accountLabel,
  //   value: {
  //     ...omit(initializedWallet, ...walletFilterProps)
  //   }
  // });


  // // TODO newWalletInstance should ONLY return WIF, address, PrivKey, PubKey in any case
  // // const initializedWallet = newWalletInstance(walletForAccount, seed);
});

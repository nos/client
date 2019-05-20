import uuid from 'uuid/v4';

import MnemonicWallet from 'auth/util/MnemonicWallet';
import { DEFAULT_NET } from 'values/networks';
import { DEFAULT_CHAIN } from 'shared/values/chains';
import { DEFAULT_ACC_INDEX } from 'shared/values/profile';

export default class Account {
  constructor(
    isHardware,
    accountLabel,
    encryptedMnemonic,
    secretWord,
    activeWalletId,
    wallets = {}
  ) {
    this.isHardware = isHardware;
    this.accountLabel = accountLabel;
    this.secretWord = secretWord;
    this.activeWalletId = activeWalletId;
    this.wallets = wallets;

    if (isHardware) {
      this.encryptedMnemonic = encryptedMnemonic;
    }
  }

  addWallet = ({
    chainId = DEFAULT_CHAIN,
    index = DEFAULT_ACC_INDEX,
    net = DEFAULT_NET,
    account = 0,
    change = 0
  }) => {
    const walletId = uuid();

    this.wallet = {
      ...this.wallet,
      [walletId]: {
        walletId: uuid,
        chainId,
        index,
        account,
        change,
        net
      }
    };

    this.setActiveWallet(walletId);
  };

  setActiveWallet = (newActiveWalletId) => {
    this.activeWalletId = newActiveWalletId;
  };

  initialize = ({ isHardware = false, passphrase = '' }) => {
    // if (isHardware) return new HardwareWallet();
    // else return new Wallet(this.encryptedMnemonic, passphrase);
    const mnemnoicWallet = new MnemonicWallet(this.encryptedMnemonic, passphrase);

    this.wallets = this.wallets.forEach((wallet) => mnemnoicWallet.deriveWalletFromAccount(wallet));
  };
}

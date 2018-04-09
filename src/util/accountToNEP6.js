import { wallet } from '@cityofzion/neon-js';

export default function accountToNEP6({ address, key, label = address, isDefault = true }) {
  const newAccount = new wallet.Account({ address, key, label, isDefault });
  const newWallet = new wallet.Wallet({ accounts: [newAccount] });

  return newWallet.export();
}

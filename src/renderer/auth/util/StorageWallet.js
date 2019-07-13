// import bip32 from 'bip32';

// import { appendStorage } from 'shared/lib/storage';


// const initializeWallet = ({ encryptedMnemonic, passphrase }) => {
//   console.log({ encryptedMnemonic, passphrase });

//   return this.wallet;
// };

// const saveWallet = ({ accountLabel, wallet }) => {
//   appendStorage(`wallets-${accountLabel}`, wallet.label, wallet);
// };

// const getWalletsForAccount = ({ account }) => this.wallets;

// const newWalletForAccount = ({ account, passphrase }) => {
//   const { encryptedMnemonic, accountLabel } = account;

//   const initializedWallet = initializeWallet({ encryptedMnemonic, passphrase });
//   saveWallet({ accountLabel, wallet: initializedWallet });

//   return initializedWallet;
// };

// export {
//   initializeWallet,
//   saveWallet,
//   getWalletsForAccount,
//   newWalletForAccount
// };

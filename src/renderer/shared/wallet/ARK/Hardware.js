// // import { Transaction } from '@arkecosystem/crypto';

// // import { publicKeyToAddress } from 'shared/wallet/common';
// import { initializeDevice } from 'shared/wallet/common/LedgerHelpers';

// export const getPublicKey = async (acct = 0) => {
//   const ledger = await initializeDevice();

//   try {
//     return await ledger.getPublicKey(acct);
//   } finally {
//     await ledger.close();
//   }
// };

// export const getPublicKeys = async (currentPublicKeys) => {
//   const ledger = await initializeDevice();

//   try {
//     return await ledger.getPublicKeys(currentPublicKeys);
//   } finally {
//     await ledger.close();
//   }
// };

// export const getDeviceInfo = async () => {
//   const ledger = await initializeDevice();

//   try {
//     return await ledger.getDeviceInfo();
//   } finally {
//     await ledger.close();
//   }
// };

// // TODO
// // export const signWithLedger = async (unsignedTx, publicKey, acct = 0) => {
// //   const ledger = await initializeDevice();
// //   try {
// //     const ledgerSignature = await ledger.getSignature(data, acct);
// //     const keys;
// //     const signedTx = ledger.getSignature(unsignedTx, keys);
// //     return Transaction.serialize(signedTx).toString('hex');
// //   } finally {
// //     await ledger.close();
// //   }
// // };

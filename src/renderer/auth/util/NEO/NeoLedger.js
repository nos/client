import { tx, wallet } from '@cityofzion/neon-js';

import { initializeDevice } from '../LedgerHelpers';

export const getPublicKey = async (acct = 0) => {
  const ledger = await initializeDevice();

  try {
    return await ledger.getPublicKey(acct);
  } finally {
    await ledger.close();
  }
};

export const getPublicKeys = async (acct = 0) => {
  const ledger = await initializeDevice();

  try {
    return await ledger.getPublicKeys(acct);
  } finally {
    await ledger.close();
  }
};

export const getDeviceInfo = async () => {
  const ledger = await initializeDevice();

  try {
    return await ledger.getDeviceInfo();
  } finally {
    await ledger.close();
  }
};

export const signWithLedger = async (unsignedTx, publicKey, acct = 0) => {
  const ledger = await initializeDevice();

  try {
    const data =
      typeof unsignedTx !== 'string' ? tx.serializeTransaction(unsignedTx, false) : unsignedTx;
    const invocationScript = `40${await ledger.getSignature(data, acct)}`;
    const verificationScript = wallet.getVerificationScriptFromPublicKey(publicKey);
    const txObj = tx.deserializeTransaction(data);
    txObj.scripts.push({ invocationScript, verificationScript });
    return tx.serializeTransaction(txObj);
  } finally {
    await ledger.close();
  }
};

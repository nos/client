import { tx, wallet as neoWallet } from '@cityofzion/neon-js';

import { publicKeyToAddress } from 'shared/wallet/common';
import { initializeDevice } from 'shared/wallet/common/LedgerHelpers';

export const getPublicKey = async (acct = 0) => {
  const ledger = await initializeDevice();

  try {
    return await ledger.getPublicKey(acct);
  } finally {
    await ledger.close();
  }
};

export const getPublicKeys = async (currentPublicKeys) => {
  const ledger = await initializeDevice();

  try {
    return await ledger.getPublicKeys(currentPublicKeys);
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
    const verificationScript = neoWallet.getVerificationScriptFromPublicKey(publicKey);
    const txObj = tx.deserializeTransaction(data);
    txObj.scripts.push({ invocationScript, verificationScript });
    return tx.serializeTransaction(txObj);
  } finally {
    await ledger.close();
  }
};

const NeoHardwareWallet = ({ wallet }) => {
  const { publicKey } = wallet;
  const address = publicKeyToAddress(publicKey);

  return {
    ...wallet,
    publicKey,
    address,
    signingFunction: signWithLedger
  };
};

export default NeoHardwareWallet;

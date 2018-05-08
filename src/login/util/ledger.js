import LedgerNode from '@ledgerhq/hw-transport-node-hid';
import { tx, wallet, u } from '@cityofzion/neon-js';

const VALID_STATUS = 0x9000;
const MSG_TOO_BIG = 0x6D08;
const APP_CLOSED = 0x6e00;

const evalTransportError = (err) => {
  switch (err.statusCode) {
    case APP_CLOSED:
      return new Error('Please open the NEO app on your Ledger device.');
    case MSG_TOO_BIG:
      return new Error('Your transaction is too large for Ledger to sign.');
    default:
      return err;
  }
};

const BIP44 = (acct = 0) => {
  const acctNumber = acct.toString(16);

  return [
    '8000002C',
    '80000378',
    '80000000',
    '00000000',
    '0'.repeat(8 - acctNumber.length),
    acctNumber
  ].join('');
};

const assembleSignature = (response) => {
  const ss = new u.StringStream(response);
  // The first byte is format. It is usually 0x30 (SEQ) or 0x31 (SET)
  // The second byte represents the total length of the DER module.
  ss.read(2);
  // Now we read each field off
  // Each field is encoded with a type byte, length byte followed by the data itself
  ss.read(1); // Read and drop the type
  const r = ss.readVarBytes();
  ss.read(1);
  const s = ss.readVarBytes();

  // We will need to ensure both integers are 32 bytes long
  const integers = [r, s].map((i) => {
    if (i.length < 64) {
      return i.padStart(64, '0');
    } else if (i.length > 64) {
      return i.substr(-64);
    } else {
      return i;
    }
  });

  return integers.join('');
};

export default class NeonLedger {
  constructor(path) {
    this.path = path;
  }

  static async init() {
    const supported = await LedgerNode.isSupported();
    if (!supported) throw new Error('Your system does not support Ledger.');
    const paths = await NeonLedger.list();
    if (paths.length === 0) throw new Error('No USB device found.');
    const ledger = new NeonLedger(paths[0]);
    return ledger.open();
  }

  static async list() {
    return LedgerNode.list();
  }

  async open() {
    try {
      this.device = await LedgerNode.open(this.path);
      return this;
    } catch (err) {
      throw evalTransportError(err);
    }
  }

  close() {
    if (this.device) {
      return this.device.close();
    } else {
      return Promise.resolve();
    }
  }

  async getPublicKey(acct) {
    const res = await this.send('80040000', BIP44(acct), [VALID_STATUS]);
    return res.toString('hex').substring(0, 130);
  }

  getDeviceInfo() {
    try {
      return this.device.device.getDeviceInfo();
    } catch (err) {
      throw evalTransportError(err);
    }
  }

  async send(params, msg, statusList) {
    if (params.length !== 8) {
      throw new Error('`params` must be 4 bytes');
    }

    const [cla, ins, p1, p2] = params.match(/.{1,2}/g).map((i) => parseInt(i, 16));

    try {
      return await this.device.send(cla, ins, p1, p2, Buffer.from(msg, 'hex'), statusList);
    } catch (err) {
      throw evalTransportError(err);
    }
  }

  async getSignature(data, acct) {
    const formattedData = data + BIP44(acct);
    let response = null;
    const chunks = formattedData.match(/.{1,510}/g) || [];

    if (!chunks.length) {
      throw new Error(`Invalid data provided: ${formattedData}`);
    }

    for (let i = 0; i < chunks.length; i += 1) {
      const p = i === chunks.length - 1 ? '80' : '00';
      const chunk = chunks[i];
      const params = `8002${p}00`;

      try {
        response = this.send(params, chunk, [VALID_STATUS]);
      } catch (err) {
        throw evalTransportError(err);
      }
    }

    if (response === 0x9000) {
      throw new Error('Ledger did not provide a signature.');
    }

    return assembleSignature(response.toString('hex'));
  }
}

export const getPublicKey = async (acct) => {
  const ledger = await NeonLedger.init();

  try {
    return await ledger.getPublicKey(acct);
  } finally {
    await ledger.close();
  }
};

export const getDeviceInfo = async () => {
  const ledger = await NeonLedger.init();

  try {
    return await ledger.getDeviceInfo();
  } finally {
    await ledger.close();
  }
};

export const signWithLedger = async (unsignedTx, acct) => {
  const ledger = await NeonLedger.init();

  try {
    const data = typeof unsignedTx !== 'string' ?
      tx.serializeTransaction(unsignedTx, false) :
      unsignedTx;
    const publicKey = await ledger.getPublicKey(acct);
    const invocationScript = `40${await ledger.getSignature(data, acct)}`;
    const verificationScript = wallet.getVerificationScriptFromPublicKey(publicKey);
    const txObj = tx.deserializeTransaction(data);
    txObj.scripts.push({ invocationScript, verificationScript });
    return tx.serializeTransaction(txObj);
  } finally {
    await ledger.close();
  }
};

// export const legacySignWithLedger = async (unsignedTx, publicKeyEncoded, acct) => {
//   const ledger = await NeonLedger.init();
//
//   try {
//     const data = typeof unsignedTx !== 'string' ?
//       tx.serializeTransaction(unsignedTx, false) :
//       unsignedTx;
//     const invocationScript = `40${await ledger.getSignature(data, acct)}`;
//     const verificationScript = wallet.getVerificationScriptFromPublicKey(publicKeyEncoded);
//     const txObj = tx.deserializeTransaction(data);
//     txObj.scripts.push({ invocationScript, verificationScript });
//     return tx.serializeTransaction(txObj);
//   } finally {
//     await ledger.close();
//   }
// };

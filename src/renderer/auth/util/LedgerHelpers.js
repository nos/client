export const VALID_STATUS = 0x9000;
export const MSG_TOO_BIG = 0x6d08;
export const APP_CLOSED = 0x6e00;
export const TX_DENIED = 0x6985;
export const TX_PARSE_ERR = 0x6d07;

export function evalTransportError(err) {
  switch (err.statusCode) {
    case APP_CLOSED:
      return new Error('Please open the NEO app on your Ledger device.');
    case MSG_TOO_BIG:
      return new Error('Your transaction is too large for Ledger to sign.');
    case TX_DENIED:
      return new Error('You have denied the transaction on your ledger.');
    case TX_PARSE_ERR:
      return new Error('Error parsing transaction. Ensure your NEO Ledger app is up to date.');
    default:
      return err;
  }
}

export function BIP44(acct) {
  const acctNumber = acct.toString(16);

  return [
    '8000002C', // BIP44
    '80000378', // Coin Type
    '80000000', //
    '00000000',
    '0'.repeat(8 - acctNumber.length),
    acctNumber
  ].join('');
}

/**
 * The signature is returned from the ledger in a DER format.
 * @param {string} response Signature in DER format.
 */
export function assembleSignature(response) {
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
}

import LedgerNode from '@ledgerhq/hw-transport-node-hid';

import { evalTransportError, BIP44, VALID_STATUS, assembleSignature } from './LedgerHelpers';

export default class NeonLedger {
  constructor(path) {
    this.path = path;
    this.device = null;
  }

  /**
   * Opens an connection with the selected ledger.
   * @return {Promise<NeonLedger>} this
   */
  async open() {
    try {
      this.device = await LedgerNode.open(this.path);
      return this;
    } catch (err) {
      throw evalTransportError(err);
    }
  }

  /**
   * Closes the connection with the opened Ledger.
   * @return {Promise<void>}
   */
  close() {
    if (this.device) {
      return this.device.close();
    } else {
      return Promise.resolve();
    }
  }

  /**
   * Retrieves the public key of an account from the Ledger.
   * @param {number} [acct] Account that you want to retrieve the public key from.
   * @return {string} Public key (unencoded)
   */
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

  /**
   * Sends an message with parameters to the Ledger.
   * @param {string} params Parameters as a hexstring.
   * @param {string} data Data as a hexstring.
   * @param {number[]} statusList Statuses to return.
   * @return {Promise<Buffer>} Return value decoded to ASCII string.
   */
  async send(params, data, statusList) {
    if (params.length !== 8) {
      throw new Error('`params` must be 4 bytes');
    }

    const [cla, ins, p1, p2] = params.match(/.{1,2}/g).map((i) => parseInt(i, 16));
    try {
      return await this.device.send(cla, ins, p1, p2, Buffer.from(data, 'hex'), statusList);
    } catch (err) {
      throw evalTransportError(err);
    }
  }

  /**
   * Gets the ECDH signature of the data from Ledger using acct.
   * @param {string} data
   * @param {number} [acct]
   * @return {Promise<string>}
   */
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
        // eslint-disable-next-line no-await-in-loop
        response = await this.send(params, chunk, [VALID_STATUS]);
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

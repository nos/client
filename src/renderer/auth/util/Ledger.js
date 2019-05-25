import LedgerNode from '@ledgerhq/hw-transport-node-hid';
import { times } from 'lodash';

import { retry } from 'shared/util/promise';

import { evalTransportError, BIP44, VALID_STATUS, assembleSignature } from './LedgerHelpers';

export default class Ledger {
  constructor(path) {
    this.path = path;
    this.device = null;
  }

  /**
   * Opens an connection with the selected ledger.
   * @return {Promise<Ledger>} this
   */
  async open() {
    try {
      // this.device = await retry(() => LedgerNode.open(this.path));
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

  /**
   * Retrieves the public key of an account from the Ledger.
   * @param {number} [acct] Account that you want to retrieve the public key from.
   * @return {string} Public key (unencoded)
   */
  async getPublicKeys(currentPublicKeys = [], range = 10) {
    const start = currentPublicKeys.length;
    const resultArray = [];
    // eslint-disable-next-line
    for (let index = start; index < start + range; index++) {
      const bip44 = BIP44(start + index);
      // eslint-disable-next-line
      const res = await this.send('80040000', bip44, [VALID_STATUS]);
      const publicKey = res.toString('hex').substring(0, 130);
      resultArray.push({
        index,
        publicKey
      });
    }

    return [...currentPublicKeys, ...resultArray];
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

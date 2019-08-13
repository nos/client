import fetch from 'node-fetch';
import { attempt } from 'lodash';

import { Identities, Managers, Transactions } from '@arkecosystem/crypto';

import simpleDecrypt from 'shared/util/simpleDecrypt';

const ARK_API = 'https://api.ark.io/api';
const NETWORK_WIF = 170;

export default async function sendARK({
  amount,
  receiver,
  networkVersion = 0x17,
  wif,
  // account,
  fee = 0
}) {
  // const { encryptedMnemonic } = account || { encryptedMnemonic: '' };

  Managers.configManager.setFromPreset('mainnet');
  if (!Identities.Address.validate(receiver, networkVersion)) {
    throw new Error(`Invalid script hash: "${receiver}"`);
  }
  if (amount <= 0) {
    throw new Error(`Invalid amount: "${amount}"`);
  }
  // console.log('encryptedMnemonic: ', encryptedMnemonic);
  // const mnemonic = attempt(simpleDecrypt, encryptedMnemonic);
  // console.log('mnemonic: ', mnemonic);

  // console.log(wif);
  const send = async () => {
    // https://github.com/ArkEcosystem/core/blob/1cbc2a05a596340d4f261d162b8f426815908db6/packages/crypto/src/transactions/builders/transactions/transaction.ts
    const transaction = Transactions.BuilderFactory.transfer() // specify 'transfer' as our AIP11 transaction type
      .amount(amount * 1e8) // 20 ARK, multiplied by 10^8 to get arktoshi value
      .fee(fee * 1e8)
      .recipientId(receiver) // your recipient's address here
      // .version(1)
      // .network(networkVersion)
      // .sign(mnemonic)
      .signWithWif(wif, NETWORK_WIF) // your sender's passphrase here
      .build(); // returns signed transaction object

    console.log(transaction);
    console.log('fee: ', transaction.fee.toString());
    console.log('amount: ', transaction.amount.toString());
    console.log('senderPublicKey: ', transaction.senderPublicKey);
    console.log(Identities.Address.fromPublicKey(transaction.senderPublicKey, networkVersion));
    const endpoint = ARK_API;
    const data = await fetch(`${endpoint}/transactions`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transactions: [transaction.toJson()]
      })
    });
    const response = await data.json();

    console.log(response);
    return response;
    // return doSendAsset({ ...config, balance, tx: transaction }, api.neoscan);
  };

  const { data, errors } = await send();
  const { accept } = data;

  if (!data) {
    throw new Error('Transaction rejected by blockchain');
  }
  if (errors) {
    throw new Error(errors[Object.keys(errors)[0]][0].message);
  }

  return accept[0];
}

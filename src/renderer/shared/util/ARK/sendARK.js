import fetch from 'node-fetch';

import { Identities, Transactions } from '@arkecosystem/crypto';

const ARK_API = 'https://api.ark.io/api';

export default async function sendARK({ amount, receiver, networkVersion = 0x17, wif, fee = 0 }) {
  if (!Identities.Address.validate(receiver, networkVersion)) {
    throw new Error(`Invalid script hash: "${receiver}"`);
  }
  if (amount <= 0) {
    throw new Error(`Invalid amount: "${amount}"`);
  }

  console.log(wif);
  const send = async () => {
    // https://github.com/ArkEcosystem/core/blob/1cbc2a05a596340d4f261d162b8f426815908db6/packages/crypto/src/transactions/builders/transactions/transaction.ts
    const transaction = Transactions.BuilderFactory.transfer() // specify 'transfer' as our AIP11 transaction type
      .amount(amount * 1e8) // 20 ARK, multiplied by 10^8 to get arktoshi value
      // .vendorField('your vendorField message here')
      .fee(fee * 1e8)
      .recipientId(receiver) // your recipient's address here
      // .version(1)
      .network(networkVersion)
      .sign(wif) // your sender's passphrase here
      .getStruct(); // returns signed transaction object

    console.log(transaction);
    console.log('fee: ', transaction.fee.toString());
    console.log('amount: ', transaction.amount.toString());
    console.log('senderPublicKey: ', transaction.senderPublicKey);
    const endpoint = ARK_API;
    const data = await fetch(`${endpoint}/transactions`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transactions: [
          {
            id: transaction.id,
            signature: transaction.signature,
            timestamp: transaction.timestamp,
            version: transaction.version,
            type: transaction.type,
            fee: transaction.fee.toString(),
            senderPublicKey: transaction.senderPublicKey,
            amount: transaction.amount.toString(),
            recipientId: transaction.recipientId,
            expiration: transaction.expiration
          }
        ]
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

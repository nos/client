import fetch from 'node-fetch';

import { Identities, Transactions } from '@arkecosystem/crypto';

import getArkNetwork from 'shared/util/ARK/getNetwork';

const NETWORK_WIF = 186;

export default async function sendARK({ amount, receiver, wif, fee = 0 }) {
  if (!Identities.Address.validate(receiver)) {
    throw new Error(`Invalid script hash: "${receiver}"`);
  }
  if (amount <= 0) {
    throw new Error(`Invalid amount: "${amount}"`);
  }

  console.log('Amount ', amount);
  console.log('receiver ', receiver);
  console.log('wif ', wif);

  const send = async () => {
    try {
      // https://github.com/ArkEcosystem/core/blob/1cbc2a05a596340d4f261d162b8f426815908db6/packages/crypto/src/transactions/builders/transactions/transaction.ts
      const transaction = Transactions.BuilderFactory.transfer() // specify 'transfer' as our AIP11 transaction type
        .network(23)
        .version(2)
        .amount(amount * 1e8) // 20 ARK, multiplied by 10^8 to get arktoshi value
        .fee(fee * 1e8)
        .recipientId(receiver) // your recipient's address here
        .signWithWif(wif, NETWORK_WIF) // your sender's passphrase here
        .getStruct(); // returns signed transaction object

      console.log('Sending TX to network...');

      const api = getArkNetwork();
      const data = await fetch(`${api}/transactions`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactions: [transaction.toJson()]
        })
      });
      const response = await data.json();

      return response;
    } catch (e) {
      console.log('Error', e);
    }
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
